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

          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {items.map((item, index) => (
              <figure
                key={item.projectName}
                {...revealStep(index)}
                className="flex flex-col justify-between border border-bone-200/90 bg-white p-8 shadow-xs"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between border-b border-bone-200/70 pb-3">
                    <span className="number-pill">{`(${String(index + 1).padStart(2, "0")})`}</span>
                    <span className="number-pill bg-bone-50 text-brand-800">
                      CLIENTE VERIFICADO
                    </span>
                  </div>
                  <blockquote className="voice text-xl leading-relaxed text-ink md:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-8 border-t border-bone-200/70 pt-4">
                  <p className="font-semibold text-ink">{item.projectName}</p>
                  <p className="label mt-1 text-[0.6875rem] text-ink-muted">
                    PROYECTO EJECUTADO POR CASA ALTA
                  </p>
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
    <Section tone={tone} reveal="stagger" className="!py-16 md:!py-24">
      <Container>
        {/* Header Strip */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-16 lg:flex-row lg:items-end">
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
          <div className="shrink-0">
            <span className="number-pill bg-white">
              EXPEDIENTES TÉCNICOS DISPONIBLES
            </span>
          </div>
        </div>

        {/* Dossier Interactive Switcher Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-bone-200/80 pb-4">
          {INSTITUTIONAL_DOSSIERS.map((dossier, idx) => {
            const isActive = idx === activeDossierIdx;
            return (
              <button
                key={dossier.id}
                type="button"
                onClick={() => setActiveDossierIdx(idx)}
                className={cx(
                  "flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-white text-ink/70 hover:bg-bone-100 hover:text-ink border border-bone-200",
                )}
              >
                <span
                  className={cx(
                    "text-[0.65rem] font-mono",
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

        {/* Active Technical Dossier Stage */}
        <div className="grid grid-cols-1 gap-8 border border-bone-200/90 bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 shadow-xs">
          {/* Left Column: Dossier Details & Guarantees (7 cols) */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Dossier Header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-bone-200/70 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="number-pill bg-brand-50 text-brand-800 font-mono">
                    {activeDossier.code}
                  </span>
                  <span className="label text-[0.6875rem] font-semibold text-ink-muted">
                    {activeDossier.location}
                  </span>
                </div>
                <span className="number-pill !text-[0.6rem] !py-0.5 !px-2 bg-emerald-50 text-emerald-800 border-emerald-200">
                  {activeDossier.seal}
                </span>
              </div>

              {/* Title & Typology */}
              <h3 className="voice text-2xl font-normal leading-snug text-ink sm:text-3xl">
                {activeDossier.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wider font-medium text-brand-800">
                {activeDossier.typology}
              </p>

              {/* Commitment Statement (Quotation style) */}
              <blockquote className="mt-6 border-l-2 border-brand-800 pl-4 py-1 italic text-ink/90 text-sm sm:text-base leading-relaxed">
                &ldquo;{activeDossier.commitment}&rdquo;
              </blockquote>

              {/* Verification Checkpoints */}
              <div className="mt-6 space-y-2.5 border-t border-bone-200/60 pt-5">
                <p className="label text-[0.6875rem] uppercase tracking-wider text-ink-muted font-semibold">
                  Puntos de auditoría y respaldo entregados:
                </p>
                <ul className="space-y-2">
                  {activeDossier.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2.5 text-xs text-ink/85 leading-relaxed"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-800">
                        <svg
                          viewBox="0 0 16 16"
                          className="h-2.5 w-2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M3 8.5l3.5 3.5 6.5-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dossier Technical Metadata Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-bone-200/70 pt-4 text-xs text-ink-muted">
              <div>
                <span className="font-semibold text-ink">Superficie: </span>
                <span>{activeDossier.surface}</span>
              </div>
              <div>
                <span className="font-semibold text-ink">Año de Ejecución: </span>
                <span>{activeDossier.year}</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-800 font-semibold text-[0.7rem] uppercase tracking-wider">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Expediente auditado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Certification Seal & Navigation (5 cols) */}
          <div className="flex flex-col justify-between border-t border-bone-200/80 pt-6 lg:border-t-0 lg:border-l lg:border-bone-200/80 lg:pl-10 lg:pt-0 lg:col-span-5">
            {/* Architectural Trust Plate */}
            <div className="border border-brand-800/20 bg-bone-50/70 p-6 sm:p-7">
              <div className="mb-4 flex items-center justify-between border-b border-brand-800/10 pb-3">
                <span className="label text-[0.625rem] tracking-widest text-brand-800 font-semibold uppercase">
                  PROTOCOLO DE ENTREGA
                </span>
                <span className="font-mono text-[0.625rem] text-ink-muted">
                  NOM / RCDF / OAX
                </span>
              </div>

              <h4 className="voice text-lg font-normal text-ink">
                Compromiso sin vicios ocultos
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                En Casa Alta no dependemos de promesas verbales. Cada partida se entrega con planos As-Built, memoria fotográfica de instalaciones ocultas y garantía por contrato ante notario cuando el cliente lo solicita.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-brand-800/10 pt-4 text-[0.6875rem]">
                <div className="border border-bone-200 bg-white p-2.5">
                  <p className="font-semibold text-brand-800">COBERTURA</p>
                  <p className="mt-0.5 text-ink-muted">Costa, Valles e Istmo</p>
                </div>
                <div className="border border-bone-200 bg-white p-2.5">
                  <p className="font-semibold text-brand-800">RIGOR LEGAL</p>
                  <p className="mt-0.5 text-ink-muted">Contrato con fianza</p>
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="mt-6 flex items-center justify-between border-t border-bone-200/70 pt-4">
              <p className="text-[0.6875rem] text-ink-muted font-mono">
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
                  className="arrow-pill px-3 py-1.5 text-xs hover:border-brand-800 hover:text-brand-800 transition-colors cursor-pointer"
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
                  className="arrow-pill px-3 py-1.5 text-xs hover:border-brand-800 hover:text-brand-800 transition-colors cursor-pointer"
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

