import { Photo } from "@/components/atoms/Photo";
import { cx } from "@/lib/cx";
import type { Photo as PhotoModel } from "@/types/content";

interface EditorialImageProps {
  photo: PhotoModel;
  /**
   * Required, and it must match the panel's real slot: the loader resolves the
   * AVIF tier from this value, so a wrong hint means the wrong file. The value
   * is always one of the three shipped tiers.
   */
  sizes: string;
  className?: string;
}

/**
 * The services section's section texture: the one place stock imagery is
 * allowed (design.md §D7).
 *
 * `fit="intrinsic"` keeps the photo's own ratio, so the ingested `width`/
 * `height` reserve the space and the section takes no layout shift. The image
 * is texture, never captioned as the studio's own work, and never reaches the
 * portfolio, the masonry or a project gallery.
 */
export function EditorialImage({
  photo,
  sizes,
  className,
}: EditorialImageProps) {
  return (
    <div className={cx("overflow-hidden bg-bone-100", className)}>
      <Photo photo={photo} sizes={sizes} fit="intrinsic" />
    </div>
  );
}
