import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { Differentiator, SectionIntro } from "@/types/content";

interface DifferentiatorsProps {
  intro: SectionIntro;
  items: Differentiator[];
  tone?: "canvas" | "bone";
}

const DIFF_PHOTO_SIZES = "(min-width: 768px) 46vw, 95vw";

const DIFF_METADATA: Record<
  number,
  { tag: string; badge: string; points: string[] }
> = {
  0: {
    tag: "CÁLCULO ESTRUCTURAL Y SISTEMAS",
    badge: "MEMORIA TÉCNICA AUDITABLE",
    points: [
      "Validación de losas, marcos y cimentación con cálculo estructural",
      "Adaptación térmica y sísmica para costa, valles o sierra oaxaqueña",
      "Optimización de costos y plazos con personal técnico calificado",
    ],
  },
  1: {
    tag: "CERTEZA CONTRACTUAL Y PLAZOS",
    badge: "CONTRATO CON GARANTÍA",
    points: [
      "Entrega rigurosa en tiempo y catálogo de conceptos firmado",
      "Supervisión continua en sitio registrada en bitácora de obra",
      "Garantía por escrito post-entrega en estructura y acabados",
    ],
  },
  2: {
    tag: "COBERTURA LOGÍSTICA EN OAXACA",
    badge: "EQUIPO Y MAQUINARIA PROPIA",
    points: [
      "Operación en Puerto Escondido, Oaxaca Centro, Salina Cruz e Istmo",
      "Conocimiento de logística, normativas y proveeduría regional",
      "Capacidad para obra civil pesada, puentes y naves industriales",
    ],
  },
  3: {
    tag: "DISEÑO VANGUARDISTA Y TRADICIÓN",
    badge: "BIOCLIMÁTICA INTEGRADA",
    points: [
      "Renders hiperrealistas y proyecto ejecutivo completo en gabinete",
      "Uso de maderas tropicales parota, chukum y palapa artesanal",
      "Detalle constructivo de alta gama y plusvalía patrimonial",
    ],
  },
};

/**
 * Thirdway architectural differentiator plates (`Por qué Casa Alta`).
 *
 * Upgraded from flat cards into architectural technical dossiers:
 * - Specific engineering tags and certification badges per plate.
 * - Key technical commitments with custom checkmarks.
 * - Framed studio photograph with hover scale and audit signatures.
 */
export function Differentiators({
  intro,
  items,
  tone = "bone",
}: DifferentiatorsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger" className="!py-16 md:!py-24">
      <Container>
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(07)</span>
              <p className="eyebrow">{intro.eyebrow}</p>
            </div>
            <SectionHeading heading={intro.heading} body={intro.body} />
          </div>
          <div className="shrink-0">
            <span className="number-pill bg-white">
              RIGOR TÉCNICO EN CADA PARTIDA
            </span>
          </div>
        </div>

        {/* 2-Column Grid of Architectural Blueprint Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {items.map((item, index) => {
            const numStr = String(index + 1).padStart(2, "0");
            const meta = DIFF_METADATA[index] ?? {
              tag: "RIGOR TÉCNICO CASA ALTA",
              badge: "GARANTÍA DE EJECUCIÓN",
              points: [
                "Cálculo y memoria técnica por ingenieros certificados",
                "Supervisión permanente y control de calidad en obra",
              ],
            };

            return (
              <article
                key={item.title}
                {...revealStep(index)}
                className="group flex flex-col justify-between border border-bone-200/90 bg-white p-6 sm:p-8 shadow-xs hover:border-brand-800 transition-all duration-300"
              >
                <div>
                  {/* Top Header Strip with Discipline Pill and Badge */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-bone-200/70 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="number-pill group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white transition-colors duration-300">
                        {`(${numStr})`}
                      </span>
                      <span className="label text-[0.6875rem] font-semibold text-brand-800">
                        {meta.tag}
                      </span>
                    </div>
                    <span className="number-pill !text-[0.6rem] !py-0.5 !px-2 bg-bone-50 text-ink-muted">
                      {meta.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="voice text-2xl leading-snug text-ink md:text-[1.85rem]">
                    {item.title}
                  </h3>

                  <p className="voice mt-3 text-base leading-relaxed text-ink-muted">
                    {item.description}
                  </p>

                  {/* Checkpoints */}
                  <ul className="mt-5 space-y-2.5 border-t border-bone-200/60 pt-4">
                    {meta.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-2.5 text-xs text-ink/85 leading-snug"
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
                        <span className="font-medium">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Framed Studio Photograph */}
                {item.photo ? (
                  <div className="mt-7 overflow-hidden border border-bone-200/80 bg-bone-100">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Photo
                        photo={item.photo}
                        sizes={DIFF_PHOTO_SIZES}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[0.65rem] tracking-wider uppercase font-medium">
                        <span>Registro fotográfico de obra</span>
                        <span>Casa Alta</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Bottom Signature Line */}
                <div className="mt-5 flex items-center justify-between border-t border-bone-200/70 pt-3 text-[0.6875rem] text-ink-muted">
                  <span>Placa de rigor y supervisión</span>
                  <span className="number-pill !py-0.2 !px-1.5 !text-[0.6rem] text-brand-800">
                    Vigente
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
