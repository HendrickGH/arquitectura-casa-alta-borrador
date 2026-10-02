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

- [ ] T1 `src/types/content.ts`: replace `HeroContent.headline`/`image`/`cta`
      with `slides: HeroSlide[]` (`{ title, photo }`); add `whatsapp: CallToAction`
      to `SiteConfig`.
- [ ] T2 `src/content/home.ts`: eyebrow -> "Puerto Escondido, Oaxaca centro y
      Salina Cruz"; headline -> ["Arquitectura", "Construccion civil",
      "Construccion industrial"]; author the three slides with real alts; remove
      `cta`.
- [ ] T3 `src/content/site.ts`: add `whatsapp: { label: "Escribanos por WhatsApp",
      href: whatsappHref }`.
- [ ] T4 `src/components/organisms/Hero.tsx`: make it a client component; render
      stacked slide layers (inline initial opacity/zIndex so the first shows
      without JS) and the h1 with one `data-hero-title` span per slide; remove
      the CTA/Button/Icon; lazy-import GSAP and call `createHeroCarousel`.
      Adjust the clamp so "Construccion industrial" (~12.9em in Montserrat 600)
      fits 320px width.
- [ ] T5 `src/components/organisms/gsap-scenes.ts`: add `createHeroCarousel({
      scope })` -- crossfade every 4s, active title opacity 1 and others ~0.4;
      returns cleanup.
- [ ] T6 `src/components/organisms/WhatsAppFloat.tsx`: new fixed bottom-right
      WhatsApp anchor; render it in `SiteChrome`.
- [ ] T7 `src/lib/content/index.ts`: include the hero slide photos in the
      `getTiles()` claimed set and in `landingSources()`.
- [ ] T8 Checks: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

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

- [ ] T1..T8 pending.

## Verification evidence

(recorded during apply)
