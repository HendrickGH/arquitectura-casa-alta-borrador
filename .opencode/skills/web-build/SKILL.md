---
name: web-build
description: "Builds gallery markup, SEO metadata, sitemap and JSON-LD from the image manifest. Use when the site must consume the optimized image set."
metadata:
  tags: "nextjs, seo, images, jsonld, casa-alta"
  category: project
---

# Casa Alta Web Build

You build the website side of the Casa Alta studio site, consuming the image set that
`images-optimizado/manifest.json` describes.

Read `AGENTS.md` first, especially "Site-side rules". The image optimization is already done;
your job is the markup that makes it pay off. Serving the right width at the right moment
matters more than any compression setting.

## When to Use

Use when the site needs to consume the image set: gallery markup, SEO metadata, an image
sitemap, or JSON-LD.

## What you consume

`manifest.json` carries a ready-made `srcset` string per photo, plus `full`, `variants`,
`fallback`, `score`, `note`, `slug` and `source`. **Use it. Do not recompute widths or
re-derive filenames** — the manifest is the single source of truth for what exists on disk.

Project order and photo order come from the `order` fields. A project's folder prefix is a
snapshot of the ranking, not the ranking itself; when the two disagree, the manifest wins.

Never read the manifest directly from a page. The content seam at `src/lib/content/index.ts`
is the only module that reads it; components receive props.

## Markup rules

Every gallery photo:

```html
<picture>
  <source type="image/avif"
          srcset="01-slug-480.avif 480w, 01-slug-960.avif 960w, 01-slug.avif 1600w"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw">
  <img src="01-slug.jpg" alt="<a real description>"
       width="1600" height="1200" loading="lazy" decoding="async">
</picture>
```

- **`sizes` must match the actual layout.** A wrong `sizes` makes the browser fetch the wrong
  width and undoes the whole optimization. The tiers are fixed and the CSS has to make each one
  true: `100vw` full-bleed, `(min-width: 768px) 50vw, 100vw` for the two-column band, and
  `(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw` for three columns. Tailwind's `xl`
  is 1280px, so a 1200px step needs `min-[1200px]:` — and because Tailwind emits arbitrary
  media variants *before* the named breakpoints, write every step of a chain as an arbitrary
  variant or verify the emitted order. A `md:` next to a `min-[1200px]:` silently wins.
- **`width` and `height` are mandatory.** They reserve the box and prevent CLS. Take them from
  the manifest's `full` object.
- **The hero is the exception.** The first image above the fold gets
  `fetchpriority="high" decoding="async"` and **no `loading="lazy"`**. Lazy-loading the hero
  is the single most common way to wreck LCP.
- **`alt` describes the photo, not the filename.** Use the manifest `note` as a starting point,
  then write it for a human: what the space is, what is happening, where. Never stuff keywords.

## SEO deliverables

1. **Clean public URLs.** Map `01-casa-blake-tlalixtac` to `casa-blake-tlalixtac`. Keep the
   numeric prefix out of anything public — reordering projects must never move a URL. This is a
   **routing** change; never rename a file to achieve it.
2. **Image sitemap.** Emit `<image:image>` entries with `<image:loc>` and `<image:title>` for
   every published photo. Architecture firms draw real traffic from Google Images.
3. **`ImageObject` JSON-LD** per gallery, plus `ProfessionalService` for the studio with
   `areaServed` covering Oaxaca and the coast (Puerto Escondido, Zicatela, Palmarito).
4. **One `og:image` per project**, pointing at that project's top-scoring photo.

## Do not

- Do not publish photos scored 1/5 or 2/5. 62 of the 206 sit below portfolio grade and live at
  the end of each project's `photos` array. Filter them out unless the human asks otherwise.
- Do not publish the excluded non-photographs — the CGI render and the plan board are not in
  the manifest, so they cannot leak in by accident. Keep it that way.
- Do not re-encode, resize, or rename anything under `images-optimizado/`. If an image is
  wrong, send it back to the `image-pipeline` skill.
- Do not reintroduce the default `next/image` loader, and do not re-encode the JPEG fallbacks.
  Both are measured decisions recorded in `AGENTS.md`.
- Do not claim a performance win you have not measured. If you quote a number, measure it.

## Verification

After building, check that every referenced file resolves (`pnpm check:images` is the gate),
that no `alt` is empty or duplicated across a gallery, and that the largest image on the page
is the hero. Report the measured transfer weight for a project page if you can, and say
plainly if you could not measure it.

Measure the **rendered** result through Chrome DevTools Protocol:

```
node .opencode/skills/web-build/scripts/cdp-measure.mjs http://localhost:3000/ --width 1440
```

It reports the photograph count, every `src` appearing twice on the page, the distinct `sizes`
values, heading counts, whether the document overflows horizontally, and the masonry's
per-column heights and imbalance. Run it at 1440, 768 and 375 — those are the three tiers, and
a tier is only true if the rendered column width matches what its `sizes` declares.

**Never write a probe into `public/`, or anywhere else in the repo, to measure a build.** It
becomes a served asset, it shows up in `git status`, and it measures the page inside an iframe
instead of measuring the page. A stale probe that reaches a commit is worse than no
measurement at all.

Most photographs are `loading="lazy"`, so a region below the fold comes back blank in a
screenshot; the script forces eager loading and re-scrolls before capturing for that reason.
If a capture still comes back blank, say the visual could not be produced rather than
presenting a white image as evidence.
