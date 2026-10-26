import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
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

/**
 * Editorial architectural introduction (`Quiénes somos`).
 * Two-column typographic spread:
 * - Left column: Eyebrow + Heading.
 * - Right column: Body paragraphs + Study link button.
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
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Left column: Eyebrow + Heading */}
          <div className="flex flex-col justify-start lg:col-span-5">
            {intro.eyebrow ? (
              <div {...revealStep(0)}>
                <p className="eyebrow mb-3">{intro.eyebrow}</p>
              </div>
            ) : null}

            <div {...revealStep(1)}>
              <Heading
                as="h2"
                voice="serif"
                sizeClassName="text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.12]"
                className="max-w-[18ch] text-ink"
              >
                {intro.heading}
              </Heading>
            </div>
          </div>

          {/* Right column: Paragraphs + Action button */}
          <div className="flex flex-col justify-start lg:col-span-7 lg:pt-2">
            <div {...revealStep(2)} className="flex flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <Text
                  key={paragraph}
                  size="lede"
                  className="max-w-[56ch] text-ink leading-relaxed"
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <div
              {...revealStep(3)}
              className="mt-8 pt-2"
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
