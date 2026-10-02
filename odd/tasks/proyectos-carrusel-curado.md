# Projects section: curated principal images + manual 3-image carousel

## Objective

The client says the images shown in the projects section are not the most
appropriate. Curate the best image of each catalog project as its principal,
and turn each project card into a manual (non-automatic) 3-image carousel with
two overlaid arrows and a "Conoce más sobre {project}" button.

## Problem

Every project card shows a single photograph: `getProjectCover()` sorts by the
manifest `order` and returns the first entry **regardless of orientation**. Many
of those are portrait (El Bicho, Casa Blake, Punta Zicatela, Palmarito, Santa
Rosa, Tarrastro…), so the `aspect-[4/3]` box crops them and the card no longer
reads as the project. The client wants representative images and a way to see
more without leaving the page.

## Why

- A card is the first impression of a project; a cropped portrait detail is a
  poor summary.
- Three images per project give range (exterior / interior / context) in place.
- A manual carousel keeps control with the visitor; no motion, no surprises.
- An explicit per-project CTA ("Conoce más sobre X") is a clearer affordance
  than an unlabelled whole-card link.

## Scope

In:
- A curated image selection per project (principal + best 3), authored as data.
- The content seam resolving that selection into `Photo[]`.
- `ProjectCard` becomes a client component: manual carousel + arrows + CTA.
- Both surfaces that use `ProjectCard`: the landing projects section
  (`FeaturedPortfolio` + `ProjectsGrid`) and the `/proyectos` index.

Out:
- The image pipeline, `images/` and `images-optimizado/`.
- Project detail pages (`/proyectos/[slug]`) and their gallery.
- SEO/sitemap work.

## Constraints

- Copy and image choices live in `src/content/*`; components receive props.
- Use the manifest as the source of dimensions, alt (`note`) and paths; never
  recompute filenames.
- Landscape preferred for the principal; the full-width lead card (Plaza
  Esmeralda) needs a >=1600px-wide source so it is not upscaled.
- No automatic advance; arrows only. Hide arrows when a project has one image.
- `prefers-reduced-motion` is deliberately not honoured in this repo.
- Do not rename any numeric-prefixed path.

## Tasks

- [x] T1 Curate, per project, an ordered best-3 (`gallery`) with the principal
      first; store as editorial data and resolve in the seam.
- [x] T2 Extend the `Project` view model with `gallery: Photo[]`.
- [x] T3 `ProjectCard`: client manual carousel (arrows overlaid on the images,
      vertically centred, a few px from each edge, responsive), caption and a
      "Conoce más sobre {title}" button. Not a whole-card link.
- [x] T4 Add a left-arrow glyph to the Icon atom.
- [x] T5 Wire both surfaces; keep the reveal-step behaviour.
- [x] T6 Checks: typecheck, lint, build, CDP measure.

## Acceptance criteria

- Each project card shows the first of its curated 3 images as principal.
- The arrows are manual (no timer) and move one image at a time.
- Arrows are vertically centred over the image, flush to the left and right
  edges (a few px in), and scale with the viewport.
- Each card has a button labelled "Conoce más sobre {project.title}" linking to
  `/proyectos/{slug}`.
- Cards with a single image show no arrows.
- No horizontal overflow; no duplicated photograph across the page.

## Progress

- [x] T1..T6 complete.

### Decisions worth recording

- The curation was a separate visual pass (contact sheets) and is authored as
  `curatedGalleries` in `src/content/projects.ts`, resolved by
  `getProjectGallery()` in the seam.
- The 6 featured projects' galleries avoid the photograph their masonry slot
  uses, so the landing never renders one file twice.
- Projects 10 and 12 show 2 images, not 3: `10` leaves one publishable photo for
  the multifamiliar tile (its only 4 photos are shared with the card, masonry
  and tile), and `12`'s only exterior is the masonry photo.
- 4 principals are portrait (03 Casa Blake, 06 Capilla, 09 Santa Rosa,
  10 Punta Zicatela) because those projects have no publishable landscape that
  shows the whole project; the 4:3 box crops them. Known, not an oversight.
- `ProjectCard` moved the CTA alignment fix: the caption is `flex-1` so the
  button sits on the row's baseline.

## Verification evidence

- `pnpm typecheck` -- pass.
- `pnpm lint` -- pass, 0 errors (1 pre-existing unrelated warning).
- `pnpm build` -- pass, 18/18 pages.
- `pnpm check:images` -- all referenced images resolve.
- CDP measure (`/proyectos` at 1280 and 375): `scrollWidth` equals the viewport
  (no overflow), `broken: 0`, `duplicated: []`.
- CDP measure (`/` at 1280): `duplicated: []`; built HTML carries 49 `<img>`,
  49 unique; the four category tiles survive; the curated principals appear.
- Screenshot of `/proyectos`: arrows render vertically centred, flush to the
  left/right edges, and the "Conoce más sobre {project}" buttons align per row.
