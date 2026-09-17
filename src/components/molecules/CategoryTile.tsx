import Link from "next/link";
import { Photo } from "@/components/atoms/Photo";
import type { CategoryTile as CategoryTileModel } from "@/types/content";

interface CategoryTileProps {
  tile: CategoryTileModel;
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
export function CategoryTile({ tile }: CategoryTileProps) {
  return (
    <Link href={tile.href} className="group flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
        <Photo
          photo={tile.photo}
          sizes={TILE_SIZES}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
      </div>

      {/* Padded to the Container's own gutter scale, so four labels read as one
          row instead of drifting against the flush photographs above them. */}
      <p className="label px-6 pt-4 pb-8 text-ink-muted md:px-10 md:pb-10">
        {tile.label}
      </p>
    </Link>
  );
}
