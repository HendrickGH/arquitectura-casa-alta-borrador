#!/bin/bash
# Encodes one editorial (stock) image into images-optimizado/editorial/.
#
# Shape mirrors tools/hero.sh: same AVIF flags, same tier widths, same
# MIN_GAIN skip rule, same ascending sidecar order. Two differences, both
# deliberate (see design.md §D7):
#
#   1. The slug is an argument, so it is validated before anything is read or
#      written. hero.sh needs none of that because its slug is a literal.
#   2. It refuses to encode an image whose provenance record is missing or
#      incomplete. That is the gate for "an image with a missing record must not
#      ship", placed in the same script that produces the bytes instead of in a
#      checker that could be skipped.
#
# Editorial sources live under images/editorial/<slug>/ and are add-only: this
# script never writes, renames or deletes anything under images/, and it uses no
# rm at all. Its only writes are under images-optimizado/editorial/.
set -u

cd "$(dirname "$0")/.." || exit 1

slug="${1:-}"
if [ -z "$slug" ]; then
  echo "uso: bash tools/editorial.sh <slug>" >&2
  exit 1
fi

# The slug boundary: lowercase ASCII, digits and hyphens, starting alphanumeric.
# No `..`, no `/`, no spaces, no leading hyphen -- all excluded by the class.
if ! printf '%s' "$slug" | grep -Eq '^[a-z0-9][a-z0-9-]*$'; then
  echo "slug invalido: '$slug' (esperado ^[a-z0-9][a-z0-9-]*$)" >&2
  exit 1
fi

SRCDIR="images/editorial/$slug"
[ -d "$SRCDIR" ] || { echo "falta el directorio de origen: $SRCDIR" >&2; exit 1; }

PROV="$SRCDIR/provenance.json"
[ -f "$PROV" ] || { echo "falta provenance.json en $SRCDIR" >&2; exit 1; }

# The provenance gate. Page URL, photographer and licence must all be present
# and non-empty; the licence record is not optional metadata.
PROV_FILE="$PROV" node <<'NODE' || exit 1
const { readFileSync } = require("node:fs");
const required = ["sourceUrl", "photographer", "licence"];
let record;
try {
  record = JSON.parse(readFileSync(process.env.PROV_FILE, "utf8"));
} catch (error) {
  console.error(`provenance ilegible: ${error.message}`);
  process.exit(1);
}
const missing = required.filter(
  (key) => typeof record[key] !== "string" || !record[key].trim(),
);
if (missing.length) {
  console.error(`provenance incompleta: falta ${missing.join(", ")}`);
  process.exit(1);
}
NODE

# Exactly one source image, named after the slug. jpeg is accepted because a
# downloaded file may carry either extension; the fallback keeps whichever it is.
src=""
srcext=""
for ext in jpg jpeg png webp; do
  candidate="$SRCDIR/$slug.$ext"
  if [ -f "$candidate" ]; then
    if [ -n "$src" ]; then
      echo "hay mas de un origen en $SRCDIR (p.ej. $slug.$ext)" >&2
      exit 1
    fi
    src="$candidate"
    srcext="$ext"
  fi
done
[ -n "$src" ] || { echo "falta el origen $SRCDIR/$slug.<jpg|jpeg|png|webp>" >&2; exit 1; }

OUT="images-optimizado/editorial"
mkdir -p "$OUT"

AVIF_Q="${AVIF_Q:-62}"
MAX_EDGE="${MAX_EDGE:-2000}"
WIDTHS="${WIDTHS:-480 960}"
MIN_GAIN="${MIN_GAIN:-1.1}"   # matches hero.sh/variants.sh: only a real downscale

base="$OUT/$slug"

magick "$src" -auto-orient -resize "${MAX_EDGE}x${MAX_EDGE}>" -strip \
  -quality "$AVIF_Q" "$base.avif" || { echo "fallo el AVIF principal de $slug" >&2; exit 1; }
cp "$src" "$base.$srcext"

read -r sw sh <<< "$(magick identify -format '%w %h' "$src")"
slong=$(( sw > sh ? sw : sh ))

for w in $WIDTHS; do
  awk -v s="$slong" -v w="$w" -v g="$MIN_GAIN" 'BEGIN{exit !(s > w*g)}' || continue
  magick "$src" -auto-orient -resize "${w}x${w}>" -strip -quality "$AVIF_Q" \
    "$base-$w.avif" || continue
done

# Rebuild both sidecars from every encoded slug, so one run is idempotent and a
# later ingest never drops a slug encoded by an earlier one. The loader sidecar
# stays hero.json's shape; the dimension data the seam needs lives in its own
# file, because a second entry shape in the loader's table would make
# entries.filter throw at load time (design.md §D7).
OUT="$OUT" WIDTHS="$WIDTHS" node <<'NODE' || exit 1
const { readdirSync, readFileSync, writeFileSync, statSync } = require("node:fs");
const { join } = require("node:path");
const { execFileSync } = require("node:child_process");

const out = process.env.OUT;
const widths = process.env.WIDTHS.split(/\s+/).filter(Boolean).map(Number);
const dims = (file) =>
  execFileSync("magick", ["identify", "-format", "%w %h", file], {
    encoding: "utf8",
  })
    .trim()
    .split(/\s+/)
    .map(Number);

const slugs = readdirSync(out)
  .filter((name) => name.endsWith(".avif") && !/-\d+\.avif$/.test(name))
  .map((name) => name.slice(0, -".avif".length))
  .filter((slug) => {
    const provenance = join("images", "editorial", slug, "provenance.json");
    try {
      readFileSync(provenance);
      return true;
    } catch {
      console.error(`sin provenance, no se indexa: ${slug}`);
      return false;
    }
  })
  .sort();

const table = {};
const dimensionTable = {};

for (const slug of slugs) {
  const primary = `${slug}.avif`;
  const entries = [];

  for (const width of widths) {
    const file = `${slug}-${width}.avif`;
    try {
      statSync(join(out, file));
    } catch {
      continue;
    }
    const [w] = dims(join(out, file));
    entries.push([w, file]);
  }

  const [fw, fh] = dims(join(out, primary));
  entries.push([fw, primary]);
  entries.sort((a, b) => a[0] - b[0]);

  const fallback = readdirSync(out).find(
    (name) => name.startsWith(`${slug}.`) && !name.endsWith(".avif"),
  );
  if (!fallback) {
    console.error(`falta el fallback de ${slug}`);
    process.exit(1);
  }

  table[`editorial/${slug}`] = entries;
  dimensionTable[slug] = { width: fw, height: fh, fallback };
}

writeFileSync(join(out, "editorial.json"), JSON.stringify(table, null, 2) + "\n");
writeFileSync(
  join(out, "editorial.dimensions.json"),
  JSON.stringify(dimensionTable, null, 2) + "\n",
);
console.log(`  sidecars: editorial.json (${slugs.length}), editorial.dimensions.json`);
NODE

echo "editorial:"
magick identify -format '  %wx%h  %f\n' "$OUT"/"$slug"*.avif
