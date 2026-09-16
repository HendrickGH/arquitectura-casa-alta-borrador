#!/bin/bash
# Builds one comparison sheet holding the hero picks of every project, so the
# cross-project priority order is decided by looking at the best of each side by
# side instead of trusting three differently-calibrated reviewer scores.
#
# Input lines: <projectNorm>|<displayName>|<idx>
set -u

SRC="/Users/hendrick/Documents/arquitectura-casa-alta-web/images"
MAPS="/tmp/casa-alta-work/index"
FONT="/System/Library/Fonts/Supplemental/Arial.ttf"
OUT="${1:?usage: champions.sh <out.png> [list]}"
LIST="${2:-/tmp/casa-alta-work/champions.txt}"
COLS="${COLS:-4}"
TILE="${TILE:-420}"

tmp=$(mktemp -d) || exit 1
trap 'rm -rf "$tmp"' EXIT

# normalized folder name -> real folder path (folder names contain spaces)
declare_lookup() {
  cd "$SRC" || exit 1
  for d in */; do
    d="${d%/}"
    printf '%s\t%s\n' "$(printf '%s' "$d" | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9')" "$d"
  done
}

LOOKUP=$(declare_lookup)
find_folder() {
  printf '%s\n' "$LOOKUP" | awk -F'\t' -v n="$1" '$1==n {print $2; exit}'
}

args=()
n=0
while IFS='|' read -r proj display idx; do
  [ -n "${proj:-}" ] || continue
  case "$proj" in \#*) continue ;; esac

  folder=$(find_folder "$proj")
  [ -n "$folder" ] || { echo "sin carpeta: $proj" >&2; continue; }

  mapf="$MAPS/$(printf '%s' "$folder" | tr ' ' '_' | tr -cd '[:alnum:]_-').map"
  [ -f "$mapf" ] || { echo "sin mapa: $mapf" >&2; continue; }

  file=$(awk -F'|' -v i="$idx" '$1==i {print $2}' "$mapf")
  [ -n "$file" ] || { echo "sin indice $idx en $proj" >&2; continue; }
  [ -f "$SRC/$folder/$file" ] || { echo "archivo ausente: $folder/$file" >&2; continue; }

  n=$((n + 1))
  cp "$SRC/$folder/$file" "$tmp/$(printf '%03d' $n).jpg"
  args+=(-label "$(printf '%s %s' "$display" "$idx")" "$tmp/$(printf '%03d' $n).jpg")
done < "$LIST"

[ ${#args[@]} -gt 0 ] || { echo "nada que montar" >&2; exit 1; }

magick montage \
  -font "$FONT" -pointsize 30 -fill white -background '#1a1a1a' \
  "${args[@]}" \
  -tile "${COLS}x" -geometry "${TILE}x${TILE}+6+6" \
  "$OUT"

echo "hoja: $OUT  ($n imagenes, $(magick identify -format '%wx%h' "$OUT"))"
