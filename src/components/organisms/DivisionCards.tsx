import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { revealStep } from "@/lib/reveal";
import type { DivisionCard, SectionIntro } from "@/types/content";

interface DivisionCardsProps {
  intro?: SectionIntro;
  divisions: DivisionCard[];
  tone?: "canvas" | "bone";
}

const CARD_SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Thirdway `cards-team-block` 4-column vertical expandable division cards.
 *
 * Each card represents one of the studio's four dedicated divisions:
 *   (01) Arquitectura Residencial y Turística (/proyectos)
 *   (02) Ingeniería y Obra Civil (/servicios)
 *   (03) Arquitectura de Interiores / Cosentino (/arquitectura-interiores)
 *   (04) Construcción Sustentable (/construccion-sustentable)
 *
 * Features Thirdway's signature warm `concha-nacar` bottom slide-up drawer on
 * hover/focus alongside oval capsule pills `(01)` and double-arrow oval pills.
 */
export function DivisionCards({
  intro,
  divisions,
  tone = "canvas",
}: DivisionCardsProps) {
  if (divisions.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger" className="!py-16 md:!py-24">
      <Container>
        {intro ? (
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-14 lg:flex-row lg:items-end">
            <div className="max-w-[46rem]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="number-pill">(02)</span>
                <p className="eyebrow">{intro.eyebrow}</p>
              </div>
              <SectionHeading heading={intro.heading} body={intro.body} />
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              {...revealStep(index)}
              className="group relative flex aspect-[3/4.4] flex-col justify-between overflow-hidden bg-ink text-white"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Photo
                  photo={card.photo}
                  sizes={CARD_SIZES}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/95 via-ink/50 to-transparent transition-opacity duration-500"
              />

              {/* Top oval capsule header */}
              <div className="relative z-10 flex items-center justify-between gap-2 p-5">
                <span className="number-pill-inverse">{`(${card.number})`}</span>
                <span className="rounded-full border border-white/25 bg-ink/40 px-3 py-1 text-[0.65rem] tracking-wider text-white/90 uppercase backdrop-blur-sm">
                  {card.subtitle}
                </span>
              </div>

              {/* Minimalist editorial text directly on the photograph */}
              <div className="relative z-10 mt-auto p-5 text-white">
                <h3 className="voice text-xl leading-[1.14] text-white md:text-[1.35rem]">
                  {card.title}
                </h3>

                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-xs leading-relaxed text-white/80 md:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                  <span className="label text-white/90 underline decoration-white/35 underline-offset-4 group-hover:text-white group-hover:decoration-white">
                    Explorar división
                  </span>
                  <span
                    aria-hidden="true"
                    className="arrow-pill"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="arrow-pill-out h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        d="M2.5 8h11m-4-4 4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 16 16"
                      className="arrow-pill-in h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        d="M2.5 8h11m-4-4 4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
