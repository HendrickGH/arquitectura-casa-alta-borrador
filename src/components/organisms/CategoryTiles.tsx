import { CategoryTile } from "@/components/molecules/CategoryTile";
import { revealAttrs } from "@/lib/reveal";
import type { CategoryTile as CategoryTileModel } from "@/types/content";

interface CategoryTilesProps {
  tiles: CategoryTileModel[];
}

/**
 * The photographic band under the hero: the categories the studio's work falls
 * into, each on a project that shows it. Two up from `md`, one below.
 *
 * Flush to the section and outside `Container`, because the declared tier is
 * `50vw`: inside the capped measure a tile would be ~45vw and the label would
 * be a lie the loader acts on.
 *
 * No `h2` here. This section repeats no authored heading, and its labels are
 * captions on work rather than sections of the page -- the same level the
 * project cards already use for their category line.
 */
export function CategoryTiles({ tiles }: CategoryTilesProps) {
  if (tiles.length === 0) return null;

  return (
    <section
      {...revealAttrs("stagger")}
      className="grid w-full grid-cols-1 bg-canvas md:grid-cols-2"
    >
      {tiles.map((tile, index) => (
        <CategoryTile key={tile.label} tile={tile} revealIndex={index} />
      ))}
    </section>
  );
}
