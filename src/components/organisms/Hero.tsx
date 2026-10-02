"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

/**
 * The landing hero: a photograph fills one visual viewport behind a flat dark
 * scrim, and the type sits directly on that scrim.
 *
 * WHY THE SCRIM, AND NOT TYPE ON THE BARE PHOTOGRAPH. Two attempts at putting
 * type straight on the image were built and measured before, and both failed:
 * white type sampled 1.31:1, and dark type was *less* legible than white because
 * variance, not mean luminance, is what breaks type. The photograph needs a
 * 60-77% dark scrim across the block, which is what `.hero-overlay` carries.
 *
 * THE CAROUSEL. One photograph per headline line, crossfading every four
 * seconds; the active line sits at full opacity while the others dim. The first
 * slide is painted by the server HTML (inline opacity/zIndex), so without
 * JavaScript the hero still shows a photograph and all three titles. Motion is
 * added by `createHeroCarousel` in gsap-scenes.ts, imported lazily so GSAP never
 * reaches the eager chunk -- the same pattern as the masonry's ScrollScene.
 *
 * The h1 is a word stack: one span per line, `whitespace-nowrap` so the widest
 * line is the h1's min-content and a flex item cannot shrink below it, which
 * keeps the line from wrapping when it shares the row with the description.
 * The clamp floor is low enough that "Construcción industrial" (~12.9em in the
 * shipped Montserrat 600) fits a 320px viewport.
 */
export function Hero({ hero }: HeroProps) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("./gsap-scenes")
      .then(({ createHeroCarousel }) => {
        if (cancelled) return;
        revert = createHeroCarousel({ scope });
      })
      .catch(() => {
        // A failed chunk is not a content failure: the first slide and all
        // three titles are already in the server HTML and stay legible.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
      style={{ marginTop: "calc(var(--chrome-h, 5.25rem) * -1)" }}
    >
      <div className="absolute inset-0 overflow-hidden bg-ink">
        {hero.slides.map((slide, index) => (
          <div
            key={slide.photo.src}
            data-hero-slide
            className="absolute inset-0"
            style={{
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 1 : 0,
            }}
          >
            <Photo photo={slide.photo} sizes="100vw" priority={index === 0} />
          </div>
        ))}
      </div>

      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 pt-32 pb-14 md:pb-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            {hero.eyebrow ? (
              <p className="eyebrow hero-rise hero-rise-1 text-bone-100">
                {hero.eyebrow}
              </p>
            ) : null}

            <h1 className="display hero-rise hero-rise-2 text-[clamp(1.25rem,4.5vw,3.5rem)] text-white">
              {hero.slides.map((slide, index) => (
                <span
                  key={slide.title}
                  data-hero-title
                  className="block whitespace-nowrap"
                  style={{ opacity: index === 0 ? 1 : 0.4 }}
                >
                  {slide.title}
                </span>
              ))}
            </h1>
          </div>

          <p className="voice hero-rise hero-rise-3 max-w-[34ch] text-sm leading-relaxed text-white/90 lg:text-right lg:text-base">
            {hero.subheadline}
          </p>
        </div>
      </Container>
    </section>
  );
}
