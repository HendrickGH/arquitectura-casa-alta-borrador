#!/bin/bash
# Encodes the landing hero into the same contract as the project photos.
#
# The hero bypasses the index-based pipeline in tools/ on purpose: that flow is
# contact sheet -> human ranking -> plan file, and a single already-chosen hero
# has nothing to rank. This reproduces the contract for one file, reusing the
# exact flags from convert.sh (full size) and variants.sh (tiers + skip rule),
# and writes the sidecar that tools/sync-images.mjs merges into the image
# loader's variant table.
#
# The source is a PNG, so the "fallback" is kept as .png rather than renamed to
# .jpg -- renaming it would misdescribe the bytes.
set -u

cd "$(dirname "$0")/.." || exit 1

SLUG="vista-aerea-palapas-alberca-playa"
SRC="images/hero/$SLUG.png"
OUT="images-optimizado/hero"
AVIF_Q="${AVIF_Q:-62}"
MAX_EDGE="${MAX_EDGE:-2000}"
WIDTHS="${WIDTHS:-480 960}"
MIN_GAIN="${MIN_GAIN:-1.1}"   # matches variants.sh: only emit when it is a real downscale

[ -f "$SRC" ] || { echo "falta el origen: $SRC" >&2; exit 1; }
mkdir -p "$OUT"

base="$OUT/$SLUG"

magick "$SRC" -auto-orient -resize "${MAX_EDGE}x${MAX_EDGE}>" -strip \
  -quality "$AVIF_Q" "$base.avif" || { echo "fallo el AVIF principal" >&2; exit 1; }
cp "$SRC" "$base.png"

read -r fw fh <<< "$(magick identify -format '%w %h' "$base.avif")"
read -r sw sh <<< "$(magick identify -format '%w %h' "$SRC")"
slong=$(( sw > sh ? sw : sh ))

# Ascending by width, full size last: the loader relies on the order.
built=""
for w in $WIDTHS; do
  awk -v s="$slong" -v w="$w" -v g="$MIN_GAIN" 'BEGIN{exit !(s > w*g)}' || continue
  vf="$base-$w.avif"
  magick "$SRC" -auto-orient -resize "${w}x${w}>" -strip -quality "$AVIF_Q" "$vf" || continue
  read -r vw vh <<< "$(magick identify -format '%w %h' "$vf")"
  built="$built$vw:$vh:$(basename "$vf")\n"
done
built="$built$fw:$fh:$(basename "$base.avif")"

{
  # Key is the path relative to images-optimizado/, matching how the loader
  # derives its lookup key from a "/images/..." src.
  printf '{\n  "hero/%s": [\n' "$SLUG"
  printf "$built" | awk 'BEGIN{sep=""} {gsub(/\n/,"",$0); if(length($0)){n=split($0,p,":")
      printf "%s    [%s, \"%s\"]", sep, p[1], p[3]; sep=",\n"}}'
  printf '\n  ]\n}\n'
} > "$OUT/hero.json"

echo "hero:"
magick identify -format '  %wx%h  %f\n' "$OUT"/*.avif
echo "  sidecar: $OUT/hero.json"
