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

const DIFF_PHOTO_SIZES = "(min-width: 768px) 48vw, 95vw";

const DIFF_METADATA: Record<
  number,
  { tag: string; points: string[] }
> = {
  0: {
    tag: "CÁLCULO ESTRUCTURAL Y SISTEMAS",
    points: [
      "Validación de losas, marcos y cimentación con cálculo estructural",
      "Adaptación térmica y sísmica para costa, valles o sierra oaxaqueña",
      "Optimización de costos y plazos con personal técnico calificado",
    ],
  },
  1: {
    tag: "CERTEZA CONTRACTUAL Y PLAZOS",
    points: [
      "Entrega rigurosa en tiempo y catálogo de conceptos firmado",
      "Supervisión continua en sitio registrada en bitácora de obra",
      "Garantía por escrito post-entrega en estructura y acabados",
    ],
  },
  2: {
    tag: "COBERTURA LOGÍSTICA EN OAXACA",
    points: [
      "Operación en Puerto Escondido, Oaxaca Centro, Salina Cruz e Istmo",
      "Conocimiento de logística, normativas y proveeduría regional",
      "Capacidad para obra civil pesada, puentes y naves industriales",
    ],
  },
  3: {
    tag: "DISEÑO VANGUARDISTA Y TRADICIÓN",
    points: [
      "Renders hiperrealistas y proyecto ejecutivo completo en gabinete",
      "Uso de maderas tropicales parota, chukum y palapa artesanal",
      "Detalle constructivo de alta gama y plusvalía patrimonial",
    ],
  },
};

/**
 * Architectural differentiator plates (`Por qué Casa Alta`).
 *
 * Clean architectural presentation:
 * - Completely borderless, no "box-inside-box" card frames.
 * - Ample whitespace letting massive studio photographs and typography breathe.
 * - Direct tectonic layout on the section tone.
 */
export function Differentiators({
  intro,
  items,
  tone = "bone",
}: DifferentiatorsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger" className="!py-16 md:!py-28">
      <Container>
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 pb-6 md:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(07)</span>
              <p className="eyebrow">{intro.eyebrow}</p>
            </div>
            <SectionHeading heading={intro.heading} body={intro.body} />
          </div>
          <div className="shrink-0 text-xs tracking-wider uppercase text-ink-muted">
            <span>Rigor técnico en cada partida</span>
          </div>
        </div>

        {/* 2-Column Unbounded Editorial Vignettes */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {items.map((item, index) => {
            const numStr = String(index + 1).padStart(2, "0");
            const meta = DIFF_METADATA[index] ?? {
              tag: "RIGOR TÉCNICO CASA ALTA",
              points: [
                "Cálculo y memoria técnica por ingenieros certificados",
                "Supervisión permanente y control de calidad en obra",
              ],
            };

            return (
              <article
                key={item.title}
                {...revealStep(index)}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Photograph Leads First (Monumental, No Border) */}
                  {item.photo ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200">
                      <Photo
                        photo={item.photo}
                        sizes={DIFF_PHOTO_SIZES}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                      <div className="absolute right-3 bottom-2.5 left-3 flex items-center justify-between text-[0.625rem] font-medium tracking-wider text-white uppercase">
                        <span>{meta.tag}</span>
                        <span>{`(${numStr})`}</span>
                      </div>
                    </div>
                  ) : null}

                  {/* Editorial Text */}
                  <div className="mt-6">
                    <span className="label text-[0.6875rem] font-semibold text-brand-800">
                      {`(${numStr}) · ${meta.tag}`}
                    </span>

                    <h3 className="voice mt-2 text-2xl font-normal leading-snug text-ink md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="voice mt-3 text-base leading-relaxed text-ink-muted">
                      {item.description}
                    </p>

                    {/* Unboxed Technical Checkpoints */}
                    <ul className="mt-5 space-y-2 text-xs text-ink/80">
                      {meta.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-800" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
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

