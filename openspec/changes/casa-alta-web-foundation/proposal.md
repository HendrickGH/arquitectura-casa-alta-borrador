# Proposal: casa-alta-web-foundation

**Change:** `casa-alta-web-foundation` · **Phase:** sdd-propose · **Date:** 2026-09-16
**Artifact store:** openspec · **Repo:** `/Users/hendrick/Documents/arquitectura-casa-alta-web`
**Inputs:** `openspec/changes/casa-alta-web-foundation/exploration.md`, `openspec/config.yaml`, `AGENTS.md`

## Intent

CONSTRUCTORA CASA ALTA (Oaxaca, Mexico) has a finished landing page, an engineered image
pipeline, and **no discoverable web presence**: the site has exactly one route and no sitemap.
This change closes that gap and packages it so a Payload CMS migration and a Netlify deploy
become configuration rather than rewrites.

**Retrospective framing.** Written at the end of a session, for the next one. "Already built"
is **not work — do not re-propose it**; "Remaining" is the forward scope.

## Constraints Touched

Stated before scope, per `openspec/config.yaml` → `rules.proposal`.

| Constraint | Touched? | How |
|---|---|---|
| Numeric path prefixes (`01-`…`14-`, photo ordinals) | **Indirectly** | Clean public image URLs are a **routing** change. `01-casa-blake-tlalixtac` maps to `casa-blake-tlalixtac` in code; **no file or folder is renamed.** |
| `images/` read-only tree | **No** | Nothing in this change writes, renames or deletes under `images/`. `images/hero/` and `images/brand/` were added earlier and are already there. |
| Pipeline ownership of `images-optimizado/` | **Yes — one item** | Normalising variant widths is a `tools/variants.sh` change that regenerates `images-optimizado/`, which is why it carries the strictest rollback below. |
| No `git add -A`; binaries are permanent | **Yes** | Any regeneration must be staged deliberately. `.opencode/plugins/casa-alta.ts` warns above 50 staged files or ≥20 MB. |

**Compliance:** this proposal renumbers **no** published project folder and **no** photo
ordinal, and proposes none. Reordering stays the `order` field in `manifest.json`.

## Scope

### Already built and verified — NOT work

| Deliverable | On disk | Evidence |
|---|---|---|
| Atomic-design tree, 31 components | `src/components/{atoms,molecules,organisms,templates}` | 9 + 9 + 12 + 1 |
| Content seam | `src/lib/content/index.ts` | 9 accessors; no file under `src/components/` or `src/app/` imports `@/content/*` — only `page.tsx` reads the seam, via `@/lib/content` |
| Custom `next/image` loader | `src/lib/image/loader.ts` + `variants.generated.json` | 207 keys; unknown src passes through untouched |
| `deviceSizes: [480, 960, 1600, 2000]` | `next.config.ts` | Next's 640 default makes the 480 tier unreachable |
| Landing page | `src/app/page.tsx` → `LandingTemplate` | only route besides `/_not-found` |
| Three tools | `tools/sync-images.mjs`, `tools/hero.sh`, `tools/check-image-urls.mjs` | all location-independent |
| Gates green | `npx tsc --noEmit`, `npm run lint`, `npx next build`, `npm run check:images` | 48 source files; 21 image URLs resolve |

### Remaining — the forward scope

Ordered by what unblocks the most. **E** = engineering, **C** = needs client input.

| # | Item | Kind |
|---|---|---|
| 1 | `netlify.toml` — build command, publish dir, Node version, `@netlify/plugin-nextjs` | E |
| 2 | SEO layer: image sitemap (`image:image`), `ImageObject` JSON-LD, `robots.txt`, `opengraph-image`. Data already exists in `manifest.json` | E |
| 3 | Project detail pages `/proyectos/<slug>`; then pass `href` to `ProjectCard` and move nav off `/#anchor` | E |
| 4 | Services / process / about / contact pages | E |
| 5 | Clean public image URLs as a **routing** change | E |
| 6 | Project editorial data: 12 of 14 provisional, and **zero `year` values in all 14** | C |
| 7 | Facebook + TikTok URLs (empty `href` in `src/content/site.ts`) | C |
| 8 | SVG logo; `public/brand/logo-casa-alta.png` cannot currently be regenerated | C |
| 9 | Testimonial capture from real clients | C |
| 10 | Pipeline: normalise variant widths in `tools/variants.sh` | E |
| 11 | Pipeline: remove 7 hardcoded absolute paths across 6 files | E |
| 12 | Payload CMS behind the seam — **SUSPENDED**, not deferred: building it is a possibility, not a decision. See Out of Scope | — |

## Capabilities

`openspec/specs/` is empty; these are all new. **Modified Capabilities: None.**

### New Capabilities

- `deploy-config`: Netlify build/deploy contract, reproducible from a clean checkout.
- `seo-discovery`: image sitemap, `ImageObject` JSON-LD, `robots.txt`, social cards.
- `project-pages`: `/proyectos/<slug>` detail routes and galleries from `manifest.json`.
- `site-pages`: services, process, about and contact routes.
- `image-url-routing`: clean public image URLs with no filesystem rename.
- `editorial-content`: client-confirmed project data and site identity (social, logo).
- `cms-migration`: Payload CMS replacing `src/lib/content/index.ts` reads only. **SUSPENDED** — the seam is real and verified, the replacement is only a possibility.

## Approach

1. **Deploy first** (`netlify.toml`), so every later change is verifiable in a real environment.
2. **SEO layer second** — highest value per unit of work; `manifest.json` already carries
   `srcset`, `note`, `full.width`/`full.height`, and per-project `order`.
3. **Routing before content depth**: detail pages, clean image URLs, `href` on `ProjectCard`.
   The hover states already exist and are dormant (`ProjectCard` takes optional `href`).
4. **Client-dependent items last**, gated on confirmed input, never on invented copy.
5. **Payload out of the plan entirely (SUSPENDED).** It is not the last item — it is not an item.
   Replacing the content source is a possibility, not a decision, so nothing is sequenced toward
   it. The seam stays intact regardless: 9 accessors would become async reads, and
   `src/lib/content/photos.ts` and `src/types/content.ts` would stay unchanged — which is exactly
   why leaving it suspended costs nothing today.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/app/` | Modified | New routes, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` |
| `src/lib/content/index.ts` | Modified | Accessors become async at the Payload stage |
| `src/lib/content/photos.ts` | Read-only | Stays; reads the manifest, not editorial content |
| `src/components/` | Modified | `ProjectsGrid` passes `href`; nav moves to routes |
| `next.config.ts` | Unchanged | Loader and `deviceSizes` preserved as-is |
| `netlify.toml` | New | Does not exist today |
| `src/content/projects.ts` | Modified | 12 provisional entries pending client confirmation |
| `tools/variants.sh` | Modified | Width normalisation; regenerates `images-optimizado/` |
| `images/` | **Untouched** | Read-only |

## Open Inconsistencies

Named, not resolved. Each needs a human decision.

1. **Two lockfiles, both untracked and un-ignored** — `package-lock.json` (236 KB) and
   `pnpm-lock.yaml` (138 KB). `git check-ignore` returns exit 1 on both; `git status` lists both
   as `??`. One `git add -A` commits two lockfiles for two package managers. Note: `config.yaml`
   calls `package-lock.json` "stale npm residue", but **that is not confirmed by version
   pinning** — it pins `next 16.3.5`, matching `package.json`. The risk is **duplication, not
   staleness**. Needs a decision: commit one and ignore the other, or accept both.
2. **`openspec/` is untracked.** The change artifacts are not in version control.
3. **The pipeline is machine-bound** — 7 absolute `/Users/hendrick/...` paths across 6 files
   (`tools/parse.pl`, `convert.sh`, `variants.sh`, `champions.sh`, `build-sheets.sh`,
   `manifest.pl`). It cannot run from another checkout.
4. **`convert.sh` begins with `rm -rf "$OUT"`** and depends on `/tmp/casa-alta-work/plan.txt`,
   which is not durable. A bare single-script re-run fails; the rebuild path is the full
   six-step pipeline.
5. **`AGENTS.md` is stale in four places** — it still opens with *"There is no application code
   yet"*, says *"the site app does not exist yet"*, omits `src/`, `public/`, `openspec/` and
   `next.config.ts` from its layout, and its binary counts have drifted (measured 2026-09-16:
   `images/` 215 files / 74 MB; `images-optimizado/` 808 files / 125 MB).

**Carried forward as UNVERIFIED:** the three losing `deviceSizes` candidate sets and their
scores. `next.config.ts` records only the winner (mean delivered/requested ratio **0.927**); the
losers appear nowhere, and the file is untracked so it has no history. **Do not reconstruct
them.** (Separately: the exploration quotes `next.config.ts` as saying "8 other signatures"; the
file on disk today says 25, which matches the measured value.)

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Clean image URLs break already-indexed paths | Med | Routing-only change; no file renamed; both forms can resolve during transition |
| `variants.sh` normalisation regenerates `images-optimizado/` and a careless stage commits 800+ binaries | Med | Stage deliberately; never `git add -A`; `git-guard.sh` warns |
| `convert.sh` destroys `images-optimizado/` before a failed re-run | Med | Rebuild only via the full six-step pipeline; back up the tree first |
| Client copy is invented to fill empty fields | Med | `src/content/projects.ts` policy: an empty field is a to-do, a guessed one is a lie that ships |
| Fabricated testimonials | Low | `testimonials.ts` stays `[]` until real client words exist |
| Payload migration changes component contracts | Low | Seam holds: components receive props only |
| Lockfile ambiguity becomes permanent history | Med | Decide before any staging (Open Inconsistencies #1) |
| No test runner means regressions surface only at build | Med | Gates are tsc, lint, `next build`, `check:images`; do not invent a runner |

## Rollback Plan

The change is staged, so rollback is per stage, not all-or-nothing.

| Stage | Rollback |
|---|---|
| `netlify.toml` + SEO layer | Delete the added files; the landing is untouched |
| Detail pages / nav routing | Revert to `/#anchor` nav and drop the `href` prop; `ProjectCard` already renders linkless |
| Clean image URLs | Revert the routing map; source files were never renamed, so the image set is unchanged |
| `variants.sh` normalisation | The only risky stage. Back up `images-optimizado/` first; regenerating via the full pipeline restores it |
| Payload CMS | Revert `src/lib/content/index.ts` to the local-module reads; components were never touched |
| This proposal artifact | Delete `openspec/changes/casa-alta-web-foundation/proposal.md` |

## Out of Scope

- **A test runner.** `openspec/config.yaml` records `strict_tdd: false` and forbids inventing
  one as a side effect of another change.
- **Payload CMS.** **SUSPENDED until further notice**, not deferred-and-planned. Replacing the
  content source is a possibility, not a committed decision; nothing is scheduled for it and
  nothing should be shaped around it. The seam is ready and the migration surface is one file,
  which is what keeps the option cheap — not a reason to take it.
- Re-encoding the `.jpg` fallbacks, or reintroducing Netlify Image CDN (WebP q82 measures
  100–102% of the original on this corpus).
- Renaming any path that changes a numeric prefix, or writing under `images/`.
- Changing the custom loader contract or the `deviceSizes` scale.
- Filling testimonials or project narratives with placeholder content.
- Booking, e-commerce, or additional languages.

## Dependencies

- Netlify account/team and `@netlify/plugin-nextjs`.
- Client-supplied: project narratives, years, social URLs, SVG logo, testimonial quotes.
- A human decision on the lockfile question before any `git add`.

## Success Criteria

- [ ] Every remaining item above is either delivered or explicitly deferred with a reason.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npx next build`, `npm run check:images` all pass.
- [ ] The route table serves the landing, project details, and the static pages.
- [ ] A build emits `sitemap.xml` (with `image:image`) and `robots.txt`; `ImageObject` JSON-LD validates.
- [ ] No public URL contains a numeric project or photo prefix.
- [ ] No file under `images/` is written, renamed or deleted.
- [ ] A clean checkout deploys to Netlify without manual steps.

## Key Learnings

1. This proposal is retrospective: the Next.js foundation is already built and green, so the remaining scope is pages, SEO, and deploy config rather than a rewrite.
2. Netlify Image CDN negotiates WebP before AVIF, and WebP q82 measures 100-102% of the original on this corpus, which is why a custom loader serves the pre-encoded AVIF tiers.
3. Next's default `deviceSizes` start at 640, making the 480 tier unreachable and doubling what a phone downloads; the repository overrides it to `[480, 960, 1600, 2000]`.
4. Cleaning public image URLs is a routing change, never a filesystem rename, because a renamed numeric prefix discards accumulated search ranking.
5. `package-lock.json` and `pnpm-lock.yaml` are both untracked and un-ignored, so a single `git add -A` would commit two lockfiles for two package managers.
