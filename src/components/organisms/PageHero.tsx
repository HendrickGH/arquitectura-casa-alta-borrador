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
 * Shared 100vw × 100vh Full-Bleed Architectural Hero for the 6 dedicated routes.
 *
 * Implements the full-bleed photographic background running behind the transparent
 * header, with top-right watermark logo, monumental typography and clean Cosentino
 * scroll indicator.
 */
export function PageHero({
  badge = "(01)",
  eyebrow,
  heading,
  subheadline,
  photo,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.to(bg, {
          yPercent: 12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
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
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-ink text-white"
    >
      {/* Full-bleed background photo with subtle parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        <Photo
          photo={photo}
          priority
          fit="cover"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/65" />
      </div>

      {/* Watermark Logo */}
      <img
        src="/brand/logo-casa-alta-blanco.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-24 z-10 w-48 select-none opacity-70 sm:w-60 md:right-10 md:top-28 md:w-72 lg:right-16 lg:top-32 lg:w-96"
      />

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        {/* Top metadata strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="number-pill-inverse">{badge}</span>
            <p className="label tracking-widest text-white/90">{eyebrow}</p>
          </div>
          <span className="hidden font-mono text-[0.68rem] tracking-widest text-white/60 uppercase sm:inline">
            CASA ALTA · OAXACA
          </span>
        </div>

        {/* Monumental typography grid */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="voice text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.04] text-white">
              {heading}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p className="voice max-w-[42ch] text-sm leading-relaxed text-white/80 md:text-base">
              {subheadline}
            </p>
          </div>
        </div>

        {/* Bottom center Cosentino scroll cue */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/60">
          <span className="font-mono text-[0.65rem] tracking-widest uppercase">
            ( · )
          </span>
        </div>
      </Container>
    </section>
  );
}
