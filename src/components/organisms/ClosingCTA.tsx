import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import type { CallToAction, Photo as PhotoModel } from "@/types/content";

interface ClosingCTAProps {
  closing: { heading: string; body: string; cta: CallToAction };
  /** Optional override photograph; defaults to a coastal studio work. */
  photo?: PhotoModel;
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

const DEFAULT_CLOSING_PHOTO: PhotoModel = {
  src: "/images/arquitectura-sostenible/10-conjunto-sustentable-palmeras-alberca-techos-palma.avif",
  alt: "Conjunto residencial sustentable con alberca, palmeras y cubiertas de palma natural en la costa de Oaxaca",
  width: 829,
  height: 1280,
};

/**
 * Thirdway closing call-to-action spread used across the 6 dedicated routes.
 *
 * Pairs a real studio photograph with a warm `concha-nacar` card so no page
 * ends with a plain text-only block.
 */
export function ClosingCTA({
  closing,
  photo = DEFAULT_CLOSING_PHOTO,
  id,
}: ClosingCTAProps) {
  const external = closing.cta.href.startsWith("http");

  return (
    <section
      id={id}
      data-reveal="idle"
      className="ruler-top border-t border-ink/15 bg-concha-nacar py-20 md:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Photo
                photo={photo}
                sizes="(min-width: 1024px) 40vw, 95vw"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="eyebrow">Primera reunión sin costo</span>
            </div>

            <Heading
              voice="serif"
              sizeClassName="text-[1.95rem] leading-[1.12] md:text-[2.5rem]"
            >
              {closing.heading}
            </Heading>

            <p className="max-w-[54ch] text-base leading-relaxed text-ink-muted md:text-lg">
              {closing.body}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-6">
              <Button
                href={closing.cta.href}
                external={external}
                variant="primary"
                size="sm"
                arrow
              >
                {closing.cta.label}
              </Button>
              <Button href="/contacto" variant="secondary" size="sm" arrow>
                Ir a formulario y oficinas
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
