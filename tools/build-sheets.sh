#!/bin/bash
# Build labeled contact sheets + an index map for each project folder.
#
# Two ImageMagick gotchas this script exists to avoid:
#   1. Settings (-font, -pointsize, -fill, -background) must come BEFORE the
#      images they apply to. Placed after, they silently apply to nothing.
#   2. -font Helvetica (by name) fails on this box: magick -list font is empty,
#      so no fontconfig lookup is possible. An explicit .ttf path always works.
set -u

SRC="/Users/hendrick/Documents/arquitectura-casa-alta-web/images"
WORK="/tmp/casa-alta-work"
SHEETS="$WORK/sheets"
INDEX="$WORK/index"
FONT="/System/Library/Fonts/Supplemental/Arial.ttf"
PER_SHEET=16

[ -f "$FONT" ] || { echo "fuente no encontrada: $FONT" >&2; exit 1; }

rm -rf "$SHEETS" "$INDEX"
mkdir -p "$SHEETS" "$INDEX"

cd "$SRC" || exit 1

for proj in */; do
  proj="${proj%/}"
  slug=$(printf '%s' "$proj" | tr ' ' '_' | tr -cd '[:alnum:]_-')

  files=$(fd -t f -e jpeg -e jpg -e JPEG -e JPG . "$proj" | sort -V)

  map="$INDEX/$slug.map"
  : > "$map"

  i=0
  sheet=0
  args=()

  emit() {
    [ ${#args[@]} -gt 0 ] || return 0
    sheet=$((sheet + 1))
    magick montage \
      -font "$FONT" -pointsize 30 -fill white -background '#1a1a1a' \
      "${args[@]}" \
      -tile 4x -geometry 380x380+6+6 \
      "$SHEETS/${slug}_$(printf '%02d' $sheet).png"
    args=()
  }

  while IFS= read -r f; do
    [ -n "$f" ] || continue
    i=$((i + 1))
    idx=$(printf '%02d' "$i")
    printf '%s|%s\n' "$idx" "$(basename "$f")" >> "$map"
    args+=(-label "$idx" "$f")
    [ $((i % PER_SHEET)) -eq 0 ] && emit
  done <<< "$files"

  emit
  printf '%-40s %3d fotos  %d hoja(s)\n' "$proj" "$i" "$sheet"
done

echo "--- hojas generadas: $(fd -e png . "$SHEETS" | wc -l | tr -d ' ')"
