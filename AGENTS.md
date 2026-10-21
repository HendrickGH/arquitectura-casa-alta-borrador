# Arquitectura Casa Alta — web assets

Two things live here: the **image asset pipeline** for the Casa Alta studio (raw WhatsApp
photo dumps in, an optimized web-ready set out), and the **Next.js site** that consumes it.

Agent runtime for this repo is **opencode** on **DeepSeek** (`deepseek/deepseek-flash`). The
harness-specific setups it came from — first the Claude Code `.claude/` agent set, then the
Hermes Agent `.hermes/` skills and hooks — were both migrated to the opencode equivalents
described below. Earlier SDD artifacts still say `.claude/` or `.hermes/` in places; those paths
no longer exist.

The site's landing page is built and green. What remains is pages, SEO and deploy config —
`openspec/changes/casa-alta-web-foundation/` carries the full architecture, the measured
decisions behind it, and the task list. Read `design.md` before changing anything in the
image path: several decisions there were reached by measurement after cheaper options
failed, and it records the evidence so they are not reverted by instinct. **Always read
`DESIGN.md` before designing, creating, or modifying any UI component or stylesheet** — it
is the canonical contract for visual direction, `0px` geometry, typography, component visual
order, and Atomic Design layering.

## Layout

```
DESIGN.md               canonical visual direction & Atomic Design contract. Read before any UI work.
src/                    the Next.js app. See "Architecture" below.
images/                 raw source photos, one folder per project. NEVER modified and NEVER consumed directly by the web app.
  brand/                logo sources
  hero/                 the landing hero source
images-optimizado/      generated AVIF output. Safe to delete and regenerate.
  manifest.json         per-photo metadata: dims, variants, srcset, score, note
public/                 served assets. public/images is a generated mirror, gitignored.
tools/                  the image pipeline plus three site tools. See "Pipeline" below.
openspec/               SDD artifacts: config, specs, and changes/ with the live change.
.opencode/skills/       project skills for this repo — loaded automatically in sessions here
opencode.json           project config. Disables built-in formatters so generated manifest.json is not reformatted.
```

Measured sizes: `images/` is 215 files / 74 MB, `images-optimizado/` is 808 files / 125 MB,
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
- **`images/` is read-only and never consumed by the web runtime.** Never write to it, never
  rename inside it, and never import or link it from the application. The Next.js site exclusively
  consumes images from `images-optimizado/` (mirrored to `public/images/`). `images/` is strictly
  the upstream uncompressed source material for the encoding pipeline (`tools/`).

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

**Visual direction & Atomic Design contract (`DESIGN.md`).** Always read `DESIGN.md` before
designing, building, or refactoring any UI component. It defines the **Cosentino Architectural
Editorial** direction: strict `0px` orthogonal geometry (zero capsules or pills; `WhatsAppFloat`
is the sole circular exception), the two-font hierarchy (`Marcellus` for editorial headings/quotes
and `Montserrat` for body/`.label` with `tabular-nums`, banning `font-mono`), the canonical
clean-ground visual order for cards and `<SectionHeading>`, and the strict downward dependency
across `src/components/{atoms,molecules,organisms,templates}`.

**The content seam.** All copy lives in `src/content/*`. `src/lib/content/index.ts` is the only
module that reads it, and components receive data as props — never imports. That is what makes a
future Payload CMS migration a change to one file instead of 31 components. When adding UI:
components take props, and only route pages (`src/app/**/page.tsx`) and `src/app/layout.tsx`
may reach for content.

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

### Netlify badge suppression (permanent rule)

`src/app/globals.css` keeps a global rule that hides Netlify's "Made with Netlify" badge:

```css
iframe#nl-badge-frame {
	display: none;
}
```

Netlify injects that iframe into the page at deploy time. It is an overlay outside the design
system and it must never appear in production. **Keep this rule.** Do not remove it as dead CSS
during a cleanup, do not scope it behind a breakpoint, and do not replace it with a deploy
setting — the iframe id is the stable contract, and the rule is the whole fix.

## Project skills

Three skills live in `.opencode/skills/` and load automatically in sessions started inside this
repo — no invocation needed. opencode scans this directory at startup, so a clone needs no extra
trust step.

- **`image-pipeline`** — ingests new photos dropped into `images/` and regenerates the optimized
  set. Use when new images appear.
- **`web-build`** — builds site markup, SEO metadata, sitemap and schema from `manifest.json`.
  Use when the site must consume the optimized image set.
- **`git-conventions`** — defines how to stage and commit work using this repo's conventional-commit
  vocabulary and guards the git-level hazards below. Every agent performing changes must follow its conventions before finishing a task.

Project skill directories are repo-owned content, tracked in git like any other file.

## Git conventions & mandatory commit policy

**Every agent that makes changes in this repository MUST commit its work before ending its turn or concluding the session.** Leaving an uncommitted working tree or dirty state is strictly forbidden. The agent that writes or modifies code is responsible for inspecting the diff, checking hazards, grouping atomic changes into coherent work units, and executing conventional commits.

The canonical rules, hazard checks, and staging guidelines are defined in the **`git-conventions`** skill (`.opencode/skills/git-conventions/SKILL.md`). Agents must read and adhere to them directly.

> [!IMPORTANT]
> **No dirty working trees**: Never finish a task without committing your changes.
> **No external hook dependency**: The previous blocking git hook (`.opencode/plugins/casa-alta.ts`) has been removed. You are directly responsible for version control hygiene — inspect your diff, stage intentionally, and commit.
> **The author commits**: The agent that implements code, edits content, or adds assets must also stage and commit those changes. Do not leave work uncommitted for another agent or human.

### Commit message rules

Conventional commits, in English, lowercase imperative, one line that says what changed:

`<type>(<scope>): <subject>`

- **Types**: `feat`, `fix`, `docs`, `refactor`, `style`, `perf`, `test`, `chore`.
- **Scopes**:
  - `web` — `src/` (the Next.js app)
  - `images` — raw photo additions under `images/` and generated output under `images-optimizado/`
  - `tooling` — `tools/` pipeline and verification scripts
  - `agents` — `.opencode/skills/`
  - `docs` — `AGENTS.md`, `DESIGN.md`, `openspec/`, and other documentation
  - *(none)* — bare `chore:` for repo housekeeping (`.gitignore`, lockfiles)
- **Tone**: Lowercase, imperative, no trailing period (e.g. `feat(web): wire responsive modal drawer`). Add a body paragraph only when the *why* is not obvious from the subject.
- **NEVER add AI attribution**: Absolutely no `Co-Authored-By`, "Generated with", or AI assistant trailers. Commits must look like standard engineering commits.

### Staging hygiene & work units

- **Stage deliberately with explicit paths**: Run `git add <path1> <path2>` or targeted directory staging. **NEVER run `git add -A` or `git add .` blindly** across the entire repository.
- **Group into coherent work units**: One commit per distinct intent. Pair source code with its directly regenerated output or test changes when they belong together. Do not lump unrelated changes across multiple scopes into a single dump.
- **Inspect before committing**: Always check `git status --short` and `git diff --stat` (plus `--cached`) to confirm only the intended files are staged.

### The 5 repository hazards to check before committing

These are specific to this repository and must be checked on every commit:

1. **`images/` is read-only for tracked files**: 211+ tracked files, ~71 MB. Raw source photos arrive; files already committed there are NEVER modified, moved, or deleted. If your diff touches an existing tracked file under `images/`, stop immediately and restore it. Adding new untracked photos under `images/` is allowed.
2. **Never rename a path that changes a numeric prefix**: Both project folders (`01-plaza-...`) and photo ordinals (`01-fachada.avif`) are published URLs indexed by search engines. Renaming a numeric prefix breaks live links and discards search ranking. Reordering is handled solely via the `order` field in `manifest.json`, never by moving filesystem paths.
3. **`images-optimizado/` is generated, and churn must be controlled**: 800+ tracked files, ~125 MB. Re-running the pipeline can rewrite hundreds of binaries. Stage only the specific assets and manifest intended for the change. Never commit mass binary churn without explicit confirmation.
4. **Binaries are permanent**: There is no Git LFS and no `.gitattributes` filter. Every committed raw photo or binary becomes permanent git history. Confirm byte weights before staging large assets.
5. **Never commit generated debris**: Check that intermediate files from pipeline runs (`plan.txt`, `manifest.txt`, `/tmp/casa-alta-work/` debris) or scratch files are not inadvertently staged.

### Operational boundaries

- **Commit locally**: Commit to the active branch (e.g., `main`).
- **Never push or mutate remote history**: Never run `git push`, `git rebase`, `git commit --amend` (on pushed commits), create arbitrary branches, or run `git reset --hard` unless the human explicitly requested that exact operation in the conversation. The agent commits; the human manages the remote.
