import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { SectionIntro } from "@/types/content";

interface IntroSectionProps {
  intro: SectionIntro;
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The opening statement: where the studio says who it is. The measure is held
 * by the lede's own cap, so the paragraph never runs wider than a comfortable
 * read even on a 1440px canvas.
 */
export function IntroSection({ intro, tone = "canvas", id }: IntroSectionProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className="max-w-[62rem]">
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
          />
        </div>
      </Container>
    </Section>
  );
}
