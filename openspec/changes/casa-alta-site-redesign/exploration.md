# Exploration: casa-alta-site-redesign

**Change:** `casa-alta-site-redesign` · **Phase:** sdd-explore · **Date:** 2026-09-16 · **Artifact store:** openspec
**Repo:** `/Users/hendrick/Documents/arquitectura-casa-alta-web` · **Primary source:** `brief-cliente.md` (verbatim client answers + a decisions table; its §14 gaps stay gaps)
**Method:** every claim below was read off disk or measured against the current build output (`.next/server/app/index.html`). Sources are named inline. Nothing was invented to fill a brief gap.

## Current State

### The site today

One route (`/` plus `/_not-found`); `src/app/` holds three files. 31 components in a strict atomic tree (`atoms` 9 / `molecules` 9 / `organisms` 12 / `templates` 1). The content seam at `src/lib/content/index.ts` is the only reader of `src/content/*`; components receive props only. The landing composes 12 sections: UtilityBar → Header → Hero → StatsBand → IntroSection → ServicesIndex → ProjectsGrid → ProcessList → Differentiators → Testimonials → ClosingCTA → Footer. **No client component exists anywhere** (`"use client"` appears zero times in `src/`); dependencies are `next`, `react`, `react-dom` only.

### The visual system is not the deficit

- Brand blue `#0e2d78` sampled from the logo; bone greys follow a warm-neutral scale (`globals.css:7-9`); square corners enforced by zeroing the radius scale.
- The display treatment is documented as a reference proportion (`globals.css:83-97`). Exact values: the comment records the reference as 75px / line-height 0.73; Casa Alta's `.display` actually sets `line-height: 0.92` and no size of its own — sizes come from each call site (hero `clamp(1.5rem,7vw,4rem)`, section headings `clamp(2rem,9.6vw,2.5rem)`, service group titles up to `text-5xl`).
- `Button.tsx:14-25` keeps the CTA discipline: `primary` is the only solid brand fill.
- Hero composition is a measured decision (type on clean ground below a 48svh photo; two rejected attempts recorded in `Hero.tsx:15-41`). Priority ships correctly in Next 16 as `<link rel="preload" as="image" …>` — verified in the built HTML; there is no `fetchpriority` attribute, so AGENTS.md's "needs fetchpriority=high" line is stale documentation, not a bug.

### The measured imbalance (client: "luce simple, muerto, sin identidad")

| Fact | Value | Source |
|---|---|---|
| Photos in the corpus | 206 across 14 projects | `manifest.json` |
| Publishable (score ≥ 3) | 144 (62 below grade, never published) | measured per project |
| Photos visible on the landing | **6 of 144 = 4.2%** | built `index.html`: 9 `<img>` = 2 logos + 1 hero + 6 projects |
| Visible words per image | 1,208 / 9 = **134** | given, corroborated by build |
| Layout tiers in use | 2 `sizes` values only: `100vw` ×2, `(min-width: 768px) 50vw, 100vw` ×5 | built HTML |
| Routes serving photos | 1 | route table |
| Testimonials | section renders `null` (empty array by policy) | `Testimonials.tsx` |
| Image URLs the build references | 21 distinct, against a 56.1 MB deployed mirror | `check:images`, design.md §10.6 |

Per-project publishable photos: `02-el-bicho` 41, `08-rbnb-palmarito` 20, `03-casa-blake` 19, `01-plaza-esmeralda` 16, `04-casa-melchor` 14, `06-capilla` 7, `05-cafe-malagua` 6, `07-casa-tarrastro` 4, `10-obra-punta-zicatela` 4, `11-columnas` 4, `09-casa-santa-rosa` 3, `12-vilas-cavan` 3, `13-puente` 2, `14-pavimentacion` 1. Six projects can carry a real gallery (≥7 photos); three carry 1–3 photos.

### Diagnosis test — is the root cause the information architecture?

**Mostly yes, with one qualification.**

- **For:** the visual language is coherent and measured (above), while every deficit the client names maps to *what the page is made of and where a visitor can go*: 138 of 144 publishable photos have no reachable URL; there is no route with depth; the page is a 2-column, text-led column at 134 words/image; every section is heading + paragraph + (list | grid) and there is exactly one full-bleed photographic moment; the brief's own requested moves (hero line ✓ already, tiles, two-level service grid, numbered carousel, flat nav) are all IA-level.
- **Qualification (non-IA contributors):** (a) the testimonials slot is absent **by policy** until real quotes exist — an input gap, not a design gap; (b) "identity" is carried by copy, and project narrative is empty for 12 of 14 projects (`projects.ts` header). The redesign may address hierarchy and photography; it **must not** fill those gaps with invented copy.
- **Correction to a widely repeated figure:** the 134-words-per-image ratio is a *page-level* average, not a per-photo description of every section. The Hero and ProjectsGrid are the only photographic sections; the text-heavy middle (services index: 13 services, 63 bullet items) is where the ratio is set.

### What the brief asks for that already exists

- Hero single declarative line ✓ (3-line `h1` stack, `Hero.tsx`); secondary CTA ✓.
- **The §4.1/§4.2 service expansion is already authored and rendering.** `src/content/services.ts` holds 4 groups / 13 services / 63 bullet items covering all 7 blocks of §4.1 (skateparks, landscape, espacios públicos y deportivos, albercas y exteriores, eco-sustentables, instalaciones eléctricas, hidrosanitarias) plus §4.2 Arquitectura interior — through the existing seam with **zero component or type changes**.
- Nav already carries Proyectos / Servicios / Nosotros / Proceso / Contacto (`site.ts`, rendered by Header and Footer); stats band ✓ (§3); "Empresa 100% mexicana" ✓ (UtilityBar); usted register ✓.
- Remaining services work is therefore **presentation**, not authoring: the current rendering is a linear text index (deliberately "not a grid of cards", per `ServicesIndex.tsx:17-25`), not the brief's two-level grid.

### Overlap with `casa-alta-web-foundation` — resolution

`casa-alta-web-foundation` owns, with requirements + scenarios + a 32-task plan (currently 0/32):

- **Route existence:** `/proyectos/[slug]` and `/proyectos/page.tsx` (task 4.1), `src/app/{servicios,proceso,nosotros,contacto}/page.tsx` (4.4), nav leaving anchors (4.3), `href` passed to `ProjectCard` (4.2), a `(site)` layout (4.5).
- **Gallery data rules:** manifest-sourced, score-filtered (≥3), ordered by manifest `order`, clean slugs without `NN-` (project-pages spec).
- **SEO layer:** image sitemap (`image:image`), `ImageObject` JSON-LD, robots, social cards (seo-discovery).
- **Image delivery + clean-URL routing + the srcset-drift fix in the pipeline** (image-url-routing).
- Deploy contract (deploy-config); editorial integrity policy (editorial-content).

**Not specified anywhere — therefore this change's legitimate scope:**

- the landing's composition and photographic weight (no foundation requirement constrains landing sections);
- the **presentation spec** for the `/proyectos` index and the gallery layout (foundation 4.1 creates the files; no requirement says what renders there);
- the `sizes` tiers beyond the two in use, including a 3-column tier and any additional full-bleed moment (the `web-build` skill's markup rule explicitly anticipates "a 1/2/3-column grid — replace it once the CSS exists");
- the services *presentation* (linear index vs two-level grid), and `/servicios` content presentation once that route exists;
- nav curation (which entries exist) — same file foundation touches (`src/content/site.ts`), so it must be sequenced.

**Verdict: the route work belongs to foundation.** It is fully specified there; duplicating it here would put two spec sets on the same routes. This change reuses it and declares the dependency.

### The verified srcset defect (investigated as instructed; ownership: pipeline, not this change)

**Mechanism.** The manifest's own `srcset` carries true widths (`…-480.avif 360w, …-960.avif 720w, … 1200w`), but the site renders through `next/image` + the custom loader, and Next labels each candidate with the width it **requested**. The loader rounds up to the next real variant, so a label sits below its file (understating) or, at the top of the scale, above it (widest-variant fallback).

**Emitted markup (verified).** The 5 grid cards each declare 6 candidates that resolve to **3 distinct files** (mean 2.86 distinct files per 6-candidate set across all 144 publishable photos); hero and featured card declare 4 candidates → 3 files.

**Cost to the browser**, simulated against the loader's own lookup table and the browser's lowest-sufficient-density rule (144 photos × 10 viewport/DPR scenarios):

- Grid cards (50vw): **14.4%** of photo-scenario pairs fetch a file larger than the smallest available file that covers the slot — mean **1.72× linear / ~2.4× bytes**; worst case 2.08× linear / 4.2× bytes (`08-rbnb-palmarito` cover: the 1500 px file for a 720 px slot).
- Full-width slots (100vw): 4.7% of pairs, 1.62× linear / 2.2× bytes.
- **Today's landing at 1440 px, DPR 1:** the 5 half-width cards fetch **1,334 KB where 877 KB** of the same files would cover the slots (+52%); three of the five fetch a file one real tier above the need (960 / 1200 / 1500 px where a 720 px file exists).
- The `2000w` label always resolves to the widest encoded file (1600 px hero): a capability ceiling — no larger file exists, so this is no worse than ideal.

**Fix ownership.** `tools/variants.sh` width normalisation (foundation's `image-url-routing` requirement + tasks 5.5–5.7). This change MUST NOT compensate in the loader or `next.config.ts`. A site-side alternative exists — emit the manifest's `srcset` verbatim — but it contradicts the specced loader contract, so it is not available.

### Brief ↔ repo conflicts, and brief-internal inconsistencies (for the orchestrator)

1. **Third-party trademark was being published — RESOLVED during this exploration.** `services.ts:43-44` carried two bullet items naming a third-party surface brand, and `ServiceRow` renders `items`; the name appeared **6 times in the built HTML**. The client has since confirmed the brand was only a design reference and instructed its removal. Both items were rewritten to generic material names ("Fachadas en porcelánico y cuarzo", "Pisos y recubrimientos en porcelánico") and every reference was stripped from code comments repo-wide. No exposure remains; §14.5 is closed.
2. **Brief implies photos are pending (§5: "el cliente enviará una carpeta por obra"); the repo already holds 215 source files / 206 ranked photos across 14 projects.** What is actually missing is narrative, already recorded as blocked (foundation 7.1).
3. **Closing line is unapproved.** §11 supplies "La construcción en sencilla con nosotros" (ungrammatical, self-flagged as "o alguna frase similar más profesional"); §14.1 confirms it is open. The shipped heading "Construir con Casa Alta es sencillo" is authored, not approved.
4. **"Portafolio" vs "Proyectos" duplicate the same destination** (§4 lists the "servicio nuevo" as "Proyectos, portafolio, quiénes somos"; §5 is titled "Portafolio / Proyectos"). The brief is internally inconsistent here; the repo's nav resolves it to "Proyectos". A label decision remains.
5. **§4 presents navigation as a "servicio nuevo"** — the brief's own note concedes these are routes, not services.
6. **§4.1 double-lists Landscaping** (under skateparks and as its own block). The repo resolved it as two entries (skateparks → "Landscaping integrado"; Landscape as a service).
7. **§7's line and §11's message are two different candidates for the same end-of-page job**, and §7's "Arquitectura y construcción que perdura." is nearly identical to the logo-derived tagline already in `site.ts` ("Arquitectura que perdura"). Pick one, deliberately.
8. **§10 lists "formulario" among contact destinations.** No form exists and no spec in either change requires one — currently unclaimed.
9. **§14.7 Guadalajara mechanism is undecided** while the scope constraint is "SEO positioning only, no office, no physical presence, no work there". Do not add city pages/content as a side effect of service work.
10. **Authored service naming.** The 4 group titles and 13 service summaries are the repo's own copy, not the client's (§14.8: the client listed bullets "sin un nombre de servicio que las agrupe"). They read as deliberate editorial decisions, but they are unconfirmed.

## Affected Areas

- `src/components/templates/LandingTemplate.tsx` — section order/tone rhythm; any new section (tiles, manifesto, carousel) slots here.
- `src/components/organisms/ProjectsGrid.tsx` — the landing's only photographic grid; holds the two `sizes` values; where tiles / 3-column tiers / a carousel would land. Shared with foundation task 4.2 (`href`).
- `src/components/molecules/ProjectCard.tsx` — the card unit; already takes an optional `href` and a `sizes` prop; a tile variant would be a new molecule or a prop-driven mode.
- `src/components/organisms/ServicesIndex.tsx` + `src/components/molecules/ServiceRow.tsx` — 13 services in 4 groups rendered as a linear index; the requested two-level grid lands here.
- `src/components/organisms/Hero.tsx` — the single declarative line already exists; any added full-bleed moment must not re-open the measured contrast decision.
- `src/content/{home,services,projects,site}.ts` — inputs for new sections, the tiles' category mapping, the featured selection, and nav/CTA curation (nav is also foundation's 4.3 target — sequence it).
- `src/lib/content/index.ts` + `src/lib/content/photos.ts` — new accessors for any new view model; the score filter and manifest join stay here, never in components.
- `src/types/content.ts` — new view-model shapes if a tile/category model is introduced.
- `src/app/page.tsx` — the only route that reads the seam; passes new props.
- `src/app/globals.css` — tokens; per the diagnosis, unchanged. New sections reuse `.display`, `.voice`, `.label`, `Section` tone alternation.
- **Not touched by this change:** `src/lib/image/loader.ts`, `next.config.ts`, `tools/variants.sh` (pipeline-owned), `images/` (read-only), and foundation-owned route files.

## Approaches

1. **Landing recomposition (composition only, no new routes)** — add the client's structural moves to the existing landing: photographic category tiles, a small-caps manifesto line as a section breath, a two-level services grid, a numbered work carousel; plus the `sizes` tiers the new layouts require (e.g. `(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw`).
   - Pros: attacks exactly what measures weak (photo density, rhythm, hierarchy); reuses existing content and the props-only seam; zero overlap with foundation; additive to `LandingTemplate`; tiles lift visible photos from 6 to roughly 12–16 without weight blow-up.
   - Cons: still no route with depth — the portfolio ends at the landing; the carousel is the repo's first interaction decision (no client JS today); does not fix the srcset drift (owned elsewhere).
   - Effort: **Medium** (≈3–5 components in existing layers, 2–4 content files, no token surgery).

2. **Gallery depth via the specced route tree (executed in foundation; consumed here)** — a `/proyectos` index plus `/proyectos/<slug>` galleries exposing all 144 publishable photos within two clicks.
   - Pros: the largest single change to how the site feels (138 photos move from unreachable to published); already specced with scenarios; `ProjectCard` already accepts the dormant `href`; the SEO payoff is already argued in AGENTS.md.
   - Cons: it is foundation's work (0/32 tasks); substantially blocked on client-confirmed narrative for 12 projects; this change cannot build it without duplicating specs.
   - Effort: **High** in foundation's accounting; **Low** here (consume + present).

3. **Combined package (2 + 1, with the presentation specs this change owns)** — landing recomposition plus the presentation layer for the route tree (index layout, gallery layout, `sizes` per layout), sequenced with foundation's Phase 4.
   - Pros: covers surface and depth; the halves reinforce (tiles point at routes that exist); `sizes` written once against real layouts, so labels stay honest; no duplication if the split is respected.
   - Cons: cross-change coordination on shared files (`ProjectsGrid`, `ProjectCard`, `site.ts`); delivery ordering must be explicit.
   - Effort: **Medium-High**.

4. **Minimal weight bump (low-effort baseline, not recommended alone)** — keep the layout, add more cards and one photo band.
   - Pros: smallest diff; no new interaction models.
   - Cons: does not create rhythm or hierarchy — the page stays a long 2-column text column with more thumbnails; unlikely to answer the client's complaint.
   - Effort: **Low**.

Explicitly out of scope for every approach: pipeline variant normalisation (foundation), loader / `deviceSizes` changes (`config.yaml` rules.design), Netlify Image CDN (forbidden), a new test runner (`strict_tdd: false`), publishing score 1–2 photos, anything under `images/`.

## Recommendation

**Adopt approach 3**, with this split and this sequencing:

- **This change owns:** landing composition (tiles, manifesto line, two-level services grid, carousel); the `sizes`/grid tiers including a 3-column tier; the presentation requirements for the `/proyectos` index and gallery layout; services presentation; nav curation.
- **Foundation keeps:** route existence, gallery data filtering, SEO layer, deploy contract, image-url-routing, pipeline fixes. This change **declares a dependency** on foundation's Phase 4 and does not re-spec any route.
- **Smallest set that most changes the feel** (if a first slice must ship alone): tiles + one full-bleed break + the two-level services grid + the manifesto line + matching `sizes` tiers on the landing. Defer the carousel until the interaction decision is made.
- **Do not:** re-specify routes, touch the loader or `next.config.ts`, iterate on unapproved copy, or fill empty content to make the page look fuller.

## Risks

- **Third-party brand naming — resolved.** It was published (6 occurrences in the built HTML) and has been removed from content and from every code comment at the client's instruction. Residual risk: no service item may reintroduce a third party's brand name.
- **Cross-change file collisions** with foundation (`ProjectsGrid.tsx`, `ProjectCard.tsx`, `src/content/site.ts`) — sequence the edits or land the small ones once.
- **Carousel is the repo's first client component** if JS is wanted; zero-JS alternatives (CSS scroll-snap) exist but constrain the numbered-pagination look. Decide explicitly; do not drift into it.
- **`sizes` must match the shipped layout** or the loader serves the wrong file (`Photo` contract) — add 3-column tiers only when the 3-column CSS exists.
- **Empty narrative for 12 of 14 projects** caps what a gallery index can say; authoring it is client work (foundation 7.1), not design work.
- **Foundation is 0/32:** if it is abandoned rather than executed, its route specs must move before this change builds on them.
- **Weight regression risk:** adding photos without correct `sizes` (and before the pipeline fix) spends bytes for little visual gain — measure, never claim.
- **Brief gaps stay gaps:** closing line (§14.1), next-step invitation (§14.2), institutional email (§14.3), testimonials (§14.4), per-project photos/narrative (§14.6), Guadalajara mechanism (§14.7), service-line naming (§14.8). §14.5 is closed — the brand reference was removed.

## Ready for Proposal

**Yes** — provided the proposal carries these decisions: (1) approval of the closing line; (2) `portafolio` vs `proyectos` label; (3) carousel interaction (zero-JS vs first client component); (4) the explicit sequencing/dependency on `casa-alta-web-foundation`'s Phase 4; (5) whether the authored service-group names need client confirmation; (6) the post-exploration design requirements now recorded in the brief's §0 (full-viewport hero, floating navbar, per-section imagery, featured-three portfolio, masonry). The brand-naming question is closed.
