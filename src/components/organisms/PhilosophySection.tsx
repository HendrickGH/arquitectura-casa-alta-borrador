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
 * - Pure typographic hierarchy on quiet open ground — zero boxes, zero card borders.
 * - Zero decorative number pills or sequence markers on non-sequential values.
 * - Asymmetric two-stage monograph layout:
 *   1. Monumental Misión & Visión typographic spread.
 *   2. Two-column editorial ledger for studio values anchored by an editorial header.
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
            01. ENCABEZADO DE SECCIÓN
            ==================================================================== */}
        <div className="max-w-[40ch]">
          {philosophy.eyebrow ? (
            <div {...revealStep(0)}>
              <p className="eyebrow mb-3">{philosophy.eyebrow}</p>
            </div>
          ) : null}
          <div {...revealStep(1)}>
            <Heading
              as="h2"
              voice="serif"
              sizeClassName="text-3xl sm:text-4xl lg:text-[44px] leading-[1.14]"
              className="text-ink"
            >
              {philosophy.heading ?? "Nuestra vocación: construir con propósito y trascendencia"}
            </Heading>
          </div>
          {philosophy.lead ? (
            <div {...revealStep(1)}>
              <Text size="lede" className="mt-4 text-ink-muted leading-relaxed">
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
          className="mt-14 grid grid-cols-1 items-start gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-16 xl:gap-20"
        >
          {/* Misión: Declaración monumental en Marcellus */}
          <div className="flex flex-col justify-start lg:col-span-6">
            <span className="label mb-4 block tracking-[0.16em] text-brand-800 sm:mb-5">
              {philosophy.mission.title}
            </span>
            <blockquote className="font-serif text-2xl font-normal leading-[1.2] text-ink sm:text-3xl lg:text-[32px] xl:text-[36px]">
              {philosophy.mission.statement}
            </blockquote>
          </div>

          {/* Visión: Proyección estratégica y rigor de marca */}
          <div className="flex flex-col justify-start lg:col-span-6 lg:pt-1">
            <span className="label mb-4 block tracking-[0.16em] text-brand-800 sm:mb-5">
              {philosophy.vision.title}
            </span>
            <Text size="lede" className="leading-relaxed text-ink/90">
              {philosophy.vision.statement}
            </Text>
          </div>
        </div>

        {/* ====================================================================
            03. VALORES — RETÍCULA EDITORIAL ASIMÉTRICA (SIN CAJAS, SIN NÚMEROS)
            ==================================================================== */}
        <div
          {...revealStep(3)}
          className="mt-20 grid grid-cols-1 items-start gap-12 sm:mt-28 lg:mt-36 lg:grid-cols-12 lg:gap-16 xl:gap-20"
        >
          {/* Columna Izquierda: Encabezado contextual anclado */}
          <div className="flex flex-col justify-start lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            {philosophy.values.eyebrow ? (
              <p className="eyebrow mb-3">{philosophy.values.eyebrow}</p>
            ) : null}
            <Heading
              as="h3"
              voice="serif"
              sizeClassName="text-2xl sm:text-3xl lg:text-[34px] leading-[1.18]"
              className="max-w-[16ch] text-ink"
            >
              {philosophy.values.heading ?? "Los principios que rigen cada obra"}
            </Heading>
            <Text size="sm" className="mt-4 max-w-[32ch] leading-relaxed text-ink-muted">
              Convicciones humanas y de oficio que orientan cada decisión en el taller y en cada frente de faena.
            </Text>
          </div>

          {/* Columna Derecha: Los 7 valores en ritmo tipográfico fluido de dos columnas */}
          <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:gap-x-14 lg:gap-y-12">
            {values.map((item, idx) => {
              const isLast = idx === values.length - 1 && values.length % 2 === 1;
              return (
                <div
                  key={item.name}
                  className={`flex flex-col gap-2 ${isLast ? "sm:col-span-2 sm:pt-2" : ""}`}
                >
                  <h4 className="font-serif text-xl tracking-[0.01em] text-ink sm:text-2xl">
                    {item.name}
                  </h4>
                  <p className="max-w-[44ch] text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
