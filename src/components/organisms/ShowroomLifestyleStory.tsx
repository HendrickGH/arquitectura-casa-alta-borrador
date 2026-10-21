import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { ShowroomStoryScene } from "@/types/content";

export interface ShowroomLifestyleStoryProps {
  eyebrow: string;
  heading: string;
  body: string;
  scenes: ShowroomStoryScene[];
}

const PRIMARY_PHOTO_SIZES = "(min-width: 1024px) 60vw, 100vw";
const SECONDARY_PHOTO_SIZES = "(min-width: 1024px) 35vw, 100vw";

/**
 * Layer 5: Monografía Editorial "El Showroom Habitado".
 *
 * Transforms the uncurated 21-photo showroom shoot into an editorial story
 * about human scale, social rituals, and hidden functional ergonomics
 * in high-end kitchen and interior architecture.
 *
 * Adheres strictly to DESIGN.md: 0px geometry, Marcellus/Montserrat hierarchy,
 * Section tone="bone", and zero hairline borders.
 */
export function ShowroomLifestyleStory({
  eyebrow,
  heading,
  body,
  scenes,
}: ShowroomLifestyleStoryProps) {
  if (!scenes || scenes.length === 0) return null;

  return (
    <Section tone="bone" density="default">
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} body={body} />

        <div className="mt-16 sm:mt-20 space-y-20 sm:space-y-28 lg:space-y-36">
          {scenes.map((scene, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={scene.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                {/* Visual Diptych Block */}
                <div
                  className={`grid grid-cols-12 gap-4 lg:col-span-7 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Primary Focal Photo */}
                  <div className="relative aspect-[4/3] col-span-12 overflow-hidden bg-bone-200 sm:col-span-8 lg:aspect-[4/3]">
                    <Photo
                      photo={scene.primaryPhoto}
                      sizes={PRIMARY_PHOTO_SIZES}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>

                  {/* Secondary Detail Photo */}
                  {scene.secondaryPhoto ? (
                    <div className="relative aspect-[4/3] col-span-12 overflow-hidden bg-bone-200 sm:col-span-4 sm:h-full sm:aspect-auto">
                      <Photo
                        photo={scene.secondaryPhoto}
                        sizes={SECONDARY_PHOTO_SIZES}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Narrative Architecture Block */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="label text-2xl font-semibold tabular-nums text-brand-800">
                      {scene.number}
                    </span>
                    <span className="label text-ink-muted">
                      ESCENA EDITORIAL
                    </span>
                  </div>

                  <Heading
                    as="h3"
                    voice="serif"
                    className="mt-3 text-2xl sm:text-3xl lg:text-[2rem] text-ink leading-snug"
                  >
                    {scene.title}
                  </Heading>

                  <p className="mt-2 text-sm sm:text-base font-medium text-brand-900 leading-snug">
                    {scene.subtitle}
                  </p>

                  <Text size="base" className="mt-4 text-ink-muted leading-relaxed">
                    {scene.description}
                  </Text>

                  {/* Architecture Highlights with 0px Square Bullets */}
                  <ul className="mt-6 space-y-2.5">
                    {scene.highlights.map((item, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-ink leading-snug"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
