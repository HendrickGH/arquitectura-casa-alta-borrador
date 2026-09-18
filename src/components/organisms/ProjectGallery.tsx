import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import type { Photo as PhotoModel } from "@/types/content";

interface ProjectGalleryProps {
  /** Already score-filtered and manifest-ordered by the seam. */
  photos: PhotoModel[];
  tone?: "canvas" | "bone";
}

/** One cell of the two-column grid, so the 2-column tier is the exact slot. */
const GALLERY_SIZES = "(min-width: 768px) 50vw, 100vw";

/**
 * One project's photographs, one column below 768px and two above it.
 *
 * `fit="intrinsic"` keeps each photo at its own ratio instead of cropping it to
 * a shared box: these are the whole record of the project, and a cover crop
 * would discard the top or bottom of every portrait. The cost is ragged rows,
 * which is why the grid aligns on `items-start` rather than stretching cells.
 *
 * The first photo is the page's leading image -- `priority`, never lazy. Every
 * later one is lazy.
 *
 * Both column steps are arbitrary variants for the reason recorded in
 * ProjectsGrid: Tailwind orders arbitrary media variants before its named
 * breakpoints, so mixing `md:` with an arbitrary step lets the wrong rule win.
 */
export function ProjectGallery({
  photos,
  tone = "canvas",
}: ProjectGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <Section tone={tone} className="pt-0 md:pt-0 lg:pt-0">
      <Container>
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-14 min-[768px]:grid-cols-2">
          {photos.map((photo, index) => (
            <Photo
              key={photo.src}
              photo={photo}
              sizes={GALLERY_SIZES}
              priority={index === 0}
              fit="intrinsic"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
