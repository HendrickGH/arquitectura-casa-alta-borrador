import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { PhilosophyContent } from "@/types/content";

export interface PhilosophySectionProps {
  philosophy: PhilosophyContent;
  tone?: "canvas" | "bone";
  id?: string;
}

/**
 * Editorial Architecture Monograph: Misión, Visión y Valores (`PhilosophySection`).
 *
 * Implements the Cosentino Architectural Editorial contract:
 * - Orthogonal 0px geometry with zero card borders.
 * - Architectural paired panels for Misión and Visión.
 * - Balanced responsive grid for the 7 studio values with an expansive
 *   anchor card for "Pasión".
 */
export function PhilosophySection({
  philosophy,
  tone = "canvas",
  id = "filosofia",
}: PhilosophySectionProps) {
  const values = philosophy.values.items;
  const hasSpanningLast = values.length === 7;
  const regularValues = hasSpanningLast ? values.slice(0, 6) : values;
  const lastValue = hasSpanningLast ? values[6] : null;

  return (
    <Section id={id} tone={tone} density="default" reveal="stagger">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow={philosophy.eyebrow}
          heading={philosophy.heading ?? "Nuestra vocación: construir con propósito y trascendencia"}
          body={philosophy.lead}
        />

        {/* 01 & 02: Misión y Visión Architectural Blocks */}
        <div
          {...revealStep(2)}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:gap-8"
        >
          {/* Misión */}
          <article className="flex flex-col justify-between bg-bone-50 p-8 transition-colors duration-500 hover:bg-bone-100/70 sm:p-10 lg:p-12">
            <div>
              <span className="label tracking-[0.14em] text-brand-800">
                01 / {philosophy.mission.title}
              </span>
              <Heading
                as="h3"
                voice="serif"
                sizeClassName="text-2xl sm:text-3xl lg:text-[28px] leading-[1.25]"
                className="mt-6 text-ink"
              >
                {philosophy.mission.statement}
              </Heading>
            </div>
          </article>

          {/* Visión */}
          <article className="flex flex-col justify-between bg-bone-50 p-8 transition-colors duration-500 hover:bg-bone-100/70 sm:p-10 lg:p-12">
            <div>
              <span className="label tracking-[0.14em] text-brand-800">
                02 / {philosophy.vision.title}
              </span>
              <Heading
                as="h3"
                voice="serif"
                sizeClassName="text-xl sm:text-2xl lg:text-[24px] leading-[1.35]"
                className="mt-6 text-ink"
              >
                {philosophy.vision.statement}
              </Heading>
            </div>
          </article>
        </div>

        {/* 03: Los 7 Valores del Estudio */}
        <div {...revealStep(3)} className="mt-16 md:mt-24">
          <div className="mb-8 md:mb-12">
            {philosophy.values.eyebrow ? (
              <p className="eyebrow mb-3">{philosophy.values.eyebrow}</p>
            ) : null}
            {philosophy.values.heading ? (
              <Heading
                as="h3"
                voice="serif"
                sizeClassName="text-2xl sm:text-3xl md:text-4xl"
                className="max-w-[24ch] text-ink"
              >
                {philosophy.values.heading}
              </Heading>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {regularValues.map((item, idx) => {
              const ordinal = String(idx + 1).padStart(2, "0");
              return (
                <article
                  key={item.name}
                  className="flex flex-col justify-start bg-bone-50 p-6 transition-colors duration-300 hover:bg-bone-100 sm:p-8"
                >
                  <div className="flex items-center justify-between pb-4">
                    <span className="font-sans text-xs font-semibold tracking-[0.14em] text-brand-800 tabular-nums">
                      {ordinal}
                    </span>
                  </div>
                  <Heading
                    as="h4"
                    voice="serif"
                    sizeClassName="text-xl sm:text-2xl"
                    className="mb-3 text-ink"
                  >
                    {item.name}
                  </Heading>
                  <Text size="sm" className="text-ink-muted leading-relaxed">
                    {item.description}
                  </Text>
                </article>
              );
            })}

            {/* 7th item (Pasión): Expansive grounding anchor spanning full row on tablet & desktop */}
            {lastValue ? (
              <article
                key={lastValue.name}
                className="flex flex-col justify-between gap-4 bg-bone-50 p-6 transition-colors duration-300 hover:bg-bone-100 sm:col-span-2 sm:flex-row sm:items-center sm:gap-8 sm:p-8 lg:col-span-3 lg:px-10"
              >
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-brand-800 tabular-nums">
                    07
                  </span>
                  <Heading
                    as="h4"
                    voice="serif"
                    sizeClassName="text-xl sm:text-2xl md:text-3xl"
                    className="text-ink"
                  >
                    {lastValue.name}
                  </Heading>
                </div>
                <Text size="base" className="max-w-[36ch] text-ink-muted sm:text-right">
                  {lastValue.description}
                </Text>
              </article>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
