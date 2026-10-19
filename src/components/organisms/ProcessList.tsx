"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { ProcessEntry } from "@/components/molecules/ProcessEntry";
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
 * GSAP ScrollTrigger Pinned Panoramic Split-Screen Methodology (`Cómo trabajamos`).
 *
 * - On desktop (`lg+`), pins the 100svh stage when it covers 100% of the viewport.
 * - Expansive layout (similar to projects grid): Left ledger takes a compact,
 *   structured column (32-38% width) while the right architectural photography
 *   stage expands across the remaining 62-68% width to maximize visual impact.
 * - Smooth step progression with crossfading full-height studio photography.
 * - On mobile/tablet (`< lg`), renders a clean sequential architectural ledger.
 */
export function ProcessList({
  intro,
  steps,
  tone = "bone",
  id = "proceso",
}: ProcessListProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<{ start: number; end: number } | null>(null);
  const lastStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || steps.length <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (typeof window !== "undefined") {
        (
          window as unknown as { __ScrollTrigger?: typeof ScrollTrigger }
        ).__ScrollTrigger = ScrollTrigger;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollDistancePerStep = 600;
        const totalDistance = (steps.length - 1) * scrollDistancePerStep;

        const st = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: () => `+=${totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          refreshPriority: 5,
          onUpdate: (self) => {
            const idx = Math.min(
              steps.length - 1,
              Math.max(0, Math.floor(self.progress * steps.length)),
            );
            if (lastStepRef.current !== idx) {
              lastStepRef.current = idx;
              setActiveStep(idx);
            }

            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: Math.max(1 / steps.length, self.progress),
              });
            }
          },
        });

        scrollTriggerRef.current = st;
        ScrollTrigger.refresh();
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

  const handleSelectStep = (idx: number) => {
    lastStepRef.current = idx;
    setActiveStep(idx);
    const st = scrollTriggerRef.current;
    if (st && typeof st.start === "number" && typeof st.end === "number") {
      const target =
        st.start + ((idx + 0.5) / steps.length) * (st.end - st.start);
      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      id={id}
      className={`relative w-full ${
        tone === "bone" ? "bg-bone-50" : "bg-canvas"
      }`}
    >
      {/* Desktop 100svh Pinned Panoramic Split-Screen Stage (lg+) */}
      <div
        ref={stageRef}
        className="mx-auto hidden lg:flex lg:h-[100svh] lg:min-h-[100svh] lg:w-full lg:overflow-hidden"
      >
        {/* Left Column: Focused Methodology Ledger (20-28% width, max 420px) */}
        <div className="flex w-[28%] shrink-0 flex-col justify-between overflow-y-auto pb-6 pl-6 pr-4 pt-20 sm:pl-8 sm:pr-6 sm:pt-24 lg:pb-8 lg:pl-8 lg:pr-6 lg:pt-24 xl:w-[24%] xl:pb-10 xl:pl-10 xl:pr-8 xl:pt-28 2xl:w-[20%] 2xl:max-w-[420px] 2xl:pl-12 2xl:pr-8">
          {/* Top: Section Header */}
          <div>
            <p className="eyebrow text-brand-800">{intro.eyebrow}</p>
            <h2 className="voice mt-2 text-3xl font-normal leading-[1.08] text-ink xl:text-4xl 2xl:text-[2.65rem]">
              {intro.heading}
            </h2>
            {intro.body ? (
              <p className="mt-2.5 max-w-[42ch] text-xs leading-relaxed text-ink-muted xl:text-sm">
                {intro.body}
              </p>
            ) : null}
          </div>

          {/* Middle: Sequence of Steps */}
          <ol className="my-auto space-y-1.5 py-4 xl:space-y-2.5">
            {steps.map((step, idx) => (
              <ProcessEntry
                key={step.order}
                step={step}
                index={idx}
                total={steps.length}
                isActive={idx === activeStep}
                onSelect={() => handleSelectStep(idx)}
                variant="pinned"
              />
            ))}
          </ol>

          {/* Bottom: Hairline Scrub Progress + Status */}
          <div className="pt-2">
            <div className="h-[1px] w-full overflow-hidden bg-bone-200">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-brand-800"
                style={{ transform: `scaleX(${1 / steps.length})` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-ink-muted tabular-nums">
              <span className="label text-brand-800">{currentStep.title}</span>
              <span className="label tabular-nums">
                {`${String(activeStep + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Expansive Full-Height Photography Stage (64-70% width) */}
        <div className="relative h-full flex-1 overflow-hidden bg-bone-200">
          {steps.map((step, index) =>
            step.photo ? (
              <div
                key={step.order}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === activeStep
                    ? "opacity-100 pointer-events-auto z-10"
                    : "opacity-0 pointer-events-none z-0"
                }`}
              >
                <Photo
                  photo={step.photo}
                  sizes="(min-width: 1536px) 80vw, (min-width: 1280px) 76vw, (min-width: 1024px) 72vw, 100vw"
                  priority={index === 0}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Mobile / Tablet Sequential View (< lg) */}
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
            className="mb-10 border-b border-bone-200 pb-8"
          />

          <ol className="flex flex-col divide-y divide-bone-200">
            {steps.map((step, idx) => (
              <ProcessEntry
                key={step.order}
                step={step}
                index={idx}
                total={steps.length}
                variant="card"
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
