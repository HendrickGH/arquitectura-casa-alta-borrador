# Arquitectura Casa Alta — web assets

Two things live here: the **image asset pipeline** for the Casa Alta studio (raw WhatsApp
photo dumps in, an optimized web-ready set out), and the **Next.js site** that consumes it.

The site's landing page is built and green. What remains is pages, SEO and deploy config —
`openspec/changes/casa-alta-web-foundation/` carries the full architecture, the measured
decisions behind it, and the task list. Read `design.md` before changing anything in the
image path: several decisions there were reached by measurement after cheaper options
failed, and it records the evidence so they are not reverted by instinct.

## Layout

```
src/                    the Next.js app. See "Architecture" below.
images/                 raw source photos, one folder per project. NEVER modified.
  brand/                logo sources
  hero/                 the landing hero source
images-optimizado/      generated AVIF output. Safe to delete and regenerate.
  manifest.json         per-photo metadata: dims, variants, srcset, score, note
public/                 served assets. public/images is a generated mirror, gitignored.
tools/                  the image pipeline plus three site tools. See "Pipeline" below.
openspec/               SDD artifacts: config, specs, and changes/ with the live change.
.claude/agents/         agents that operate on this repo
.claude/hooks/          git guard + formatter. They run automatically.
```

Measured sizes: `images/` is 214 files / 74 MB, `images-optimizado/` is 808 files / 125 MB,
`src/` is 48 files. (Counts drift; re-measure rather than trusting these.)

## Image contract

Every photo in `images-optimizado/` follows this shape:

```
<NN>-<project-slug>/<NN>-<descriptive-slug>.avif      primary    (AVIF q62, long edge capped 2000)
<NN>-<project-slug>/<NN>-<descriptive-slug>-480.avif  variant    (only when it actually saves bytes)
<NN>-<project-slug>/<NN>-<descriptive-slug>-960.avif  variant
<NN>-<project-slug>/<NN>-<descriptive-slug>.jpg       fallback   (the untouched original, renamed)
```

Rules:

- **Slugs are Spanish**, lowercase, kebab-case, ASCII only (no accents, no `ñ`). They describe
  what is visible: `fachada-tres-palapas-alberca`, `detalle-trabes-madera`. Generic filler
  (`foto`, `imagen`, `vista`) is forbidden — the filename is a strong Google Images signal.
- **`<NN>` is quality rank, best first.** Photos are ordered by how good the *photograph* is
  (composition, light, craft), never by resolution or file size.
- **The `.jpg` is never re-encoded.** It is a byte copy of the original. Re-encoding an
  already-degraded JPEG makes it larger and worse — see "Measured facts".
- **`images/` is read-only.** Never write to it, never rename inside it.

## Measured facts (do not re-derive these)

These were measured on this corpus. They contradict common advice; that is the point.

| Fact | Value |
|---|---|
| Source JPEG quality | 97% of files are Q75 or lower — WhatsApp already compressed them |
| WebP q82 vs original | **100–102%** — it *grows* these files. Do not use WebP as the fallback. |
| WebP q78 vs original | ~90% — marginal |
| AVIF q62 vs original | 26% on camera originals, ~75% on WhatsApp-degraded |
| Whole-set result | 63.6 MB → 34.0 MB AVIF, 46% reduction |
| EXIF orientation | none present; no rotation risk |
| GPS EXIF | none present; WhatsApp already stripped it |

The honest conclusion: **the format change is worth ~25–30% on a typical photo, not 80%.**
The big wins come from (a) camera originals being capped, and (b) serving the right width.

## Priority order

Project folder numbering is the current quality ranking, decided by comparing each project's
best photos side by side:

```
01 plaza-esmeralda-puerto-escondido   08 rbnb-palmarito
02 el-bicho                           09 casa-santa-rosa
03 casa-blake-tlalixtac               10 obra-punta-zicatela
04 casa-melchor-ocampo                11 columnas-c1-c2
05 cafe-malagua                       12 vilas-cavan
06 capilla-el-tule                    13 puente-cd-administrativa
07 casa-tarrastro                     14 pavimentacion
```

**Do not renumber a published project or photo.** Changing the numeric prefix changes every
URL beneath it and destroys accumulated search ranking. When a new photo outranks existing
ones, record its rank in `manifest.json` as data and let the site order by that — do not
rename files that may already be indexed.

## Architecture

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict + Tailwind v4. Tailwind is
CSS-first: there is no `tailwind.config.js`, and every design token lives in the `@theme` block
of `src/app/globals.css`. The brand blue is `#0E2D78`, sampled from the logo file rather than
chosen.

**Atomic design**, strictly layered: `src/components/{atoms,molecules,organisms,templates}`.

**The content seam.** All copy lives in `src/content/*`. `src/lib/content/index.ts` is the only
module that reads it, and components receive data as props — never imports. That is what makes a
future Payload CMS migration a change to one file instead of 31 components. When adding UI:
components take props, and only `src/app/page.tsx` and `src/app/layout.tsx` may reach for
content.

**The image path.** `next/image` runs with a custom loader (`src/lib/image/loader.ts`) that
serves the AVIF files the pipeline already encoded. This is not the zero-config path, and the
reason is measured: Netlify Image CDN negotiates WebP before AVIF, and WebP q82 grows this
corpus to 100-102% of the original. Two consequences to respect — never reintroduce the default
loader, and never re-encode the JPEG fallbacks. `next.config.ts` also pins
`deviceSizes: [480, 960, 1600, 2000]`; Next's defaults start at 640, which makes the 480 tier
unreachable and doubles what a phone downloads. `tools/check-image-urls.mjs` is the gate that
catches a computed (rather than looked-up) variant path.

## Pipeline

Run in order. Each script is idempotent and writes only to `images-optimizado/`.

| Step | Command | Produces |
|---|---|---|
| 1. Contact sheets | `bash tools/build-sheets.sh` | labeled sheets in `/tmp/casa-alta-work/sheets` for visual review |
| 2. Rank + slug | an agent reviews the sheets, emits `<proj>\|<idx>\|<slug>\|<score>\|<note>` rows | ranking rows |
| 3. Plan | `perl tools/parse.pl < rows.md \| perl tools/buildplan.pl` | `plan.txt`, `manifest.txt` |
| 4. Encode | `bash tools/convert.sh plan.txt <out>` | full-size AVIF + renamed JPEG fallback |
| 5. Variants | `bash tools/variants.sh` | `-480` / `-960` AVIF |
| 6. Manifest | `perl tools/manifest.pl` | `manifest.json` |

`tools/priority.txt` sets project order. `tools/exclusions.txt` lists images that must never
enter the photo set (CGI renders, plan boards) — currently 2 entries.

### Site tooling (separate from the photo pipeline)

| Tool | Run | Does |
|---|---|---|
| `sync-images.mjs` | `pnpm images:sync` — also wired to `predev`/`prebuild` | mirrors the AVIF set into `public/images` and regenerates the loader's variant table |
| `hero.sh` | `bash tools/hero.sh` | encodes the landing hero to the same contract as the project photos |
| `check-image-urls.mjs` | `pnpm check:images` | fails if any image URL the built site emits has no file behind it |

`public/images` is gitignored, so **the Netlify build must go through `pnpm build`** for the
`prebuild` step to materialise it. A build command that bypasses it deploys a site whose images
all 404, silently.

Package manager is **pnpm** — `node_modules/` links into `.pnpm/`. `package-lock.json` is
gitignored so it cannot come back by accident; do not run `npm install`.

### ImageMagick gotchas (these cost a full re-run to discover)

1. **`-font Helvetica` by name does not work on this machine.** `magick -list font` is empty;
   there is no fontconfig lookup. Pass an explicit path:
   `/System/Library/Fonts/Supplemental/Arial.ttf`.
2. **Settings must precede the images they apply to.** `magick montage -font X -label Y a.jpg b.jpg`
   works; putting `-font` after the files silently applies it to nothing, and labels vanish
   without an error. Verify a generated sheet visually before trusting it.
3. **Bash is 3.2.** No `declare -A`, and `export -f` does not cross into `bash -c`.

## Site-side rules

The optimization above is only half the work. The larger win is markup.

**Status:** the `srcset`/`sizes` and explicit `width`/`height` rules are implemented through the
`Photo` atom. The remaining bullets — sitemap, JSON-LD, `robots.txt`, `opengraph-image`, clean
public URLs — are still ahead; see `openspec/changes/casa-alta-web-foundation/tasks.md`.

- **`srcset` + `sizes` on every photo.** Serve from `manifest.json` — it carries a ready-made
  `srcset` string per photo. Measured: a 20-photo gallery drops from 3.4 MB to ~460 KB on mobile.
- **Never `loading="lazy"` on the hero.** It needs `fetchpriority="high"` and `decoding="async"`.
  Everything below the fold gets `loading="lazy"`.
- **Always set `width` and `height`** (or `aspect-ratio`) on `<img>` to avoid CLS.
- **Keep the numeric prefix out of public URLs.** Map `01-casa-blake-tlalixtac` to a clean slug
  such as `casa-blake-tlalixtac`; order the projects from `manifest.json`.
- **`alt` text is not the filename.** Write a real description per photo; Google Images uses both.
- **Ship an image sitemap** (`image:image`) and `ImageObject` JSON-LD. Architecture firms get
  real traffic from Google Images.
- **Never publish the 1/5 and 2/5 photos.** 62 of 206 are below portfolio grade and sit at the
  end of each folder. A portfolio is judged by its worst photo.

## Agents

- **`image-pipeline`** — ingests new photos dropped into `images/` and regenerates the optimized
  set. Use when new images appear.
- **`web-build`** — builds site markup, SEO metadata, sitemap and schema from `manifest.json`.
  Use once the app exists.
- **`git-conventions`** — stages and commits work using this repo's conventional-commit
  vocabulary, and guards the git-level hazards below. Use before committing, or when the working
  tree has accumulated changes worth splitting. It has no `Write`/`Edit` tool on purpose: it
  cannot modify what it commits, so it cannot hide its own mistakes.

All are defined in `.claude/agents/`.

## Git conventions

Conventional commits, in English, lowercase imperative, one line that says what changed. The
scopes in use: `images` (both raw dumps and `images-optimizado/`), `tooling`, `agents`, `hooks`,
`docs`, and bare `chore:` for repo housekeeping.

**Never add `Co-Authored-By`, a "Generated with" footer, or any AI attribution.** This is a
standing rule for this repository.

Three hazards are specific to this repo and invisible to a generic git workflow:

1. **`images/` is read-only, including in git.** New raw photos may be added; files already
   committed there are never modified, moved or deleted.
2. **Never rename a path that changes a numeric prefix.** Both the project folder (`01-`) and the
   photo ordinal are published URLs. A `git mv` that renumbers breaks the link and discards
   search ranking. Reordering is the `order` field in `manifest.json` — never a filesystem path.
3. **Binaries are permanent.** 211 files / ~71 MB under `images/`, 803 files / ~121 MB under
   `images-optimizado/`. There is no `.gitattributes` and no Git LFS, so every raw dump becomes
   history that cannot be un-added without rewriting published history. Stage deliberately;
   never `git add -A` after a pipeline run.

## Hooks

`.claude/settings.json` wires two scripts in `.claude/hooks/`. They run automatically — they are
not advisory.

| Hook | Event | What it does |
|---|---|---|
| `git-guard.sh` | `PreToolUse` on `Bash(git *)` | **Denies** a commit carrying AI attribution, a staged rename that changes a numeric prefix, or a modification to a file already tracked under `images/`. **Warns** (without blocking) above 50 staged files in `images-optimizado/`, or ≥20 MB of new content. |
| `format.sh` | `PostToolUse` on `Write\|Edit` | Runs Prettier on `.tsx .ts .jsx .js .mjs .cjs .css .scss` only. |

`format.sh` deliberately skips `.json` and `.md`: `manifest.json` is generated by
`tools/manifest.pl` and reformatting it would create churn against the pipeline that owns it. It
prefers `node_modules/.bin/prettier` when the app exists, then any Prettier on `PATH`, then an
nvm-managed one, and no-ops if none is found — the site app does not exist yet, and an
unavailable formatter must not turn every edit into an error.

**Hook scripts run in a non-interactive shell.** They do not inherit your shell aliases, functions,
or an nvm-activated `PATH`. `rg`, `bat`, `fd` and `eza` are NOT available inside a hook even
though they work in your terminal. Stick to `/usr/bin` tooling (`grep`, `awk`, `sed`, `jq`).
