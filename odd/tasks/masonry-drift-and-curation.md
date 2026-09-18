# Masonry drift fix, photo swap, curated order and manifest encoding

## Objective

Remove the stray vertical translate the masonry's largest cells carry, replace
the rusted-door photograph, put the wall in a curated order that leads with the
strongest images, and repair the mojibake the manifest carries into alt text.

## Problem (evidenced)

1. **Drift on the large cells, two causes.** Measured in headless Chrome (CDP)
   against a production build:
   - `buildDrift()` grouped cells by `Math.round(rect.left)` but never sorted the
     groups. The grid's `grid-flow-row-dense` does not walk the DOM column by
     column, so the order the columns were first seen in is not their order on
     screen. With the authored order the map came out `[0, 976, 488]`, so the
     centred `(index - (n-1)/2) * TRAVEL` offsets were handed to the wrong
     columns: left column `-24`, right column `0` (skipped), middle column `+24`
     with no cells left to move.
   - The double cells were included in the drift. At the three-column tier a
     double spans two columns, so translating it pulls it out of the row it
     shares with its neighbours; at the two-column tier it is a 2-row cell and
     every width translated it. Reported symptom: `transform:
     translate3d(0px, 10.0087px, 0px)` on a large cell that should read `0`.
   - A resize did not rebuild the groups: the whole scene was registered under
     the motion query alone, so tweens stayed bound to the columns of the
     layout that mounted them.

2. **Order was computed, not curated.** `balancedForColumns()` interleaved
   tall/short photographs to feed CSS multi-column's height balancer. The wall
   is a fixed-row grid now, so the balancer is gone and the interleave only
   scattered the quality ranking.

3. **Rusted door.** Casa Melchor's slot drew `02-puerta-acero-oxidado-relieve`:
   a dark, flat, frontal door in one of the largest cells.

4. **Manifest mojibake.** `tools/manifest.pl` read its TSV, `joined.txt` and
   `avif-dims.txt` as raw bytes, so `JSON::PP->ascii` escaped each byte of a
   multi-byte character separately: "lámparas" shipped as "lÃ¡mparas". 23 note
   fields and 3 `source` paths affected; 6 of the landing's 39 alt attributes
   rendered the mojibake.

## Scope

- `src/components/organisms/gsap-scenes.ts` — drift grouping, sorting, tier.
- `src/components/organisms/MasonryGallery.tsx` — singles carry `data-drift-item`.
- `src/content/masonry.ts` — authored display order.
- `src/types/content.ts` — `MasonrySlot`.
- `src/lib/content/photos.ts`, `src/lib/content/index.ts` — seam.
- `tools/manifest.pl` — UTF-8 input encoding.
- `images-optimizado/manifest.json` — regenerated (encoding only).

## Constraints

- Masonry spec: more than one project, every photo score >= 3, manifest-backed,
  no stock, `sizes` tier unchanged.
- No published path renamed.
- The wall's grid tiles exactly only while its slot count is a multiple of 3.
- Generated artifacts and comments in English.

## Tasks

- [x] T1 Drift: doubles are explicit anchors (`data-drift-item` on singles only),
      column groups sorted by left edge, scene registered under the motion query
      and the three-column tier so a resize rebuilds it.
- [x] T2 Authored order in `src/content/masonry.ts`; deleted
      `balancedForColumns`, `MASONRY_COUNT`, `MASONRY_RANK`.
- [x] T3 Casa Melchor draws `01-calle-pendiente-fachada-colonial`; 12 slots
      ordered by impact, doubles on plaza, El Bicho, Blake and Melchor.
- [x] T4 `tools/manifest.pl` reads UTF-8; `manifest.json` regenerated.
- [x] T5 Checks.

## Verification

- `pnpm typecheck` — pass.
- `pnpm build` — pass (18 static pages).
- `pnpm check:images` — 454 URLs, every referenced image resolves.
- Headless Chrome (production build, `prefers-reduced-motion: no-preference`):
  - 1440px: the four doubles read `(none)`; the two single columns read
    `+8.99px` / `-8.99px` — symmetric.
  - 1180px and 900px: every cell reads `(none)` (no drift below the
    three-column tier).
  - Resize 1440 -> 1000 with no reload: every cell reads `(none)`, so no tween
    survives bound to the previous columns.
- Built HTML: 227 alt attributes across 18 files, 0 with mojibake (was 6 on the
  landing).
- Manifest regeneration diff: 26 fields, all encoding-only (23 notes, 3
  sources), no structural or numeric change.

## Progress

Complete. Follow-up not taken: below 1200px the wall now has no drift at all,
because its left column is entirely double cells and the doubles anchor.

## Next step

Visual confirmation in a browser at 1440px: the doubles should sit perfectly
still while the single columns drift in opposite directions.
