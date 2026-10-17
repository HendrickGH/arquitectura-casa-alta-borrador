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

/**
 * Thirdway architectural differentiator plates (`Por qué Casa Alta`).
 *
 * Pairs each structural/supervision commitment with a real studio photograph
 * from `obra-civil`, `credibilidad`, and `arquitectura-que-perdura`.
 */
export function Differentiators({
  intro,
  items,
  tone = "bone",
}: DifferentiatorsProps) {
  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(07)</span>
              <p className="eyebrow">{intro.eyebrow}</p>
            </div>
            <SectionHeading heading={intro.heading} body={intro.body} />
          </div>
          <span className="number-pill self-start lg:self-end">
            (INGENIERÍA + SUPERVISIÓN DIRECTA)
          </span>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.title}
              {...revealStep(index)}
              className="group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="number-pill">
                    {`(${String(index + 1).padStart(2, "0")})`}
                  </span>
                  <span className="font-mono text-[0.68rem] tracking-widest text-ink-muted uppercase">
                    GARANTÍA DE OBRA
                  </span>
                </div>

                <h3 className="voice text-2xl leading-tight text-ink md:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>

              {item.photo ? (
                <div className="mt-6 overflow-hidden">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Photo
                      photo={item.photo}
                      sizes={DIFF_PHOTO_SIZES}
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
