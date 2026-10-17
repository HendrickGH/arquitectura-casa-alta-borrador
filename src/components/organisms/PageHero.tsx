"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel } from "@/types/content";

interface PageHeroProps {
  badge?: string;
  eyebrow: string;
  heading: string;
  subheadline: string;
  photo: PhotoModel;
}

/**
 * Shared Thirdway-style architectural hero for the 6 dedicated routes.
 *
 * Displays the photograph in its natural aspect ratio (`w-full h-auto`) inside
 * a framed architectural mat on `--color-concha-nacar` (`#f7f1e9`) alongside
 * monumental typography and oval capsule pills — so neither portrait nor
 * landscape studio photographs are ever cropped or obscured by text.
 */
export function PageHero({
  badge = "(01)",
  eyebrow,
  heading,
  subheadline,
  photo,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          frame,
          { y: 18, scale: 0.96 },
          {
            y: -14,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top+=96",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      }, section);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-ink/12 bg-concha-nacar py-12 text-ink md:py-16 lg:py-20"
    >
      <Container>
        {/* Top Thirdway architectural ruler bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="number-pill">{badge}</span>
            <p className="label text-brand-800">{eyebrow}</p>
          </div>
          <span className="font-mono text-[0.68rem] tracking-widest text-ink-muted uppercase">
            {`CASA ALTA · OAXACA (${photo.width}×${photo.height})`}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left column: Monumental editorial typography */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div>
              <h1 className="voice text-[clamp(2.15rem,4.4vw,3.85rem)] leading-[1.06] text-ink">
                {heading}
              </h1>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink-muted md:text-lg">
                {subheadline}
              </p>
            </div>

            <div className="ruler-top flex flex-wrap items-center justify-between gap-4 pt-5">
              <div className="flex items-center gap-2">
                <span className="number-pill">PUERTO ESCONDIDO</span>
                <span className="number-pill">OAXACA CENTRO</span>
                <span className="number-pill">SALINA CRUZ</span>
              </div>
            </div>
          </div>

          {/* Right column: 100% uncropped studio photograph in its natural aspect ratio */}
          <div className="lg:col-span-6">
            <div
              ref={frameRef}
              className="mx-auto overflow-hidden border border-ink/15 bg-canvas p-3 shadow-sm md:p-4"
            >
              <div className="relative overflow-hidden bg-bone-100">
                <Photo
                  photo={photo}
                  sizes="(min-width: 1024px) 48vw, 95vw"
                  priority
                  className="block max-h-[68svh] w-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 px-1 text-xs text-ink-muted">
                <span className="line-clamp-1">{photo.alt}</span>
                <span className="shrink-0 font-mono text-[0.68rem] uppercase">
                  OBRA REAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
