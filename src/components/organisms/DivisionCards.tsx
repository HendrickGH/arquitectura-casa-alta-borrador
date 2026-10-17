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
 * Thirdway-inspired 4-column vertical expandable division cards.
 *
 * Each card represents one of the studio's four dedicated divisions:
 *   01 · Arquitectura Residencial y Comercial (/proyectos)
 *   02 · Ingeniería y Obra Civil (/servicios)
 *   03 · Arquitectura de Interiores / Cosentino (/arquitectura-interiores)
 *   04 · Construcción Sustentable y Bioclimática (/construccion-sustentable)
 *
 * On desktop hover/focus (and always accessible on touch), the bottom drawer
 * expands smoothly via CSS grid-template-rows (0fr -> 1fr) while the background
 * photograph scales subtly and the double-arrow pill slides horizontally.
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
          <div className="mb-10 max-w-[54rem] md:mb-14">
            <SectionHeading
              eyebrow={intro.eyebrow}
              heading={intro.heading}
              body={intro.body}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              {...revealStep(index)}
              className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden bg-ink p-6 text-white md:p-7"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Photo
                  photo={card.photo}
                  sizes={CARD_SIZES}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 z-[1] bg-gradient-to-t from-[#060c1a]/92 via-[#060c1a]/42 to-[#060c1a]/55 transition-opacity duration-500 group-hover:from-[#060c1a]/96 group-hover:via-[#060c1a]/65"
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="number-pill-inverse">{card.number}</span>
                <span className="label text-white/80">{card.subtitle}</span>
              </div>

              <div className="relative z-10 flex flex-col">
                <h3 className="voice text-2xl leading-[1.15] text-white md:text-[1.65rem]">
                  {card.title}
                </h3>

                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 text-sm leading-relaxed text-white/85">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                  <span className="label text-white">Explorar división</span>
                  <span aria-hidden="true" className="arrow-pill">
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
