# Proposal: casa-alta-site-redesign

**Change:** `casa-alta-site-redesign` · **Phase:** sdd-propose · **Date:** 2026-09-16
**Artifact store:** openspec · **Repo:** `/Users/hendrick/Documents/arquitectura-casa-alta-web`
**Inputs:** `brief-cliente.md` (verbatim client testimony; §0 decisions are in force, §14 gaps stay gaps), `exploration.md`, `references/` (vendored corpus and the two constraints its `README.md` records), `AGENTS.md`, `openspec/config.yaml`, `casa-alta-web-foundation/proposal.md` + its 7 delta specs.

**Independently re-checked before writing:** the landing emits 9 `<img>` and exactly two `sizes`
values (`100vw` ×2, `(min-width: 768px) 50vw, 100vw` ×5); manifest = 206 photos / 14 projects with
144 scoring ≥3 and the recorded per-project counts; hero priority ships as
`<link rel="preload" as="image">` while `fetchpriority` appears 0 times in the built HTML;
`"use client"` appears 0 times in `src/`. The 1,208-word figure is the exploration's measurement
(a cruder recount landed at 1,212). The third-party brand name is absent from `src/`, from the
built HTML, and from the tree as a whole — 0 occurrences.

## Intent

The client reports the site "luce simple, muerto, sin identidad." The measurement agrees, and it is
not a palette problem: **6 of 144 publishable photographs are reachable (4.2%)**, the landing averages
**134 visible words per image**, only two `sizes` values exist site-wide, and all visual weight sits
in one 2-column grid on the site's single route. The exploration's diagnosis holds — the deficit is
information architecture and photographic weight, not colour or typography.

This change recomposes the landing, specifies what the portfolio routes *render* once
`casa-alta-web-foundation` builds them, adds the `sizes` tiers the new layouts need, gives the
already-authored service catalogue its requested two-level presentation, curates navigation,
introduces a bounded motion layer, and ingests client-authorised stock imagery through this
repository's own pipeline without ever letting it stand in for obra.

## Constraints Touched

Stated before scope, per `openspec/config.yaml` → `rules.proposal`.

| Constraint | Touched? | How |
|---|---|---|
| Numeric path prefixes (`01-`…`14-`, photo ordinals) | **Add-only** | Stock sources land in a **new** `images/editorial/<slug>/` subtree. Nothing existing is renamed, renumbered or moved; project order stays the `order` field in `manifest.json`. |
| `images/` read-only tree | **Add-only** | New files only. Nothing already committed there is written, renamed or deleted; `.opencode/plugins/casa-alta.ts` denies the latter. |
| Pipeline ownership of `images-optimizado/` | **Yes — additive** | New outputs under `images-optimizado/editorial/` plus one sidecar. The 14 project folders, `hero/` and `manifest.json` are not edited; encoding runs through `tools/`, never by hand. |
| No `git add -A`; binaries are permanent | **Yes** | Stock sources and their AVIF variants become permanent history. Stage deliberately; the guard warns above 50 files or ≥20 MB. |
| Loader contract, `deviceSizes`, `.jpg` fallbacks, Netlify Image CDN | **No** | `src/lib/image/loader.ts` and `next.config.ts` are not touched. |

## Scope

### Already built and verified — NOT work

| Deliverable | Evidence |
|---|---|
| Landing composing 12 sections; 31 components in the atomic tree | `LandingTemplate.tsx`; atoms 9 / molecules 9 / organisms 12 / templates 1 |
| Hero single declarative line, secondary CTA, `48svh` photo, correct priority preload | `Hero.tsx:45`; built HTML |
| Service catalogue authored: **4 groups, 13 services, 63 items** | `src/content/services.ts` — presentation is the remaining work, not authoring |
| Content seam; score filter and manifest join inside `photos.ts` | `src/lib/content/index.ts`; components take props only |
| Zero horizontal overflow at 320 / 375 / 2560 px; zero client components; deps `next`/`react`/`react-dom` only | live requirement of foundation's `site-pages` |

### Forward scope — what this change owns

**E** = engineering, **C** = needs client input.

| # | Item | Kind |
|---|---|---|
| 1 | Landing recomposition: full-viewport hero shell, category tiles with photographs, manifesto line, featured-three portfolio, masonry of the strongest images across projects, a second full-bleed moment | E |
| 2 | `sizes` tiers per shipped layout — a 3-column tier and per-column-count values, written against the CSS that exists, never guessed | E |
| 3 | Navigation: floating/transparent shell over the hero, fill colour past it; nav curation (entries + the portafolio/proyectos label) | E / C |
| 4 | Presentation spec for the `/proyectos` index and each gallery layout — **consumed** from foundation's routes, not created here | E |
| 5 | Services presentation: the two-level group grid over the existing 4/13 catalogue | E |
| 6 | Motion layer: CSS for everything `@keyframes` serves; GSAP ScrollTrigger only for scrubbed, pinned or sequenced choreography, behind one narrow client boundary | E |
| 7 | Stock-image ingestion namespace, pipeline processing, provenance record | E |
| 8 | Approvals: closing line (§14.1), portafolio/proyectos label, service-group names (§14.8) | C |

### The split with `casa-alta-web-foundation` — preserved, not duplicated

Foundation owns the `/proyectos` route tree and `[slug]` details, the four static page routes, the
SEO layer (sitemap with `image:image`, robots, JSON-LD, social cards, `metadataBase`), clean public
image URL routing, and the `tools/variants.sh` srcset normalisation (tasks 5.5–5.7). This change
re-specifies none of it: it declares a dependency on foundation's Phase 4 and adds only the
presentation layer those routes consume. Shared files (`ProjectsGrid.tsx`, `ProjectCard.tsx`,
`src/content/site.ts`) are sequenced, never edited concurrently.

### Delivery size and PR split

Estimated **~1,150–1,450 authored changed lines** across ~20 files. **Not one PR.** Three stacked
slices fit the fixed 400-changed-line review policy: **S1** landing composition + `sizes` (~500) →
**S2** navigation shell + motion layer (~430) → **S3** services presentation + portfolio presentation
+ stock ingestion (~480). Anything wider needs a maintainer-approved `size:exception`. The delivery
strategy value is the orchestrator's to set for `sdd-tasks`; it is not assumed here.

## Capabilities

`openspec/specs/` is empty; everything below is new. **Modified Capabilities: None.**

### New Capabilities

- `landing-composition`: the landing's section set, order and tone rhythm — full-viewport hero shell, category tiles, manifesto line, featured-three portfolio, masonry, second full-bleed moment.
- `navigation-shell`: the floating navbar's transparent/filled states and scroll state, plus nav curation (entries and the portafolio/proyectos label).
- `portfolio-presentation`: what renders on the `/proyectos` index and in each gallery (layout, density, image `sizes`, hover/focus affordance). Presentation only; routes and data rules stay foundation's.
- `services-presentation`: the two-level service grid over the existing 4 groups / 13 services / 63 items.
- `responsive-image-tiers`: the `sizes` value per shipped layout (2- and 3-column tiers, full-bleed), and the rule that a tier ships only alongside the CSS that makes it true.
- `motion-layer`: the CSS-versus-GSAP boundary, the single client boundary, reduced-motion behaviour, cleanup.
- `stock-imagery`: the ingestion namespace, provenance record, pipeline processing, and the ban on stock representing obra.

Foundation's `site-pages` requirements — one `h1`, `h2` sections, no horizontal overflow from 320 px,
focus never removed — stay binding on the new composition and MUST NOT be redefined here.

## Approach

1. **Compose, don't rebuild.** Sections are additive to `LandingTemplate`; no token surgery, no new
   palette. New view models enter through the seam and components keep taking props.
2. **Sizes last, against real CSS.** A tier is written when its layout exists, so the loader's label
   and the fetched file stay honest. The 3-column tier takes the shape
   `(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw`, adjusted to the shipped CSS.
3. **Motion in two tiers.** CSS owns hover, focus, reveals and micro-states. GSAP + ScrollTrigger own
   only what scroll position drives: scrubbed, pinned or sequenced choreography — registered once,
   scoped via `useGSAP`/`gsap.context`, reverted on unmount, `refresh()` after layout changes,
   `prefers-reduced-motion` honoured.
4. **One client boundary, as narrow as it goes.** The floating navbar needs scroll position and the
   repo has zero client components, so one small client component (header shell / motion controller)
   is the chosen route. Server-rendered content stays visible without it — no content behind a JS reveal.
5. **Stock through the pipeline, never hotlinked.** Sources land in `images/editorial/<slug>/`, are
   encoded by a `tools/hero.sh`-shaped script into `images-optimizado/editorial/` with a sidecar in
   `hero/hero.json`'s shape, and `tools/sync-images.mjs` merges that sidecar into the loader's variant
   table. Unsplash page URL, photographer and licence are recorded per image.
6. **Curate navigation after foundation 4.3** — both changes touch `src/content/site.ts`.
7. **Verify by measurement.** `npx tsc --noEmit`, `npm run lint`, `npx next build`,
   `npm run check:images`, plus an overflow check at 320 / 375 / 2560 px and a measured transfer
   weight for the changed page.

## Stated Decisions and Limitations

Corrections and consequences the plan carries openly.

1. **Hero height uses `100dvh`/`100svh`, never `100vh`.** `100vh` on mobile measures the viewport
   without the collapsed URL bar, so a full-height hero overflows the visible area; the repo already
   avoids this at `Hero.tsx:45` (`48svh`). The client's literal `100vw x 100vh` is superseded on this
   point, for that technical reason.
2. **Full-bleed width is `w-full` inside a full-bleed container, never `width: 100vw`.** `100vw`
   includes the scrollbar, which would break the zero-overflow requirement that currently passes.
   (`sizes="100vw"` is a different value and stays correct.)
3. **Stock must be downloaded and pipelined — the client's instruction is technically correct.** An
   external Unsplash URL is not in the loader's variant table and the loader returns an unknown `src`
   untouched, so a hotlinked image would arrive full-size, unoptimised, with no AVIF and no variants.
   New files under `images/` are permitted because the read-only rule constrains existing files only.
4. **Stock is separated from obra structurally, not by a filter.** `photos.ts` reads
   `manifest.projects` only, and a project needs both an editorial entry and a manifest entry. Stock
   lives in its own directory and sidecar — the existing `hero/hero.json` precedent — so it cannot
   appear in a project gallery, the portfolio, the masonry, or foundation's per-project sitemap
   entries. A site-side exclusion list would be fragile by comparison.
5. **This introduces the repo's first client boundary and first runtime dependency beyond React.**
   GSAP + `@gsap/react` are new dependencies; the boundary is one component, and its reason is scroll
   state, which CSS cannot read.
6. **GSAP is justified only where CSS cannot serve.** The corpus rule — "do not add a heavy library,
   animation system, or client boundary for an effect already served by simple CSS" — is adopted as a
   spec-level constraint. The client's "animate the site" is honoured *inside* that boundary:
   scrubbed/pinned/sequenced choreography gets GSAP; a fade `@keyframes` can do stays CSS.
7. **Stock carries texture only.** Unsplash is authorised for sections with no real photograph of
   their own; portfolio, masonry and project pages come from the repo's 206-photo set, always.
8. **`AGENTS.md`'s hero rule is stale documentation.** It still says the hero image needs
   `fetchpriority="high"`; the build ships `<link rel="preload" as="image">`, Next 16's mechanism, and
   `fetchpriority` appears 0 times. Correcting that sentence is housekeeping, not a bug fix.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/components/organisms/Hero.tsx` | Modified | Full-viewport shell; type-over-image placement; `dvh`/`svh` units |
| `src/components/organisms/Header.tsx`, `UtilityBar.tsx` | Modified | Floating/transparent states; needs the scroll-state client component |
| `src/components/templates/LandingTemplate.tsx` | Modified | New section order and tone rhythm |
| `src/components/{organisms,molecules,atoms}/` | New | Tiles, manifesto line, portfolio, masonry, stock-image section — existing layers only |
| `src/components/organisms/ProjectsGrid.tsx`, `molecules/ProjectCard.tsx` | Modified | New `sizes` per layout; card variant for tiles. **Shared with foundation 4.2 — sequence it** |
| `src/components/organisms/ServicesIndex.tsx`, `molecules/ServiceRow.tsx` | Modified | Linear index → two-level grid |
| `src/content/{home,services,site,projects}.ts` | Modified | New section copy, tile mapping, featured-three selection, nav curation (`site.ts` is also foundation 4.3's target) |
| `src/lib/content/index.ts`, `photos.ts` | Modified | New accessors; the stock source is read here, never in a component |
| `src/types/content.ts`, `src/app/page.tsx` | Modified | New view models (tile, masonry item, stock image); the route passes them as props |
| `src/app/globals.css` | Modified (small) | Motion keyframes + reduced-motion block; no new colour or radius tokens |
| `tools/` (new script + one merge) | New / Modified | Stock encoder beside `hero.sh`; `sync-images.mjs` merges a second sidecar |
| `images/editorial/`, `images-optimizado/editorial/` | New | Stock sources and their encoded outputs (add-only) |
| `package.json` + lockfile | Modified | `gsap`, `@gsap/react` |
| `src/lib/image/loader.ts`, `next.config.ts`, `tools/variants.sh`, existing `images/` files | **Untouched** | Measured decisions; the srcset fix stays foundation 5.5–5.7 |

## Open Inconsistencies

Named, not resolved. Each needs a human decision; where one blocks shipping, a default is stated.

1. **Hero type placement — DECIDED.** The client chose *type inside the hero's clean zone*, not type
   over the whole image. The choice follows the two measured attempts recorded in `Hero.tsx:15-41`
   (white type samples 1.31:1; dark type rendered *less* legible than white because variance, not
   mean luminance, breaks type). Two consequences: the hero photograph becomes a **selection
   criterion** — it must have a calm, low-variance zone large enough to hold the headline block —
   and contrast is measured in the rendered composition before merge. No full-block scrim; a
   bounded scrim stays available inside the clean zone if measurement demands it.
2. **Portfolio-three versus the shipped six-card grid.** Both draw from the same set. **Default:** the
   three render as the portfolio section and the grid keeps only projects not already featured, so no
   project appears twice on one page.
3. **Carousel interaction form undecided.** **Default:** any horizontal sequence ships as zero-JS CSS
   scroll-snap; the GSAP horizontal-scroll/pin variant waits for an explicit decision.
4. **Closing line unapproved (§14.1).** The shipped heading stays the authored one; no new or
   client-paraphrased line ships without approval.
5. **`portafolio` versus `proyectos` (§4/§5 are internally inconsistent).** The repo resolves to
   "Proyectos"; the label question is carried forward, not assumed.
6. **Service-group names are repo-authored, not client-confirmed (§14.8).** They are descriptive
   taxonomy rather than factual claims, so **default:** ship the authored names and put the
   confirmation on the client list.
7. **Sequencing dependency on foundation's Phase 4.** The presentation half has nothing to present
   until those routes exist.
8. **§7 and §11 are two candidates for one end-of-page job**, and §7's line nearly duplicates the
   logo-derived tagline already in `src/content/site.ts`. Pick one deliberately.
9. **Guadalajara positioning (§14.7) has no mechanism** while the constraint is "SEO only, no office,
   no presence". No city pages or city content may appear as a side effect of service work.

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Weight regression: tiles + masonry publish more photographs, and wrong `sizes` spends bytes for little gain | High | Sizes written against the CSS that exists; transfer measured before any claim. Expect the recorded +52% drift until foundation 5.5–5.7 lands |
| Hero legibility fails once type moves onto the photograph | High | Open Inconsistency #1; contrast measured in the rendered composition before merge |
| The first client boundary hurts LCP/INP or hides content when JS fails | Med | One narrow component; content visible without it; no content behind a JS reveal; GSAP limited to scroll choreography |
| Motion ignores reduced-motion or leaks ScrollTriggers | Med | Per-effect `prefers-reduced-motion` variant; `useGSAP`/`gsap.context` cleanup; `refresh()` after layout changes; no stray `markers: true` |
| Stock leaks into obra (portfolio, masonry, project pages, sitemap) | Med | Structural separation (decision #4); `photos.ts` never reads the stock namespace; `check:images` plus a review check on gallery entries |
| New binaries are permanent history | Med | Minimal stock count; deliberate staging; the guard's 50-file / 20 MB warning is the tripwire |
| Cross-change collisions on `ProjectsGrid.tsx`, `ProjectCard.tsx`, `src/content/site.ts` | Med | Explicit sequencing — land the small shared edit once, or order the slices |
| Foundation is 0/32; if abandoned, the presentation half has no routes | Med | The landing half is additive and ships alone; the dependency is declared, not assumed |
| Editorial integrity slips: unapproved copy or a third party's brand name reappears | Low | Approvals stay in Dependencies; empty stays empty; no third-party brand in service items or comments |
| No test runner: regressions surface only at the build gates | Med | `tsc`, `lint`, `next build`, `check:images` plus the overflow measure; no runner invented (`strict_tdd: false`) |

## Rollback Plan

Slice-based, because the slices are independent in content and effect.

| Slice | Rollback |
|---|---|
| S1 Landing composition + `sizes` | Revert `LandingTemplate` to the current 12-section order; delete the additive section components; `sizes` props revert to the two existing values |
| S2 Navigation shell + motion layer | Revert `Header.tsx`/`site.ts` to the anchor-form nav (foundation keeps anchors resolving); delete the client component and remove `gsap`/`@gsap/react` — motion is additive, so server markup is unchanged without it |
| S3 Services presentation + stock ingestion | Revert `ServicesIndex`/`ServiceRow` to the linear index; remove the new accessor and any section rendering stock. **Sources under `images/editorial/` stay on disk** — rollback unpublishes, it does not delete originals; regenerating outputs is idempotent |
| A layout with wrong `sizes` | A wrong tier is worse than no tier: revert that layout to the site-wide pair rather than ship a label the loader mis-serves |
| This proposal artifact | Delete `openspec/changes/casa-alta-site-redesign/proposal.md` |

No rollback step writes, renames or deletes a file already tracked under `images/`, and none touches
`loader.ts`, `next.config.ts` or `tools/variants.sh`.

## Out of Scope

- **Routes and everything they need** — `/proyectos` and `[slug]`, the four static pages, the SEO
  layer, clean public image URL routing: foundation's Phase 4 and 5. This change consumes them.
- The `tools/variants.sh` srcset normalisation (foundation 5.5–5.7); the loader and `next.config.ts`
  are untouched and the drift is not compensated for site-side.
- Netlify Image CDN, re-encoding the `.jpg` fallbacks, any change to the `deviceSizes` scale.
- **Obra pública** — on hold, not built for, not mentioned. **Estados Unidos** — out of scope.
  **Guadalajara** — SEO positioning only, no office, no presence, no city pages here.
- A test runner: `openspec/config.yaml` records `strict_tdd: false` and forbids inventing one.
- Testimonials and placeholder copy; unfilled narrative fields stay empty.
- Renaming a path that changes a numeric prefix, or writing to an existing file under `images/`.
- Payload CMS (SUSPENDED in foundation).

## Dependencies

- **`casa-alta-web-foundation` Phase 4** (0/32 tasks): the `/proyectos` routes and the nav move to
  routes. Without them only the landing half ships.
- **Human decisions:** the hero legibility approach (#1), the portfolio-three/grid resolution (#2),
  the carousel form (#3), the label (#5), and the §7-vs-§11 line.
- **Client input:** closing-line approval (§14.1), service-group names (§14.8), photo folders and
  narrative (§14.6).
- **Stock assets:** selected Unsplash images with page URL, photographer and licence recorded at
  ingestion.
- **New dependencies:** `gsap` and `@gsap/react` (GSAP is free for commercial use from 3.13.0).

## Success Criteria

- [ ] The landing shows substantially more than 6 of the 144 publishable photographs, all drawn from the repo's own set except stock used strictly as section texture.
- [ ] Portfolio, masonry and project pages contain **zero** stock images.
- [ ] Hero fills the visual viewport (`dvh`/`svh`) with legible type over the image, and its contrast is measured — not asserted.
- [ ] The navbar is transparent over the hero and filled past it, with focus never obscured.
- [ ] Every new layout declares a `sizes` value matching the shipped CSS; the 3-column tier ships only with 3-column CSS.
- [ ] Motion honours `prefers-reduced-motion`; no content depends on a JavaScript reveal; ScrollTriggers clean up.
- [ ] Stock ingestion writes only into new `images/` subtrees; no existing file there is written, renamed or deleted.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npx next build`, `npm run check:images` all pass, and there is no horizontal overflow at 320, 375 or 2560 px.
- [ ] No third-party brand name appears in content, code or comments; no route, SEO artifact or pipeline fix is duplicated from the foundation change.
