import { Fragment } from "react";
import { Container } from "@/components/atoms/Container";
import { Rule } from "@/components/atoms/Rule";
import { Section } from "@/components/atoms/Section";
import { ProcessEntry } from "@/components/molecules/ProcessEntry";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { ProcessStep, SectionIntro } from "@/types/content";

interface ProcessListProps {
  intro: SectionIntro;
  steps: ProcessStep[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The process. An ordered list, and the only numbered thing on the page: the
 * steps happen in this order and the numbers say so.
 */
export function ProcessList({
  intro,
  steps,
  tone = "canvas",
  id,
}: ProcessListProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <ol className="mt-16 md:mt-20">
          {steps.map((step, index) => (
            <Fragment key={step.order}>
              {index > 0 ? <Rule /> : null}
              <ProcessEntry step={step} />
            </Fragment>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
