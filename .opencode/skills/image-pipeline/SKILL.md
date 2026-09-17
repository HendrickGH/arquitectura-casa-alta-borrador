---
name: image-pipeline
description: "Ingests new photos from images/ into the optimized AVIF set without disturbing published files. Use when new images appear in a project folder or optimization must be re-run."
metadata:
  tags: "images, avif, pipeline, imagemagick, casa-alta"
  category: project
---

# Casa Alta Image Pipeline

You maintain the optimized image set for the Casa Alta architecture studio website.
Your job: take photos a human dropped into `images/` and fold them into
`images-optimizado/` without disturbing anything already published.

Read `AGENTS.md` first. It holds the image contract, the measured compression facts, and
the ImageMagick gotchas that are not obvious. Do not re-derive them.

## When to Use

Use when new images appear in a project folder, when a project is added, or when asked to
re-run image optimization.

## Prerequisites

ImageMagick (`magick`), and `perl` for the `tools/*.pl` stages. The contact-sheet step needs an
explicit font path — see the Pitfalls section. Vision is required to score photos: read the
generated sheet with the `read` tool, which returns images as attachments.

## Hard constraints

1. **`images/` is read-only.** Never write, rename, move, or delete anything in it.
2. **Never renumber existing photos.** The numeric prefix appears in URLs. Renumbering an
   already-published photo breaks its link and discards accumulated search ranking. New photos
   appended to a project take the next free ordinal — even if the new photo is better than
   everything there. Quality rank belongs in `manifest.json` as data, not in the filename.
3. **Never renumber or reorder project folders.** Same reason.
4. **Never publish a photo you scored 1/5 or 2/5.** Encode it, place it last, and say so in
   your report so the human can decide. A portfolio is judged by its worst photo.
5. **Never upscale.** If the source is smaller than a variant width, skip that variant.
6. **Never re-encode the `.jpg` fallback.** Copy the original bytes. Re-encoding an already
   WhatsApp-degraded JPEG makes it larger and worse — this is measured, see `AGENTS.md`.

## Procedure

### 1. Ingest

List every image under `images/` with `glob`. Compare against the
`source` field of every photo in `images-optimizado/manifest.json`. Anything in the tree but
not in the manifest is new. Also flag sources listed in the manifest whose file no longer
exists.

If nothing is new, say so and stop. Do not rebuild what already exists.

### 2. Rank the new photos

For each project that gained photos, build a labeled contact sheet of **only the new
photos** plus, for calibration, the project's current top 3 by `score`. Put the labels on
with an explicit font path and remember settings must precede the images:

```
magick montage -font /System/Library/Fonts/Supplemental/Arial.ttf -pointsize 30 \
  -fill white -background '#1a1a1a' \
  -label '01' /path/one.jpg -label '02' /path/two.jpg \
  -tile 4x -geometry 380x380+6+6 /tmp/new-sheet.png
```

**Read the sheet image with the `read` tool and look at it.** Judge the *photograph* —
composition, light, focal point, craft (focus, straight verticals), whether it communicates
the architecture. Ignore resolution and file size; these are WhatsApp-compressed and the
technical numbers are meaningless. Give each new photo a score 1–5 and a note.

Verify the sheet actually rendered its labels before trusting any index you read off it.
Silent label failure has caused a full wasted run in this repo before.

Write a **Spanish, kebab-case, ASCII-only** slug describing what is visible. No accents, no
`ñ`, no generic filler (`foto`, `imagen`, `vista`). It must be unique inside the project.
Never invent materials or functions you cannot see.

### 3. Encode

For each new photo, next free ordinal `<NN>` in its project:

```
magick "images/<src>" -auto-orient -resize '2000x2000>' -strip -quality 62 \
  "images-optimizado/<dir>/<NN>-<slug>.avif"
cp "images/<src>" "images-optimizado/<dir>/<NN>-<slug>.jpg"
```

Then the variants, from the original, skipping any width the source cannot beat by 10%:

```
magick "images/<src>" -auto-orient -resize '480x480>' -strip -quality 62 \
  "images-optimizado/<dir>/<NN>-<slug>-480.avif"
```

Repeat for `960`. `tools/variants.sh` does exactly this — prefer running it over hand-rolling.

### 4. Update the manifest

Add an entry per new photo to `images-optimizado/manifest.json`, matching the existing
shape exactly: `order`, `slug`, `score`, `note`, `source`, `base`, `full`, `fallback`,
`variants`, `srcset`. **Modify nothing else in the file.** Append new photos at the end of
their project's `photos` array so existing `order` values are untouched.

Recompute `stats.photos` and `stats.projects`.

## Pitfalls

ImageMagick on this machine has three failure modes that cost a full re-run to discover:

1. `-font Helvetica` by name does not work — `magick -list font` is empty and there is no
   fontconfig lookup. Always pass `/System/Library/Fonts/Supplemental/Arial.ttf`.
2. Settings must precede the images they apply to. `magick montage -font X -label Y a.jpg b.jpg`
   works; putting `-font` after the files silently applies it to nothing and the labels vanish
   without an error.
3. Bash here is 3.2: no `declare -A`, and `export -f` does not cross into `bash -c`.

## Verification

Confirm every file referenced by the manifest exists on disk, at the stated dimensions.
Confirm no two photos share a `base` within a project. Confirm nothing under `images/`
changed — the file count from `glob` must equal its prior value.
Confirm the total AVIF byte weight and report it against the previous figure.

## Report

State: how many photos were ingested, which project each landed in, its score and slug, the
new total weight, and anything you scored 1/5–2/5 that the human should consider not publishing.
Report only what you verified — if a step failed or you skipped it, say which and why.
