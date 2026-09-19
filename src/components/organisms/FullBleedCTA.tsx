import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { HomePage, Photo as PhotoModel } from "@/types/content";

interface FullBleedCTAProps {
  photo: PhotoModel | null;
  /** The closing copy, set directly on the darkened photograph. */
  closing: HomePage["closing"];
}

/**
 * The second full-bleed photograph, now carrying the closing call to action.
 *
 * The photograph is the panel and the copy sits on it, the same composition as
 * the hero: a dark overlay is what makes white type legible over an image
 * whose luminance varies. The overlay is decorative and hidden from assistive
 * tech.
 *
 * The width is `w-full` inside a full-bleed section. A viewport-width rule --
 * the CSS unit, or Tailwind's own class for it -- would count the scrollbar and
 * give the document a horizontal one, which this page does not have. Note that
 * writing the banned token in a comment is not neutral here: Tailwind scans raw
 * file text, so the class gets emitted into the stylesheet anyway.
 *
 * `sizes="100vw"` is the other kind of value -- a srcset hint -- and for a slot
 * this wide it is the right one. The height is in `svh` for the same reason the
 * hero's is: `vh` measures the viewport without the collapsed mobile URL bar and
 * pushes the block past the visible area on a phone.
 */
export function FullBleedCTA({ photo, closing }: FullBleedCTAProps) {
  if (!photo) return null;

  const external = closing.cta.href.startsWith("http");

  return (
    <section {...revealAttrs("stagger")} className="bg-canvas">
      <div className="relative flex h-[70svh] min-h-[420px] w-full items-center justify-center overflow-hidden bg-bone-100 md:h-[80svh]">
        <div className="absolute inset-0 h-full w-full">
          <Photo photo={photo} sizes="100vw" />
        </div>

        <div className="cta-overlay absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 py-20">
          <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-7 text-center">
            <div {...revealStep(0)}>
              <Heading voice="serif" className="max-w-[22ch] text-white">
                {closing.heading}
              </Heading>
            </div>

            <div {...revealStep(1)}>
              <p className="max-w-[56ch] text-lg leading-relaxed text-white/90">
                {closing.body}
              </p>
            </div>

            <div {...revealStep(2)}>
              <Button
                href={closing.cta.href}
                variant="inverse"
                external={external}
                className="mt-4"
              >
                {closing.cta.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
