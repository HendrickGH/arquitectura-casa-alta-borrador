"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

/**
 * 100vw × 100vh Full-Bleed Architectural Hero.
 *
 * Implements the edge-to-edge cinematic format matching the client specification:
 * - Full bleed photographic background (100vw × 100vh / 100svh) running behind
 *   the transparent header.
 * - Architectural white watermark logo anchored top-right.
 * - Monumental stacked discipline titles ("ARQUITECTURA / CONSTRUCCIÓN CIVIL / CONSTRUCCIÓN INDUSTRIAL").
 * - Location eyebrow and narrative description.
 * - Interactive discipline switching tabs and subtle Cosentino-style scroll indicator.
 */
export function Hero({ hero }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
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
      id="hero"
      ref={sectionRef}
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-ink text-white"
    >
      {/* Full-bleed photographic background slides with subtle parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        {hero.slides.map((slide, index) => (
          <div
            key={slide.title}
            className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === activeSlide ? 1 : 0,
              zIndex: index === activeSlide ? 1 : 0,
            }}
          >
            <Photo
              photo={slide.photo}
              sizes="100vw"
              priority={index === 0}
              fit="cover"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {/* Dark architectural gradient ensuring crisp contrast for white type & transparent header */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/60" />
      </div>

      {/* Architectural watermark logo (white) at top right */}
      <img
        src="/brand/logo-casa-alta-blanco.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-24 z-10 w-48 select-none opacity-75 sm:w-60 md:right-10 md:top-28 md:w-80 lg:right-16 lg:top-32 lg:w-[440px]"
      />

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        {/* Top discipline switcher pills */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="number-pill-inverse">
              {`(0${activeSlide + 1}) / (0${hero.slides.length})`}
            </span>
            <p className="label tracking-widest text-white/90">
              {hero.eyebrow}
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Seleccionar disciplina principal"
          >
            {hero.slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-pressed={index === activeSlide}
                className={`label inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.68rem] transition-all duration-300 ${
                  index === activeSlide
                    ? "border-white bg-white text-ink"
                    : "border-white/35 bg-ink/30 text-white/90 backdrop-blur-sm hover:border-white hover:text-white"
                }`}
              >
                <span>{`(${String(index + 1).padStart(2, "0")})`}</span>
                <span className="hidden sm:inline">{slide.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Monumental stacked title & narrative row matching client design */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(2.1rem,5.6vw,4.5rem)] font-bold uppercase tracking-tight text-white leading-[0.92]">
              ARQUITECTURA
              <br />
              <span className="text-white/95">CONSTRUCCIÓN CIVIL</span>
              <br />
              <span className="text-white/85">CONSTRUCCIÓN INDUSTRIAL</span>
            </h1>
          </div>

          <div className="flex flex-col items-start justify-end gap-5 lg:col-span-4 lg:items-end">
            <p className="voice max-w-[34ch] text-sm leading-relaxed text-white/85 md:text-base lg:text-right">
              {hero.subheadline}
            </p>

            <a
              href="#proyectos"
              className="group label inline-flex items-center gap-3 text-white transition-colors hover:text-white/80"
            >
              <span className="underline decoration-white/40 underline-offset-[5px] group-hover:decoration-white">
                Explorar obra construida
              </span>
              <span
                aria-hidden="true"
                className="arrow-pill border-white/40 bg-white/10 text-white"
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
            </a>
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
