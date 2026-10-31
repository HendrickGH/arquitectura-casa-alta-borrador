"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
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
 * Features contemplative automatic crossfade carousel across panoramic photographs.
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

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [totalSlides]);

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
  const hasRightColumn = hasSubheadline || Boolean(actions) || totalSlides > 1;

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[var(--chrome-h)] h-[80svh] min-h-[80svh] w-full overflow-hidden bg-ink text-white md:h-svh md:min-h-[100svh]"
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
      <Container className="relative z-20 flex h-full flex-col justify-end pb-8 pt-[var(--chrome-h)] text-white md:pb-12">
        {/* Top metadata strip */}
        {eyebrow && eyebrow.trim().length > 0 ? (
          <div className="mb-3 pb-2 md:mb-6 md:pb-4">
            <p className="eyebrow !text-white/85">{eyebrow}</p>
          </div>
        ) : null}

        {/* Monumental typography grid */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className={hasRightColumn ? "lg:col-span-8" : "lg:col-span-12"}>
            <h1
              className={cx(
                "voice text-white whitespace-pre-line",
                headingClassName ||
                  "text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12]"
              )}
            >
              {heading}
            </h1>
          </div>

          {hasRightColumn ? (
            <div className="flex flex-col items-start justify-end gap-5 lg:col-span-4 lg:items-end">
              {hasSubheadline ? (
                <p className="max-w-[42ch] text-sm leading-relaxed text-white/85 md:text-base lg:text-right">
                  {subheadline}
                </p>
              ) : null}

              {actions ? (
                <div className="flex flex-wrap items-center gap-4">
                  {actions}
                </div>
              ) : null}

              {totalSlides > 1 ? (
                <div
                  aria-hidden="true"
                  className="flex w-full max-w-[14rem] items-center gap-1.5"
                >
                  {allSlides.map((slideItem, index) => {
                    const isActive = index === activeSlide;
                    return (
                      <span
                        key={`${slideItem.photo.src}-${index}`}
                        className={cx(
                          "h-[2px] flex-1 transition-colors duration-500",
                          isActive ? "bg-white" : "bg-white/25"
                        )}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
