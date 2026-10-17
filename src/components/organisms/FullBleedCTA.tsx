import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { HomePage, Photo as PhotoModel } from "@/types/content";

interface FullBleedCTAProps {
  photo: PhotoModel | null;
  /** The closing copy, set inside Thirdway's floating bottom-right warm card. */
  closing: HomePage["closing"];
}

/**
 * Thirdway closing full-bleed architectural stage with an asymmetric floating
 * warm `concha-nacar` card anchored to the bottom-right.
 */
export function FullBleedCTA({ photo, closing }: FullBleedCTAProps) {
  if (!photo) return null;

  const external = closing.cta.href.startsWith("http");

  return (
    <section {...revealAttrs("stagger")} className="bg-canvas">
      <div className="relative flex min-h-[540px] w-full items-end overflow-hidden bg-ink py-14 md:min-h-[680px] md:py-20">
        <div className="absolute inset-0 h-full w-full">
          <Photo photo={photo} sizes="100vw" />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent"
        />

        <Container className="relative z-10 flex justify-end">
          <div
            {...revealStep(0)}
            className="w-full max-w-[38rem] py-6 text-white md:py-10"
          >
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/20 pb-3.5">
              <span className="number-pill-inverse">(09)</span>
              <span className="label text-white/90">
                PRIMERA REUNIÓN SIN COSTO
              </span>
            </div>

            <Heading
              voice="serif"
              sizeClassName="text-[1.95rem] leading-[1.12] text-white md:text-[2.65rem]"
            >
              {closing.heading}
            </Heading>

            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              {closing.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
              <Button
                href={closing.cta.href}
                variant="primary"
                size="sm"
                external={external}
                arrow
              >
                {closing.cta.label}
              </Button>
              <span className="font-mono text-[0.68rem] tracking-widest text-white/70 uppercase">
                ZOOM O PRESENCIAL
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
