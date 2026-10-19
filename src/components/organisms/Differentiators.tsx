import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { Differentiator, SectionIntro } from "@/types/content";

interface DifferentiatorsProps {
  intro: SectionIntro;
  items: Differentiator[];
  tone?: "canvas" | "bone";
}

const DIFF_PHOTO_SIZES = "(min-width: 768px) 48vw, 95vw";

/**
 * Architectural differentiator plates (`Por qué Casa Alta`).
 *
 * Canonical Clean-Ground Card Order:
 * 1° Photo (aspect-[16/10], 0px corners, no dark overlay, no text on photo)
 * 2° Metadata (.label text-brand-800: item.tag)
 * 3° Title (Heading as="h3" voice="serif")
 * 4° Summary (Text in Montserrat)
 * 5° Checkpoints (0px square bullets)
 */
export function Differentiators({
  intro,
  items,
  tone = "bone",
}: DifferentiatorsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
          className="mb-14 border-b border-bone-200 pb-8 md:mb-20"
        />

        {/* 2-Column Editorial Vignettes */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {items.map((item, index) => (
            <article
              key={item.title}
              {...revealStep(index)}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* 1° Photo */}
                {item.photo ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200">
                    <Photo
                      photo={item.photo}
                      sizes={DIFF_PHOTO_SIZES}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    />
                  </div>
                ) : null}

                {/* 2° Metadata */}
                <div className="mt-6">
                  {item.tag ? (
                    <span className="label text-brand-800">{item.tag}</span>
                  ) : null}

                  {/* 3° Title */}
                  <Heading
                    as="h3"
                    voice="serif"
                    sizeClassName="mt-2 text-2xl leading-snug md:text-3xl"
                  >
                    {item.title}
                  </Heading>

                  {/* 4° Summary */}
                  <Text className="mt-3 text-ink-muted">
                    {item.description}
                  </Text>

                  {/* 5° Technical Checkpoints with 0px square bullets */}
                  {item.points && item.points.length > 0 ? (
                    <ul className="mt-5 space-y-2 text-xs text-ink/85">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

