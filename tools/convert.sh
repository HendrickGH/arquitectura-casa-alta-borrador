#!/bin/bash
# Converts the ranked plan into an optimized, renamed image tree.
#
# Plan format (pipe-delimited, one line per image, ordered by priority):
#   <projectOrder>|<projectSlug>|<imageOrder>|<imageSlug>|<original path relative to SRC>
#
# Output per image:
#   <OUT>/<NN>-<projectSlug>/<NN>-<imageSlug>.avif   primary, quality 62, capped 2000px
#   <OUT>/<NN>-<projectSlug>/<NN>-<imageSlug>.jpg    fallback: original bytes, renamed
#
# Rationale for the JPEG fallback being a copy and not a re-encode:
# measured on this corpus, re-encoding these already-WhatsApp-degraded JPEGs to
# WebP q82 yields 100-102% of the original size, and q78 yields ~90%. The
# fallback would grow files for no gain, so the untouched original is kept.
set -u

SRC="/Users/hendrick/Documents/arquitectura-casa-alta-web/images"
PLAN="${1:?usage: convert.sh <plan-file> <out-dir>}"
OUT="${2:?usage: convert.sh <plan-file> <out-dir>}"
AVIF_Q="${AVIF_Q:-62}"
MAX_EDGE="${MAX_EDGE:-2000}"
LOG="/tmp/casa-alta-work/convert.log"

[ -f "$PLAN" ] || { echo "plan no encontrado: $PLAN" >&2; exit 1; }

slugify() {
  printf '%s' "$1" | perl -CS -MUnicode::Normalize=NFD -pe '
    $_ = NFD($_);
    s/\p{Mn}//g;
    s/[^A-Za-z0-9]+/-/g;
    s/^-+|-+$//g;
    $_ = lc($_);
    $_ .= "\n";
  '
}

rm -rf "$OUT"; mkdir -p "$OUT"
: > "$LOG"

n=0; ok=0; fail=0
size_orig=0; size_avif=0; size_fallback=0

while IFS='|' read -r pord pslug iord islug orig; do
  [ -n "${orig:-}" ] || continue
  orig="${orig#"${orig%%[![:space:]]*}"}"   # ltrim, in case the plan is hand-edited
  [ -n "$orig" ] || continue

  n=$((n + 1))
  src="$SRC/$orig"
  if [ ! -f "$src" ]; then
    printf 'FALTA|%s\n' "$orig" >> "$LOG"; fail=$((fail + 1)); continue
  fi

  dir="$OUT/$(slugify "$pord-$pslug")"
  mkdir -p "$dir"
  base="$dir/$(printf '%s-%s' "$iord" "$(slugify "$islug")")"

  if ! magick "$src" -auto-orient -resize "${MAX_EDGE}x${MAX_EDGE}>" \
        -strip -quality "$AVIF_Q" "$base.avif" 2>>"$LOG"; then
    printf 'FALLO_AVIF|%s\n' "$orig" >> "$LOG"; fail=$((fail + 1)); continue
  fi

  cp "$src" "$base.jpg"

  o=$(stat -f %z "$src"); a=$(stat -f %z "$base.avif")
  size_orig=$((size_orig + o)); size_avif=$((size_avif + a))
  size_fallback=$((size_fallback + o))
  ok=$((ok + 1))

  printf '%s|%s|%s|%s\n' "$pord" "$iord" "$o" "$a" >> "$LOG"
  printf '\r  %d/%d  %s' "$n" "$(grep -c . "$PLAN")" "$(basename "$base")" >&2
done < "$PLAN"

printf '\n\n'
echo "=== resultado ==="
printf 'convertidas: %d   fallidas: %d\n' "$ok" "$fail"
awk -F'|' '/^[0-9]+\|[0-9]+\|[0-9]+\|[0-9]+$/ {o+=$3; a+=$4; n++} END {
  if (n==0) { print "  sin datos"; exit }
  printf "  originales totales : %7.1f MB\n", o/1048576
  printf "  AVIF totales       : %7.1f MB  (%.0f%% del original)\n", a/1048576, a*100/o
  printf "  ahorro             : %7.1f MB  (%.0f%%)\n", (o-a)/1048576, (o-a)*100/o
  printf "  promedio por foto  : %.0f KB -> %.0f KB\n", o/n/1024, a/n/1024
}' "$LOG"
if rg -q '^(FALTA|FALLO_AVIF)\|' "$LOG" 2>/dev/null; then
  echo "  avisos:"; rg '^(FALTA|FALLO_AVIF)\|' "$LOG" | head -20
fi
