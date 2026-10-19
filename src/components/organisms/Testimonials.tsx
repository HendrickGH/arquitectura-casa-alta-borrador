"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Tabs } from "@/components/molecules/Tabs";
import { revealStep } from "@/lib/reveal";
import type {
  InstitutionalDossier,
  SectionIntro,
  Testimonial,
} from "@/types/content";

interface TestimonialsProps {
  intro: SectionIntro;
  items: Testimonial[];
  dossiers?: InstitutionalDossier[];
  tone?: "canvas" | "bone";
}

/**
 * Testimonials & Institutional Project Guarantees (`Testimonials`).
 *
 * PROFECO-compliant architecture:
 * - If client testimonials are populated in `src/content/testimonials.ts`, renders
 *   authentic client quotes attributed to their project with editorial typography.
 * - If the array is empty, renders verified Institutional Project Guarantees
 *   (`dossiers`) from `src/content/testimonials.ts`.
 */
export function Testimonials({
  intro,
  items,
  dossiers = [],
  tone = "bone",
}: TestimonialsProps) {
  const [activeDossierIdx, setActiveDossierIdx] = useState(0);
  const activeDossier = dossiers[activeDossierIdx] ?? dossiers[0];

  const dossierTabs = useMemo(
    () =>
      dossiers.map((dossier, idx) => ({
        id: String(idx),
        label: dossier.title,
      })),
    [dossiers],
  );

  // If real client reviews are configured, render editorial quotes
  if (items.length > 0) {
    return (
      <Section tone={tone} reveal="stagger">
        <Container>
          <SectionHeading
            eyebrow={intro.eyebrow || "Testimonios"}
            heading={intro.heading}
            body={intro.body}
            className="mb-12 border-b border-bone-200 pb-8 md:mb-16"
          />

          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {items.map((item, index) => (
              <figure
                key={item.projectName}
                {...revealStep(index)}
                className="flex flex-col justify-between"
              >
                <div>
                  <span className="label text-brand-800 tabular-nums">
                    {`${String(index + 1).padStart(2, "0")} · Cliente verificado`}
                  </span>
                  <blockquote className="voice mt-4 text-2xl leading-relaxed text-ink md:text-3xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 text-sm text-ink-muted">
                  <p className="font-semibold text-ink">{item.projectName}</p>
                  <p className="text-xs">Proyecto ejecutado por Casa Alta</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  if (!activeDossier) return null;

  // Fallback when client quotes are pending collection: render institutional guarantees
  return (
    <Section tone={tone} reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow || "Respaldo y certidumbre"}
          heading={
            intro.heading || "Garantía contractual de entrega por obra"
          }
          body={
            intro.body ||
            "Nuestra credibilidad descansa en obras concluidas, memorias técnicas auditables y compromisos por escrito entregados en mano a cada propietario."
          }
        />

        {/* Dossier Interactive Switcher Tabs (0px Cosentino catalogue bar) */}
        <Tabs
          tabs={dossierTabs}
          activeId={String(activeDossierIdx)}
          onChange={(nextId) => setActiveDossierIdx(Number(nextId))}
          ariaLabel="Seleccionar expediente técnico de entrega"
          className="mt-10 mb-12"
        />

        {/* Active Technical Dossier Stage */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Monumental Quotation & Checkpoints (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="label text-brand-800 tabular-nums">
                {activeDossier.code}
              </span>
              <span className="text-ink-muted">·</span>
              <span className="label text-ink-muted">
                {activeDossier.location}
              </span>
            </div>

            {/* Monumental Statement */}
            <blockquote className="voice text-2xl leading-relaxed text-ink sm:text-3xl lg:text-[2.25rem]">
              &ldquo;{activeDossier.commitment}&rdquo;
            </blockquote>

            {/* Attribution & Metadata */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-muted">
              <div>
                <span className="font-semibold text-ink">Proyecto: </span>
                <span>{activeDossier.title}</span>
              </div>
              <div>
                <span className="font-semibold text-ink">Superficie: </span>
                <span className="tabular-nums">{activeDossier.surface}</span>
              </div>
              <div>
                <span className="font-semibold text-ink">Año: </span>
                <span className="tabular-nums">{activeDossier.year}</span>
              </div>
            </div>

            {/* Verification Checkpoints with 0px square bullets */}
            <div className="mt-8 space-y-2">
              <p className="label text-ink-muted">
                Puntos de auditoría y respaldo entregados:
              </p>
              <ul className="space-y-2 pt-1 text-xs text-ink/85">
                {activeDossier.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Architectural Trust Plate & Step Controls (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <span className="label text-brand-800">
                {`Protocolo de entrega · ${activeDossier.seal}`}
              </span>

              <Heading
                as="h3"
                voice="serif"
                sizeClassName="mt-2 text-xl leading-snug"
              >
                Compromiso sin vicios ocultos
              </Heading>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                En Casa Alta no dependemos de promesas verbales. Cada partida se
                entrega con planos As-Built, memoria fotográfica de
                instalaciones ocultas y garantía por contrato ante notario
                cuando el cliente lo solicita.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-xs">
                <div>
                  <p className="label text-brand-800">Cobertura</p>
                  <p className="mt-1 text-ink-muted">Costa, Valles e Istmo</p>
                </div>
                <div>
                  <p className="label text-brand-800">Rigor legal</p>
                  <p className="mt-1 text-ink-muted">
                    Contrato con fianza y bitácora DRO
                  </p>
                </div>
              </div>
            </div>

            {/* 0px Step Controls */}
            <div className="flex items-center justify-between border-t border-bone-200 pt-6">
              <p className="label text-ink-muted tabular-nums">
                {`${String(activeDossierIdx + 1).padStart(2, "0")} / ${String(dossiers.length).padStart(2, "0")}`}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDossierIdx((prev) =>
                      prev === 0 ? dossiers.length - 1 : prev - 1,
                    )
                  }
                  className="label inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-bone-200 bg-canvas px-4 py-2 text-ink transition-colors hover:border-brand-800 hover:text-brand-800"
                  aria-label="Expediente anterior"
                >
                  <Icon name="arrow-left" className="h-3.5 w-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveDossierIdx((prev) =>
                      prev === dossiers.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="label inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-bone-200 bg-canvas px-4 py-2 text-ink transition-colors hover:border-brand-800 hover:text-brand-800"
                  aria-label="Siguiente expediente"
                >
                  <span>Siguiente</span>
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

