import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
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
 * - Pure typographic hierarchy on open quiet ground — zero boxes, zero borders.
 * - Zero decorative numbering on foundational values.
 * - Full-width expansive titular scale for the studio vocation.
 * - Dedicated full-width row for "Nuestros valores" header.
 * - Centered auto-wrapping typographic ledger where principles span the full row
 *   and wrap cleanly to the next row when full, horizontally centered.
 */
export function PhilosophySection({
  philosophy,
  tone = "canvas",
  id = "filosofia",
}: PhilosophySectionProps) {
  const values = philosophy.values.items;

  return (
    <Section id={id} tone={tone} density="default" reveal="stagger">
      <Container>
        {/* ====================================================================
            01. ENCABEZADO DE SECCIÓN — EXPANSIÓN COMPLETA DE TITULAR
            ==================================================================== */}
        <div className="w-full">
          {philosophy.eyebrow ? (
            <div {...revealStep(0)}>
              <p className="eyebrow mb-3 sm:mb-4">{philosophy.eyebrow}</p>
            </div>
          ) : null}
          <div {...revealStep(1)}>
            <Heading
              as="h2"
              voice="serif"
              sizeClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] leading-[1.12]"
              className="text-ink w-full max-w-none"
            >
              {philosophy.heading ?? "Nuestra vocación: construir con propósito y trascendencia"}
            </Heading>
          </div>
          {philosophy.lead ? (
            <div {...revealStep(1)}>
              <Text size="lede" className="mt-5 text-ink-muted leading-relaxed max-w-[64ch]">
                {philosophy.lead}
              </Text>
            </div>
          ) : null}
        </div>

        {/* ====================================================================
            02. MISIÓN Y VISIÓN — DIÁLOGO EDITORIAL TIPOGRÁFICO ABIERTO
            ==================================================================== */}
        <div
          {...revealStep(2)}
          className="mt-14 grid grid-cols-1 items-start gap-12 sm:mt-18 lg:mt-24 lg:grid-cols-12 lg:gap-16 xl:gap-20"
        >
          {/* Misión */}
          <div className="flex flex-col justify-start lg:col-span-6">
            <span className="label mb-4 block tracking-[0.16em] text-brand-800 sm:mb-5">
              {philosophy.mission.title}
            </span>
            <Text size="lede" className="leading-relaxed text-ink/90">
              {philosophy.mission.statement}
            </Text>
          </div>

          {/* Visión */}
          <div className="flex flex-col justify-start lg:col-span-6">
            <span className="label mb-4 block tracking-[0.16em] text-brand-800 sm:mb-5">
              {philosophy.vision.title}
            </span>
            <Text size="lede" className="leading-relaxed text-ink/90">
              {philosophy.vision.statement}
            </Text>
          </div>
        </div>

        {/* ====================================================================
            03. VALORES — FILA DEDICADA Y PRINCIPIOS FLUIDOS CENTRADOS
            ==================================================================== */}
        <div {...revealStep(3)} className="mt-20 sm:mt-28 lg:mt-36">
          {/* Fila propia completa para el encabezado de valores */}
          <div className="w-full text-center mb-12 sm:mb-16 lg:mb-20">
            {philosophy.values.eyebrow ? (
              <p className="eyebrow mb-3">{philosophy.values.eyebrow}</p>
            ) : null}
            <Heading
              as="h3"
              voice="serif"
              sizeClassName="text-3xl sm:text-4xl lg:text-[44px] leading-[1.14]"
              className="text-ink mx-auto"
            >
              {philosophy.values.heading ?? "Los principios que rigen cada obra"}
            </Heading>
          </div>

          {/* Principios: ocupan la fila completa, envuelven cuando no caben, centrados horizontalmente */}
          <div className="flex flex-wrap justify-center items-start gap-x-10 sm:gap-x-12 lg:gap-x-16 gap-y-10 sm:gap-y-12 lg:gap-y-14 w-full">
            {values.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center text-center flex-1 min-w-[240px] max-w-[320px] w-full sm:w-auto"
              >
                <h4 className="font-serif text-2xl sm:text-[26px] text-ink tracking-[0.01em] mb-2 sm:mb-2.5">
                  {item.name}
                </h4>
                <p className="text-sm sm:text-[15px] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
