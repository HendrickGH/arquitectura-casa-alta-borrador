import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";
import type { SectionIntro } from "@/types/content";

interface IntroSectionProps {
  intro: SectionIntro;
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

const PHOTO_SIZES = "(min-width: 1024px) 46vw, 100vw";

/**
 * The opening statement: where the studio says who it is (`CASA ALTA ·
 * Arquitectura que perdura`), paired with the full-color aerial photograph of
 * the Punta Zicatela coastal ensemble and tighter top padding so there is no
 * dead white gap beneath the Hero.
 */
export function IntroSection({
  intro,
  tone = "canvas",
  id,
}: IntroSectionProps) {
  const paragraphs =
    intro.paragraphs && intro.paragraphs.length > 0
      ? intro.paragraphs
      : intro.body
        ? [intro.body]
        : [];

  return (
    <Section
      id={id}
      tone={tone}
      reveal="stagger"
      className="!pt-10 !pb-14 md:!pt-14 md:!pb-20 lg:!pt-16 lg:!pb-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            {intro.eyebrow ? (
              <div {...revealStep(0)} className="flex items-center gap-3">
                <span className="number-pill">01</span>
                <p className="eyebrow">{intro.eyebrow}</p>
              </div>
            ) : null}

            <div {...revealStep(1)}>
              <Heading as="h2" voice="serif" className="max-w-[26ch]">
                {intro.heading}
              </Heading>
            </div>

            <div {...revealStep(2)} className="mt-1 flex flex-col gap-4">
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={paragraph}
                  size={index === 0 ? "lede" : undefined}
                  className={index === 0 ? "text-ink" : "text-ink-muted"}
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <div {...revealStep(3)} className="mt-2">
              <Button href="/nosotros" variant="secondary" size="sm" arrow>
                Conocer la firma y trayectoria
              </Button>
            </div>
          </div>

          {intro.photo ? (
            <figure
              {...revealStep(2)}
              className="flex flex-col gap-3 lg:col-span-5 lg:mt-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-bone-200 bg-bone-100">
                <Photo photo={intro.photo} sizes={PHOTO_SIZES} />
              </div>
              {intro.photoCaption ? (
                <figcaption className="flex items-center justify-between gap-4 border-b border-bone-200 pb-2.5 text-xs text-ink-muted">
                  <span>{intro.photoCaption}</span>
                  <span className="number-pill">OAX · MX</span>
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
