#!/usr/bin/env bash
# PreToolUse guard for `git commit` in the Casa Alta asset repository.
#
# Denies the things that are always wrong here and warns about the ones that
# are merely expensive. Reads the hook payload on stdin, writes a JSON
# decision on stdout. See CLAUDE.md and .claude/agents/git-conventions.md.
#
# IMPORTANT: hooks run in a non-interactive shell that does NOT inherit shell
# aliases or functions. `rg`, `bat`, `fd` and friends are NOT available here
# even though they work in an interactive session. Stick to /usr/bin.
set -uo pipefail

export PATH="/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

payload=$(cat)
cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')

# Cheap prefilter: only police commits. Everything else passes untouched.
case "$cmd" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

# Anchor to the repo root. CLAUDE_PROJECT_DIR wins when the harness sets it;
# otherwise derive it from this script's own location, so the guard behaves the
# same no matter what the hook's working directory happens to be.
if [ -n "${CLAUDE_PROJECT_DIR:-}" ]; then
  cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
else
  script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd) || exit 0
  cd "$script_dir/../.." 2>/dev/null || exit 0
fi

deny() {
  jq -n --arg r "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $r
    }
  }'
  exit 0
}

warn() {
  jq -n --arg m "$1" '{ systemMessage: $m }'
  exit 0
}

# --- 1. AI attribution -------------------------------------------------------
# This repo forbids it outright. Inspect only the command string.
#
# Deliberately NOT reading .git/COMMIT_EDITMSG: a PreToolUse hook runs before
# the command executes, so at this moment that file still holds the PREVIOUS
# commit's message. Reading it would deny every future commit as soon as one
# old message in history ever contained attribution. A permanent false
# positive is far worse than missing an editor-typed message, and `-m` is how
# commits are actually composed here.
if printf '%s' "$cmd" | grep -Eqi 'co-authored-by|generated with|noreply@anthropic\.com'; then
  deny "Blocked: this repository forbids AI attribution trailers (Co-Authored-By, 'Generated with', noreply@anthropic.com). Commit history here is conventional-commits only. Remove the trailer and commit again."
fi

# --- 2. Renumbering a published path -----------------------------------------
# The <NN> prefix is in published URLs. A rename that changes it destroys
# accumulated search ranking. Reordering belongs in manifest.json `order`.
# Identifies a path by its two numeric prefixes: the project folder and the
# photo's own ordinal. Both are published. `01-plaza/02-fachada.avif` -> "01|02".
numprefix() {
  local dir base dn bn
  dir=$(basename "$(dirname "$1")")
  base=$(basename "$1")
  dn=$(printf '%s' "$dir" | grep -oE '^[0-9]+' || true)
  bn=$(printf '%s' "$base" | grep -oE '^[0-9]+' || true)
  printf '%s|%s' "$dn" "$bn"
}

# -M with a lowered threshold so a rename whose content also changed (a
# re-encoded photo) is still reported as a rename rather than as delete+add.
renames=$(git diff --cached --name-status -M40% --diff-filter=R 2>/dev/null)
bad_renames=""
while IFS=$'\t' read -r status old new; do
  [ -n "${new:-}" ] || continue
  old_nums=$(numprefix "$old")
  new_nums=$(numprefix "$new")
  if [ "$old_nums" != "$new_nums" ]; then
    bad_renames="$bad_renames
  $old -> $new"
  fi
done <<< "$renames"

if [ -n "$bad_renames" ]; then
  deny "Blocked: staged rename changes a numeric prefix, which is part of a published URL:$bad_renames
Renaming a published project or photo breaks its link and discards search ranking. Record the new order in manifest.json as the 'order' field instead of renaming the file."
fi

# --- 3. Modifying a tracked file under images/ -------------------------------
# images/ is read-only source. New raw photos are fine; changes to files
# already committed there are always a mistake.
image_changes=$(git diff --cached --name-status --diff-filter=MDRT -- images/ 2>/dev/null)
if [ -n "$image_changes" ]; then
  deny "Blocked: staged changes modify files already tracked under images/, which is read-only source material:
$image_changes
Adding new raw photos is fine. Modifying or deleting existing ones is not — restore them and stage only the additions."
fi

# --- 4. Generated-output churn and weight (warn, do not block) ---------------
staged_count=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')
opt_count=$(git diff --cached --name-only -- images-optimizado/ 2>/dev/null | wc -l | tr -d ' ')

# Byte weight of what is actually staged.
#
# NOT `--numstat`: it reports binary files as "-", and awk coerces that to 0, so
# this check measured text only and could never fire on an image commit. Measured
# on commit 1618eca, which added 6.6 MB of AVIF and PNG: numstat summed to 7
# bytes. The one hazard this warning exists to catch -- a stray `git add -A`
# after a pipeline run -- was exactly the case it was blind to.
#
# `--raw` yields the new blob hash per path and `cat-file` reports its real size,
# binaries included. An unknown hash prints "<sha> missing", which still coerces
# to 0, so a stale entry cannot inflate the total.
added_bytes=$(git diff --cached --raw --diff-filter=AM 2>/dev/null \
  | awk '{print $4}' \
  | git cat-file --batch-check='%(objectsize)' 2>/dev/null \
  | awk '{s+=$1} END {print s+0}')
added_mb=$((added_bytes / 1048576))

notes=""
if [ "$opt_count" -gt 50 ]; then
  notes="$notes
- $opt_count files staged under images-optimizado/. Re-running the pipeline rewrites broadly; confirm this is the intent and not a stray 'git add -A'."
fi
if [ "$added_mb" -ge 20 ]; then
  notes="$notes
- ~${added_mb} MB of new content staged. There is no Git LFS and no .gitattributes here, so this becomes permanent history."
fi

if [ -n "$notes" ]; then
  warn "git-guard: $staged_count file(s) staged.$notes"
fi

exit 0
