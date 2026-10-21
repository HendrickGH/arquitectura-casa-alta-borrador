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
  density?: "default" | "compact";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

const PHOTO_SIZES =
  "(min-width: 1280px) 580px, (min-width: 1024px) 46vw, 100vw";

/**
 * Minimalist architectural editorial introduction (`Quiénes somos`).
 *
 * Balanced 50/50 monograph spread pairing a single vertical photograph of
 * authentic on-site supervision (left) with a generous whitespace column (right)
 * carrying the studio's two-line synthesis lede and secondary navigation.
 */
export function IntroSection({
  intro,
  tone = "canvas",
  density = "default",
  id,
}: IntroSectionProps) {
  const paragraphs =
    intro.paragraphs && intro.paragraphs.length > 0
      ? [intro.body, ...intro.paragraphs]
      : intro.body
        ? [intro.body]
        : [];

  return (
    <Section id={id} tone={tone} density={density} reveal="stagger">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Left column: Vertical photograph of authentic on-site supervision */}
          {intro.photo ? (
            <div {...revealStep(0)} className="lg:col-span-6">
              <figure className="overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-100 sm:aspect-[3/4]">
                  <Photo
                    photo={intro.photo}
                    sizes={PHOTO_SIZES}
                    fit="cover"
                  />
                </div>
                {intro.photoCaption ? (
                  <figcaption className="mt-3 text-xs text-ink-muted">
                    <span>{intro.photoCaption}</span>
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : null}

          {/* Right column: Minimal editorial statement with generous whitespace */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pl-4 xl:pl-8">
            {intro.eyebrow ? (
              <div {...revealStep(1)}>
                <p className="eyebrow mb-4">{intro.eyebrow}</p>
              </div>
            ) : null}

            <div {...revealStep(2)}>
              <Heading
                as="h2"
                voice="serif"
                sizeClassName="text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.12]"
                className="max-w-[22ch]"
              >
                {intro.heading}
              </Heading>
            </div>

            <div {...revealStep(3)} className="mt-6 flex flex-col gap-4">
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={paragraph}
                  size={index === 0 ? "lede" : undefined}
                  className={
                    index === 0
                      ? "max-w-[46ch] text-ink"
                      : "max-w-[46ch] text-ink-muted"
                  }
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <div
              {...revealStep(4)}
              className="mt-10 pt-2"
            >
              <Button href="/nosotros" variant="secondary" size="sm" arrow>
                Conocer el estudio
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
