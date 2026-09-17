import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel } from "@/types/content";

interface FullBleedMomentProps {
  photo: PhotoModel | null;
}

/**
 * The second full-bleed photograph, between the last text section and the
 * closing call to action: no copy, no heading, no container.
 *
 * The width is `w-full` inside a full-bleed section. A viewport-width rule --
 * the CSS unit, or Tailwind's own class for it -- would count the scrollbar and
 * give the document a horizontal one, which this page does not have. Note that
 * writing the banned token in a comment is not neutral here: Tailwind scans raw
 * file text, so the class gets emitted into the stylesheet anyway.
 *
 * `sizes="100vw"` is the other kind of value -- a srcset hint -- and for a slot
 * this wide it is the right one.
 *
 * The height is in `svh` for the same reason the hero's is: `vh` measures the
 * viewport without the collapsed mobile URL bar and pushes the block past the
 * visible area on a phone.
 */
export function FullBleedMoment({ photo }: FullBleedMomentProps) {
  if (!photo) return null;

  return (
    <section data-reveal="idle" className="bg-canvas">
      <div className="relative h-[60svh] min-h-[340px] w-full overflow-hidden bg-bone-100 md:h-[70svh]">
        {/* The wrapper is the scroll choreography's target; the parent clips it,
            so the scrubbed scale and lift never reveal an edge. */}
        <div data-scene-image className="h-full w-full">
          <Photo photo={photo} sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
