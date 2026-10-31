"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { cx } from "@/lib/cx";
import type { Photo as PhotoModel, ServiceHeroSlide } from "@/types/content";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subheadline?: string;
  photo?: PhotoModel;
  photos?: PhotoModel[];
  slides?: ServiceHeroSlide[];
  actions?: React.ReactNode;
  headingClassName?: string;
}

const INTERVAL_MS = 4500;

/**
 * Shared 100vw × 100vh Full-Bleed Architectural Hero for internal routes.
 *
 * Implements the full-bleed photographic background running behind the transparent
 * header, with sentence-case Marcellus eyebrow and heading, and Montserrat subheadline.
 * Supports automatic and interactive crossfade carousel when multiple `slides` or `photos`
 * are provided, with touch swipe, slide counter, and 0px architectural arrow controls.
 */
export function PageHero({
  eyebrow,
  heading,
  subheadline,
  photo,
  photos,
  slides,
  actions,
  headingClassName,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const allSlides: ServiceHeroSlide[] =
    slides && slides.length > 0
      ? slides
      : photos && photos.length > 0
        ? photos.map((p) => ({ photo: p }))
        : photo
          ? [{ photo }]
          : [];

  const totalSlides = allSlides.length;
  const isCarousel = totalSlides > 1;
  const currentSlide = allSlides[activeSlide];

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isCarousel) return;
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, INTERVAL_MS);
  }, [isCarousel, totalSlides]);

  const goToSlide = (idx: number) => {
    setActiveSlide(idx);
    resetTimer();
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetTimer();
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
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
        nextSlide();
      } else {
        prevSlide();
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

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

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

  const hasSubheadline = Boolean(subheadline && subheadline.trim().length > 0);

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-ink text-white"
    >
      {/* Full-bleed background photo(s) with crossfade and subtle parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        {allSlides.map((slideItem, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={slideItem.photo.src}
              className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Photo
                photo={slideItem.photo}
                priority={index === 0}
                fit="cover"
                sizes="100vw"
                className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Dark architectural hero overlay ensuring crisp contrast for white type & transparent header */}
      <div
        className="hero-overlay pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      {/* Content Container */}
      <Container className="relative z-20 flex h-full flex-col justify-end pb-12 pt-[var(--chrome-h)] text-white">
        {/* Top metadata strip */}
        {eyebrow && eyebrow.trim().length > 0 ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
            <p className="eyebrow !text-white/85">{eyebrow}</p>
            <span className="label hidden text-white/65 sm:inline">
              Casa Alta · Estudio & Obra
            </span>
          </div>
        ) : null}

        {/* Monumental typography grid with Carousel Navigation */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div
            className={
              hasSubheadline || isCarousel ? "lg:col-span-7" : "lg:col-span-12"
            }
          >
            <h1
              className={cx(
                "voice text-white",
                headingClassName ||
                  "text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.04]"
              )}
            >
              {heading}
            </h1>
          </div>

          {/* Right column: Carousel Interactive Controls and/or Subheadline */}
          <div className="flex flex-col justify-end lg:col-span-5">
            {hasSubheadline ? (
              <p className="max-w-[42ch] text-sm leading-relaxed text-white/85 md:text-base mb-6">
                {subheadline}
              </p>
            ) : null}

            {isCarousel ? (
              <div className="flex flex-col gap-4 sm:items-end">
                {/* Active Niche Badge */}
                {currentSlide?.niche ? (
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-brand-800" />
                    <span className="label text-xs uppercase tracking-widest text-white/90 font-medium">
                      {currentSlide.niche}
                    </span>
                  </div>
                ) : null}

                {/* Carousel Navigation: Numbers + 0px Arrow Buttons */}
                <div className="flex items-center gap-4">
                  <span className="label tabular-nums text-xs sm:text-sm tracking-wider text-white/90">
                    {String(activeSlide + 1).padStart(2, "0")} /{" "}
                    {String(totalSlides).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Ver fotografía anterior de servicios"
                      className="inline-flex h-11 w-11 items-center justify-center bg-ink/75 text-white backdrop-blur-sm transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                    >
                      <Icon name="arrow-left" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Ver fotografía siguiente de servicios"
                      className="inline-flex h-11 w-11 items-center justify-center bg-ink/75 text-white backdrop-blur-sm transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                    >
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Slide Segment Lines Indicator */}
                <div className="flex items-center gap-1.5 pt-1">
                  {allSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Ir a fotografía ${idx + 1}`}
                      className={cx(
                        "h-1 transition-all duration-300 cursor-pointer",
                        idx === activeSlide
                          ? "w-8 bg-white"
                          : "w-3 bg-white/35 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {actions ? (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
