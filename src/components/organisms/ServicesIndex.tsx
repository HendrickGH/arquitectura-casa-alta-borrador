import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceRow } from "@/components/molecules/ServiceRow";
import { revealStep } from "@/lib/reveal";
import type { SectionIntro, Service, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The service catalogue as four editorial chapters. Each group opens with a
 * number, its title and its own introduction; its services follow as
 * photographic panels, so the catalogue reads as a body of work rather than as
 * a text index.
 *
 * The earlier linear spec sheet was a deliberate decision, and this replaces it
 * on purpose: the client read it as a report, not as architecture. The
 * replacement is recorded in the change's design, not made silently.
 *
 * To keep the catalogue from reading as one treatment repeated for every
 * service, a service alone in its row gets the full panel with the larger
 * image, and services that share a row fall into lighter cards. What is alone
 * is decided by the grid, not by a content flag: the chapter's leading service
 * always is, and a two-up row whose count is odd strands its last one. The rule
 * scales to any number of services.
 *
 * A service without an ingested image still renders, as a plain block; the
 * section never depends on stock to be complete.
 */

interface PlacedService {
  service: Service;
  /** Catalogue position, 1-based, rendered as the two-digit index. */
  number: number;
  variant: "panel" | "card";
  flip: boolean;
}

interface PlacedChapter {
  group: ServiceGroup;
  chapter: string;
  services: PlacedService[];
}

/**
 * Resolves the whole catalogue into rows once: the running number, which
 * services are alone in their row, and the panel side. Both the number and the
 * side depend on everything before them, so they are carried through a single
 * ordered pass instead of a counter mutated during render.
 */
function placeServices(groups: ServiceGroup[]): PlacedChapter[] {
  let number = 0;
  let panels = 0;

  return groups.map((group, groupIndex) => {
    const last = group.services.length - 1;
    // Compacts pair up two per row after the leading panel; an odd count
    // strands the last one.
    const strandsLast = last % 2 === 1;

    return {
      group,
      chapter: String(groupIndex + 1).padStart(2, "0"),
      services: group.services.map((service, serviceIndex) => {
        number += 1;

        const alone =
          serviceIndex === 0 || (strandsLast && serviceIndex === last);

        return {
          service,
          number,
          variant: alone ? "panel" : "card",
          // Consecutive panels alternate sides, so two services alone in their
          // rows never open on the same edge.
          flip: alone ? panels++ % 2 === 1 : false,
        };
      }),
    };
  });
}

export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
}: ServicesIndexProps) {
  const chapters = placeServices(groups);

  return (
    <Section id={id} tone={tone} reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {chapters.map(({ group, chapter, services }) => (
            <div
              key={group.slug}
              {...revealStep(0)}
              className="border-t border-bone-200 pt-10 md:pt-12"
            >
              <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
                <div className="md:col-span-7">
                  <span className="voice text-xl text-brand-800">
                    {chapter}
                  </span>
                  {/* Full-width line of the stack, as before: at 1024px a side
                      column would leave "Construcción" 272px wide. */}
                  <h3 className="voice mt-3 max-w-[18ch] text-3xl leading-[1.08] md:text-[2.5rem]">
                    {group.title}
                  </h3>
                </div>

                <p className="voice max-w-[42ch] text-lg leading-relaxed text-ink-muted md:col-span-5 md:pb-1">
                  {group.intro}
                </p>
              </div>

              <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-x-14 md:gap-y-20">
                {services.map(
                  ({ service, number, variant, flip }, serviceIndex) => (
                    <ServiceRow
                      key={service.slug}
                      service={service}
                      index={number}
                      revealIndex={serviceIndex}
                      variant={variant}
                      flip={flip}
                    />
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
