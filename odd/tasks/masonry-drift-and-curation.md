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

- [ ] T1 Drift: only cells as wide as the narrowest column move; spanning cells
      anchor the wall. Verify 3-col (doubles static) and 2-col (all move).
- [ ] T2 Author the masonry order in `src/content/masonry.ts`; drop
      `balancedForColumns` and the rank/count constants.
- [ ] T3 Replace the rusted door with `01-calle-pendiente-fachada-colonial` and
      order the 12 slots by impact.
- [ ] T4 `pnpm typecheck`, `pnpm build`, `pnpm check:images`.

## Verification

- `pnpm typecheck`
- `pnpm build`
- `pnpm check:images`

## Progress

- [x] T1 Drift bug diagnosed (left-edge bucketing of spanning cells).
- [ ] T2
- [ ] T3
- [ ] T4

## Next step

Implement T1–T3, then run T4.
