# Hero carousel (GSAP) + floating WhatsApp

## Objective

Turn the landing hero's single static photograph into a GSAP-driven, 3-slide
carousel -- one image per headline line -- and move WhatsApp from the hero
button to a site-wide floating button.

## Problem

The hero today shows one photograph (`hero/vista-aerea-palapas-alberca-playa`)
with a single WhatsApp CTA under the headline. The copy says the studio works
across Sierra, Costa, Istmo and Centro de Oaxaca, which is broad and vague. The
client wants the hero to name the concrete places it works and to cycle the
three disciplines it sells, each illustrated by one real photograph.

## Why

- Copy: name real offices (Puerto Escondido, Salina Cruz) plus Oaxaca capital
  instead of a geographic list.
- Headline: split the three disciplines into their own lines so each can be
  highlighted as its slide is active.
- Carousel: show range (architecture, civil works, industrial works) with motion
  instead of one static image.
- WhatsApp: a persistent floating button reaches the visitor from anywhere on
  the site, not only the hero.

## Scope

In:
- `src/types/content.ts` -- `HeroContent` becomes slide-based; `SiteConfig` gains
  a WhatsApp link.
- `src/content/home.ts` -- new eyebrow, three slides, drop the hero CTA.
- `src/content/site.ts` -- author the floating WhatsApp link.
- `src/components/organisms/Hero.tsx` -- client carousel.
- `src/components/organisms/gsap-scenes.ts` -- add `createHeroCarousel`.
- `src/components/organisms/WhatsAppFloat.tsx` -- new floating module.
- `src/components/templates/SiteChrome.tsx` -- render the floating module.
- `src/lib/content/index.ts` -- seam dedup so the hero photos are not repeated.

Out:
- The image pipeline, the manifest, `images/` and `images-optimizado/`.
- Other landing sections, SEO/sitemap work.
- OpenSpec artifacts (this is an organic (ODD) change, not an SDD change).

## Constraints

- Copy lives in `src/content/*`; components receive props (the content seam).
  `src/lib/content/index.ts` is the only reader.
- GSAP stays lazily imported, matching `ScrollScene`/`gsap-scenes.ts`; it must
  not reach the eager chunk.
- Use the custom image loader; reference only AVIF files that the variant table
  resolves. Never reintroduce the default loader; never re-encode fallbacks.
- `alt` is authored copy, describing the photo.
- Do not rename any numeric-prefixed path.

## Image decisions (client asked us to choose the two additional photos)

Slide 1 (Arquitectura) keeps the current hero image.
Slide 2 (Construccion civil) and slide 3 (Construccion industrial) were chosen by
inspecting the archive visually and picking the two most striking construction
photographs that read as civil/industrial work:

1. `Arquitectura` -- `/images/hero/vista-aerea-palapas-alberca-playa.avif`
   (1600x900, unchanged).
2. `Construccion civil` -- `/images/11-columnas-c1-c2/01-izado-columna-grua-jacaranda.avif`
   (1600x1200): a crane hoisting a precast concrete column under a flowering
   jacaranda. Most dynamic civil-works frame in the archive.
3. `Construccion industrial` -- `/images/14-pavimentacion/01-revolvedora-concreto-sobre-pavimento.avif`
   (2000x1500): a concrete mixer over fresh pavement, clean against a cloudy sky.
   Closest available to industrial/heavy work; the archive has no industrial
   project.

## Tasks

- [x] T1 `src/types/content.ts`: replace `HeroContent.headline`/`image`/`cta`
      with `slides: HeroSlide[]` (`{ title, photo }`); add `whatsapp: CallToAction`
      to `SiteConfig`.
- [x] T2 `src/content/home.ts`: eyebrow -> "Puerto Escondido, Oaxaca centro y
      Salina Cruz"; headline -> ["Arquitectura", "Construccion civil",
      "Construccion industrial"]; author the three slides with real alts; remove
      `cta`.
- [x] T3 `src/content/site.ts`: add `whatsapp: { label: "Escribanos por WhatsApp",
      href: whatsappHref }`.
- [x] T4 `src/components/organisms/Hero.tsx`: make it a client component; render
      stacked slide layers (inline initial opacity/zIndex so the first shows
      without JS) and the h1 with one `data-hero-title` span per slide; remove
      the CTA/Button/Icon; lazy-import GSAP and call `createHeroCarousel`.
      Adjust the clamp so "Construccion industrial" (~12.9em in Montserrat 600)
      fits 320px width.
- [x] T5 `src/components/organisms/gsap-scenes.ts`: add `createHeroCarousel({
      scope })` -- crossfade every 4s, active title opacity 1 and others ~0.4;
      returns cleanup.
- [x] T6 `src/components/organisms/WhatsAppFloat.tsx`: new fixed bottom-right
      WhatsApp anchor; render it in `SiteChrome`.
- [x] T7 `src/lib/content/index.ts`: include the hero slide photos in the
      `getTiles()` claimed set and in `landingSources()`.
- [x] T8 Checks: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Acceptance criteria

- The hero eyebrow reads "Puerto Escondido, Oaxaca centro y Salina Cruz".
- The h1 renders three lines, one per discipline, each its own span.
- Three hero images crossfade every 4s; the active slide's title is at full
  opacity and the other two dimmed; the transition is driven by GSAP.
- No WhatsApp button remains in the hero; a floating WhatsApp button is present
  site-wide (bottom-right).
- Without JavaScript the first slide and all three titles render (no blank hero).
- No duplicate photograph between the hero and the tiles/masonry/moment bands.
- `pnpm typecheck`, `pnpm lint` and `pnpm build` pass.

## Checks

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `pnpm check:images` (after build), if the built output is available.

## Progress

- [x] T1..T8 complete, plus two post-review corrections from the client.

### Corrections after the client's first review (2026-10-02)

- The dark scrim was rendering **below** the photograph: the carousel's first
  slide layer carried `zIndex: 1`, so it escaped above the sibling
  `.hero-overlay` (z-index auto). Fixed by giving the slide box `z-0` (which
  creates a stacking context) and the scrim `z-[1]`, under the content's `z-10`.
- The floating WhatsApp button was adapted to the brand palette: `bg-brand-800
  text-white hover:bg-ink` instead of WhatsApp green.

## Verification evidence

- `pnpm typecheck` -- pass (no output).
- `pnpm lint` -- pass, 0 errors; 1 pre-existing warning in
  `.opencode/skills/web-build/scripts/cdp-measure.mjs` (unrelated).
- `pnpm build` -- pass; 18/18 pages generated, TypeScript finished.
- CDP measurement (`cdp-measure.mjs`, production build):
  - width 375: `scrollWidth 375`, no horizontal overflow (the clamp fix holds
    for "Construcción industrial").
  - width 1440: `scrollWidth 1440`, no overflow.
  - `duplicated: []` -- no photograph repeats across the page (the hero's
    `11-columnas/01` did not collide with the obra-civil tile).
  - `broken: 0`, `h1: 1`.
- Visual capture of the top viewport confirmed: scrim over the photograph,
  active title at full opacity with the other two dimmed, new eyebrow, and the
  brand-blue floating button. The capture happened mid-cycle on slide 3, which
  also confirms the carousel is cycling.

## Notes

- The repo's `.opencode/plugins/casa-alta.ts` auto-commit fired when the
  delegated writer's session went idle and committed the first version as
  `ad98b4b chore: auto-commit 9 files`. The native RDD review candidate then had
  to be re-based on `HEAD~1` (`--base-ref ... --committed-only`); the client
  declined that review (candidate-scoped) and chose to review manually.
- The CDP masonry `wall.items` came back 0 in both runs; that is a measurement
  selector mismatch unrelated to this change.
