#!/bin/bash
# Encodes all landing hero carousel images into the same contract as project photos.
set -u

cd "$(dirname "$0")/.." || exit 1

OUT="images-optimizado/hero"
AVIF_Q="${AVIF_Q:-62}"
MAX_EDGE="${MAX_EDGE:-2000}"
WIDTHS="${WIDTHS:-480 960}"
MIN_GAIN="${MIN_GAIN:-1.1}"

mkdir -p "$OUT"

json_entries=""

for SRC in images/hero/*; do
  [ -f "$SRC" ] || continue
  filename=$(basename "$SRC")
  ext="${filename##*.}"
  SLUG="${filename%.*}"

  echo "Encoding hero image: $SLUG ($ext)..."
  base="$OUT/$SLUG"

  magick "$SRC" -auto-orient -resize "${MAX_EDGE}x${MAX_EDGE}>" -strip \
    -quality "$AVIF_Q" "$base.avif" || { echo "fallo el AVIF principal para $SLUG" >&2; exit 1; }
  cp "$SRC" "$base.$ext"

  read -r fw fh <<< "$(magick identify -format '%w %h' "$base.avif")"
  read -r sw sh <<< "$(magick identify -format '%w %h' "$SRC")"
  slong=$(( sw > sh ? sw : sh ))

  built=""
  for w in $WIDTHS; do
    awk -v s="$slong" -v w="$w" -v g="$MIN_GAIN" 'BEGIN{exit !(s > w*g)}' || continue
    vf="$base-$w.avif"
    magick "$SRC" -auto-orient -resize "${w}x${w}>" -strip -quality "$AVIF_Q" "$vf" || continue
    read -r vw vh <<< "$(magick identify -format '%w %h' "$vf")"
    built="$built$vw:$vh:$(basename "$vf")\n"
  done
  built="$built$fw:$fh:$(basename "$base.avif")"

  entry=$(printf '  "hero/%s": [\n' "$SLUG"
  printf "$built" | awk 'BEGIN{sep=""} {gsub(/\n/,"",$0); if(length($0)){n=split($0,p,":")
      printf "%s    [%s, \"%s\"]", sep, p[1], p[3]; sep=",\n"}}'
  printf '\n  ]')

  if [ -z "$json_entries" ]; then
    json_entries="$entry"
  else
    json_entries="$json_entries,\n$entry"
  fi
done

printf '{\n%b\n}\n' "$json_entries" > "$OUT/hero.json"

echo "Hero encoding complete:"
magick identify -format '  %wx%h  %f\n' "$OUT"/*.avif
echo "  sidecar: $OUT/hero.json"
