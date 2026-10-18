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
  const touchStartX = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToSlide((activeSlide + 1) % hero.slides.length);
      } else {
        goToSlide((activeSlide - 1 + hero.slides.length) % hero.slides.length);
      }
    }
    touchStartX.current = null;
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

        {/* Full dark architectural overlay for unified contrast and dark mood */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#060c1a]/55 z-[2]"
        />

        {/* Top subtle scrim for transparent header legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 to-transparent z-[3]"
        />

        {/* Bottom subtle architectural gradient for typography contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-[3]"
        />
      </div>

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          {/* Left Column: Eyebrow + Counter Capsule + Monumental Title */}
          <div className="flex flex-col items-start gap-3 lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="number-pill-inverse text-[0.68rem]">
                {`(${String(activeSlide + 1).padStart(2, "0")}) / (${String(hero.slides.length).padStart(2, "0")})`}
              </span>
              {hero.eyebrow ? (
                <p className="eyebrow !text-white/90 text-xs tracking-widest uppercase font-sans">
                  {hero.eyebrow}
                </p>
              ) : null}
            </div>

            <h1 className="display text-[clamp(2.1rem,5.6vw,4.5rem)] font-bold uppercase tracking-tight text-white leading-[0.92]">
              <span className="block transition-all duration-700 ease-out">
                {hero.slides[activeSlide]?.title}
              </span>
            </h1>
          </div>

          {/* Right Column: Narrative Subheadline + Minimalist Navigation Arrows & Dash Indicators */}
          <div className="flex flex-col items-start justify-end gap-4 lg:col-span-4 lg:items-end">
            <p className="voice max-w-[34ch] text-sm leading-relaxed text-white/85 md:text-base lg:text-right">
              {hero.subheadline}
            </p>

            {/* Dash indicator line + Prev/Next controls */}
            <div className="flex items-center gap-3 pt-1">
              <div
                className="flex items-center gap-1.5 flex-wrap justify-end max-w-xs"
                role="group"
                aria-label="Seleccionar diapositiva"
              >
                {hero.slides.map((slide, index) => {
                  const isActive = index === activeSlide;
                  return (
                    <button
                      key={slide.photo.src}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Ver diapositiva ${index + 1}: ${slide.title}`}
                      aria-current={isActive}
                      className="h-[3px] rounded-full transition-all duration-500 focus:outline-none"
                      style={{
                        width: isActive ? "2rem" : "0.75rem",
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.35)",
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 pl-2">
                <button
                  type="button"
                  onClick={() =>
                    goToSlide(
                      (activeSlide - 1 + hero.slides.length) % hero.slides.length,
                    )
                  }
                  aria-label="Diapositiva anterior"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/25 focus:outline-none"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M10 3L5 8l5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    goToSlide((activeSlide + 1) % hero.slides.length)
                  }
                  aria-label="Diapositiva siguiente"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/25 focus:outline-none"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
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
