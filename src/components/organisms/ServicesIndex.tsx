import { Container } from "@/components/atoms/Container";
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
 * The service catalogue as four editorial chapters. Each group opens with a
 * number, its title and its own introduction; its services follow as
 * photographic panels, so the catalogue reads as a body of work rather than as
 * a text index.
 *
 * The earlier linear spec sheet was a deliberate decision, and this replaces it
 * on purpose: the client read it as a report, not as architecture. The
 * replacement is recorded in the change's design, not made silently.
 *
 * To keep thirteen services from reading as one treatment repeated thirteen
 * times, each chapter leads with a full editorial panel and its remaining
 * services fall into a two-up grid of lighter cards. When a chapter's compact
 * count is odd, the leftover card is promoted to a wide panel rather than
 * stranded alone in half a row. The weight still follows the authored order,
 * which already leads with each group's most representative service; no content
 * field was added to say so.
 *
 * A service without an ingested image still renders, as a plain block; the
 * section never depends on stock to be complete.
 */
export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
}: ServicesIndexProps) {
  // The 1-based offset of each chapter's first service, so the catalogue is
  // numbered 01..13 across the four groups without mutating a counter in render.
  const chapterOffsets = groups.reduce<number[]>(
    (offsets, group, groupIndex) => {
      offsets.push(
        groupIndex === 0
          ? 0
          : offsets[groupIndex - 1] + groups[groupIndex - 1].services.length,
      );
      return offsets;
    },
    [],
  );

  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {groups.map((group, groupIndex) => {
            const chapter = String(groupIndex + 1).padStart(2, "0");

            return (
              <div
                key={group.slug}
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
                  {group.services.map((service, serviceIndex) => {
                    const index = chapterOffsets[groupIndex] + serviceIndex + 1;
                    const isFeatured = serviceIndex === 0;
                    // A compact that would sit alone in its two-up row -- the
                    // last one when the compacts are odd in number -- is
                    // promoted to a wide panel, so no row is left half empty.
                    const isLoneCompact =
                      (group.services.length - 1) % 2 === 1 &&
                      serviceIndex === group.services.length - 1;
                    // The chapter's featured panel alternates sides; a promoted
                    // panel takes the opposite one, so two panels in the same
                    // chapter never open on the same edge.
                    const chapterFlip = groupIndex % 2 === 1;

                    return (
                      <ServiceRow
                        key={service.slug}
                        service={service}
                        index={index}
                        variant={
                          isFeatured
                            ? "featured"
                            : isLoneCompact
                              ? "wide"
                              : "compact"
                        }
                        flip={
                          isFeatured
                            ? chapterFlip
                            : isLoneCompact
                              ? !chapterFlip
                              : false
                        }
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
