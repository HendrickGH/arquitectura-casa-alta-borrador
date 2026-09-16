#!/bin/bash
# Generates responsive width variants for every photo in the plan.
#
# Variants are encoded from the ORIGINAL source, never from the already-converted
# AVIF, so there is no second generation of loss.
#
# A variant is skipped when the source's long edge is not meaningfully larger
# than the target width. Upscaling would invent pixels, and a near-identical
# duplicate would just add a file the browser never picks.
#
# NB: no associative arrays here. macOS ships bash 3.2, which lacks declare -A.
# The score/note lookups are done with a single awk join up front instead.
set -u

SRC="/Users/hendrick/Documents/arquitectura-casa-alta-web/images"
OUT="/Users/hendrick/Documents/arquitectura-casa-alta-web/images-optimizado"
PLAN="/tmp/casa-alta-work/plan.txt"
MANIFEST="/tmp/casa-alta-work/manifest.txt"
JOINED="/tmp/casa-alta-work/joined.txt"
TSV="/tmp/casa-alta-work/variants.tsv"
LOG="/tmp/casa-alta-work/variants.log"
AVIF_Q="${AVIF_Q:-62}"
WIDTHS="${WIDTHS:-480 960}"
MIN_GAIN="${MIN_GAIN:-1.1}"   # only emit if source long edge > width * MIN_GAIN

: > "$TSV"; : > "$LOG"

# plan + score/note, side by side: pn|ps|in|slug|orig|score|note
awk -F'|' '
  NR==FNR { sc[$1"|"$3]=$5; nt[$1"|"$3]=$6; next }
  { k=$1"|"$3; printf "%s|%s|%s|%s|%s|%s|%s\n", $1,$2,$3,$4,$5,sc[k],nt[k] }
' "$MANIFEST" "$PLAN" > "$JOINED"

n=0; made=0; skipped=0
total=$(wc -l < "$JOINED" | tr -d ' ')

while IFS='|' read -r pn ps in slug orig sc nt; do
  [ -n "${orig:-}" ] || continue
  n=$((n + 1))
  src="$SRC/$orig"
  dir="$OUT/$pn-$ps"
  base="$dir/$in-$slug"

  if [ ! -f "$src" ]; then printf 'FALTA|%s\n' "$orig" >> "$LOG"; continue; fi

  read -r sw sh <<< "$(magick identify -format '%w %h' "$src")"
  slong=$(( sw > sh ? sw : sh ))

  entries=""
  for w in $WIDTHS; do
    if ! awk -v s="$slong" -v w="$w" -v g="$MIN_GAIN" 'BEGIN{exit !(s > w*g)}'; then
      skipped=$((skipped + 1)); continue
    fi
    vf="$base-$w.avif"
    if magick "$src" -auto-orient -resize "${w}x${w}>" -strip -quality "$AVIF_Q" "$vf" 2>>"$LOG"; then
      read -r vw vh <<< "$(magick identify -format '%w %h' "$vf")"
      entries="$entries$w:$vw:$vh:$(basename "$vf") "
      made=$((made + 1))
    else
      printf 'FALLO_VARIANTE|%s|%s\n' "$orig" "$w" >> "$LOG"
    fi
  done

  printf '%s|%s|%s|%s|%s|%s|%s\n' "$pn" "$ps" "$in" "$slug" "$sc" "$nt" "$entries" >> "$TSV"

  printf '\r  %d/%d  %s                              ' "$n" "$total" "$in-$slug" >&2
done < "$JOINED"

printf '\n\n'
echo "=== variantes ==="
echo "  generadas: $made   omitidas (no aportan): $skipped"
echo "  avif totales en el arbol: $(fd -e avif . "$OUT" | wc -l | tr -d ' ')"
echo "  peso: $(du -sh "$OUT" | cut -f1)"
if [ -s "$LOG" ]; then echo "  avisos:"; head -10 "$LOG"; fi
