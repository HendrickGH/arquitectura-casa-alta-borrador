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
 * 100vw × 100vh Full-Bleed Architectural Hero.
 *
 * - Edge-to-edge photographic canvas at 100svh running under the transparent header.
 * - Automatic crossfade transitions between hero slides with touch-swipe support.
 * - Sentence-case Marcellus eyebrow, monumental display title, and Montserrat
 *   subheadline with 0px geometry and tabular numerals.
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
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-ink text-white"
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

        {/* Full dark architectural overlay (--color-ink) */}
        <div
          aria-hidden="true"
          className="hero-overlay pointer-events-none absolute inset-0 z-[2]"
        />
      </div>

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
          {hero.eyebrow ? (
            <p className="eyebrow !text-white/85">{hero.eyebrow}</p>
          ) : (
            <span />
          )}
          <span className="label text-white/75 tabular-nums">
            {`${String(activeSlide + 1).padStart(2, "0")} / ${String(hero.slides.length).padStart(2, "0")}`}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          {/* Left Column: Monumental Title */}
          <div className="flex flex-col items-start gap-3 lg:col-span-8">
            <h1 className="display text-[clamp(2.1rem,5.4vw,4.4rem)] leading-[0.95] text-white">
              <span className="block transition-all duration-700 ease-out">
                {hero.slides[activeSlide]?.title}
              </span>
            </h1>
          </div>

          {/* Right Column: Narrative Subheadline + 0px Linear Progress Track */}
          <div className="flex flex-col items-start justify-end gap-5 lg:col-span-4 lg:items-end">
            <p className="max-w-[36ch] text-sm leading-relaxed text-white/85 md:text-base lg:text-right">
              {hero.subheadline}
            </p>

            <div
              aria-hidden="true"
              className="flex w-full max-w-[14rem] items-center gap-1.5"
            >
              {hero.slides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <span
                    key={slide.photo.src}
                    className={`h-[2px] flex-1 transition-colors duration-500 ${
                      isActive ? "bg-white" : "bg-white/25"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
