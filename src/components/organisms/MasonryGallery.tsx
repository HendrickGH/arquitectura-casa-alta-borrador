import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import type { MasonryItem } from "@/types/content";

interface MasonryGalleryProps {
  items: MasonryItem[];
  tone?: "canvas" | "bone";
}

/** Three columns from 1200px, two from 768px: the CSS below is what makes it true. */
const WALL_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * The archive wall: the strongest photographs the studio has, across its
 * projects, packed into columns under the services section.
 *
 * CSS multi-column, not a grid and not a script. Of the three it is the only
 * one that keeps every item at its own aspect ratio with no holes, no span
 * arithmetic to keep in sync with each photo's dimensions, and no JavaScript --
 * the whole wall is in the server HTML. The cost is stated rather than hidden:
 * visual order runs down each column instead of across. That is correct here
 * because these are independent photographs with authored alt text, not a
 * sequence a reader follows in order.
 *
 * `fit="intrinsic"` is what lets each item keep its ratio inside a column; a
 * cover crop would drop the boxes to one height and turn the wall into a grid.
 *
 * Both column steps are arbitrary variants for the reason recorded in
 * ProjectsGrid: Tailwind orders arbitrary media variants before the named
 * breakpoints, so `md:` plus `min-[1200px]:` would leave the wall two columns
 * wide at every width above 1200px -- measured, not assumed.
 *
 * No captions, no headings, and no `Container`: the wall is flush to the
 * viewport so a column really is the third of it the tier declares.
 */
export function MasonryGallery({ items, tone = "bone" }: MasonryGalleryProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone}>
      <div className="columns-1 gap-6 min-[768px]:columns-2 min-[1200px]:columns-3">
        {items.map((item) => (
          <div key={item.photo.src} className="mb-6 break-inside-avoid">
            <Photo photo={item.photo} sizes={WALL_SIZES} fit="intrinsic" />
          </div>
        ))}
      </div>
    </Section>
  );
}
