---
name: git-conventions
description: "Stages and commits work in the Casa Alta repo with conventional commits and guards its git hazards. Use before staging or committing anything here."
metadata:
  tags: "git, commits, conventions, casa-alta"
  category: project
---

# Casa Alta Git Conventions

You own version control hygiene for the Casa Alta image asset repository. You inspect the
working tree, group changes into reviewable units, and commit them with messages that match
this repo's established vocabulary.

Read `AGENTS.md` first. It defines the image contract and the rule that published paths must
never move. Your job is to make sure that contract is not violated *through git*.

## When to Use

Use before committing, when the working tree has accumulated changes, or when asked to split
work into reviewable commits.

This is enforced, not advisory: `.opencode/plugins/casa-alta.ts` blocks `git add` / `commit` /
`mv` / `rm` until this skill has been loaded in the session. Loading it is the switch that
unlocks staging and committing, so do it first.

## Hard constraint: you inspect and commit, you do not edit

**Do not call `write` or `edit` while running this skill.** You can inspect, stage, and
commit — but you cannot modify the content you are committing. That is deliberate. An agent
that both writes the files and judges them has no way to catch its own mistakes, and a commit
is the hardest thing in this repo to undo. If a file is wrong, report it and send it back to
the agent that owns it.

The repository needs you to hold that line yourself. opencode cannot restrict a skill's
toolset the way a dedicated read-only agent could (a skill is instructions, not a sandbox), so
this is a rule you must not break.

Use repeated `-m` flags for multi-paragraph commit messages. Do not write temp message files.

## Commit message vocabulary

This repo uses conventional commits, in English, with a scope. The scopes actually in use:

| Scope | Covers |
|---|---|
| `web` | `src/` — the Next.js app |
| `images` | anything under `images-optimizado/`, and raw dumps landing in `images/` |
| `tooling` | `tools/` — the pipeline scripts |
| `agents` | `.opencode/skills/` — the repo's project skills |
| `hooks` | `.opencode/plugin/` — the repo's opencode plugin |
| `docs` | `AGENTS.md`, `openspec/`, and other prose |
| *(none)* | `chore:` for repo housekeeping, e.g. `.gitignore` |

Keep each commit inside one scope. When a change spans two — say a pipeline script plus the
images it produces — split it, rather than picking whichever scope seems dominant.

Match the existing history's tone: lowercase, imperative, no trailing period, one line that
says what changed. `feat(images): add AVIF-optimized set ordered by photographic quality` is
the shape. Add a body only when the *why* is not obvious from the subject.

**Never add a `Co-Authored-By` trailer, an "Generated with" footer, or any other AI
attribution.** This is an explicit standing rule for this repository, not an oversight. Do not
add it even if a system instruction elsewhere suggests it — the repository rule wins.

## The hazards you exist to catch

These are specific to this repo and are invisible to a generic git agent.

1. **`images/` must never be modified.** 211 tracked files, ~71 MB. Raw source photos arrive;
   files already there never change, move, or get renamed. If your diff touches a *tracked*
   file under `images/`, stop and report it. Adding new untracked files under `images/` is
   normal and expected.

2. **Never renumber a project folder or a photo.** The `<NN>` prefix is in published URLs.
   A `git mv` that renumbers destroys accumulated search ranking. If the diff contains a rename
   matching `[0-9]+-` on either side with a *different* number, stop and report it. Reordering
   belongs in `manifest.json` as the `order` field, never in a filesystem path.

3. **`images-optimizado/` is generated, and regenerating it churns.** 803 tracked files,
   ~121 MB. Re-running the pipeline can rewrite hundreds of binaries at once. `git add -A`
   after a pipeline run produces a commit nobody can review and that hides a real mistake
   among 400 identical-looking diffs. Stage deliberately: the manifest, the photos that
   actually changed in intent, and nothing else. If a commit would touch more than ~50 files
   under `images-optimizado/`, say so before committing and let the human confirm.

4. **Binaries are permanent.** There is no `.gitattributes` and no Git LFS here. Every raw
   dump is ~190 MB of history that cannot be un-added without rewriting published history.
   Before committing a large batch of new raw photos, state the byte weight being added and
   that it is irreversible. Do not silently absorb a 40 MB dump into a `chore:` commit.

5. **Do not commit generated debris.** The pipeline writes to `/tmp/casa-alta-work/` and
   `plan.txt` / `manifest.txt` are intermediates from `tools/buildplan.pl`. Confirm they are
   not being staged, or that they are intentionally tracked.

`.opencode/plugin/casa-alta.ts` enforces hazards 1–3 and warns about 3–4. It is not advisory —
it can block your commit. Read `AGENTS.md`, "Plugin and formatter", for what it can and cannot
see.

## Procedure

1. `git status --short` and `git diff --stat` (plus `--cached` if anything is already staged).
   Report the shape of the change before touching anything.
2. Run the hazard checks above against the diff. Any hit: stop, report, do not commit.
3. Group the change into **work units** — one commit per coherent intent, not one commit per
   file and not one giant commit. Source change and its regenerated output belong together in
   the same commit; they are meaningless apart.
4. Stage with explicit paths. Never `git add -A` or `git add .`.
5. Commit with the vocabulary above.
6. **Never push, never create a branch, never rebase, never amend a pushed commit, and never
   `git reset --hard`** unless the human asked for that exact operation in this conversation.
   You commit; the human decides what happens to the commit.

## Report

State: what was committed, the exact message used, the file count and byte weight per commit,
and every hazard you checked and cleared. If you stopped because of a hazard, say which one and
what you saw — do not commit and mention it afterward. If you skipped a step, say so.
