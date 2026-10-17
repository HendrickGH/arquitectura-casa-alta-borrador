"use client";

import { useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { cx } from "@/lib/cx";
import { revealStep } from "@/lib/reveal";
import type { SectionIntro, Testimonial } from "@/types/content";

interface TestimonialsProps {
  intro: SectionIntro;
  items: Testimonial[];
  tone?: "canvas" | "bone";
}

interface InstitutionalDossier {
  id: string;
  code: string;
  title: string;
  location: string;
  typology: string;
  surface: string;
  year: string;
  commitment: string;
  points: string[];
  seal: string;
}

const INSTITUTIONAL_DOSSIERS: InstitutionalDossier[] = [
  {
    id: "plaza-esmeralda",
    code: "EXP-01 / COM",
    title: "Plaza Esmeralda",
    location: "Puerto Escondido, Oaxaca",
    typology: "Comercial y Uso Mixto",
    surface: "4,500 m²",
    year: "2021",
    commitment:
      "Toda obra en franja costera exige resistencia a ambiente salino, vientos huracanados y cimentación profunda. Cada metro cuadrado fue entregado con memoria de cálculo avalada y póliza de garantía estructural por escrito.",
    points: [
      "Pruebas de compresión de concreto en laboratorio certificado",
      "Bitácora de obra con firma de Director Responsable de Obra (DRO)",
      "Garantía contractual en impermeabilización y estructura de concreto",
    ],
    seal: "ENTREGA-RECEPCIÓN CONFORME",
  },
  {
    id: "villas-el-bicho",
    code: "EXP-02 / RES",
    title: "Villas El Bicho",
    location: "Puerto Escondido, Oaxaca",
    typology: "Residencial Turístico Bioclimático",
    surface: "1,200 m²",
    year: "2023",
    commitment:
      "La arquitectura de playa requiere maderas tropicales curadas, palapas artesanales de alta durabilidad y albercas con acabado chukum garantizado contra fisuras y filtraciones.",
    points: [
      "Madera certificada con tratamiento autoclave anti-plagas",
      "Instalaciones hidroneumáticas y sanitarias presurizadas y testeadas",
      "Póliza post-entrega de vicios ocultos y acabados de autor",
    ],
    seal: "EXPEDIENTE CERRADO SIN VICIOS",
  },
  {
    id: "puente-obra-civil",
    code: "EXP-03 / CIV",
    title: "Infraestructura y Obra Civil Pesada",
    location: "Valles Centrales / Puerto Escondido",
    typology: "Puentes vehiculares, cimentaciones y naves",
    surface: "50,000+ m² acumulados",
    year: "2022-2024",
    commitment:
      "En obra de infraestructura pública y privada, la tolerancia al error es cero. Casa Alta dispone de maquinaria de izaje, topografía satelital y control estricto de dosificación para garantizar la seguridad de miles de usuarios.",
    points: [
      "Montaje milimétrico de trabes pretensadas con grúas de alto tonelaje",
      "Cumplimiento riguroso de especificaciones normativas de transporte y SCT",
      "Control sismorresistente con factor de seguridad sobredimensionado",
    ],
    seal: "DICTAMEN ESTRUCTURAL APROBADO",
  },
  {
    id: "casa-blake",
    code: "EXP-04 / RES",
    title: "Casa Blake",
    location: "Tlalixtac de Cabrera, Oaxaca",
    typology: "Residencia Unifamiliar de Alta Gama",
    surface: "680 m²",
    year: "2022",
    commitment:
      "Construir el patrimonio familiar exige transparencia absoluta en catálogo de conceptos, control presupuestal sin sorpresas de sobrecosto y acabados artesanales en piedra regional.",
    points: [
      "Contrato a precio alzado con catálogo de conceptos firmado",
      "Integración de piedra sinterizada Cosentino con instalador avalado",
      "Acta formal de entrega y finiquito con planos As-Built",
    ],
    seal: "SATISFACCIÓN Y FINIQUITO FIRMADO",
  },
];

/**
 * Testimonials & Institutional Project Guarantees (`Testimonials`).
 *
 * PROFECO-compliant architecture:
 * - If client testimonials are populated in `src/content/testimonials.ts`, renders
 *   authentic client quotes attributed to their project with editorial typography.
 * - If the array is empty, rather than vanishing or inventing fake quotes, it renders
 *   verified Institutional Project Guarantees (`Expedientes de Obra y Garantía Institucional`)
 *   backed by actual completed portfolio projects with audit seals.
 */
export function Testimonials({
  intro,
  items,
  tone = "bone",
}: TestimonialsProps) {
  const [activeDossierIdx, setActiveDossierIdx] = useState(0);
  const activeDossier = INSTITUTIONAL_DOSSIERS[activeDossierIdx] ?? INSTITUTIONAL_DOSSIERS[0];

  // If real client reviews are configured, render editorial quotes
  if (items.length > 0) {
    return (
      <Section tone={tone} reveal="stagger" className="!py-16 md:!py-24">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-16 lg:flex-row lg:items-end">
            <div className="max-w-[46rem]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="number-pill">(08)</span>
                <p className="eyebrow">{intro.eyebrow || "Testimonios"}</p>
              </div>
              <SectionHeading heading={intro.heading} body={intro.body} />
            </div>
            <div className="shrink-0">
              <span className="number-pill bg-white">TESTIMONIOS VERIFICADOS</span>
            </div>
          </div>

          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {items.map((item, index) => (
              <figure
                key={item.projectName}
                {...revealStep(index)}
                className="flex flex-col justify-between"
              >
                <div>
                  <span className="label text-[0.6875rem] font-semibold text-brand-800">
                    {`(${String(index + 1).padStart(2, "0")}) · CLIENTE VERIFICADO`}
                  </span>
                  <blockquote className="voice mt-4 text-2xl font-light leading-relaxed text-ink md:text-3xl">
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

  // Fallback when client quotes are pending collection: render institutional guarantees
  return (
    <Section tone={tone} reveal="stagger" className="!py-16 md:!py-28">
      <Container>
        {/* Header Strip */}
        <div className="mb-14 flex flex-col justify-between gap-6 pb-6 md:mb-18 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(08)</span>
              <p className="eyebrow">
                {intro.eyebrow || "Respaldo y Certidumbre"}
              </p>
            </div>
            <SectionHeading
              heading={
                intro.heading || "Garantía contractual de entrega por obra"
              }
              body="Nuestra credibilidad descansa en obras concluidas, memorias técnicas auditables y compromisos por escrito entregados en mano a cada propietario."
            />
          </div>
          <div className="shrink-0 text-xs tracking-wider uppercase text-ink-muted">
            <span>Expedientes técnicos de entrega</span>
          </div>
        </div>

        {/* Dossier Interactive Switcher Tabs (Borderless) */}
        <div className="mb-12 flex flex-wrap gap-2">
          {INSTITUTIONAL_DOSSIERS.map((dossier, idx) => {
            const isActive = idx === activeDossierIdx;
            return (
              <button
                key={dossier.id}
                type="button"
                onClick={() => setActiveDossierIdx(idx)}
                className={cx(
                  "cursor-pointer px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200",
                  isActive
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-bone-100 text-ink/75 hover:bg-bone-200 hover:text-ink",
                )}
              >
                <span
                  className={cx(
                    "mr-2 font-mono text-[0.65rem]",
                    isActive ? "text-bone-200" : "text-brand-800",
                  )}
                >
                  {dossier.code.split(" ")[0]}
                </span>
                <span>{dossier.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Technical Dossier Stage (Completely Borderless) */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Monumental Quotation & Checkpoints (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="label text-xs font-semibold text-brand-800 font-mono">
                {activeDossier.code}
              </span>
              <span className="text-ink-muted">·</span>
              <span className="text-xs uppercase tracking-wider text-ink-muted">
                {activeDossier.location}
              </span>
            </div>

            {/* Monumental Statement */}
            <blockquote className="voice text-2xl font-light leading-relaxed text-ink sm:text-3xl lg:text-[2.25rem]">
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
                <span>{activeDossier.surface}</span>
              </div>
              <div>
                <span className="font-semibold text-ink">Año: </span>
                <span>{activeDossier.year}</span>
              </div>
            </div>

            {/* Unboxed Verification Checkpoints */}
            <div className="mt-8 space-y-2">
              <p className="label text-[0.6875rem] font-semibold tracking-wider text-ink-muted uppercase">
                Puntos de auditoría y respaldo entregados:
              </p>
              <ul className="space-y-2 pt-1 text-xs text-ink/80">
                {activeDossier.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-800" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Architectural Trust Plate & Step Controls (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <span className="label text-[0.625rem] font-semibold tracking-widest text-brand-800 uppercase">
                PROTOCOLO DE ENTREGA · {activeDossier.seal}
              </span>

              <h4 className="voice mt-2 text-xl font-normal text-ink">
                Compromiso sin vicios ocultos
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                En Casa Alta no dependemos de promesas verbales. Cada partida se entrega con planos As-Built, memoria fotográfica de instalaciones ocultas y garantía por contrato ante notario cuando el cliente lo solicita.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs">
                <div>
                  <p className="font-semibold text-brand-800 uppercase tracking-wider text-[0.6875rem]">
                    COBERTURA
                  </p>
                  <p className="mt-0.5 text-ink-muted">Costa, Valles e Istmo</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-800 uppercase tracking-wider text-[0.6875rem]">
                    RIGOR LEGAL
                  </p>
                  <p className="mt-0.5 text-ink-muted">Contrato con fianza y bitácora DRO</p>
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-6 text-xs text-ink-muted">
              <p className="font-mono text-xs">
                {String(activeDossierIdx + 1).padStart(2, "0")} / {String(INSTITUTIONAL_DOSSIERS.length).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDossierIdx((prev) =>
                      prev === 0 ? INSTITUTIONAL_DOSSIERS.length - 1 : prev - 1,
                    )
                  }
                  className="arrow-pill cursor-pointer px-3 py-1.5 text-xs hover:border-brand-800 hover:text-brand-800"
                  aria-label="Expediente anterior"
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveDossierIdx((prev) =>
                      prev === INSTITUTIONAL_DOSSIERS.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="arrow-pill cursor-pointer px-3 py-1.5 text-xs hover:border-brand-800 hover:text-brand-800"
                  aria-label="Siguiente expediente"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

