import Image from "next/image";
import { cx } from "@/lib/cx";
import type { Photo as PhotoModel } from "@/types/content";

interface PhotoProps {
  photo: PhotoModel;
  /**
   * Required, because it is what drives the loader: next/image asks for a width
   * based on this, and the loader maps that to the nearest AVIF tier that
   * actually exists for this photo. A wrong `sizes` means a wrong file.
   */
  sizes: string;
  className?: string;
  /** Above the fold only. Sets fetchpriority="high" and drops lazy loading. */
  priority?: boolean;
}

/**
 * The only component that renders an image.
 *
 * Uses next/image with the custom loader in src/lib/image/loader.ts, so the
 * browser gets a real srcset while the bytes come from files the pipeline
 * already encoded -- no re-encoding, no Netlify Image CDN WebP substitution.
 */
export function Photo({
  photo,
  sizes,
  className,
  priority = false,
}: PhotoProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      className={cx("h-full w-full object-cover", className)}
    />
  );
}
