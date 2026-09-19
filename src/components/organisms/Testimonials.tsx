import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { SectionIntro, Testimonial } from "@/types/content";

interface TestimonialsProps {
  intro: SectionIntro;
  items: Testimonial[];
  tone?: "canvas" | "bone";
}

/**
 * Client words, attributed to the project rather than to a person.
 *
 * Returns null when there are none. There are none today, and a section that
 * renders an empty shell -- or worse, a placeholder quote -- would be a lie
 * about work the studio cannot yet evidence. The component is finished and
 * waiting for the first real entry.
 */
export function Testimonials({
  intro,
  items,
  tone = "canvas",
}: TestimonialsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:mt-20 md:grid-cols-2">
          {items.map((item, index) => (
            <figure
              key={item.projectName}
              {...revealStep(index)}
              className="max-w-[52ch]"
            >
              <blockquote className="voice text-2xl leading-snug md:text-3xl">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="label mt-6 text-ink-muted">
                {item.projectName}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
