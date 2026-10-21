import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { MethodologyPhase, SectionIntro } from "@/types/content";

export interface MethodologyZigzagProps {
  intro?: SectionIntro;
  phases: MethodologyPhase[];
}

/**
 * Editorial Zigzag Methodology (`Cómo trabajamos`).
 *
 * Expansive 3-phase monograph layout alternating high-scale studio photography
 * with quiet, razor-sharp technical copy and tangible deliverables.
 */
export function MethodologyZigzag({ intro, phases = [] }: MethodologyZigzagProps) {
  return (
    <Section id="metodologia" tone="bone" density="default" reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro?.eyebrow ?? "Metodología de obra"}
          heading={intro?.heading ?? "Cómo transformamos el terreno en arquitectura"}
          body={
            intro?.body ??
            "Tres fases maestras de rigor técnico sin intermediarios, desde el cálculo inicial hasta la entrega final."
          }
        />

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24 lg:gap-28">
          {phases.map((phase, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={phase.number}
                {...revealStep(index)}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-20"
              >
                {/* Photo column */}
                <div
                  className={
                    isEven
                      ? "order-1 lg:order-2 lg:col-span-7"
                      : "order-1 lg:col-span-7"
                  }
                >
                  <figure className="overflow-hidden bg-bone-200">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Photo
                        photo={phase.photo}
                        sizes="(min-width: 1024px) 54vw, 100vw"
                        fit="cover"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      />
                    </div>
                  </figure>
                </div>

                {/* Text column */}
                <div
                  className={
                    isEven
                      ? "order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center"
                      : "order-2 lg:col-span-5 flex flex-col justify-center"
                  }
                >
                  <span className="label text-brand-800 tabular-nums">
                    FASE {phase.number} · {phase.kicker.toUpperCase()}
                  </span>

                  <Heading
                    as="h3"
                    voice="serif"
                    sizeClassName="mt-3 text-2xl md:text-3xl lg:text-[2rem] leading-[1.18]"
                    className="max-w-[20ch]"
                  >
                    {phase.title}
                  </Heading>

                  <Text size="base" className="mt-4 text-ink-muted leading-relaxed">
                    {phase.description}
                  </Text>

                  <div className="mt-6 pt-2 flex flex-wrap items-baseline gap-2">
                    <span className="label text-[0.68rem] text-ink font-semibold">
                      ENTREGABLE:
                    </span>
                    <span className="text-xs font-medium text-brand-900">
                      {phase.deliverable}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
