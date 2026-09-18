# Design: casa-alta-site-redesign

**Change:** `casa-alta-site-redesign` · **Phase:** sdd-design · **Date:** 2026-09-17
**Artifact store:** openspec · **Repo:** `/Users/hendrick/Documents/arquitectura-casa-alta-web`
**Inputs:** `proposal.md`, the seven delta specs under `specs/`, `brief-cliente.md` (§0 in force, §14 stays gaps),
`exploration.md`, `casa-alta-web-foundation/design.md` + its `site-pages` and `image-url-routing` specs,
`AGENTS.md`, `openspec/config.yaml` (`rules.design`), the vendored corpus under `references/`.

**Framing.** The seven specs say *what must be true*; this document decides *how*, for the nine
questions the specs deliberately leave open. Two of those questions have a measured answer already
on disk, and this design does not reopen them: the hero's type placement
(`src/components/organisms/Hero.tsx:15-41`) and the image delivery contract
(`src/lib/image/loader.ts`, `next.config.ts`). Everything below is written so a reviewer can check
it: every load-bearing claim carries the file and line it came from, or the measurement that
produced it. Three measurements were taken for this document and are new — the hero clean-zone
enumeration (§D3, Appendix A), the chrome-band measurement (§D2, §D3) and the dependency byte cost
(§D4). Where something could not be verified, §10.2 says so instead of guessing.

---

## 0. Decisions at a glance

| # | Decision | The alternative that lost | Reverting it costs | Evidence lives in |
|---|---|---|---|---|
| D1 | **One** client module: `src/components/organisms/MotionShell.tsx`, exporting `HeaderShell` and `ScrollScene` | Two boundaries (one for chrome, one for GSAP) | The `motion-layer` scenario *"exactly one exists"* fails; two chunks and two lifetimes to keep correct | `specs/motion-layer/spec.md` (Requirement: One client boundary); measured baseline: `"use client"` × 0 in `src/` |
| D2 | Navbar state via **IntersectionObserver** inside `HeaderShell`, state on a `data-surface` attribute | GSAP ScrollTrigger on the hero; CSS `animation-timeline: scroll()` | Re-opens a browser-support question with no gate in this repo, or couples a UI state to the animation library | measured: current hero's chrome band fails both polarities (2.74:1 / 1.17:1), §D3 |
| D3 | Hero type inside the photograph's **clean zone**, chosen per photo and recorded in content; chrome polarity measured too | Type on clean ground below the photo (today); full-block scrim | Re-opens two measured typographic attempts; the block needs ≥ 9.325em of calm width | `Hero.tsx:15-41`; `layout.tsx:14-19`; Appendix A |
| D4 | GSAP for **two** scroll scenes only (masonry drift, full-bleed breath), lazily imported | GSAP for reveals/hover; CSS scroll-driven animations; a hand-rolled rAF listener | Adds 47.4 KB gz to the landing's critical path or ships a library for effects CSS already serves | `references/README.md:34-37`; measured bytes §D4.6 |
| D5 | Masonry as **CSS multi-column** (`columns-1/2/3` + `break-inside-avoid`) | Grid with dense auto-rows; native `grid-template-rows: masonry`; a JS layout | Loses gap-free packing without JS, or ships content behind a script | `references/beautiful-websites/RESPONSIVE.md:26-31` |
| D6 | Three `sizes` values, one per layout, tied to `md:` (768px) and `min-[1200px]` | A fourth "container width" value; guessing the tier from the design | The `responsive-image-tiers` scenario *"each value is one of the three"* fails; the loader serves the wrong file | `specs/responsive-image-tiers/spec.md`; `Photo.tsx:7-11` |
| D7 | Stock under `images/editorial/<slug>/`, encoded by `tools/editorial.sh`, **two** generated files, one merge in `sync-images.mjs` | Reusing `manifest.json`/`photos.ts`; a site-side exclusion list; hotlinking | Either stock leaks into obra surfaces or the loader crashes on a non-array table entry | `sync-images.mjs:103-112`; `loader.ts:32-39`; `photos.ts:1,40-42` |
| D8 | Services as a **two-level grid**: group (`h3`) → service (`h4`) → items, 4/13/63 preserved | Keeping the linear index; a card grid; collapsing items behind a disclosure | Loses one of 63 authored items behind an interaction, or flattens the two levels the brief asks for | `ServicesIndex.tsx:17-25`; measured 4 groups / 13 item arrays / 63 items |
| D9 | Final section order with a photographic/tone walk; §11 wins the end-of-page job, §7 is dropped; all copy reused from authored or client-written sources | A new closing line; §7's line as a second tagline; page photographs for stock texture | Re-opens an unapproved-copy risk and duplicates the tagline a third time | `brief-cliente.md:22-34, 218, 306`; `exploration.md:93` |

Two items the proposal flags are settled here rather than left open: the portfolio-three/grid
split (proposal Open Inconsistency #2) and the carousel form (#3). Both are resolved in §D9.

---

## 1. Technical Approach

The change adds **composition, presentation and one bounded motion layer** to an application that
already builds green. It changes no token, no palette, no route and no pipeline contract.

Four layers, each with one owner — the first three are foundation's and are untouched:

| Layer | Owner | What this change does to it |
|---|---|---|
| Presentation — `src/components/**` (31 files) | hand-authored | adds ~9 files in the existing layers; every new component takes props (`types/content.ts:1-11`) |
| Content seam — `src/lib/content/**` | hand-authored | adds accessors (`getTiles()`, `getMasonry()`, `getEditorial()`); `index.ts` stays the only reader |
| Image delivery — `src/lib/image/**` + `tools/sync-images.mjs` | generated + 42-line loader | **read only.** The loader, `next.config.ts` and `deviceSizes` are not edited |
| Client boundary — **new** | hand-authored, one file | `MotionShell.tsx` owns the chrome's scroll state and the two GSAP scenes; it renders no copy |

Three gates exist and this change invents no fourth:
`npx tsc --noEmit`, `npm run lint`, `npx next build` + `npm run check:images`
(`openspec/config.yaml:46-50`). `strict_tdd: false` and no test runner is added
(`:18`, `:36-45`).

### 1.1 What this design does not do

Stated explicitly, because a reviewer should read the limits as decisions rather than omissions.
Anything in this table appearing in the change's diff is out of scope, not a bonus.

| Not done | Why |
|---|---|
| No token, palette, radius, type-scale or spacing change | The diagnosis is information architecture and photographic weight, not the visual system (`exploration.md:13-18`) |
| No change to `src/lib/image/loader.ts`, `next.config.ts`, `deviceSizes`, `tools/variants.sh`, the `.jpg`/`.png` fallbacks, or the delivery path | `rules.design` (`openspec/config.yaml:67-79`); the CDN/WebP measurements are not re-litigated |
| No new route, and no edit to foundation's route files, sitemap, `robots`, JSON-LD, social cards, `metadataBase` or clean public image URLs | Foundation's Phase 4–5; this change consumes them and declares the dependency |
| No compensation for the srcset descriptor drift | It is a bounded pipeline limitation; the fix is `variants.sh` (foundation 5.5–5.7) |
| No test runner, no snapshot suite, no new quality gate | `strict_tdd: false`; the four gates above are the verification model |
| No authored narrative, no testimonials, no closing line, no institutional email | `projects.ts:15-21` policy and `brief-cliente.md:306-313`: an empty field is a to-do |
| No per-city or Guadalajara content, no US content, nothing about public-sector clients | `brief-cliente.md:31-32, 101`; §14.7 has no mechanism yet |
| No publishing of score 1–2 photographs, and no renumbering of any published path | `AGENTS.md`; `photos.ts:52-60`; `git-guard.sh:81-112` |
| No write, rename or deletion of a file already tracked under `images/` | `git-guard.sh:114-122` |
| No carousel client component and no horizontal GSAP pin | Proposal Open Inconsistency #3's default: zero-JS CSS scroll-snap |
| No stock anywhere except the services section (one image per service, thirteen today) | `references/README.md:38-42`; §D7 |
| No choice of hero photograph in this phase, and no merge of the full-viewport shell before the rendered measurement passes | §D3.3–D3.4: the measurement decides, and `Hero.tsx:15-41` records what skipping it cost |

**Four things are genuinely the client's to decide, and this design ships the stated default until
they do:** the nav label (`portafolio` vs `proyectos` → ships `Proyectos`, `site.ts:23`); the
service-group names (→ ship as authored, `brief-cliente.md:313`); the closing line (→ the shipped
authored heading stands, `brief-cliente.md:306`); and the subjects of the thirteen editorial images
(→ one per service, the section's own texture, amended 2026-09-17: originally one band of two, then
one per group, now one per service). Each is a content edit with no component change.

---

## 2. Architecture Decisions

### D1 — The client boundary: one module, two exports, no content inside it

**Choice.** Exactly one module carries `"use client"`:

```
src/components/organisms/MotionShell.tsx      ← "use client", line 1. The only one.
  export function HeaderShell({ children, chrome })   → renders <header data-surface …> + children
  export function ScrollScene({ mode, children })     → wraps a photographic section; GSAP lives in the sibling below
src/components/organisms/gsap-scenes.ts       ← NO directive. Imported only by ScrollScene, dynamically, client-side.
```

**What the boundary owns.** The `<header>` element and its `data-surface` attribute; the
IntersectionObserver that flips it; the `--chrome-h` custom property derived from the header's
measured height; and the two scroll scenes' timelines (via the lazily imported factory).

**What it does not own.** Every string, link, image and heading. `Header.tsx` still composes the
logo, the six nav entries and the CTA on the server and passes them as `children`; next/image
still renders every photo on the server; no component becomes async and no accessor moves.

**Alternatives rejected.**

| Alternative | Why rejected |
|---|---|
| Two client modules (one for the chrome, one for GSAP) | `specs/motion-layer/spec.md` fixes the count at exactly one module under `src/`, and `specs/navigation-shell/spec.md` reproduces that rule ("MUST NOT add a second one"). Two modules is a spec violation, not a style preference |
| A React context/provider at the root holding the scroll state | Moves content-adjacent state into the client and re-renders the tree; the state is one boolean on one element, which an attribute carries for free |
| Writing the state to `document.documentElement` from a null-rendering client component | Keeps `<header>` a server component, but the state then exists nowhere in the markup, and SSR/hydration cannot agree on a value (the first paint and the post-hydration paint disagree by construction) |

**Proof that content stays visible without it.** The server HTML already contains the header's
content; nothing this change adds is conditional on hydration:

- The module renders a `<header>` wrapper plus `{children}`. Children are composed by the server
  component `Header.tsx:27-52`, so the emitted document is byte-identical in content with or
  without the client chunk.
- The state change writes one attribute (`data-surface="page"`); the document ships
  `data-surface="hero"` as its default, which is the state at scroll 0 — the state most visits
  start in, so hydration does not repaint the chrome.
- No inline style written for a reveal exists in this change. The only inline styles the landing
  emits today are `Counter`'s progress width and next/image's `color:transparent`
  (measured: 10 `style=` attributes in `.next/server/app/index.html`).

Measured baseline for the check: the built landing emits 1 `h1`, 6 `h2`, 20 `h3`, 13 `h4`, 24
anchors and 8 `<section>` elements, with 6/6 nav labels present as links
(`.next/server/app/index.html`, this session).

### D2 — Navbar scroll behaviour: IntersectionObserver in the boundary

**Choice.** `HeaderShell` observes the hero element with an observer whose root box is the
viewport minus the header band:

```ts
// HeaderShell — client only
const h = headerRef.current.offsetHeight;                 // 69px base / 77px md+ (see §5.4)
root.style.setProperty("--chrome-h", `${h}px`);           // the hero pulls itself up by this
new IntersectionObserver(
  ([entry]) => setSurface(entry.isIntersecting ? "hero" : "page"),
  { rootMargin: `-${h}px 0px 0px 0px`, threshold: 0 },
).observe(document.getElementById("hero")!);
```

The geometry is the spec's sentence, not an approximation: the hero intersects the shrunken root
box exactly while some part of it lies below the header band. When its bottom edge passes the
navbar, intersection ends and the header takes its fill — `specs/navigation-shell/spec.md`
(Requirement: Transparent over the hero, filled past it).

**Why the header can sit on the photograph at all.** The header is `sticky top-0`
(`Header.tsx:29`) and in flow, so at scroll 0 the hero starts *below* it. The hero therefore takes
a negative top margin of `var(--chrome-h, 4.5rem)` and the chrome overlays the photo's top band.
The default (`4.5rem` = 72px) is within 3px of the measured header height at both breakpoints, so
the pre-hydration layout is already correct and hydration does not shift it; with JavaScript off
the variable never changes and the hero simply starts below the chrome — a legible, conventional
layout, not a broken one.

**The state is not decoration; it is a legibility switch, and the current hero cannot carry it.**
Measured for this design (Appendix A.2, top 12% of the image, the band the header floats over):

| Asset | band mean luma | band sd | white chrome | ink chrome | verdict |
|---|---|---|---|---|---|
| **current hero** `hero/vista-aerea-palapas-alberca-playa` | 0.625 | 48.3 | 1.17:1 | 2.74:1 | **neither polarity reaches 4.5:1** |
| `02-el-bicho/31-fachada-iluminada-nocturna` | 0.007 | 0.6 | **20.50:1** | 1.11:1 | white chrome, no scrim |
| `08-rbnb-palmarito/19-colado-concretera-vista-mar` | 0.701 | 3.7 | 1.88:1 | **7.94:1** | ink chrome, no scrim |
| the other five shortlisted candidates | 0.23–0.64 | 7.4–27.1 | 1.2–2.8:1 | 1.1–4.3:1 | need a bounded top scrim |

That is why the header is opaque today (`bg-canvas/95 backdrop-blur`, `Header.tsx:29`): the
photograph could not hold it. The transparent state therefore ships only with a hero that passes
the chrome-band criterion, and the polarity is recorded as data, not chosen by eye.

**Alternatives rejected.**

| Alternative | Why rejected |
|---|---|
| A GSAP ScrollTrigger on the hero that toggles the fill | Correct, but it makes a UI state depend on the animation library: with the chunk still loading (D4 loads GSAP lazily) the header would have no state at all. It also collapses the only two things in this change that are deliberately separate — state and choreography |
| CSS only, `animation-timeline: scroll()` on a scroll-driven timeline that swaps the fill | Zero bytes and no observer, and it would be the first choice if support were universal. It is not, and this repository has no gate that can catch a browser that ignores the timeline: the header would silently stay transparent over a photo. Support was **not** re-verified at design time (no working external fetch in this session, §10.2); the decision does not rest on the exact version list, because the fallback is needed anyway and the boundary already exists for D4 |
| A `scroll` event listener + `getBoundingClientRect` on every frame | The observer is the purpose-built API for "is this still intersecting", costs no per-frame work, and cannot drift from the layout the way a cached offset does |

**Fallback when JavaScript is unavailable or the hero is not a photographic one.** The default
attribute in the server HTML is `data-surface="hero"`, and the fill rule is expressed so that the
*content* is never inside the state: entries, logo and CTA render as links either way
(`specs/navigation-shell/spec.md`, Requirement: No content lives behind the state change). If the
chrome band fails measurement (§D3), the shipped default flips to `data-surface="page"` — the
filled chrome — and the transparent state is dropped for that hero rather than shipped illegible.

### D3 — The hero: how the clean zone is found, and what "found" means

**Choice.** The hero is a `min-h-svh` shell; the photograph fills it; the headline block sits
inside the photograph's clean zone at a placement the photograph chooses, recorded in content.
The photograph is a **selection criterion** with a gate, not a preference.

**1 — What a clean zone is, stated as a measurable predicate.** A rectangular window of the
photograph, in the shipped crop, that satisfies at once:

| Property | Floor | Why this value |
|---|---|---|
| Local busyness (standard deviation of pixel luminance) | **≤ 12 / 255** in the shipped window | The measured decision records that *variance, not mean luminance, breaks type* (`Hero.tsx:26-30`). The current hero measures **30.6** by the same proxy, and its type failed at full resolution |
| Worst-case contrast for the chosen type colour | h1 stack **≥ 3:1**; the eyebrow, subheadline and CTA labels **≥ 4.5:1** | The spec's scenario names the 3:1 large-text floor; `references/beautiful-websites/ACCESSIBILITY.md:8-15` and `VISUAL-DESIGN.md:136-143` put ordinary text at 4.5:1, and the subheadline is `text-lg md:text-xl` — ordinary text |
| Width | **≥ 9.325em** at the rendered size (≈597px at the 4rem cap) | Measured against the shipped Montserrat 600, the stack's widest line "y construcción" sets 9.325em and a word cannot wrap (`Hero.tsx:37-40`, `layout.tsx:14-19`). At 1440px that is 41.5vw — the zone must be at least 42vw wide, and the block is capped at 46ch |
| Height | **≥ 40%** of the shell | The shipped comment records the block at ~55% of the hero height (`Hero.tsx:32-33`); the design's own window is 40% so the shortlist is not over-filtered before the rendered check |

**2 — How the candidates are enumerated from the repo's own 206 photos.** Four filters, in order,
all reproducible from `images-optimizado/manifest.json`:

1. `score ≥ 3` — the repo never publishes the 1/5 and 2/5 photos (`photos.ts:52-60`, `AGENTS.md`
   "Site-side rules"). 144 of 206 survive (measured, Appendix A.1).
2. Landscape (`full.width > full.height`) — a full-viewport shell is a wide slot; 64 of the 144.
3. `full.width ≥ 1600` — the slot is `100vw`, and the loader serves the widest file when nothing
   covers the request (`loader.ts:38-39`); 27 candidates survive.
4. The clean-zone proxy (busyness ≤ 12 and ≥ 3:1 for one polarity, window = 40% × 40%): **7 of
   27** survive. Appendix A lists them with their numbers; the top four are El Bicho's lit night
   façade (sd 6.0, white type 13.8:1), Palmarito's pour over the sea (8.3, ink 8.4:1), and two
   Capilla El Tule interiors (9.1 and 9.4, ink 4.3–5.1:1).

The proxy runs in **2.4 seconds** over the 27 files with ImageMagick and a 50×40 greyscale grid
(Appendix A.1). It is a *shortlist*, not the gate: it cannot see the rendered composition, the
crop, or the type at its real size.

**3 — The gate that decides.** Before merge, with the hero built:

| Step | Command | Pass condition |
|---|---|---|
| Render at each shipped breakpoint | `npx next build && npx next start`, screenshots at 1440×900, 1024×768, 768×1024, 375×812 | — |
| Contrast inside the block | sample the block's bounding box per breakpoint; take the worst pixel; compute WCAG contrast for the shipped type colour | h1 ≥ 3:1; supporting lines ≥ 4.5:1 |
| Chrome band | same method on the top `var(--chrome-h)` band | the chosen chrome polarity ≥ 4.5:1 |
| Record | paste both numbers into the hero's own comment, next to the two failed attempts (`Hero.tsx:15-41` is the precedent) and into `home.hero.placement` | the numbers exist in the diff |

If the numbers do not pass, the remedies are, in order: (a) move the placement to another clean
window of the same photo (§5.3 has the `h`/`v` fields for exactly this); (b) invert the polarity;
(c) a **bounded scrim inside the clean zone** — permitted by the spec ("A bounded scrim inside the
clean zone MAY be added if measurement demands it"), capped in size and opacity, never a
full-block scrim; (d) reject the photograph and take the next candidate. The order matters: the
spec's other scenario says a photo whose variance breaks type *"is rejected as a photograph, not
rescued with a full-block scrim"*.

**4 — What happens until one is chosen.** The interim is the shipped composition, unchanged:
`h-[48svh] min-h-[340px]` with the type on clean ground below (`Hero.tsx:45-49`). The slice that
carries the hero does not merge the full-viewport shell for a photograph that has not passed —
the shell and the type move together. Two things make this cheap rather than blocking:

- **The hero need not be a new encode.** If a corpus photo is chosen, its tiers already exist in
  `variants.generated.json` and `home.hero.image` simply points at `/images/<dir>/<base>.avif`;
  no pipeline run, no new binaries. Only a source *outside* the archive goes through
  `tools/hero.sh`, whose `SLUG` is currently a literal (`hero.sh:17`) — that one line becomes
  `SLUG="${1:-vista-aerea-palapas-alberca-playa}"`, and its sidecar write becomes read-merge-write
  so a second hero source cannot evict the first key from `hero.json` (`hero.sh:49-56`).
- **The headline block is not re-authored.** The stack, the eyebrow (which deliberately does not
  repeat the utility bar's claim, `Hero.tsx:51-57`) and both CTAs are unchanged; only their
  placement and colour become data.

**5 — Honest limits.**

- The corpus tops out at 1600px for every shortlisted candidate (only one publishable photo is
  2000px wide — `14-pavimentacion/01`, and it fails the proxy at sd 25.8). On a 1440px viewport at
  DPR 2 the browser asks for 2880 and the loader returns the widest file it has
  (`loader.ts:38-39`): the hero is upscaled. That is the same bounded fallback the 48svh hero
  already used, now more visible because the shell is larger. Fixing it is a pipeline matter
  (`rules.design`), not a site one.
- A hero drawn from the archive also appears in a project gallery later. The landing must not
  spend it twice: the masonry and the tiles exclude the hero's source, checked by the distinct
  source count in §6.

### D4 — GSAP scope: two scrubbed scenes, lazily loaded, nothing else

**Choice.** GSAP owns exactly what scroll position drives and CSS cannot express:

| Surface | Effect | Owner | Why |
|---|---|---|---|
| Hero | none | — | Above the fold. A tween on load is explicitly a violation (`specs/motion-layer/spec.md`, Requirement: CSS owns everything `@keyframes` can serve) |
| Category tiles | photo scale on hover/focus | CSS | `transform`, no scroll position (`ProjectCard.tsx:49-53` is the shipped precedent) |
| Manifesto line | none — it is the breath | — | A display line whose whole job is to be still |
| Featured three, remaining grid | hover scale + title colour, on `:focus-visible` too | CSS | `specs/portfolio-presentation/spec.md` requires the affordance on focus; that is a `group-focus-visible:` class |
| Services grid | row hover tint | CSS | micro-state |
| **Masonry** | columns drift at different rates as the section crosses the viewport | **GSAP** | scrubbed `y` translate, per-column offsets: scrub by definition |
| Process, Differentiators | none | — | text sections |
| **Second full-bleed moment** | scrubbed `scale` (1.06 → 1) and `yPercent` on the image | **GSAP** | a photograph that settles as the band crosses the viewport; `scrub`, transform-only, no `pin` |
| Navbar | state swap | client, **not GSAP** | §D2 |
| Horizontal sequence (proposal #3) | zero-JS CSS scroll-snap | CSS | The proposal's default stands: a pinned horizontal GSAP sequence waits for an explicit decision |

No `pin` ships in this change. Pinning was considered for the second full-bleed moment and
rejected: `pin: true` inserts a spacer and rewrites scroll length, which interacts with the
sticky/overlay chrome and with `ScrollTrigger.refresh()` on a page whose images load late
(`skill-gsap-scrolltrigger.md:174-188`). A scrub with no pin gives the same visual idea and no
layout surgery.

**Registration, scoping, cleanup.**

```
src/components/organisms/MotionShell.tsx    ("use client")
  import { useGSAP } from "@gsap/react";           // ~1.1 KB gz; the hook, not the library
  gsap.registerPlugin(useGSAP);                    // module scope is safe: it stores a hook, it does not touch the DOM
  // inside ScrollScene:
  useGSAP((context) => {
    let cancelled = false;
    (async () => {
      const { createScenes } = await import("./gsap-scenes");   // gsap loads here, client-only
      if (cancelled) return;
      context.add(() => createScenes({ scope: scopeRef.current! }));  // added to this context → reverted with it
    })();
    return () => { cancelled = true; };
  }, { scope: scopeRef });
```

`gsap-scenes.ts` registers `ScrollTrigger` once behind a module-level flag, enters
`gsap.matchMedia()`, and builds the timeline **only** under
`(prefers-reduced-motion: no-preference)` (`specs/motion-layer/spec.md`, Requirement: Motion
honours prefers-reduced-motion). `gsap.context()`/`useGSAP` with a scope ref is the pair the spec
names; `useGSAP` is the corpus's preference (`skill-gsap-react.md:29-48`) and it is what reverts
the lazily added scenes, which a hand-written `ctx.revert()` would have to remember.

**Why the dynamic import.** `HeaderShell` will be imported by foundation's future `(site)`
layout, so anything statically imported by this module is on **every** route's graph. Measured
today: the landing ships 628,750 B raw / **187,750 B gz** of JS across 8 chunks. A static GSAP
import would add **47,366 B gz** to every route that renders the header; the dynamic import puts
it in a separate chunk fetched after hydration only where a scene exists (the landing). The
corpus explicitly allows this: *"Dynamic import inside useEffect is an option if tree-shaking or
bundle size is a concern"* (`skill-gsap-react.md:123`). The trade is stated plainly: the scrub
starts a few hundred milliseconds after hydration on a cold cache, and the server HTML is the
settled state, so nothing moves when it arrives.

**Byte cost of the two new dependencies** (measured from the published tarballs' `dist/` files,
this session — not estimates):

| Package | File | Raw | gzip -9 |
|---|---|---|---|
| `gsap` (core + CSSPlugin) | `package/dist/gsap.min.js` | 72,927 B | 28,314 B |
| `gsap` (ScrollTrigger) | `package/dist/ScrollTrigger.min.js` | 44,575 B | 17,982 B |
| `@gsap/react` | `package/dist/index.js` | 2,631 B | 1,070 B |
| **Total** | | **120,133 B** | **47,366 B gz** |

`@gsap/react`'s 1.1 KB gz buys the automatic revert of scenes that are created *after* the effect
body returns — the exact hole the lazy import opens. A bundler's own chunk will differ by a few
KB from the sum of these files; §6 re-measures the emitted chunk.

**Alternatives rejected.**

| Alternative | Why rejected |
|---|---|
| GSAP for the hover states and the section reveals too | The corpus's first constraint: *"do not add a heavy library, animation system, or client boundary for an effect already served by simple CSS"* (`references/README.md:34-37`), adopted as a requirement in the motion-layer delta. A reveal whose trigger is not scroll position stays CSS |
| CSS scroll-driven animations instead of GSAP | Same support problem as §D2, plus they cannot pin. It would be the smaller answer if support were universal |
| A hand-rolled `scroll` listener + `requestAnimationFrame` writing `transform` | ~150 lines the repo would then own, with no scrub smoothing, no refresh model and no cleanup contract — and it still needs the same client boundary |
| Statically importing GSAP in `MotionShell.tsx` | 47.4 KB gz on every route once foundation's layout imports the header (§D4 byte table) |

**`ScrollTrigger.refresh()` policy.** Refresh **once** after the landing's images and fonts settle
— `document.fonts.ready.then(refresh)` plus a single `window` `load` refresh — because the trigger
positions move when the hero's photograph and the masonry's intrinsic boxes land. Resize is
GSAP's own job (debounced 200 ms) and is **not** handled by hand
(`skill-gsap-scrolltrigger.md:266`, `skill-gsap-performance.md:61-65`). `markers: true` does not
ship; no scene writes `will-change` (only two elements animate, and only while their band is on
screen).

### D5 — Masonry: CSS multi-column

**Choice.**

```tsx
<div className="mt-14 columns-1 gap-6 md:columns-2 min-[1200px]:columns-3">
  {items.map((p) => (
    <div key={p.src} className="mb-6 break-inside-avoid">
      <Photo photo={p} sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" fit="intrinsic" />
    </div>
  ))}
</div>
```

**Why.** Four criteria, in the order the question asks them:

| Criterion | Multi-column | Grid + `dense` auto-rows | JS layout |
|---|---|---|---|
| Reading order | DOM order is preserved; visual order runs **down each column** (`clientHeight` grows by column). The masonry items are independent photographs with authored alt text, not prose or a sequence, so a column-major scan reads correctly — the caveat is recorded rather than hidden | Row-major, but only with `dense`, which back-fills holes and therefore reorders items visually anyway | Either, at the cost of a script |
| Layout shift | **Zero.** Each item keeps its intrinsic aspect ratio; `width`/`height` come from the manifest (`photos.ts:34-35`) and `break-inside-avoid` keeps a box together | Holes unless `dense`; span arithmetic must stay in sync with every aspect ratio | Items commonly start hidden → a shift *and* content behind JS |
| `sizes` + CLS | Column width is uniform and CSS-determined, so the declared tier is exactly true and the loader serves the right file | Also uniform — `sizes` is fine | Needs measurement to choose a width, which is the thing `sizes` exists to avoid |
| Zero-JS | **Yes.** Every item is in the server HTML and visible with the stylesheet alone | Yes | No |

The repo's own responsive guidance points the same way — *"if a layout feels too wide, split into
columns instead of stretching content"* (`references/beautiful-websites/RESPONSIVE.md:26-31`).
`grid-template-rows: masonry` was rejected on support: it is not a shipped cross-browser feature
in the engines this site must serve, and a masonry that collapses to a ragged grid in one browser
is worse than one that is deliberately column-major everywhere.

**Consequence for the atom.** `Photo` currently forces `h-full w-full object-cover`
(`Photo.tsx:39`), which is right for fixed aspect boxes and wrong for a masonry that must keep
intrinsic ratios. A boolean utility cannot be overridden by class-string order (both
`h-full`/`h-auto` land in the same Tailwind layer), so the atom gains an explicit
`fit?: "cover" | "intrinsic"` prop, defaulting to `"cover"` so all existing call sites are
byte-identical. `next/image` still receives `width`/`height`, so the box is reserved before the
bytes arrive.

### D6 — `sizes` per shipped layout

Every layout this change ships, the exact string it declares, and the CSS that makes it true. The
three values are the spec's, unmodified; **no fourth value is introduced**
(`specs/responsive-image-tiers/spec.md`).

| Layout | Columns (<768 / 768–1199 / ≥1200) | `sizes` | CSS that makes it true |
|---|---|---|---|
| Hero (full-viewport shell) | 1 / 1 / 1 | `100vw` | `min-h-svh w-full` shell, photo filling it (`Hero.tsx:45-46`, unchanged value) |
| Category tiles (4) | 1 / 2 / 2 | `(min-width: 768px) 50vw, 100vw` | `grid-cols-1 md:grid-cols-2` — 2×2 from `md`; there is never a third column, so the 2-column tier is exact |
| Featured portfolio — lead row | 1 / 1 / 1 | `100vw` | the shipped wide-row pattern: `md:col-span-2` inside `md:grid-cols-2` (`ProjectsGrid.tsx:51-61`) |
| Featured portfolio — two cells | 1 / 2 / 2 | `(min-width: 768px) 50vw, 100vw` | same grid, single cells (`ProjectsGrid.tsx:64-70`) |
| Remaining grid (3 projects) | 1 / 2 / 3 | `(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw` | `grid-cols-1 md:grid-cols-2 min-[1200px]:grid-cols-3` |
| Masonry (9 images) | 1 / 2 / 3 | `(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw` | `columns-1 md:columns-2 min-[1200px]:columns-3` |
| Portfolio index `/proyectos` | 1 / 2 / 3 | `(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw` | same grid classes |
| Project gallery | 1 / 2 / 2 | `(min-width: 768px) 50vw, 100vw` | `grid-cols-1 md:grid-cols-2` |
| Full-bleed moments (hero, 2nd moment) | 1 / 1 / 1 | `100vw` | a `w-full` block **outside** `Container`, height in `svh`, photo `object-cover` |
| Services panel image (one per service) | 1 / 2 / 2 | `(min-width: 768px) 50vw, 100vw` | the image half of a two-column alternating panel (`ServiceRow`) |

Two properties of this table are load-bearing:

- **`min-[1200px]`, not `xl:`.** Tailwind's default `xl` is **1280px**
  (`Header.tsx:39` writes `gap-4 xl:gap-7` against that scale). The spec's third column starts at
  **1200px**, so
  the third-column CSS must be written as the arbitrary variant `min-[1200px]:` — or the shipped
  CSS and the declared tier disagree and the spec's own boundary scenario fails at 1200px.
- **`sizes="100vw"` is a srcset hint, not a width rule.** `100vw` as a *CSS width* — including
  Tailwind's `w-screen` — is banned: it includes the scrollbar and would break the overflow
  requirement that passes today. Full-bleed width is `w-full` inside a full-bleed container
  (`specs/responsive-image-tiers/spec.md`). One honest consequence is recorded rather than
  papered over: the wide rows that live *inside* the capped `Container`
  (`Container.tsx:16`) are ~91vw at a 1440px viewport, so `100vw` over-declares there. That is the
  shipped, spec-blessed pair — hero (`Hero.tsx:46`) and featured card (`ProjectsGrid.tsx:59`) —
  and the alternative, inventing a "container width" value, is forbidden by the same spec.
- **Verification reads both spellings.** Next 16 emits `sizes` on lazy `<img>` tags and
  `imageSizes` on the `<link rel="preload">` for priority images (measured: the hero's preload
  carries `imageSizes="100vw"`, and `fetchpriority` appears 0 times, as
  `proposal.md:9-10` records). The §6 check collects both.

### D7 — Stock ingestion: namespace, encoder, sidecars, provenance, and the structural proof

**Choice.** A five-step path, all of it inside the repo's own pipeline.

```
images/editorial/<slug>/<slug>.jpg          ← downloaded source, add-only, never re-encoded
images/editorial/<slug>/provenance.json     ← the committed licence record
        │  bash tools/editorial.sh <slug>    (mirrors tools/hero.sh: same flags, same skip rule)
        ▼
images-optimizado/editorial/<slug>.avif     + -480 / -960 variants + byte-copied fallback
images-optimizado/editorial/editorial.json            ← loader sidecar, hero.json's shape
images-optimizado/editorial/editorial.dimensions.json ← w/h/fallback for the seam
        │  pnpm images:sync  (tools/sync-images.mjs)
        ▼
public/images/editorial/**            +  variants.generated.json gains "editorial/<slug>" keys
```

**The encoder** mirrors `tools/hero.sh` exactly: `magick -auto-orient -resize 2000x2000> -strip
-quality 62`, tiers `480 960`, `MIN_GAIN=1.1` skip rule, ascending sidecar order
(`hero.sh:20-23, 30-47`). Two differences, both deliberate:

1. **Input is a slug, and the slug is validated first** — `^[a-z0-9][a-z0-9-]*$`, existing source
   directory, no `..`, no spaces, no leading `-`. `hero.sh` needs none of that because its slug is
   a literal (`hero.sh:17`); this script takes an argument, so the validation is the boundary.
2. **It refuses to encode an image whose provenance record is missing or incomplete** (page URL,
   photographer, licence — `specs/stock-imagery/spec.md`, Requirement: Every stock image carries a
   provenance record). The gate for "an image with a missing record MUST NOT ship" is therefore at
   ingestion, in the same script that produces the bytes, instead of in a third checker that could
   be skipped.

**Two generated files, not one — and the reason is a hard type constraint.** The loader's table is
`Record<string, [number, string][]>` and it does
`entries.filter(([available]) => available >= width)` (`loader.ts:32-39`). A second entry shape in
that file — say an object carrying width/height — would make `entries.filter` throw at runtime,
on the server, inside the loader. So the loader sidecar stays exactly `hero.json`'s shape
(`{ "<namespace>/<slug>": [[width, filename], …] }`, ascending —
`hero.sh:38, 49-56`), and the extra dimension data the `Photo` view model needs
(`types/content.ts:14-20` requires `width` and `height`) goes in its own file that the loader never
reads. Note the precedent: today the hero's dimensions are hand-typed in content
(`home.ts:5-10`) — generated dimensions remove that class of drift.

**The merge** is six lines, next to the hero's, in `tools/sync-images.mjs` after line 112:

```js
try {
  Object.assign(variants, JSON.parse(readFileSync(join(source, "editorial", "editorial.json"), "utf8")));
} catch { /* no editorial set ingested yet */ }
```

The mirror needs **no change at all**: `collectAvif` walks the whole `images-optimizado/` tree
(`sync-images.mjs:41-50`), so the new AVIFs are mirrored and the gate sees them. Keys are
namespaced (`editorial/<slug>`), which cannot collide with the `<NN>-<project>/<base>` keys the
manifest produces (`sync-images.mjs:91-101`).

**Provenance.** One record per ingested image, committed beside the source:
`images/editorial/<slug>/provenance.json` with `sourceUrl`, `photographer`, `licence`, `retrieved`
(ISO date) and `sha256` of the source bytes. It is a licence record, not copy and not a comment:
it is never rendered into the page, and the source's brand string stays out of `src/`, out of the
built HTML and out of comments — the design refers to it as "the source the client authorised in
`brief-cliente.md` §0" everywhere else.

**Structural proof that stock cannot reach obra** (five independent reasons, in the order a
reviewer can check them):

1. `photos.ts` imports **only** the manifest (`photos.ts:1`) and resolves projects through
   `manifest.projects` (`photos.ts:40-42`). Editorial files are not in the manifest: it is produced
   by `tools/manifest.pl` from the 14 project folders, and `stats.projects` is **14** (measured).
2. Every project-facing accessor goes through `buildProject()`, which returns `null` unless a
   project has editorial data **and** a manifest entry **and** a cover (`index.ts:57-74`) — a
   stock slug has none of the three, so it cannot become a `Project`.
3. The landing's portfolio, the masonry and the grid consume `Project`/`Photo` view models; the
   editorial images arrive through a *different* accessor (`getEditorial()`) with a different view
   model, used by exactly one section (the services catalogue).
4. Foundation's image sitemap derives `<image:image>` entries from project galleries, which
   derive from the same manifest path as (1) and (2).
5. The on-disk namespaces differ (`images/editorial/` versus `images/<NN>-<project>/`), so a
   filter is never involved — the separation is a directory boundary, which is what the spec asks
   for ("MUST be structural … not a site-side exclusion list").

Checks in §6 turn three of those into command output: no `/images/editorial/` URL inside the
portfolio or masonry markup, `grep -r "editorial" src/components` limited to the services section, and
the sitemap entries audited once foundation ships.

**Staging.** Add-only, and the guard is the tripwire this change leans on: it **denies** any staged
modification or deletion of a tracked file under `images/` (`git-guard.sh:114-122`) and **warns**
above 50 staged files under `images-optimizado/` or ≥20 MB of new content
(`git-guard.sh:149-156`). The change ingests **one editorial image per service — thirteen today**;
at that count the ingest lands within reach of the 20 MB warning, so the staging is checked, not
assumed. If a future ingest wants more, the warning is the signal to ask, not to proceed.

### D8 — Services presentation: the two-level grid over 4 / 13 / 63

> **Amended 2026-09-17 — what shipped is not this grid.** The client read the linear index as a
> report, not as architecture ("parece más un informe"). The catalogue now renders as **four
> editorial chapters**: a chapter number, the group title and its intro, then each service as an
> **alternating photographic panel** (`ServiceRow`) carrying one editorial image per service. The
> invariants this section protected are unchanged — 4 groups, 13 services and 63 items all render
> in the authored order, the heading levels stay `h2`/`h3`/`h4`, and nothing sits behind an
> interaction. What changed is the arrangement and the imagery (one image per service, not per
> group). The grid below is kept as the record of the decision it replaces.

**Choice.** One section, two levels, no interaction gate:

```
ServicesIndex (h2 "Lo que construimos" — unchanged)
└── for each of 4 groups:                       ← level one
    ├── <h3 class="display">  group title        ("Proyecto y diseño", "Construcción", …)
    ├── <p> group intro                          (authored, `services.ts:19`)
    └── grid, 1 col → md:2 cols → min-[1200px]:2 cols
        └── for each service:                    ← level two
            ├── <h4> title        + <p> summary
            └── <ul> items, `grid-cols-1 sm:grid-cols-2 max-w-[56rem]`
```

**What this changes and what it keeps.** The linear index becomes a chaptered, photographic
catalogue over the *same* data: 4 groups and 13 services still render, in the authored order, none
merged or moved (`specs/services-presentation/spec.md`, Requirement: The catalogue renders as
chapters with one panel per service).
The heading levels are exactly as specified — section `h2`, groups `h3`, services `h4`
(`ServicesIndex.tsx:47` already sets the group titles as `h3`; `ServiceRow.tsx:17-19` already sets
the service title as `h4`) — so the structural change is the *arrangement*, not the semantics.
**Every item stays in the output**: the rendered item count equals the file's, 63 (measured this
session; the proposal's "44 items" figure was stale), and nothing sits behind a disclosure:
`ServiceRow.tsx:27-32` already renders the full list, two columns from `sm`, inside a 56 rem cap.

**How 63 items stay scannable.** Three devices, all already in the file and kept:

| Device | Value | Why it holds at 63 items |
|---|---|---|
| Group separation | `gap-16 md:gap-24` between groups, `Rule` hairline between services (`ServicesIndex.tsx:41, 55-61`) | The reader gets four blocks, not one 63-line column; inside-group spacing stays smaller than between-group spacing |
| Items in two columns from `sm`, capped at 56 rem | `ServiceRow.tsx:27` | Keeps the shortest items from becoming a 1312px line and halves the scroll length of the longest lists (`08` items in one service) |
| Service title capped at 26ch, summary at 62ch | `ServiceRow.tsx:17, 21` | A service heading never runs the width of the grid, so the eye still finds the h4 that starts each block |

The level-two grid gains one thing checkable: each service occupies a bordered-by-whitespace cell
in a 2-column grid at ≥768px, so the 13 services read as a set of 13 rather than a continuous
index. That is the brief's "doble rejilla".

**Narrow screens.** At 320–639px everything is one column: group title, group intro, then each
service with its items stacked (`grid-cols-1`). The only fixed-width risk in the whole section is
item *text*, which wraps; there is no min-width, no horizontal scroll and no table. The spec's
check is the scroll width at 320px, and it is in §6.

**Group names ship as authored** (`services.ts:14-207`) until the client confirms them
(`brief-cliente.md:313`); a rename is a content edit with no component change. `/servicios` reuses
this same component with the same seam data when foundation ships it
(`specs/services-presentation/spec.md`, Requirement: The same presentation serves /servicios).

### D9 — The section set, the tone rhythm, and the copy this change is allowed to add

**Final order** (relative order of the five added sections is the spec's; every pre-existing
section stays):

| # | Section | Kind | Tone | Notes |
|---|---|---|---|---|
| 1 | `UtilityBar` | chrome | brand fill | unchanged (`UtilityBar.tsx:25-26`) |
| 2 | `Header` in `HeaderShell` | chrome | transparent → `canvas/95` | §D2 |
| 3 | `Hero` | photo (archive) | canvas | `min-h-svh`, type in the clean zone — §D3 |
| 4 | **Category tiles** (4) | photo (archive) | canvas | 2×2; labels are the authored `categoryLabels` (`projects.ts:30-38`); every tile links `/#proyectos`, the anchor row 8 owns — one target for four categories until foundation's `/proyectos` exists, and no dead link in the meantime (`casa-alta-web-foundation/specs/site-pages/spec.md` link rule) |
| 5 | **Manifesto line** | text | bone | the breath; deliberately no image (§D9 copy) |
| 6 | `IntroSection` (`#nosotros`) | text | canvas | unchanged content (`home.ts:46-50`) |
| 7 | `StatsBand` | text | bone | unchanged content (`home.ts:17-22`) |
| 8 | **Featured three** (`#proyectos`) | photo (archive) | canvas | carries the authored projects intro (`home.ts:58-62`) |
| 9 | `ProjectsGrid` (remaining 3) | photo (archive) | bone | no second `h2`; continuation of #8 |
| 10 | `ServicesIndex` chapters (`#servicios`) | text + photo | canvas | §D8, plus one editorial image per service (§D9 photography) |
| 11 | **Masonry** (9 images) | photo (archive) | bone | §D5 |
| 12 | `ProcessList` (`#proceso`) | text | canvas | unchanged content |
| 13 | `Differentiators` | text | bone | unchanged content (`differentiators.ts`) |
| 14 | **Second full-bleed moment** | photo (archive) | — | no copy, no heading; §D4's second scene |
| 15 | `ClosingCTA` (`#contacto`) | text | bone | unchanged heading (`home.ts:88-92`) |
| 16 | `Footer` | chrome | canvas | unchanged |

Adjacent **text** sections alternate: 5 bone / 6 canvas / 7 bone, 9 bone / 10 canvas, 12 canvas /
13 bone. The photographic rows sit between runs, which is what makes the alternation legible
rather than mechanical — the requirement is *"two adjacent text sections alternate"*, and each
pair above does.

**Where photographs come from.** The client's §0 decision *"cada sección lleva imágenes alusivas"*
is met from the archive first, stock last:

| Section | Imagery | Source |
|---|---|---|
| Hero, tiles, featured three, remaining grid, masonry, second full-bleed | archive | `manifest.projects` via the seam |
| Services (the one section with no photograph of its own) | **stock texture**, one image per service | `images/editorial/<slug>/`, alt authored |
| Manifesto line, stats, process, differentiators | none | recorded exceptions — two of them |

The two recorded exceptions are the manifesto line (it *is* the breath; an image inside it
contradicts the thing it exists for) and `Differentiators` (a claims argument in two columns;
stock there would be texture with no job — exactly what the corpus warns against,
`references/README.md:38-42`). Process needs no stock: the archive holds in-progress photographs
(cimentación, colado, armado) and they may be used if the section grows a band, which is optional
and not required by any spec. The **cap is one editorial image per service** (thirteen for this
change); each renders inside its service's panel in the chaptered catalogue.

**Copy: what may be added, and the two decisions that close proposal Open Inconsistencies #2, #3
and #8.**

| Item | Decision | Source of the string |
|---|---|---|
| Tile labels | reuse the authored category labels | `projects.ts:30-38` — no new string |
| Manifesto line | the client's mission sentence, **verbatim** | `brief-cliente.md:63` (§2 "Misión o propósito"), written client input, currently rendered nowhere |
| §7's emotional line ("Arquitectura y construcción que perdura.") | **dropped** | It duplicates the tagline already used twice (`site.ts:12`, `home.ts:48`, `Footer.tsx:85`) and competes with §11 for the same end-of-page job (`exploration.md:93`) |
| End of page | §11's message, already shipped | `home.ts:88-92`; §14.1 stays open — no new closing line |
| Testimonials | absent | `testimonials.ts` is `[]`; `Testimonials` returns `null` (`Testimonials.tsx:25`) |
| Featured three | `01-plaza-esmeralda-puerto-escondido`, `02-el-bicho`, `03-casa-blake-tlalixtac`, in that order, `01` leading | `brief-cliente.md:30`; `featuredProjectDirs` (`projects.ts:150-157`) is reordered and the remaining grid filters the three out — **Inconsistency #2 resolved**, no project twice on the page |
| Carousel | no carousel ships | **Inconsistency #3 resolved by default**: any horizontal sequence is CSS scroll-snap; the GSAP pin variant needs an explicit decision (§D4) |
| Editorial alt text | authored per image in `src/content/editorial.ts` | alt is a text alternative, not layout copy; the screens have no new marketing line |

That last row is the one place this change writes new strings, and it is bounded: no new heading,
eyebrow or body copy ships anywhere. The tile section and the masonry therefore carry **no `h2`**
— the alternative (repeating the authored projects/services intro for a second section) would put
the same heading on the page twice; only the section that leads the portfolio carries it.

---

## 3. Data Flow

### 3.1 Navbar scroll state (client boundary, no GSAP)

```mermaid
sequenceDiagram
    participant HTML as server HTML
    participant Shell as MotionShell.tsx ("use client")
    participant Hdr as <header data-surface>
    participant IO as IntersectionObserver
    participant Hero as #hero section
    participant CSS as globals.css [data-surface]

    HTML->>Hdr: renders data-surface="hero" (the scroll-0 default)
    HTML->>Hero: renders min-h-svh shell, margin-top: calc(var(--chrome-h,4.5rem) * -1)
    Shell->>Hdr: layout effect — measures offsetHeight
    Shell->>CSS: writes --chrome-h: 69px / 77px on :root
    Shell->>IO: observe(#hero, rootMargin "-{h}px 0 0 0")
    Note over IO,Hero: the hero intersects while any part of it<br/>lies below the header band
    IO-->>Shell: entry.isIntersecting = true  →  data-surface="hero"   (transparent)
    Hero->>IO: bottom edge passes the navbar on scroll
    IO-->>Shell: entry.isIntersecting = false →  data-surface="page"   (filled)
    Shell->>Hdr: attribute write only — no layout property, no content
    Note over Hdr,CSS: the fill, the chrome colour and the logo treatment<br/>are CSS rules keyed on the attribute; the CSS reduced-motion<br/>block neutralises the transition duration
```

### 3.2 Stock ingestion (pipeline → seam → one section)

```mermaid
sequenceDiagram
    participant Op as operator
    participant Src as images/editorial/<slug>/
    participant Prov as provenance.json
    participant Enc as tools/editorial.sh
    participant Opt as images-optimizado/editorial/
    participant Sync as tools/sync-images.mjs
    participant Table as variants.generated.json
    participant Seam as src/lib/content/index.ts (getEditorial)
    participant Panel as EditorialImage / ServiceRow (server)

    Op->>Src: download the authorised image (add-only; nothing under images/ is modified)
    Op->>Prov: write sourceUrl, photographer, licence, retrieved, sha256
    Op->>Enc: bash tools/editorial.sh <slug>
    Enc->>Enc: validate slug ^[a-z0-9][a-z0-9-]*$ and that the source directory exists
    Enc->>Prov: read — abort non-zero when a field is missing
    Enc->>Opt: full AVIF q62 (<=2000 long edge), -480 / -960 by the MIN_GAIN=1.1 rule
    Enc->>Opt: byte-copied fallback (never re-encoded) + editorial.json + editorial.dimensions.json
    Op->>Sync: pnpm images:sync   (also predev / prebuild)
    Sync->>Opt: collectAvif walks the whole tree → mirrors the new AVIFs into public/images
    Sync->>Table: Object.assign(hero.json) then Object.assign(editorial.json) → "editorial/<slug>" keys
    Seam->>Opt: reads editorial.dimensions.json + src/content/editorial.ts (authored alt)
    Seam-->>Band: Photo props {src, alt, width, height}
    Band->>Band: sizes="100vw" in a full-bleed w-full container
    Note over Table,Seam: manifest.projects never sees these keys —<br/>the variant table is the only file the two namespaces share
```

### 3.3 Hero selection gate (once per chosen photograph)

```mermaid
sequenceDiagram
    participant M as manifest.json (206 photos)
    participant P as clean-zone proxy (Appendix A)
    participant H as human review
    participant B as built hero (next build + start)
    participant C as content (src/content/home.ts)

    M->>P: score>=3 → 144 · landscape → 64 · full.width>=1600 → 27
    P->>P: calmest 40%x40% window: busyness sd and worst-case contrast
    P-->>H: 7 candidates (sd<=12 and >=3:1 for one polarity)
    H->>B: place the block, render at 1440/1024/768/375
    B->>B: measure the block and the chrome band in the rendered composition
    alt passes (h1>=3:1, small lines>=4.5:1, chrome band>=4.5:1)
        B->>C: record placement {h,v,tone}, chrome tone, and the numbers in Hero.tsx
    else fails
        B->>C: next window → invert polarity → bounded scrim inside the zone → reject the photo
        Note over B,C: the interim stays the shipped 48svh composition;<br/>shell and type move together or not at all
    end
```

---

## 4. File Changes

### 4.1 Create

| File | Role |
|---|---|
| `src/components/organisms/MotionShell.tsx` | the single `"use client"` module: `HeaderShell` + `ScrollScene` (§D1) |
| `src/components/organisms/gsap-scenes.ts` | the two scrubbed timelines, dynamically imported, client-only (§D4) |
| `src/components/organisms/CategoryTiles.tsx` | the tiles section (§D9) |
| `src/components/molecules/CategoryTile.tsx` | one tile: photo, label, link |
| `src/components/organisms/ManifestoLine.tsx` | the breath; one authored line, no image |
| `src/components/organisms/FeaturedPortfolio.tsx` | the featured three; carries the authored projects intro |
| `src/components/organisms/MasonryGallery.tsx` | CSS multi-column photo wall (§D5) |
| `src/components/organisms/FullBleedMoment.tsx` | the second full-bleed band; wrapped by `ScrollScene` |
| `src/components/organisms/EditorialImage.tsx` | one stock texture image per service panel; `sizes` required |
| `src/lib/content/editorial.ts` | the seam's reader for the editorial namespace (never the manifest) |
| `src/content/editorial.ts` | authored alt text + the band's caption-free model |
| `tools/editorial.sh` | the stock encoder, `hero.sh`-shaped (§D7) |
| `images/editorial/<slug>/` (≤2) | downloaded sources, add-only |
| `images-optimizado/editorial/` | generated AVIFs + the two sidecars |

### 4.2 Modify

| File | What changes |
|---|---|
| `src/components/templates/LandingTemplate.tsx` | the order in §D9; `Header` wrapped by `HeaderShell`; `ScrollScene` around the masonry and the second full-bleed |
| `src/components/organisms/Header.tsx` | returns `<HeaderShell>` with its existing children; the fill classes move behind `data-surface` |
| `src/components/organisms/Hero.tsx` | `min-h-svh` shell; `placement` from content; `--chrome-h` negative margin; the measurement comment gains the new numbers |
| `src/components/atoms/Photo.tsx` | `fit?: "cover" \| "intrinsic"`, default `"cover"` (byte-identical for every existing call) |
| `src/components/molecules/NavItem.tsx` | gains the chrome-foreground class hook (`chrome-fg`), no logic |
| `src/components/atoms/Logo.tsx` | the same hook, plus the `chrome-logo` filter class |
| `src/components/organisms/ProjectsGrid.tsx` | renders only the non-featured projects; no second `h2`; 3-column tier |
| `src/components/organisms/ServicesIndex.tsx` | four editorial chapters; catalogue numbered 01..13; hosts the panels |
| `src/components/molecules/ServiceRow.tsx` | one service as an alternating image/text panel |
| `src/content/projects.ts` | `featuredProjectDirs` reordered to the brief's ranking (§D9) |
| `src/content/home.ts` | `hero.placement` + `hero.chrome`; the manifesto line; the tiles' mapping (project dir per category) |
| `src/lib/content/index.ts` | new accessors: `getTiles()`, `getMasonry()`, `getEditorial()` |
| `src/lib/content/photos.ts` | a `masonryPhotos()` helper (leading manifest photos across projects) — still manifest-only |
| `src/types/content.ts` | `CategoryTile`, `MasonryItem`, `SectionImage` view models; `HeroContent.placement/chrome` |
| `src/app/globals.css` | `--chrome-h` default, `scroll-padding-top`, the `[data-surface]` chrome rules, the services grid helpers. **No new colour, radius or type token** |
| `src/app/page.tsx` | passes the new view models as props |
| `package.json` + `pnpm-lock.yaml` | `gsap`, `@gsap/react` |
| `tools/sync-images.mjs` | six lines: the editorial sidecar merge (§D7) |
| `tools/hero.sh` | **only if** a new hero source is needed: `SLUG` from `$1`, sidecar read-merge-write (§D3.4) |

### 4.3 Untouched — and why

| File | Rule |
|---|---|
| `src/lib/image/loader.ts`, `next.config.ts` (`deviceSizes [480, 960, 1600, 2000]`) | `rules.design`: the loader contract and the 480 tier are preserved exactly (`loader.ts:38-39`, `next.config.ts:35`) |
| `tools/variants.sh` | the long-edge descriptor fix belongs to the pipeline (foundation 5.5–5.7); tiering by long edge stays a known bounded limitation |
| Every file already tracked under `images/` | read-only; the guard denies modification (`git-guard.sh:114-122`) |
| `manifest.json` and the 14 project folders | generated; regenerated, never hand-edited |
| Foundation's routes, sitemap, robots, JSON-LD, clean image URLs | declared dependency, not duplicated |

---

## 5. Interfaces and Contracts

### 5.1 The client boundary

```tsx
// MotionShell.tsx — the only "use client" module under src/
export function HeaderShell({ chrome, children }: {
  chrome: "ink" | "canvas";          // the hero's authored chrome polarity (§D3)
  children: React.ReactNode;         // server-rendered logo, nav, CTA — passed through untouched
}): JSX.Element;                     // <header data-surface data-chrome={chrome}>

export function ScrollScene({ mode, children }: {
  mode: "drift" | "breathe";         // masonry columns | full-bleed settle
  children: React.ReactNode;         // a server-rendered section
}): JSX.Element;                     // <div data-scene={mode} ref={scopeRef}>
```

`ScrollScene` renders a plain `div` that wraps its children; it adds **no** class that hides
content, and its markup in the server HTML is a `div` with one data attribute.

### 5.2 New content model (seam-authored, components consume props)

```ts
// src/types/content.ts — additions
export interface HeroPlacement {
  h: "start" | "center" | "end";        // horizontal window inside the photograph
  v: "start" | "center" | "end";        // vertical window
  tone: "ink" | "canvas";               // type colour, chosen by measurement
  scrim: boolean;                       // bounded scrim inside the clean zone; false unless measured
}
export interface HeroChrome { tone: "ink" | "canvas" }   // the floating chrome's polarity over this photo

export interface CategoryTile { label: string; href: string; photo: Photo }   // label = authored category label
export interface MasonryItem { photo: Photo; projectSlug: string }
export interface SectionImage { photo: Photo; provenance: string }            // editorial band; provenance is a path, never rendered
```

`HeroContent` gains `placement: HeroPlacement` and `chrome: HeroChrome`
(`types/content.ts:153-162`). Every accessor that returns these keeps the seam's contract: pages
call them, components receive props (`index.ts:24-35`).

### 5.3 Editorial sidecar shapes

```jsonc
// images-optimizado/editorial/editorial.json      — merged into the loader table verbatim
{ "editorial/<slug>": [[480, "<slug>-480.avif"], [960, "<slug>-960.avif"], [1600, "<slug>.avif"]] }

// images-optimizado/editorial/editorial.dimensions.json  — read by the seam only, never the loader
{ "<slug>": { "width": 1600, "height": 1067, "fallback": "<slug>.jpg" } }
```

### 5.4 CSS contract

```css
:root { --chrome-h: 4.5rem; }                 /* 72px; corrected by the boundary to the measured height */

html { scroll-padding-top: calc(var(--chrome-h) + 1rem); }   /* focus and anchors clear the floating chrome */

[data-surface="hero"][data-chrome="canvas"] .chrome-fg   { color: var(--color-canvas); }
[data-surface="hero"][data-chrome="canvas"] .chrome-logo { filter: brightness(0) invert(1); }
[data-surface="page"]  .chrome-fg                        { color: var(--color-ink); }
```

Two notes a reviewer will want. The `filter` inverts a **monochrome raster** — the only logo the
repo has (`Logo.tsx:9-13`; `public/brand/` holds one file), which cannot be regenerated from
repository sources (foundation `design.md` §10.7) — so inverting is exact, not approximate. And
`scroll-padding-top` is the mechanism behind the spec's "focus is never obscured": the browser's
scroll-into-view and every `/#anchor` jump now reserve the chrome's height, and with JavaScript
off `--chrome-h` stays at its default while the header is in flow, so the two paths agree.

---

## 6. Verification Strategy

There is no test runner, by policy (`openspec/config.yaml:18, 36-45`). The gates are the
verification, and every decision above is mapped to one of them.

| # | Decision | Gate / measurement | Exact command |
|---|---|---|---|
| D1 | one boundary, content visible without it | count the directive; read the emitted HTML | `grep -rn '"use client"' src \| wc -l` → 1 · `grep -c '<a' .next/server/app/index.html` ≥ the pre-change 24 |
| D2 | navbar state | scroll past the hero and read the attribute; keyboard tab pass | `npx next start`, then check `data-surface` at scroll 0 and past the hero; tab through the header — the focused element must not be under it |
| D3 | hero gate | the rendered composition, three breakpoints | screenshots at 1440×900 / 1024×768 / 768×1024 / 375×812; contrast of the block's bounding box, worst pixel: h1 ≥ 3:1, small lines ≥ 4.5:1, chrome band ≥ 4.5:1 |
| D4 | GSAP scope + cleanup | bundle inspection, reduced-motion pass, console | `npx next build` then grep the emitted chunks for the scene chunk's size (expect ≈47 KB gz, lazily fetched) · emulate `prefers-reduced-motion: reduce` and scroll the landing: no scrubbed motion, every section visible · console shows no ScrollTrigger and no debug markers |
| D5 | masonry | server HTML, layout shift, aspect ratios | every masonry item present with `loading="lazy"`, `width`/`height` set; `document.scrollWidth === innerWidth` at 320/375/768/1199/1200/2560; CLS measured on a throttled load |
| D6 | `sizes` | the emitted values, and the measured slots | collect `<img sizes>` **and** `<link imageSizes>` from the built HTML: the set must be exactly the three spec values; measure each layout's card width at 375 / 768 / 1199 / 1200 and compare to the declared fraction |
| D7 | stock | the pipeline, the gate, the isolation | `bash tools/editorial.sh <slug>` with an incomplete `provenance.json` → non-zero exit and no output written · `pnpm images:sync` → `editorial/<slug>` present in `variants.generated.json` · `npm run check:images` exits 0 · `grep -o '/images/editorial/[^"]*' .next/server/app/index.html` appears only in the services section · `grep -rl 'editorial' src/components` → only the services presentation |
| D8 | services | the rendered structure | 4 `h3` group titles and 13 `h4` service titles in the emitted HTML; rendered items == 63 (count the `<li>` under the section) · scroll width at 320px |
| D9 | composition, tone, copy | the emitted order and the copy audit | read the section order out of the HTML and compare to §D9 · confirm the manifesto line is the brief's sentence verbatim · confirm the closing heading equals `home.ts:89` · confirm no project appears twice |
| — | all | the four standing gates | `npx tsc --noEmit` · `npm run lint` · `npx next build` · `npm run check:images` · overflow at 320 / 375 / 2560 px · count distinct manifest-backed photographs on the landing (≥ 12; pre-change baseline 6) · `grep -ri` for the source's brand string in `src/` and in the built HTML → 0 |

**The one number this change should publish after measuring, not before, is the landing's transfer
weight.** The pre-change landing ships 9 images and the exploration measured a +52% over-fetch on
its half-width cards until foundation's `variants.sh` fix lands (`exploration.md:76-82`). The new
landing shows materially more photographs, so the honest report is the measured weight at 375 and
1440 px, before and after — and the expected direction is *up* until the pipeline fix ships.

---

## 7. Threat Matrix

`references/threat-matrix.md` applies to designs that change routing, shell commands,
subprocesses, VCS/PR automation, executable-file classification, or process integration. This
change adds **one shell script** (`tools/editorial.sh`) that runs `magick` on a slug-named
directory, and edits two existing Node tools. It adds no route, no git automation and no PR
automation.

| Boundary | Applicability | Design response | Planned RED tests |
|---|---|---|---|
| Documentation-like paths | **N/A** — no path classification exists or is added; `format.sh`'s extension list (`.tsx .ts .jsx .js .mjs .cjs .css .scss`) is unchanged | — | none |
| Git repository selection | **N/A** — no git command, `-C`, or cwd authority is designed; the guard's own repo-root anchoring is existing code (`git-guard.sh:45-57`) | — | none |
| Commit state | **N/A** — staging policy is stated in §D7 and enforced by the existing guard; no automation is added | — | none |
| Push state | **N/A** — no push automation exists or is designed | — | none |
| PR commands | **N/A** — no PR automation exists or is designed | — | none |
| **Pipeline script argument handling** (added row) | **Applicable** — `tools/editorial.sh` takes a slug from `$1` | The slug must match `^[a-z0-9][a-z0-9-]*$`; the script refuses a slug that does not, refuses a missing source directory, refuses an incomplete provenance record, uses no `rm` at all, and writes only under `images-optimizado/editorial/` | No test runner exists (`strict_tdd: false`); the mapped verification is the §6 D7 command: run it with `../etc`, an empty slug and an incomplete record, and assert non-zero exit plus no new bytes under `images-optimizado/` |

The last row is the only applicable one, and it is a *script* boundary, not a routing or VCS one.
`tools/sync-images.mjs` keeps its existing contract: it is deterministic, idempotent, and reads
its two sidecars behind try/catch so an absent namespace is not an error
(`sync-images.mjs:103-112`).

---

## 8. Migration and Rollout

Three slices, matching the proposal's split and its independence in content and effect
(`proposal.md:77-83`). Each is revertible on its own.

| Slice | Contents | Rollback |
|---|---|---|
| **S1** landing composition + `sizes` | tiles, manifesto, featured three, remaining grid, masonry, second full-bleed, `min-[1200px]` tiers, `Photo.fit` | `LandingTemplate` back to the 12-section order; delete the additive components; `sizes` props revert to the two shipped values |
| **S2** navigation shell + motion layer | `MotionShell`, `gsap-scenes`, `gsap` + `@gsap/react`, `--chrome-h`, `scroll-padding-top`, the `[data-surface]` rules | restore `Header.tsx`'s `bg-canvas/95` bar, delete the two new files, remove both dependencies — motion is additive, so the server markup is unchanged without it |
| **S3** services chapters + stock ingestion | the chaptered catalogue, the per-service `EditorialImage` panels, `tools/editorial.sh`, the sidecar merge, `images/editorial/**` | revert `ServicesIndex`/`ServiceRow` to the linear index; remove the images and their accessor. **Sources under `images/editorial/` stay on disk** — rollback unpublishes, it does not delete originals, and regenerating the outputs is idempotent |

**No data migration, no feature flags, no schema.** The only irreversible act in the whole change
is committing binaries: the ingested sources and their variants become permanent history, which is
why the cap is one image per service and the guard's 20 MB / 50-file warning is treated as a stop sign, not
a notice (`git-guard.sh:149-156`).

**Sequencing.** `src/content/site.ts` and `ProjectsGrid.tsx`/`ProjectCard.tsx` are shared with
`casa-alta-web-foundation` (4.2, 4.3) and are edited **after** those land, or as the same single
edit — never concurrently (`specs/navigation-shell/spec.md`, Requirement: Curation is sequenced
after the route move). The `/proyectos` presentation in this change has nothing to present until
foundation's Phase 4 exists; the landing half ships alone if it does not.

---

## 9. Architectural Invariants

Stated as MUST NOT, so a reviewer can reject a diff quickly. Each traces to a decision above.

1. MUST NOT add a second module carrying `"use client"` (D1).
2. MUST NOT put copy, links or images inside `MotionShell.tsx`, and MUST NOT make any section
   dependent on hydration to become visible (D1).
3. MUST NOT hide content behind a reveal, and MUST NOT write an inline style whose purpose is to
   hide something until JavaScript runs (D1, D4).
4. MUST NOT drive a hover, focus or micro-state with GSAP (D4, corpus constraint 1).
5. MUST NOT ship `markers: true`, and MUST NOT call GSAP during SSR (D4).
6. MUST NOT introduce a fourth `sizes` value, and MUST NOT declare a tier whose layout is not
   shipped (D6).
7. MUST NOT use `width: 100vw` or `w-screen` as a width rule; full bleed is `w-full` inside a
   full-bleed container (D6).
8. MUST NOT reintroduce Netlify Image CDN, re-encode a `.jpg`/`.png` fallback, change
   `deviceSizes`, or make the loader compute a variant path (D7, `rules.design`).
9. MUST NOT let a component read `src/content/*` or the editorial sidecars: the seam stays the only
   reader (D7).
10. MUST NOT let stock imagery reach the portfolio, the masonry, a project gallery or the sitemap;
    MUST NOT caption stock as the studio's own work (D7).
11. MUST NOT write, rename or delete a file already tracked under `images/`, and MUST NOT stage a
    pipeline run with `git add -A` (D7).
12. MUST NOT renumber a published project or photo path; reordering is the manifest's `order`
    field (D9, repository policy).
13. MUST NOT ship type on the hero photograph without a recorded contrast measurement for that
    photograph (D3).
14. MUST NOT fill an empty narrative field to make a section look fuller
    (`HomePage`/`projects.ts:19` policy: an empty field is a to-do).

---

## 10. Open Questions and Corrections

### 10.1 Measured corrections to earlier artifacts

| Claim in an earlier artifact | Measured | Where |
|---|---|---|
| "44 items" in the service catalogue | **63 items** across **13** services in **4** groups. The stale figure is attributed to the proposal by `specs/services-presentation/spec.md:4`, but the proposal does not carry it — `proposal.md:49` already states 63 correctly. The attribution is wrong; the count is right either way | `src/content/services.ts`, counted this session: 4 group titles, 13 `items` arrays, 63 strings in them. The spec's own instruction — "read the file, not this number" (`spec.md:25`) — is what settles it |
| The hero's clean zone can be judged from metadata | The **current** hero scores sd **30.6** with worst-case 1.67:1 (white) / 1.02:1 (dark) in its calmest window — it fails both polarities, which is what `Hero.tsx:22` records as a full-resolution 1.31:1 measurement. The proxy agrees in direction and magnitude | Appendix A |
| The transparent navbar is free | The current hero's chrome band is **2.74:1** for ink chrome and 1.17:1 for white — the reason the header is opaque today. Two of the seven shortlisted candidates carry either polarity unmodified | Appendix A.2 |
| "`fetchpriority` appears 0 times" (`proposal.md:9-10`) | Reproduced: the hero ships `<link rel="preload" as="image" … imageSizes="100vw">`, and `grep -c fetchpriority` → 0 | `.next/server/app/index.html` |

### 10.2 Could not verify — stated plainly

- **Browser support for CSS scroll-driven animations** (`animation-timeline: scroll()`). The
  session had no working external fetch (the search backend returned an authorisation error), so no
  version table was checked. D2 therefore does not rest on the exact support list: the observer
  exists anyway for D4, and a mechanism whose failure mode is a silently transparent header over a
  photograph is the wrong bet until a gate can catch it. Verify before reopening this.
- **The rendered hero gate.** No hero photograph has been placed or screenshotted yet; the numbers
  in Appendix A are a 1/32-scale, file-level proxy, not the composed measurement the spec demands.
  The gate is described (§D3.3) and it runs before merge.
- **The header's rendered height** (69px base / 77px at `md`) is computed from the utility classes
  (`Header.tsx:29-30`, `Logo.tsx:22`) and was not measured in a browser. If the CLS check measures
  a shift above 0.01, `--chrome-h`'s default is corrected to the rendered value.
- **The masonry's column heights** under real content: the 9 images have not been chosen, so the
  column balance is unmeasured. The technique does not depend on the balance.

### 10.3 Open questions carried forward (none block the design)

- The client's label confirmation (`portafolio` vs `proyectos`) — ships as `Proyectos` with no
  component change when confirmed (`site.ts:23`).
- The service-group names (§14.8) ship as authored (`brief-cliente.md:313`).
- The closing line (§14.1) stays open; the shipped heading is untouched.
- Whether the tiles should later point at `/proyectos#categoria` once foundation ships the route:
  a one-line content edit, not a design change.

---

## 11. Risks

| Risk | Likelihood | Architectural mitigation |
|---|---|---|
| No hero candidate passes the rendered gate, so the full-viewport shell blocks | Med | 7 of 27 pass the proxy; the shell and the type move together, and the interim composition ships unchanged; the gate order (window → polarity → bounded scrim → reject) means a near-miss is still usable |
| The transparent chrome is illegible over the chosen hero at some width | Med | The chrome band is measured at the same breakpoints as the type; the polarity is data; a bounded top scrim is the permitted remedy; the fallback is the filled chrome as the shipping default |
| GSAP's two scenes jank or leak on a low-end phone | Med | Transform/opacity only, two scenes, lazy chunk, `useGSAP` scope + `context.add` cleanup, one refresh after fonts/images; no pin |
| Wrong `sizes` on a new layout spends bytes for nothing | Med | Every tier in §D6 names the CSS that makes it true; the emitted values are checked against the three spec strings; a wrong tier reverts to the site-wide pair rather than shipping |
| Overflow regression at a boundary (the `min-[1200px]` grid, the negative hero margin) | Med | Overflow checks at 320/375/768/1199/1200/2560 px; the hero's negative margin is vertical only |
| The header hides keyboard focus while floating | Low | `scroll-padding-top: calc(var(--chrome-h) + 1rem)` plus the spec's tab check; with JS off the header is in flow, so nothing can be obscured |
| Stock leaks into obra | Low | Structural separation, five independent reasons (§D7), plus the grep checks in §6 |
| A stock image's provenance record is incomplete | Low | The encoder refuses to write bytes without a complete record, and the refusal is a §6 check |
| New binaries become permanent history | Low | A cap of one image per service (thirteen), deliberate staging, and the guard's warning as the tripwire |
| Unapproved copy or the source's brand string reappears | Low | §D9's copy table names the only string this change adds; the brand-string grep is a §6 gate |
| Cross-change collision on `site.ts`, `ProjectsGrid.tsx`, `ProjectCard.tsx` | Med | Explicit sequencing in §8; the small shared edits land once |
| Foundation is abandoned; the presentation half has no routes | Med | The landing half (tiles, manifesto, masonry, services, chrome, motion) ships alone; the presentation half is additive |

---

## Appendix A — the hero clean-zone enumeration (measured, reproducible)

### A.1 Method

From `images-optimizado/manifest.json` on this machine, in this session:

1. Keep `score ≥ 3` → **144** of 206 (64 landscape, 80 portrait).
2. Keep landscape (`full.width > full.height`) → **64**.
3. Keep `full.width ≥ 1600` → **27** candidates.
4. For each, downscale to a 50×40 greyscale grid with ImageMagick, slide a 20×16 window (40% ×
   40%) over it, and take the **calmest** window: lowest standard deviation of pixel luminance,
   with the worst-case WCAG contrast of white and of near-black type against the window's
   extreme pixels (`magick <file> -auto-orient -resize 50x40! -colorspace Gray -depth 8 txt:-`,
   parsed in Python; 27 files in **2.4 s**).

Result: **7 of 27** clear `sd ≤ 12` with ≥ 3:1 for one polarity. The four strongest, with the
zone the proxy chose:

| Asset (project / base) | full | score | zone sd | zone window | white type | dark type |
|---|---|---|---|---|---|---|
| `02-el-bicho/31-fachada-iluminada-nocturna` | 1600×1200 | 3 | **6.0** | 20–60% × 25–65% | **13.77:1** | 1.11:1 |
| `08-rbnb-palmarito/19-colado-concretera-vista-mar` | 1600×1204 | 3 | **8.3** | — | 1.45:1 | **8.41:1** |
| `06-capilla-el-tule/05-interior-banca-madera-ventanas` | 1600×1204 | 3 | **9.1** | — | 2.58:1 | **4.34:1** |
| `06-capilla-el-tule/03-esquina-cantera-detalle-bajo` | 1600×1204 | 4 | **9.4** | — | 2.35:1 | **4.52:1** |
| `06-capilla-el-tule/07-interior-esquina-ventanas-cantera` | 1600×1204 | 3 | **9.4** | — | 2.12:1 | **5.05:1** |
| `01-plaza-esmeralda…/13-pasillo-blanco-piso-pulido` | 1600×1066 | 4 | **11.1** | — | 1.44:1 | **3.44:1** |
| *(the seventh is `01-plaza-esmeralda…/12-cristal-madera-noche-ciudad`, sd 11.6, white 10.05:1)* | | | | | | |

`16` of the 27 clear the 3:1 floor for one polarity somewhere in their calmest window; only the
**7** in the table above also clear the busyness ceiling (sd ≤ 12); the remaining `11` fail both
polarities and are not hero candidates at any scrim.

### A.2 The chrome band, same corpus

The floating header sits on the top 12% of the photograph (the header band). Same method, full
width, reporting the band's mean luminance and the worst-case contrast for each chrome polarity:
the table in §D2. The current hero fails both (2.74:1 / 1.17:1); two of the seven shortlisted
candidates carry one polarity unmodified (El Bicho's night façade for white chrome, Palmarito's
pour for ink chrome); the other five need a bounded top scrim.

### A.3 What the proxy is not

It reads the encoded file at 1/32 scale, so it cannot see the shipped crop (`object-cover` at the
viewport's aspect ratio), the type at its real size, or the shadow the block's own glyphs cast. It
shortlists; the rendered measurement in §D3.3 decides, and the numbers that justify the shipping
hero are the ones recorded next to `Hero.tsx`'s existing measurement.

---

## Key Learnings

1. The current hero photograph's top band measures 2.74:1 for dark chrome and 1.17:1 for white —
   neither polarity clears 4.5:1, which is why the header carries an opaque `bg-canvas/95` fill
   today and why the transparent state needs a hero chosen for it, not just a CSS rule.
2. Seven of the repo's 27 landscape publishable photos at ≥1600px have a calm zone that clears
   3:1 for one type polarity at 1/32 scale; the current hero scores 30.6 busyness against the
   proxy's 12 ceiling, matching the recorded full-resolution failure in `Hero.tsx:15-41`.
3. The service catalogue holds 63 items across 13 services in 4 groups; the spec's parenthetical
   attributes a stale "44 items" figure to the proposal, but the proposal already states 63 — the
   figure that needed checking was the spec's, not the proposal's, and counting the file settled it.
4. The loader's variant table is `[width, filename][]` and calls `entries.filter`, so any generated
   sidecar merged into it that carries a richer object shape would throw inside the loader at
   request time — which is why the editorial set needs a second, loader-invisible dimensions file.
5. GSAP core plus ScrollTrigger plus `@gsap/react` measure 47,366 B gzipped from the published
   tarballs — about a quarter of the landing's current 187,750 B of JS — so this change lazily
   imports it instead of putting it in the same chunk as the header shell.
