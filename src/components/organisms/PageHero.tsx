"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { cx } from "@/lib/cx";
import type { Photo as PhotoModel } from "@/types/content";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  subheadline?: string;
  photo?: PhotoModel;
  photos?: PhotoModel[];
  actions?: React.ReactNode;
  headingClassName?: string;
}

const INTERVAL_MS = 5000;

/**
 * Shared 100vw × 100vh Full-Bleed Architectural Hero for internal routes.
 *
 * Implements the full-bleed photographic background running behind the transparent
 * header, with sentence-case Marcellus eyebrow and heading, and Montserrat subheadline.
 * Supports automatic crossfade carousel when multiple `photos` are provided.
 */
export function PageHero({
  eyebrow,
  heading,
  subheadline,
  photo,
  photos,
  actions,
  headingClassName,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroPhotos = photos && photos.length > 0 ? photos : photo ? [photo] : [];

  useEffect(() => {
    if (heroPhotos.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroPhotos.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [heroPhotos.length]);

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
      className="relative -mt-[var(--chrome-h)] h-svh min-h-[100svh] w-full overflow-hidden bg-ink text-white"
    >
      {/* Full-bleed background photo(s) with subtle parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        {heroPhotos.map((p, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={p.src}
              className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Photo
                photo={p}
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

        {/* Monumental typography grid */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className={hasSubheadline ? "lg:col-span-8" : "lg:col-span-12"}>
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
          {hasSubheadline ? (
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="max-w-[42ch] text-sm leading-relaxed text-white/85 md:text-base">
                {subheadline}
              </p>
              {actions ? (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {actions}
                </div>
              ) : null}
            </div>
          ) : actions ? (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
