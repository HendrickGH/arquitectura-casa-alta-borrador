import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { cx } from "@/lib/cx";
import { revealStep } from "@/lib/reveal";
import type { MasonryItem } from "@/types/content";

interface MasonryGalleryProps {
  items: MasonryItem[];
  tone?: "canvas" | "bone";
}

/**
 * `sizes` for the two cell widths the mosaic declares.
 *
 * At 1200px and up the double cell spans two of three columns (~66vw) and every
 * other cell one (~33vw). Between 768 and 1199 the wall is two columns: the
 * double cell is a half-width tall slot and the rest are halves, so both share
 * the same value there. Below 768 the wall is a single column.
 */
const DOUBLE_SIZES = "(min-width: 1200px) 66vw, (min-width: 768px) 50vw, 100vw";
const CELL_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * The archive wall: the strongest photographs the studio has, across its
 * projects, packed into a grid that fills its rectangle.
 *
 * A CSS grid of fixed rows, not multi-column and not a script. Each cell is a
 * `1fr` track, so the wall is exactly as wide as its section and as tall as the
 * declared `aspect-ratio`; the double cells carry an explicit span and the
 * pattern tiles the tracks exactly, so there are no holes and nothing is
 * measured at runtime -- the whole wall is in the server HTML.
 *
 * The pattern is one three-item block repeated four times: a double cell and
 * two singles. That tiles the rectangle exactly at both grid tiers -- 3 columns
 * x 8 rows at 1200px, 2 x 8 below it -- because the block covers 6 cells over 2
 * rows at three columns and 4 cells over 2 rows at two. The count is therefore
 * part of the contract: `masonrySlots` in `src/content/masonry.ts` has to stay a
 * multiple of three, or the last block closes half-tiled.
 *
 * Every other double cell is pinned to the second column, so the doubles
 * alternate sides and each of the three columns carries singles too. Without
 * that the doubles all stacked on the left and the wall read as two columns.
 * `grid-flow-row-dense` is what lets the following singles back-fill the cell
 * the pinned double left open; without it the sparse cursor skips it and the
 * wall closes with holes.
 *
 * `fit="mosaic"` is what makes a cell fill: the grid's definite row height lets
 * the photo cover its cell, while on one column the row stays auto and the photo
 * keeps its own ratio. Cropping is the deliberate cost of the full rectangle --
 * the alternative, intrinsic ratios in equal-width columns, always leaves the
 * last column short.
 *
 * Both column steps and the two aspect ratios are arbitrary variants for the
 * reason recorded in ProjectsGrid: Tailwind orders arbitrary media variants
 * before the named breakpoints, so `md:` plus `min-[1200px]:` would leave the
 * wall two columns wide at every width above 1200px -- measured, not assumed.
 *
 * No captions, no headings, and no `Container`: the wall is flush to the
 * viewport so a column really is the third of it the tier declares.
 */
export function MasonryGallery({ items, tone = "bone" }: MasonryGalleryProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger">
      <div
        className={cx(
          "grid grid-flow-row-dense grid-cols-1 gap-6",
          "min-[768px]:aspect-[2/5] min-[768px]:grid-cols-2 min-[768px]:grid-rows-8",
          "min-[1200px]:aspect-[3/5] min-[1200px]:grid-cols-3",
        )}
      >
        {items.map((item, index) => {
          const doubled = index % 3 === 0;
          const rightSide = (index / 3) % 2 === 1;

          return (
            <div
              key={item.photo.src}
              {...revealStep(index)}
              // The wall reveals by opacity only, never translate: the drift
              // owns each single cell's `transform`, so a translate reveal would
              // fight it. See `buildDrift` in gsap-scenes.ts.
              data-reveal-motion="fade"
              // The drift carries the single cells only. A double spans two
              // columns at the three-column tier, so translating it pulls it out
              // of the row it shares with its neighbours; the doubles anchor the
              // wall instead. See `buildDrift` in gsap-scenes.ts.
              data-drift-item={doubled ? undefined : ""}
              className={cx(
                doubled && "min-[768px]:row-span-2",
                doubled && "min-[1200px]:col-span-2",
                doubled && rightSide && "min-[1200px]:col-start-2",
              )}
            >
              <Photo
                photo={item.photo}
                sizes={doubled ? DOUBLE_SIZES : CELL_SIZES}
                fit="mosaic"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
