"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { ProcessStep, SectionIntro } from "@/types/content";

interface ProcessListProps {
  intro: SectionIntro;
  steps: ProcessStep[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * GSAP ScrollTrigger Pinned Split-Screen 7-Step Process (`Cómo trabajamos`).
 *
 * - On desktop (`lg+`), pins the left architectural stage (`pin: true`) with a
 *   live crossfading stack of 7 real studio photographs (`step.photo`), an oval
 *   capsule counter `(01) / (07)`, and a scroll-scrubbed progress bar while the
 *   7 methodology steps scroll on the right.
 * - On smaller viewports, displays each step's real studio photograph inline so
 *   every stage of the process remains visual.
 */
export function ProcessList({
  intro,
  steps,
  tone = "bone",
  id,
}: ProcessListProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const pinColumnRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const scope = scopeRef.current;
    const pinColumn = pinColumnRef.current;
    const list = listRef.current;
    if (!scope || !pinColumn || !list || steps.length === 0) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-process-step-card]",
          list,
        );

        ScrollTrigger.create({
          trigger: scope,
          start: "top top+=104",
          endTrigger: list,
          end: "bottom bottom-=80",
          pin: pinColumn,
          pinSpacing: false,
          scrub: 0.4,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: Math.max(1 / steps.length, self.progress),
              });
            }
          },
        });

        items.forEach((item, idx) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top center+=80",
            end: "bottom center+=80",
            onEnter: () => setActiveStep(idx),
            onEnterBack: () => setActiveStep(idx),
          });
        });
      });

      cleanup = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [steps.length]);

  if (steps.length === 0) return null;

  const currentStep = steps[activeStep] ?? steps[0];

  return (
    <Section id={id} tone={tone} reveal="stagger">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(05)</span>
              <p className="eyebrow">{intro.eyebrow}</p>
            </div>
            <SectionHeading heading={intro.heading} body={intro.body} />
          </div>
          <span className="number-pill self-start lg:self-end">
            (07 ETAPAS VERIFICABLES)
          </span>
        </div>

        <div
          ref={scopeRef}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left column: GSAP ScrollTrigger Pinned Studio Photograph Stage (lg+) */}
          <div ref={pinColumnRef} className="hidden lg:col-span-5 lg:block">
            <div className="overflow-hidden border border-ink/15 bg-canvas p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="number-pill">
                    {`(${String(activeStep + 1).padStart(2, "0")}) / (${String(steps.length).padStart(2, "0")})`}
                  </span>
                  <span className="label text-brand-800">
                    {currentStep.title}
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                {steps.map((step, index) =>
                  step.photo ? (
                    <div
                      key={step.order}
                      className="absolute inset-0 transition-opacity duration-500 ease-out"
                      style={{
                        opacity: index === activeStep ? 1 : 0,
                        zIndex: index === activeStep ? 2 : 1,
                      }}
                    >
                      <Photo
                        photo={step.photo}
                        sizes="(min-width: 1024px) 40vw, 95vw"
                      />
                    </div>
                  ) : null,
                )}
              </div>

              {/* Scroll-scrubbed progress bar */}
              <div className="mt-3 h-[2px] w-full overflow-hidden bg-ink/12">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left bg-brand-800"
                  style={{ transform: `scaleX(${1 / steps.length})` }}
                />
              </div>

              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                {currentStep.photo?.alt ?? currentStep.description}
              </p>
            </div>
          </div>

          {/* Right column: Scrollable 7-step architectural ledger */}
          <ol
            ref={listRef}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const num = String(step.order).padStart(2, "0");
              return (
                <li
                  key={step.order}
                  data-process-step-card
                  onMouseEnter={() => setActiveStep(index)}
                  className={`border p-6 transition-colors duration-300 md:p-8 ${
                    isActive
                      ? "border-ink/40 bg-canvas shadow-sm"
                      : "border-ink/12 bg-concha-nacar/70 hover:border-ink/25"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`number-pill ${
                          isActive
                            ? "!border-brand-800 !bg-brand-800 !text-white"
                            : ""
                        }`}
                      >
                        {`(${num})`}
                      </span>
                      <span className="label text-brand-800">
                        {`Etapa ${num} de ${String(steps.length).padStart(2, "0")}`}
                      </span>
                    </div>
                    <span className="font-mono text-[0.68rem] tracking-widest text-ink-muted uppercase">
                      PROTOCOLO CASA ALTA
                    </span>
                  </div>

                  <h3 className="voice mt-4 text-2xl leading-tight text-ink md:text-[1.75rem]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {step.description}
                  </p>

                  {step.deliverables && step.deliverables.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-ink/20 bg-concha-nacar px-3 py-1 text-xs text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Mobile/tablet inline real studio photograph */}
                  {step.photo ? (
                    <div className="mt-5 overflow-hidden border border-ink/12 bg-bone-100 lg:hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Photo photo={step.photo} sizes="95vw" />
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
