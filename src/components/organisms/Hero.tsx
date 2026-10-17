"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

const INTERVAL_MS = 5500;

/**
 * 100vw × 100vh Full-Bleed Minimalist Architectural Hero.
 *
 * Preserves the pure essence of Casa Alta:
 * - Edge-to-edge photographic canvas at 100vh / 100vw running under the transparent header.
 * - Natural, sunlit illumination with subtle legibility gradients only at top/bottom edges.
 * - Watermark logo anchored at top right.
 * - The monumental typography stack IS the interactive discipline selector:
 *   ARQUITECTURA / CONSTRUCCIÓN CIVIL / CONSTRUCCIÓN INDUSTRIAL.
 *   The active discipline stays at full opacity (1.0) while inactive lines settle at 0.40.
 * - Smooth crossfade transitions between all hero carousel images.
 * - Subtle minimalist progress bars at bottom right and Cosentino scroll cue `( · )` at bottom center.
 */
export function Hero({ hero }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % hero.slides.length);
    }, INTERVAL_MS);
  }, [hero.slides.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section
      id="hero"
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-[#060c1a] text-white"
    >
      {/* Full-bleed photographic background carousel */}
      <div className="absolute inset-0 z-0 h-full w-full">
        {hero.slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={slide.photo.src}
              className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Photo
                photo={slide.photo}
                sizes="100vw"
                priority={index === 0}
                fit="cover"
                className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* Top subtle scrim for transparent header legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent z-[2]"
        />

        {/* Bottom subtle architectural gradient for typography contrast without darkening the center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[2]"
        />
      </div>

      {/* Architectural white watermark logo at top-right */}
      <img
        src="/brand/logo-casa-alta-blanco.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-24 z-10 w-48 select-none opacity-70 sm:w-60 md:right-10 md:top-28 md:w-80 lg:right-16 lg:top-32 lg:w-[440px]"
      />

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          {/* Left Column: Eyebrow + Monumental Word Stack */}
          <div className="flex flex-col items-start gap-3 lg:col-span-8">
            {hero.eyebrow ? (
              <p className="eyebrow !text-white/90 text-xs tracking-widest uppercase font-sans">
                {hero.eyebrow}
              </p>
            ) : null}

            <h1 className="display text-[clamp(2.1rem,5.6vw,4.5rem)] font-bold uppercase tracking-tight text-white leading-[0.92]">
              {hero.slides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <span
                    key={slide.title}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ver ${slide.title}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        goToSlide(index);
                      }
                    }}
                    className="block cursor-pointer whitespace-nowrap transition-all duration-500 hover:opacity-100"
                    style={{
                      opacity: isActive ? 1 : 0.38,
                    }}
                  >
                    {slide.title}
                  </span>
                );
              })}
            </h1>
          </div>

          {/* Right Column: Narrative Subheadline + Minimalist Line Indicators */}
          <div className="flex flex-col items-start justify-end gap-4 lg:col-span-4 lg:items-end">
            <p className="voice max-w-[34ch] text-sm leading-relaxed text-white/85 md:text-base lg:text-right">
              {hero.subheadline}
            </p>

            {/* Clean minimal dash indicator */}
            <div
              className="flex items-center gap-2 pt-1"
              role="group"
              aria-label="Seleccionar diapositiva"
            >
              {hero.slides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a ${slide.title}`}
                    aria-current={isActive}
                    className="h-[3px] rounded-full transition-all duration-500 focus:outline-none"
                    style={{
                      width: isActive ? "2.5rem" : "1.25rem",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  />
                );
              })}
            </div>
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
