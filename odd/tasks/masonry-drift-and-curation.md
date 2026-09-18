# Masonry drift fix, photo swap and curated order

## Objective

Remove the stray vertical translate the masonry's largest cells carry, replace
the rusted-door photograph and put the wall in a curated order that leads with
the strongest images.

## Problem (evidenced)

1. **Drift bug.** `buildDrift()` in `src/components/organisms/gsap-scenes.ts`
   buckets every `[data-drift-item]` by `Math.round(rect.left)`. The wall is a
   fixed-row CSS grid whose double cells span two columns at the >=1200px tier
   (`MasonryGallery.tsx`, `min-[1200px]:col-span-2`). A double's left edge is the
   left edge of the column it starts in, so the bucketing reads a two-column cell
   as a one-column cell. GSAP then writes an inline `transform: translate(...)`
   on it, pulling it out of the row it shares with the other column, while the
   double pinned to `col-start-2` (index 3 and 9) lands in the middle bucket with
   `shift === 0` and is skipped. Result: two of the four big cells move, two do
   not. This is the "translate extraño" / slight overflow reported.
2. **Order is computed, not curated.** `balancedForColumns()` in
   `src/lib/content/photos.ts` interleaves tall and short photographs to feed
   CSS multi-column's height balancer. The wall changed to a fixed-row grid in
   commit `d009d34`, so the balancer is gone and the interleave only scatters the
   authored quality ranking. The four double cells (index 0, 3, 6, 9) land on
   whatever the aspect-ratio sort produced.
3. **Rusted door.** The Casa Melchor slot draws
   `02-puerta-acero-oxidado-relieve`: a dark, flat, frontal door (854x1280) that
   reads as an empty slab in a mosaic cell, and sits in one of the largest cells.

## Scope

- `src/components/organisms/gsap-scenes.ts` — drift bucketing.
- `src/content/masonry.ts` — new; authored display order.
- `src/types/content.ts` — `MasonrySlot` type.
- `src/lib/content/photos.ts` — `masonryPhotos()` takes the authored slots;
  delete `balancedForColumns`.
- `src/lib/content/index.ts` — `getMasonry()` reads the authored list.
- `src/components/organisms/MasonryGallery.tsx` — doc reference only.

## Constraints

- Masonry spec (`landing-composition`): more than one project, every photo
  score >= 3, manifest-backed, no stock, `sizes` tier unchanged.
- No published path renamed; `manifest.json` untouched.
- The wall's grid tiles exactly only while its slot count is a multiple of 3.
- Generated artifacts and comments in English.

## Tasks

- [x] T1 Drift: cells are still grouped by the column they start in, so the
      centred travel is unchanged; spanning cells (wider than the narrowest
      column) anchor instead of drifting. 3-col: doubles static, singles move
      ±24. 2-col: all cells one column wide, both groups move ±12. 1-col: one
      group, no drift.
- [x] T2 Authored the order in `src/content/masonry.ts`; deleted
      `balancedForColumns`, `MASONRY_COUNT` and `MASONRY_RANK`; `masonryPhotos`
      now resolves the authored slots and drops missing/low-score ones.
- [x] T3 Casa Melchor's slot draws `01-calle-pendiente-fachada-colonial` (score
      5, landscape) instead of `02-puerta-acero-oxidado-relieve`; the 12 slots
      ordered by impact, with the four double cells on plaza, El Bicho, Blake
      and Melchor.
- [x] T4 Checks run.

## Verification

- `pnpm typecheck` — pass.
- `pnpm build` — pass (18 static pages).
- `pnpm check:images` — 454 URLs, every referenced image resolves.
- Built HTML (`/.next/server/app/index.html`) carries the 12 masonry sources in
  the authored order, no duplicate, none from `images/editorial/`.

## Progress

Complete. No remaining task.

## Next step

Visual confirmation in a browser at 1440px and 900px: the four double cells
should sit still while the single-column cells drift; nothing should read as
offset from its row.

