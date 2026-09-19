import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { Differentiator, SectionIntro } from "@/types/content";

interface DifferentiatorsProps {
  intro: SectionIntro;
  items: Differentiator[];
  tone?: "canvas" | "bone";
}

/**
 * What separates the studio from the next builder. No cards and no borders:
 * the two columns are held apart by measure and by whitespace alone, which is
 * the whole argument of the section.
 */
export function Differentiators({
  intro,
  items,
  tone = "canvas",
}: DifferentiatorsProps) {
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
            <div
              key={item.title}
              {...revealStep(index)}
              className="max-w-[46ch]"
            >
              <h3 className="voice text-2xl md:text-3xl">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
