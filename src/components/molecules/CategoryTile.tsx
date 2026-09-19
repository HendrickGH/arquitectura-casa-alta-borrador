import Link from "next/link";
import { Photo } from "@/components/atoms/Photo";
import { revealStep } from "@/lib/reveal";
import type { CategoryTile as CategoryTileModel } from "@/types/content";

interface CategoryTileProps {
  tile: CategoryTileModel;
  /** Zero-based position in the `stagger` cascade; omitted when unstaggered. */
  revealIndex?: number;
}

/**
 * The tile's slot: half the viewport from 768px, the whole of it below that.
 * The grid in CategoryTiles is flush to the section, which is what makes the
 * declared fraction true rather than approximate.
 */
const TILE_SIZES = "(min-width: 768px) 50vw, 100vw";

/**
 * One category: a photograph, its authored label, one target.
 *
 * The label sits on clean ground under the photograph, never on top of it. The
 * site's own record is that type over a photograph fails on variance rather
 * than on average luminance (Hero.tsx), and no tile is worth re-measuring that
 * per candidate image.
 *
 * The hover scale repeats on focus: the whole tile is the link, so a keyboard
 * visitor gets the same affordance a pointer does.
 */
export function CategoryTile({ tile, revealIndex }: CategoryTileProps) {
  return (
    <Link
      href={tile.href}
      {...revealStep(revealIndex)}
      className="group flex flex-col"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
        <Photo
          photo={tile.photo}
          sizes={TILE_SIZES}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
      </div>

      {/* Padded to the Container's own gutter scale, so four labels read as one
          row instead of drifting against the flush photographs above them. The
          caption is set in the editorial serif at a size that earns the space,
          and warms to the brand on hover so the whole tile reads as one link. */}
      <p className="voice px-6 pt-5 pb-10 text-xl text-ink transition-colors duration-300 group-hover:text-brand-800 md:px-10 md:pb-14 md:text-2xl">
        {tile.label}
      </p>
    </Link>
  );
}
