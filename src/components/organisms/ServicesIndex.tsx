import { Fragment } from "react";
import { Container } from "@/components/atoms/Container";
import { Rule } from "@/components/atoms/Rule";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceRow } from "@/components/molecules/ServiceRow";
import type { SectionIntro, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The service catalogue as a spec sheet: each group leads with its title set in
 * the display face as one line of a stack, then its own introduction, then its
 * entries separated by hairlines.
 *
 * Deliberately not a grid of cards. A card grid would give the four groups and
 * the thirteen services the same visual weight, which is the opposite of what
 * this list is for -- it is an index, read top to bottom.
 */
export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
}: ServicesIndexProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <div className="mt-16 flex flex-col gap-16 md:mt-20 md:gap-24">
          {groups.map((group) => (
            <div key={group.slug}>
              {/* One line of the stack, at full width. A side column would put
                  the title in 272px at 1024px, and "Construcción" is 404px at
                  48px. */}
              <h3 className="display max-w-[18ch] text-3xl leading-[0.92] md:text-4xl lg:text-5xl">
                {group.title}
              </h3>

              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink-muted">
                {group.intro}
              </p>

              <ul className="mt-10">
                {group.services.map((service, index) => (
                  <Fragment key={service.slug}>
                    {index > 0 ? <Rule /> : null}
                    <ServiceRow service={service} />
                  </Fragment>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
