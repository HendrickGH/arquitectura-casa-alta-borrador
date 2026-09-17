# Exploration — `casa-alta-web-foundation`

**Change:** `casa-alta-web-foundation`
**Phase:** sdd-explore
**Date:** 2026-09-16
**Artifact store:** openspec
**Repository:** `/Users/hendrick/Documents/arquitectura-casa-alta-web`
**Method:** every claim below was read off disk. Where the incoming briefing and the disk disagree, the disk wins and the disagreement is recorded in §9.

---

## 0. Why this change exists

This change documents work that is **already built and working** alongside the work that remains. The repository crossed a boundary: `AGENTS.md` still opens with *"There is no application code yet"*, and that is no longer true. A Next.js 16 landing page exists, builds green, and is served through a hand-tuned image pipeline.

A session is closing. The purpose of this artifact is that the next reader — who was not here, and who cannot rely on this conversation — loses nothing. Everything expensive to rediscover is recorded here, including the measurements that were paid for with failed attempts.

**Status of the codebase: the foundation is built and green. The site has exactly one route.**

---

## 1. What exists

### 1.1 Source inventory — `src/` (48 files, verified by count)

| Path | Files | Contents |
|---|---|---|
| `src/app/` | 3 | `globals.css`, `layout.tsx`, `page.tsx` |
| `src/components/` | 31 | `atoms/` 9, `molecules/` 9, `organisms/` 12, `templates/` 1 |
| `src/content/` | 7 | `site.ts`, `home.ts`, `services.ts`, `process.ts`, `differentiators.ts`, `testimonials.ts`, `projects.ts` |
| `src/lib/` | 5 | `content/index.ts`, `content/photos.ts`, `cx.ts`, `image/loader.ts`, `image/variants.generated.json` |
| `src/types/` | 2 | `content.ts`, `manifest.ts` |

Counts confirmed by enumeration: 3 + 31 + 7 + 5 + 2 = 48.

### 1.2 Atomic design layering

The four layers are real, not decorative. Each has a stated job, and the dependency direction is strictly downward.

**`atoms/`** — the only files that know about HTML, styling primitives, or third-party components.
- `Container` — horizontal rhythm; gutters grow with viewport, measure is capped.
- `Section` — the alternating-tint wrapper (`tone: "canvas" | "bone"`); carries the in-page anchor `id`. Comment: *"The page base is always canvas; bone never leads."*
- `Heading` — three voices: `display` (Montserrat uppercase, tight leading), `serif` (Marcellus, for project titles), `plain` (sentence-case sans).
- `Text` — typographic roles, e.g. opening paragraph (larger, quieter colour, capped measure).
- `Button` — *"The only place a filled brand-blue surface appears"* so `primary` always reads as the next action; `secondary` is chrome.
- `Icon` — inline SVG, 7 glyphs, no icon dependency; `currentColor` so the footer's hover state works.
- `Rule` — a hairline; structural, not decorative.
- `Photo` — **the only component that renders an image**; wraps `next/image`.
- `Logo` — the raster lockup in `public/brand/`.

**`molecules/`** — one repeatable unit, composed of atoms, no layout authority.
- `NavItem`, `ContactItem` (href scheme distinguishes `tel:` from `mailto:`), `SocialLinkItem` (returns `null` on empty href), `StatItem`, `ProcessEntry`, `Counter`, `ServiceRow`, `SectionHeading` (empty strings remove their element rather than rendering a hollow tag), `ProjectCard`.

**`organisms/`** — a complete page section, owns its own composition.
- `UtilityBar`, `Header`, `Hero`, `StatsBand`, `IntroSection`, `ServicesIndex`, `ProjectsGrid`, `ProcessList`, `Differentiators`, `Testimonials` (returns `null` when there are none), `ClosingCTA`, `Footer`.

**`templates/`** — `LandingTemplate`. *"Nothing here decides anything: it places the sections and alternates their tone."* Documented tone order: claim strip (brand) → header (canvas) → hero (photo) → stats (bone) → intro (canvas) → services (bone) → projects (canvas) → process (bone) → differentiators (canvas) → testimonials (bone, absent today) → closing (bone) → footer (canvas).

**Pages** — `src/app/page.tsx` is the only route. It calls the content accessors and passes everything down as props.

### 1.3 Reachable assertion

`npx next build` output (run during this exploration):

```
Route (app)
┌ ○ /
└ ○ /_not-found
```

There is exactly one content route. `/_not-found` is generated. This is the machine-checkable proof for §7.

### 1.4 Tooling inventory — `tools/` (13 files)

| File | Purpose | Location-independent? |
|---|---|---|
| `build-sheets.sh` | contact sheets for visual review | **no** — hardcoded `/Users/hendrick/...` |
| `champions.sh` | cross-project comparison sheet of each project's hero pick, so priority order is decided by eye rather than by three differently-calibrated reviewer scores | **no** — hardcoded |
| `parse.pl` | ranking rows → plan | **no** — hardcoded |
| `buildplan.pl` | plan assembly | yes |
| `convert.sh` | ranked plan → `images-optimizado/`; full-size AVIF q62 capped 2000px + byte-copied JPEG fallback. `rm -rf "$OUT"` — destructive by design | **no** — hardcoded |
| `variants.sh` | `-480` / `-960` variants, encoded from the **original source** (never from the converted AVIF, so no second generation of loss); `MIN_GAIN=1.1` skip rule | **no** — hardcoded |
| `manifest.pl` | variant TSV → `manifest.json` | **no** — hardcoded |
| `hero.sh` | encodes the landing hero into the same contract, for one already-chosen file; emits its own sidecar | yes — `cd "$(dirname "$0")/.."` |
| `sync-images.mjs` | mirrors AVIF into `public/images` and writes the loader's variant table | yes |
| `check-image-urls.mjs` | post-build gate: every emitted image URL must resolve | yes |
| `priority.txt` | 14 lines, `normalizedName\|slug`, sets project order | data |
| `exclusions.txt` | 2 entries: a CGI render carrying the CASA ALTA logo, and a plan-board/render sheet | data |
| `last-plan.txt` | **checked into git** — 206 rows, the ranking provenance (`order\|projSlug\|idx\|slug\|originalPath`) | data |

`priority.txt` order matches the `01`–`14` prefix order recorded in `AGENTS.md`, and matches `manifest.json`'s per-project `order` exactly (verified project by project).

### 1.5 `package.json` scripts

```json
"predev":       "node tools/sync-images.mjs",
"dev":          "next dev",
"prebuild":     "node tools/sync-images.mjs",
"build":        "next build",
"start":        "next start",
"lint":         "eslint",
"typecheck":    "tsc --noEmit",
"check:images": "node tools/check-image-urls.mjs",
"images:sync":  "node tools/sync-images.mjs"
```

`predev`/`prebuild` mean the mirror and the variant table are regenerated automatically; they can never drift from `images-optimizado/` by forgetting a step.

### 1.6 Gate state — measured during this exploration

| Gate | Command | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | **exit 0** |
| Lint | `npm run lint` (ESLint 9, `next/core-web-vitals` + `next/typescript`) | **clean, no output** |
| Build | `npx next build` (Next 16.3.5, Turbopack) | **succeeds**, 3 static pages, `/` and `/_not-found` |
| Image URLs | `npm run check:images` | **"every referenced image resolves"** — 21 distinct URLs across 5 built HTML files, 2.2 MB |
| Idempotency | `sha256 src/lib/image/variants.generated.json` before and after build | **byte-identical** — the generator is deterministic |
| Tests | — | **no runner exists** (§6.3) |

---

## 2. The content seam

### 2.1 How it works

`src/lib/content/index.ts` is the **sole reader** of content for the whole application. It exports:

`getSiteConfig()`, `getServiceGroups()`, `getProcessSteps()`, `getDifferentiators()`, `getTestimonials()`, `getProjects()`, `getProject(slug)`, `getFeaturedProjects()`, `getHomePage()`.

Its own header states the contract:

> Pages call these functions. Components never call them -- they receive the results as props. That means introducing Payload CMS later is a change to this file alone: every function below becomes an async read from Payload, the return types stay identical, and no component or page needs to be touched.

Two supporting rules make the seam hold:
1. **Components import from `@/types/content`, never from `@/content/*`.** Verified: no component file imports `@/content/`.
2. **`src/types/content.ts` is the interface.** Its header names the convention: *"`*Content` is what an editor authors in `src/content`; the plain name is what a component receives."*

### 2.2 The second, quieter half of the seam

`src/lib/content/photos.ts` is the only place that knows how a photo's on-disk identity maps to a web path (`photoSrc`). It imports `@images/manifest.json` — a `tsconfig.json` path alias onto `./images-optimizado/*`, so the pipeline's own output is the source of truth with no copy step.

It also enforces two policy decisions that would otherwise leak into components:
- `getProjectPhotos()` filters `photo.score >= 3`, implementing `AGENTS.md`'s *"never publish the 1/5 and 2/5 photos."*
- `getProjectCover(dir, title, orientation)` prefers a landscape source for full-width slots, because four of the six featured covers are portrait and a 1200x1600 photo stretched across a 1310px card is being upscaled by the browser. Falls back to rank-1 so it never returns `null` for a project that has photos.

`buildProject()` in `index.ts` requires **both halves** — editorial data *and* a manifest entry *and* a cover — and returns `null` otherwise, so a half-configured project renders nothing rather than an empty card.

### 2.3 What a Payload migration would touch

| Surface | Change |
|---|---|
| `src/lib/content/index.ts` | the **only** file that must change; 9 accessors become async reads |
| `src/app/page.tsx` | becomes `async` and `await`s the accessors. The file's comment already anticipates this |
| `src/app/layout.tsx` | calls `getSiteConfig()` at module scope for `metadata`; becomes `generateMetadata()` |
| `src/content/*.ts` (7 files) | become seed data or are deleted |
| `src/lib/content/photos.ts` | **stays** — it reads the image manifest, not editorial content. Images remain pipeline-owned under Payload |
| `src/types/content.ts` | **stays** — the return types are the contract and must remain identical |
| All 31 components | **untouched** |

---

## 3. The image architecture

This is the hardest-won part of the repository. Nothing here was guessed; each decision carries a measurement or a documented failure.

### 3.1 What the pipeline owns vs what the site owns

`images-optimizado/manifest.json` carries, per project, **only** `dir`, `order`, `slug`, `photos`. Per photo: `order`, `slug`, `score`, `note`, `source`, `base`, `full`, `fallback`, `variants`, `srcset`.

**There is no project title, location, year, client or story in the manifest or anywhere in the pipeline output.** The pipeline drops display names during normalisation. Every narrative field in the site is hand-authored in `src/content/projects.ts` — see §6.4.

Top-level manifest fields: `generated` (`2026-09-15`), `base`, `note`, `tiers` (`[480, 960]`), `avif_quality` (62), `stats` (`{projects: 14, photos: 206}`), `projects`.

### 3.2 The four-file contract per photo

```
<NN>-<project-slug>/<NN>-<descriptive-slug>.avif       primary   AVIF q62, long edge capped 2000
<NN>-<project-slug>/<NN>-<descriptive-slug>-480.avif   variant   only when it actually saves bytes
<NN>-<project-slug>/<NN>-<descriptive-slug>-960.avif   variant
<NN>-<project-slug>/<NN>-<descriptive-slug>.jpg        fallback  byte copy of the original
```

The `.jpg` is **never re-encoded** — `convert.sh` uses `cp`, not `magick`. Rationale is in the script itself: re-encoding already-WhatsApp-degraded JPEGs to WebP q82 yields 100–102% of the original size.

### 3.3 `tiers` is the LONG EDGE; the srcset `w` is the ACTUAL width

**This is the single most important fact in the image architecture, and the one most likely to be got wrong.**

`tiers: [480, 960]` names the **long edge** of each variant. The `srcset` `w` descriptor names the **actual pixel width**. On a portrait photo they diverge:

> A 1200×1600 portrait reports `360w / 720w / 1200w` while its files are still named `-480.avif` / `-960.avif`.

`variants.sh` encodes with `magick "$src" -resize "${w}x${w}>"`, which fits within a `w×w` box — so the *short* edge lands on the requested number and the long edge follows the aspect ratio. The filename suffix is therefore a label for the tier, not a measurement of the file.

**The width cannot be derived from the filename.** Measured, from `src/lib/image/variants.generated.json`:

```
10-obra-punta-zicatela/01-ventana-circular-sombra-follaje
  -> [[360,"...-480.avif"], [720,"...-960.avif"], [960,"...ventana-circular-sombra-follaje.avif"]]
```

A photo whose `-960.avif` is 720px wide and whose `-480.avif` is 360px wide. `src/types/manifest.ts` states the rule for anyone writing a consumer: *"Never assume `variants[i].width === tiers[i]`."*

### 3.4 Variant availability is irregular

Measured across all 206 photos (`jq` over `manifest.json`):

**Distinct full-srcset width signatures — 25, not a clean set.** The two dominant ones are:

| Photos | Signature |
|---|---|
| 47 | `[480, 960, 1600]` |
| 47 | `[360, 720, 1200]` |
| 31 | `[480, 960, 1280]` |
| 16 | `[360, 720, 960]` |
| 12 | `[480, 960]` |
| 10 | `[360, 720, 1500]` |
| …then 19 further one-to-five-photo signatures, including `[224, 448, 720]`, `[361, 722, 1204]`, `[320, 641, 854]`, `[480, 720]` | |

**22 of 206 photos have exactly one variant.** Broken down by what that variant actually is: 15 report `[480]`, 6 report `[360]`, 1 reports `[335]`. So the count 22 is right, but only 15 of those 22 are literally a `-480` file at 480px wide.

**Exactly 2 project covers have no `-960` at all**, and they are named as hard traps in `tools/check-image-urls.mjs`:

| Cover | Variants present | Full size |
|---|---|---|
| `07-casa-tarrastro/01-fachada-piedra-pergola-jardin` | `[480]` | 960×720 |
| `09-casa-santa-rosa/01-pergola-madera-terraza-piso` | `[360]` | 720×960 |

**The mechanism is the `MIN_GAIN` skip rule** (`variants.sh:51`): `if s > w * 1.1`. Both covers have a source whose long edge is already ≤ 960, so `960 > 960 × 1.1` is false and the tier is skipped. The rule exists to avoid upscaling and near-identical duplicates — it is correct, and its consequence is that the tier set is genuinely per-photo.

### 3.5 Why a custom loader instead of Netlify Image CDN

`next.config.ts` sets `loader: "custom"` / `loaderFile: "./src/lib/image/loader.ts"`.

The reason is recorded in both files: **Netlify Image CDN's content negotiation prefers WebP over AVIF, and WebP measurably grows this corpus** (q82 lands at 100–102% of the original). Routing through the default would undo the pipeline's main win.

The loader (`src/lib/image/loader.ts`) is deliberately small:

1. Strip the `/images/` prefix; split into `dir` + `base` (dropping `.avif`).
2. Look up `"<dir>/<base>"` in `variants.generated.json`.
3. **Unknown src → return it untouched** rather than inventing a path.
4. Otherwise pick the **narrowest variant that still covers the requested width**, and the **widest** if none does. Never invents a width.

Point 4 is what makes the two `-960`-less covers safe: a request for 960 on `09-casa-santa-rosa`'s cover falls back to its widest available file instead of 404ing.

### 3.6 `variants.generated.json` — the table the loader reads

Written by `tools/sync-images.mjs` on every `predev` and `prebuild`. **207 keys** = 206 project photos + 1 hero. Shape: `"<projectDir>/<base>" → [width, filename][]`, ascending by width.

Its generator states the design constraint plainly:

> The manifest's srcset is the authority, not the `tiers` array. … The width cannot be derived from the filename, so both are kept here. 22 photos have only a -480 variant and two project covers have no -960 at all; a loader that recomputed tiers instead of reading this table would 404 on them.

The hero is merged in from its own sidecar (`images-optimizado/hero/hero.json`), *"rather than special-cased at the loader"*. If no hero has been encoded, the merge is skipped and the landing simply has nothing to show.

Measured hero entry: `hero/vista-aerea-palapas-alberca-playa → [[480, "...-480.avif"], [960, "...-960.avif"], [1600, "...playa.avif"]]`.

### 3.7 `sync-images.mjs` mirrors AVIF into `public/`

Only `public/` is served, and `images-optimizado/` lives at the repository root because the pipeline owns it. The script copies **only the `.avif` set (~34 MB)**, not the whole 121 MB tree — the JPEG fallbacks are untouched originals the loader never asks for.

Idempotent by size + mtime. Measured: `public/images` holds **599 files**, and a full `comm` diff against `images-optimizado/*.avif` showed **0 stale and 0 missing** — the mirror is exactly the AVIF set.

`/public/images` is in `.gitignore`, with the reason recorded there: the optimized set is committed exactly once, at the root.

### 3.8 The hero is outside the index-based pipeline, on purpose

`tools/hero.sh` reproduces the contract for one already-chosen file: the normal flow is contact sheet → human ranking → plan file, and a single hero has nothing to rank. It reuses the exact flags from `convert.sh` (full size, q62, cap 2000) and from `variants.sh` (the same `1.1` gain rule), and writes `hero.json` in the same `[width, filename]` shape.

One deliberate difference: the hero source is a **PNG**, so the fallback is kept as `.png` rather than renamed to `.jpg` — *"renaming it would misdescribe the bytes."*

Measured: source `1600×900` PNG at 2,990,005 B → full AVIF `1600×900` at 298,228 B (~10%), plus `-480` (37,622 B) and `-960` (129,971 B).

### 3.9 `check:images` — the gate that exists because of a specific failure mode

`tools/check-image-urls.mjs` runs after `next build`, walks the emitted HTML, extracts every `/images/…` reference (src, srcset and CSS `url()` alike), and asserts each resolves to a file under `public/`.

Its header names the failure it was built to catch: *"Any code that derives a variant path from the requested width instead of reading availability will 404, and it will do so silently -- the page still renders, just with broken images."* It additionally asserts the two known traps are never requested, and exits non-zero if either is.

Measured run: **21 distinct image URLs across 5 built HTML files, 2.2 MB total — every referenced image resolves.**

### 3.10 Residual limitation — measured direction, verified against the build

**`next/image` labels each srcset entry with the width it REQUESTED, not the width the loader returned.** `next.config.ts` documents this as known and bounded, preferring it over alternatives because *"the loader falls back to the widest variant rather than inventing one"* — so it over-delivers, never under-delivers into blur.

Because the loader rounds **up** to the next available variant *and* falls back to the **widest** when nothing covers the request, the label can be wrong in **both** directions. Both were observed in the built HTML of this very repository (`.next/server/app/index.html`):

**Understated** — request 480, loader returned the 720px file, label says 480:
```
/images/10-obra-punta-zicatela/01-ventana-circular-sombra-follaje-960.avif 480w   (file is 720px wide)
```

**Overstated** — request 2000, no variant that wide, loader fell back to the 1600px file, label says 2000:
```
/images/hero/vista-aerea-palapas-alberca-playa.avif 2000w                          (file is 1600px wide)
```

**Consequence:** byte over-delivery on irregular aspect ratios. Never blur. The measured cost is bounded: of the candidate sets scored across the corpus, this one has the lowest mean delivered/requested ratio, **0.927**.

**The real fix is a pipeline change, not a site change** — normalise variant widths in `variants.sh` instead of tiering by long edge. `openspec/config.yaml` records this as a design constraint: *"Tiering variants by LONG edge is a known, bounded pipeline limitation, not a site bug; the fix belongs in the pipeline, not in `next.config.ts` or the loader."*

### 3.11 `deviceSizes` and why the custom scale exists

`next.config.ts` overrides Next's default `deviceSizes` with `[480, 960, 1600, 2000]`, plus `imageSizes: [240, 384]` (which exist only to keep the scale valid and ordered below `deviceSizes` — every `Photo` in this codebase passes an explicit `sizes`).

The override is required: **Next's defaults start at 640, which makes the 480 tier unreachable.** A 375px phone would ask for 640 and the loader would round **up** to the 960 file, doubling what it downloads. The comment records that this was measured, not reasoned: *"with the defaults, `/images/02-el-bicho/01-…` at 640w resolved to the -960 AVIF."*

The config comment also records the corpus shape that motivated the scale: *"47 photos are [480, 960, 1600], another 47 are [360, 720, 1200], and there are 8 other signatures"* — the 47/47 numbers reproduce exactly; the "8 other signatures" does not. See §9.

Explicit `sizes` is passed in only three places, all verified: `Hero` (`100vw`), and `ProjectsGrid` (`100vw` for a full-width slot, `(min-width: 768px) 50vw, 100vw` for the two-column grid). `Photo`'s prop comment states the stakes: *"A wrong `sizes` means a wrong file."*

### 3.12 Request path, end to end

```
photoSrc()  src/lib/content/photos.ts        /images/10-obra-punta-zicatela/01-….avif   (full-size path)
   ↓  prop
<Photo src sizes priority>                   src/components/atoms/Photo.tsx
   ↓
next/image with loader: "custom"
   ↓
casaAltaLoader(src, width)                   src/lib/image/loader.ts
   ↓  lookup "10-obra-punta-zicatela/01-…"
variants.generated.json                      [[360,-480.avif], [720,-960.avif], [960,.avif]]
   ↓  narrowest variant ≥ requested width, else widest
/images/…/01-…-960.avif                      a static file, already encoded, already capped
   ↑
public/images/…                              mirrored by tools/sync-images.mjs on predev/prebuild
```

No re-encoding happens at request time. No image CDN is involved. The bytes served are the bytes the pipeline wrote.

---

## 4. Measured facts that must not be re-litigated

Each row names its provenance. Do not re-derive, and do not silently reverse.

### 4.1 Format and pipeline (`AGENTS.md`, "Measured facts" — measured on this corpus)

| Fact | Value |
|---|---|
| Source JPEG quality | 97% of files are Q75 or lower — WhatsApp already compressed them |
| WebP q82 vs original | **100–102%** — it *grows* these files. Do not use WebP as the fallback |
| WebP q78 vs original | ~90% — marginal |
| AVIF q62 vs original | 26% on camera originals, ~75% on WhatsApp-degraded |
| Whole-set result | 63.6 MB → 34.0 MB AVIF, 46% reduction |
| EXIF orientation | none present; no rotation risk |
| GPS EXIF | none present; WhatsApp already stripped it |

Stated conclusion, to be preserved rather than optimisticised: **the format change is worth ~25–30% on a typical photo, not 80%.** The big wins are (a) capping camera originals and (b) serving the right width.

### 4.2 Hero typography (`src/components/organisms/Hero.tsx` — two built-and-measured attempts)

| Fact | Value |
|---|---|
| Hero text-region mean luminance | **0.74–0.77** |
| White type over the image | **1.31:1 contrast** — needs a **60–77% dark scrim** across the whole block to reach even the 3:1 large-text floor. That is a dark hero, which the brief rules out |
| Dark type over the image | mean luminance said 13.8:1, but the rendered result was **less legible than the white version it replaced**. *"Variance, not average, is what breaks type"* |
| Headline block share of hero height | ~55% — no partial scrim can cover it without obscuring the photograph anyway |
| Headline width | "y construcción" sets **9.325em** wide in the shipped Montserrat 600; a word cannot wrap, so size is fluid (`clamp(1.5rem, 7vw, 4rem)`) rather than stepped |

**Resulting decision:** the image stays intact and unmodified at full bleed; the type sits on clean ground below it, where contrast is not a negotiation. Reversing this re-opens two failed attempts.

### 4.3 Image sizing (`next.config.ts`)

| Fact | Value |
|---|---|
| Next's default `deviceSizes` start | **640** — makes the 480 tier unreachable and doubles what a phone downloads |
| Chosen `deviceSizes` | `[480, 960, 1600, 2000]` |
| Winner's mean delivered/requested ratio | **0.927** — the lowest of the candidate sets measured across the corpus |
| Independent support (`AGENTS.md`) | a 20-photo gallery drops from 3.4 MB to ~460 KB on mobile with correct `srcset` + `sizes` |

---

## 5. Repository constraints (`AGENTS.md` — binding)

These are not style preferences. Each has a mechanism behind it.

1. **`images/` is read-only, including in git.** Never write to it, never rename inside it, never modify a file already tracked there. Enforced by `.opencode/plugins/casa-alta.ts`.
2. **Never rename a path that changes a numeric prefix.** Both the project folder (`01-`) and the photo ordinal are published URLs. A `git mv` that renumbers breaks the link and discards accumulated search ranking. Also enforced by the git guard.
3. **Reordering is the `order` field in `manifest.json`** (and `tools/priority.txt`) — never a filesystem rename. When a new photo outranks existing ones, record its rank as data and let the site order by it.
4. **Never `git add -A` after a pipeline run.** Stage deliberately. The git guard *warns* (does not block) above 50 staged files in `images-optimizado/` or ≥20 MB of new content.
5. **Binaries are permanent in history.** There is no `.gitattributes` and no Git LFS, so every raw dump becomes history that cannot be un-added without rewriting published history.
6. **Never add `Co-Authored-By`, a "Generated with" footer, or any AI attribution.** Standing rule for this repository. Enforced by the git guard.
7. **The `.jpg` is never re-encoded**; `images-optimizado/` is generated output — regenerate through `tools/`, never hand-edit.
8. **Never publish the 1/5 and 2/5 photos.** 62 of 206 sit at the end of each folder. *"A portfolio is judged by its worst photo."* Implemented in `getProjectPhotos()`.

### 5.1 Current binary weight — measured, and drifted from `AGENTS.md`

| Tree | `AGENTS.md` says | Measured 2026-09-16 |
|---|---|---|
| `images/` | 211 files / ~71 MB | **215 files / 74 MB** |
| `images-optimizado/` | 803 files / ~121 MB | **808 files / 125 MB** |

Drift is accounted for: `images/brand/` (2 files), `images/hero/` (1 file) are new subfolders, and the project folders hold 212 files against the recorded 211.

`images-optimizado/` decomposes as: 599 `.avif` (596 project + 3 hero), 206 `.jpg` fallbacks, 1 hero `.png`, `hero.json`, `manifest.json`.

### 5.2 Plugin — it runs, it is not advisory

| Concern | Hook | Behaviour |
|---|---|---|
| Git guard, `.opencode/plugins/casa-alta.ts` | `tool.execute.before` on `bash` | **Denies** a commit carrying AI attribution, a staged rename that changes a numeric prefix, or a modification to a file already tracked under `images/`. **Warns** above 50 staged files in `images-optimizado/`, or ≥20 MB of new content |
| Formatter, same plugin | `tool.execute.after` on `edit`/`write` | Runs Prettier on `.tsx .ts .jsx .js .mjs .cjs .css .scss` **only** — deliberately skips `.json` (would churn `manifest.json` against its owning pipeline) and `.md`. No-ops if no Prettier is found |

Both live in one project plugin, so it loads only in this repository — the global self-scope gate
the Hermes shell hooks needed is gone, and there is no shell-environment limitation to work
around.

### 5.3 Project skills (`.opencode/skills/`)

- **`image-pipeline`** — ingests new photos into `images/` and regenerates the optimized set.
- **`web-build`** — builds gallery markup, SEO metadata, image sitemap and JSON-LD from `manifest.json`.
- **`git-conventions`** — stages and commits using the repo's conventional-commit vocabulary; guards the git hazards. **Must not use `write` or `edit`**, so it cannot modify what it commits. opencode cannot restrict a skill's toolset the way a dedicated read-only agent could, so this is a rule the skill carries rather than a harness guarantee.

---

## 6. Open items and known inconsistencies

Each was found on disk, not assumed.

### 6.1 Two lockfiles, both untracked, both un-ignored — **verified**

| File | Present | Size | Tracked? | Ignored? |
|---|---|---|---|---|
| `package-lock.json` | yes | 236,730 B | **no** | **no** |
| `pnpm-lock.yaml` | yes | 137,690 B | **no** | **no** |

`git check-ignore -v` on both returns exit 1 with no output: **neither is ignored.** `git ls-files --error-unmatch` on both errors: **neither is tracked.** `git status` lists both as `??`.

So a single `git add -A` commits two lockfiles for two different package managers.

**Which one is live?** The tree is pnpm-flavoured: `node_modules/.pnpm/` exists, `node_modules/.modules.yaml` exists (pnpm's marker), and `pnpm-workspace.yaml` exists containing `allowBuilds: unrs-resolver: true` — a pnpm-only feature. npm has also run here: `node_modules/.package-lock.json` (191,161 B) is npm's marker, and `node_modules/.bin/next` is a 1,507-byte `#!/bin/sh` shim rather than a symlink.

**Both lockfiles pin `next 16.3.5`**, and `package-lock.json`'s root deps match `package.json` exactly. `openspec/config.yaml` calls `package-lock.json` "stale npm residue" — the version pin does not confirm staleness by that measure; the risk here is **duplication, not staleness**. Timestamps: `package-lock.json` 00:48, `package.json` 00:52, `pnpm-lock.yaml` 01:23.

**Unresolved.** This needs a decision (commit one and ignore the other, or accept both), not a silent fix.

### 6.2 No `netlify.toml` — **verified**

Netlify is the deploy target (per `AGENTS.md`, `openspec/config.yaml`, and the whole rationale for the custom loader avoiding Netlify Image CDN), but no `netlify.toml` exists anywhere in the repository and `.gitignore` only ignores `/.netlify/` (the local build cache). Build command, publish directory, Node version and the `@netlify/plugin-nextjs` requirement are all undeclared.

### 6.3 No test runner — **verified**

No `vitest`, `jest`, `playwright`, `cypress`, `@testing-library`, `node:test` or `mocha` reference exists in `package.json` or `eslint.config.mjs`. No `test` script. `openspec/config.yaml` records `strict_tdd: false` and a fail-closed reason, plus the standing instruction: *"Downstream phases MUST NOT assume a RED-GREEN-REFACTOR cycle is available and MUST NOT invent a test runner as a side effect of another change."*

The gates that do exist are typecheck, lint, `next build`, and the bespoke `check:images`.

### 6.4 Project editorial data is largely unconfirmed — **verified, and sharper than the briefing**

All 14 projects are keyed in `src/content/projects.ts` by the manifest's `dir` (the only stable identifier).

| State | Projects | What is present |
|---|---|---|
| Complete narrative | **1** — `02-el-bicho` | `location`, `summary`, `story`, `outcome` — **but `year: ""`** |
| Location only | **1** — `10-obra-punta-zicatela` | `location`; `year`/`summary`/`story`/`outcome` empty |
| Provisional, all narrative empty | **12** | title derived from the client's own source folder name, category inferred from photo notes, everything else empty |

**No project has a `year`.** Zero of fourteen. `El Bicho` is the only one with narrative copy, and even it is incompletely confirmed.

The file's own header records the policy: *"Empty is deliberate: an empty field is a to-do, a guessed one is a lie that ships to production."* Confirming a project means filling `location`, `year`, `summary` and `story`.

Featured order (`featuredProjectDirs`, 6 entries) leads with `02-el-bicho` *"because it is the only project with a confirmed story and a hero-grade cover"*; the rest follow the pipeline's quality ranking.

### 6.5 Facebook and TikTok have empty hrefs — **verified**

In `src/content/site.ts`, `social` has three entries: Instagram with a real URL, and `Facebook` / `TikTok` with `href: ""`. The handles were never supplied. The comment records the intent: the entries stay so the layout is already correct, and `SocialLinkItem` returns `null` on an empty href *"rather than rendering a dead link."* The footer skips blank ones.

**Impact:** `UtilityBar` and `Footer` currently render one social link. Adding the two URLs is a one-file, no-component change.

### 6.6 Testimonials is empty on purpose — **verified, and must stay that way**

`src/content/testimonials.ts` is `export const testimonials: Testimonial[] = []`.

The header is explicit: *"EMPTY ON PURPOSE. Do not fill this with placeholder quotes."* The brief confirmed there are none yet. *"Inventing quotes and attributing them to named real projects would put fabricated endorsements in front of buyers -- that is deceptive advertising, and in Mexico it is what PROFECO regulates. It is also trivially discoverable: the projects named here are real and their owners can be asked."*

The type, the component (`Testimonials` returns `null` on an empty array) and the landing slot all exist and wait. The fastest real path, per the brief: request a short clip or written line from two or three past clients, then record it with the project name as the attribution.

### 6.7 Logo is raster only — **verified**

| Asset | Dimensions | Notes |
|---|---|---|
| `images/brand/logo-casa-alta-azul.png` | **150×150** | the blue mark; unusable for a header |
| `images/brand/logo-casa-alta-blanco.png` | 1536×1024 | white lockup |
| `public/brand/logo-casa-alta.png` | 354×160 | what `Logo.tsx` actually renders |

**No SVG exists anywhere in the repository** (verified by a repo-wide `*.svg` search excluding `node_modules`, `.next` and `.git`).

Two distinct problems:
1. `Logo.tsx` states the intent: *"The line art and the wide-tracked wordmark want to be an SVG; until the vector arrives, 354px wide at 2x covers the header."*
2. **The derivation is unscripted.** No file in `tools/` or `.opencode/` produces `public/brand/logo-casa-alta.png`. Its 354×160 aspect (2.21) matches neither source (1.00 and 1.50), so it is a trimmed lockup that came from somewhere outside the repository. It cannot currently be regenerated.

### 6.8 Project detail routes do not exist, and `ProjectCard` is built around that — **verified**

`ProjectCard` takes an **optional** `href`. The prop comment: *"Omit until the project detail pages exist. A card that links to a route nobody has built is a dead end, so without this the card renders as a plain article with no hover affordance -- there is nothing to afford."*

`ProjectsGrid` passes no `href`. The card renders `<article>`, and the hover scale/colour transitions are conditionally applied only when `href` is present. **Adding detail pages is a matter of passing `href` — the hover states already exist and are dormant.**

`src/content/site.ts`'s nav documents the same situation: every link points at a `/#section` anchor rather than a route that would 404, *"the `/#x` form already works from any future page too."*

### 6.9 The pipeline scripts are machine-bound — **verified**

Seven hardcoded absolute path references across six files:

```
tools/parse.pl:13      tools/convert.sh:17     tools/variants.sh:15,16
tools/champions.sh:9   tools/build-sheets.sh:11  tools/manifest.pl:9
```

All are `"/Users/hendrick/Documents/arquitectura-casa-alta-web/..."`. Only `tools/hero.sh` (`cd "$(dirname "$0")/.."`), `tools/sync-images.mjs` and `tools/check-image-urls.mjs` (both `fileURLToPath(import.meta.url)`) are location-independent. **The pipeline cannot currently run from another checkout or another machine.**

Note that the three Node scripts are the *new* ones; the Perl/Bash stages predate them. Also note `variants.sh:72` and `convert.sh:84` call `fd` and `rg` respectively — tools that `AGENTS.md` warns are absent inside hooks.

### 6.10 `convert.sh` is destructive by design

`tools/convert.sh:37` runs `rm -rf "$OUT"` before converting. `AGENTS.md` calls `images-optimizado/` *"Safe to delete and regenerate"*, and that holds — but regeneration requires the pipeline to have run in order (`plan.txt` under `/tmp/casa-alta-work/`), and `/tmp` is not durable. **A bare `convert.sh` run without the plan stages present will fail.** The rebuild path is the full six-step pipeline, not one script.

---

## 7. What is NOT built

Verified against the route table, the file tree, and the content modules.

| Missing | Evidence | Blocking? |
|---|---|---|
| **Project detail pages** (`/proyectos/<slug>`) | route table shows only `/` and `/_not-found`. `ProjectCard` has a dormant `href` prop waiting | Yes — the portfolio has no depth |
| **Services / process / about / contact pages** | routes absent; nav links to `/#anchor` instead | Partial — anchors serve today |
| **Image sitemap (`image:image`)** | no `sitemap.ts`, no `robots.ts`, no sitemap output in the build | Yes — `AGENTS.md`: *"Architecture firms get real traffic from Google Images"* |
| **`ImageObject` JSON-LD** | no structured data anywhere in `src/` | Yes — same reason |
| **Per-photo `alt` as authored copy** | **partially built**: `photos.ts` derives `alt` from the manifest's `note` (a real Spanish description written during ranking) joined to the project title. `AGENTS.md`'s rule is satisfied in spirit and mechanically | No — but real per-photo prose would be better |
| **Payload CMS** | not present; the seam is ready (§2.3) | No — deferred by design |
| **Netlify deploy config** | no `netlify.toml` (§6.2) | Yes — deploy is undeclared |
| **Clean public image URLs** | files are served at `/images/01-plaza-esmeralda-…/01-….avif`, numeric prefix intact. `AGENTS.md`: *"Keep the numeric prefix out of public URLs"* | Yes for SEO — and **must not be fixed by renaming files** (§5.2) |
| **Test runner** | none (§6.3) | Deferred by policy, not by accident |
| **`opengraph-image` / social cards** | no `opengraph-image.tsx`, no `twitter:card` | Minor |
| **SVG logo** | none exists (§6.7) | Cosmetic-but-real |
| **`sitemap.xml` / `robots.txt`** | absent | Yes |

**The gap between what is built and what is missing is sharp:** the landing is a finished, measured piece of design work with a rigorously engineered image pipeline behind it, and none of it is discoverable by a search engine yet.

---

## 8. Contradictions found between the briefing and the disk

Reported explicitly as instructed. **The disk wins in every case.**

### 8.1 "the descriptor overstates" — imprecise; it is wrong in **both** directions

The briefing says: *"Next labels each srcset entry with the REQUESTED width … so on irregular aspect ratios the descriptor overstates."*

Measured against this repository's own build output (§3.10), the label can be **under** or **over** the file's real width:
- `10-obra-punta-zicatela/…-960.avif 480w` — the file is **720px**; the label **understates** (loader rounded up).
- `hero/…playa.avif 2000w` — the file is **1600px**; the label **overstates** (loader fell back to widest).

`next.config.ts`'s own wording — *"That over-delivers; it never under-delivers into blur"* — matches the disk. The briefing's single-direction framing does not.

### 8.2 "22 of 206 photos have only a `-480` variant" — the count is right, the label is loose

22 photos do have exactly one variant. Measured composition: 15 are `[480]`, 6 are `[360]`, 1 is `[335]`. Only 15 of the 22 are literally a `-480` file at 480px.

### 8.3 "the four `deviceSizes` candidates scored" — only the winner is recorded; the other three are **UNVERIFIED**

`next.config.ts:27` records the winner: *"this one has the lowest mean delivered/requested ratio (0.927)."*

**The other three candidates and their scores appear nowhere.** Searched: all source, all tooling, `AGENTS.md`, `openspec/config.yaml`, all files matching `0.8xx`/`0.9xx`, `git stash list` (empty), and `git log --all -- next.config.ts` — which returns **nothing, because `next.config.ts` is untracked**. It has no history to recover from. The losing candidates are **UNVERIFIED** and must not be reconstructed by inference.

### 8.4 `next.config.ts` says "there are 8 other signatures" — **does not reproduce**

Measured from `manifest.json`:
- **25** distinct full-srcset width signatures;
- **13** distinct variant-only signatures.

Neither is 8. The 47 / 47 figures in the same comment reproduce **exactly**. Treat the "8" as an unverified figure from an earlier corpus state, and the measured 25 / 13 as authoritative.

### 8.5 "`node_modules` is a pnpm store" — true but incomplete

pnpm owns the tree (`.pnpm/`, `.modules.yaml`, `pnpm-workspace.yaml`), but npm has run here too: `node_modules/.package-lock.json` (191 KB) and a `cmd-shim`-style `node_modules/.bin/next`. `openspec/config.yaml`'s characterisation of `package-lock.json` as "stale npm residue" is **not confirmed by version pinning** — it pins `next 16.3.5`, matching `package.json`. The live risk is duplication, not staleness (§6.1).

### 8.6 "no title, location, year, client or story exists anywhere in the repo" — true of the pipeline only

`manifest.json` and the pipeline carry none of these — confirmed. But **project titles and one location do exist in the repository**, hand-authored in `src/content/projects.ts`. The comment inside that very file (*"There is no project title, location, year, client or story anywhere in the repository"*) is now **overstated by its own file's contents** — the pipeline drops them, and the editorial layer supplies them. Worth correcting when that file is next touched.

### 8.7 `AGENTS.md` is stale in three places

1. Opening line: *"There is no application code yet"* — false; 48 source files and a green production build.
2. Hooks section: *"the site app does not exist yet"* — false; `format.sh`'s no-op fallback is no longer the expected path.
3. Layout block omits `src/`, `public/`, `openspec/` and `next.config.ts`.
4. Binary counts drifted (§5.1).

`openspec/config.yaml`'s own `context` block is **accurate** and current — it already describes the app, the seam, the loader and the gates. It is the better map of the present state.

### 8.8 Confirmed as briefed, with no contradiction

- `src/` is 48 files with the stated 3 / 31 / 7 / 5 / 2 split.
- The custom loader exists because Netlify negotiates WebP before AVIF and WebP grows this corpus.
- `tiers: [480, 960]` is the long edge while the srcset `w` is the actual width.
- Exactly 2 project covers have no `-960` at all, and they are the two named in `check-image-urls.mjs`.
- `images-optimizado/manifest.json` carries only `dir`/`order`/`slug`/`photos` per project.
- Testimonials is an empty array on purpose, for the stated anti-deception reason.
- Facebook and TikTok have empty hrefs.
- No `netlify.toml`, no test runner, no project detail routes, `ProjectCard` deliberately linkless.

---

## 9. Recommended next steps

Ordered by what unblocks the most.

1. **Decide the lockfile question** (§6.1). One package manager, one committed lockfile, the other ignored. Cheap now, expensive after a `git add -A`.
2. **Add `netlify.toml`** (§6.2) — deploy target, build command, publish directory, Node version, `@netlify/plugin-nextjs`. Nothing can be deployed reproducibly without it.
3. **Deliver the SEO layer that `AGENTS.md` already specifies**: image sitemap (`image:image`), `ImageObject` JSON-LD, `robots.txt`, `opengraph-image`. The `.data` already exists in `manifest.json` and has since the pipeline ran. This is the largest unclaimed win in the repository, and the `web-build` agent exists for it.
4. **Clean public image URLs** (§7) — and note the constraint: this is a **routing** change (map `01-casa-blake-tlalixtac` → `casa-blake-tlalixtac`), never a filesystem rename. Renaming discards search ranking and `git-guard.sh` will deny it.
5. **Project detail pages**, then pass `href` to `ProjectCard` and switch the nav from anchors to routes. The components are already built for this.
6. **Move the hardcoded paths out of `tools/`** (§6.9) so the pipeline can run on another machine. Follow the pattern already set by `hero.sh` and the two `.mjs` scripts.
7. **Normalise variant widths in the pipeline** (§3.10) — the real fix for the srcset descriptor, explicitly assigned to the *pipeline*, not to `next.config.ts` or the loader.
8. **Correct `AGENTS.md`** (§8.7) so it stops opening with a false statement about the repository it documents.
9. **Confirm project editorial data** (§6.4) — 12 projects provisional, 1 with location only, 1 with narrative but no year, and **zero years across the board**. This is client-facing work, not engineering work, and it blocks the detail pages from being worth building.
10. **Script the logo derivation** (§6.7), and obtain an SVG. `public/brand/logo-casa-alta.png` currently cannot be regenerated from the repository's own sources.

### Explicitly deferred, with reasons

- **Payload CMS** — the seam is intact and the migration surface is one file (§2.3). No urgency.
- **Test runner** — `openspec/config.yaml` forbids inventing one as a side effect of another change.
- **Testimonials** — must stay empty until real client words exist (§6.6).

---

## 10. Rollback and constraint exposure

Per `openspec/config.yaml`'s proposal rules, stating which repository constraints this change could touch.

This change is **documentation only** — it writes one file under `openspec/` and modifies no source, no image, and no tooling. It therefore touches **none** of the binding constraints: no numeric path prefix is renamed, nothing is written under `images/`, no `git add -A` is proposed, and no AI attribution is added to any commit.

The rollback for the change itself is deleting `openspec/changes/casa-alta-web-foundation/exploration.md`.

The **follow-on work** recommended in §9 does touch constraints, and each is flagged there: item 4 is a routing change that must not become a filesystem rename; item 7 is a pipeline change to `variants.sh` that rewrites `images-optimizado/` and therefore requires deliberate staging, never `git add -A`.

---

## 11. Key Learnings

1. Next's `deviceSizes` defaults start at 640, which makes the 480 tier unreachable and doubles mobile downloads; the repository overrides it to `[480, 960, 1600, 2000]`.
2. `manifest.json`'s `tiers: [480, 960]` names the long edge while each srcset `w` descriptor names the actual pixel width, so a 1200x1600 portrait reports 360/720/1200 inside files named `-480` and `-960`.
3. Both `package-lock.json` and `pnpm-lock.yaml` exist untracked and un-ignored, so a single `git add -A` would commit two lockfiles for two package managers.
4. The hero's white type over the photograph measured 1.31:1 contrast at 0.74-0.77 mean luminance, so the headline sits on clean ground below the image instead.
5. A custom `next/image` loader exists because Netlify Image CDN negotiates WebP before AVIF, and WebP q82 measurably grows this corpus to 100-102% of the original.
