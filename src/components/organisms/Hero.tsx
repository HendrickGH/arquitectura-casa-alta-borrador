"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

/**
 * Thirdway-style scroll-scrubbed architectural Hero (`bg-concha-nacar`).
 *
 * - Never crops or cuts off any roof peak, crane boom, or coastal horizon:
 *   sits cleanly below the header on warm `--color-concha-nacar` (`#f7f1e9`)
 *   and frames the complete photograph inside an expanding architectural mat.
 * - As the visitor scrolls down, GSAP ScrollTrigger pins the stage and scrubs
 *   the framed photograph open (`scale: 0.88 -> 1.0`) while advancing the
 *   architectural ruler progress bar.
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
      .catch(() => {});

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="relative overflow-hidden border-b border-ink/12 bg-concha-nacar text-ink"
    >
      <div data-hero-stage className="py-6 md:py-8 lg:py-10">
        <Container>
          {/* Top Thirdway metadata + interactive discipline pills */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-ink/12 pb-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span data-hero-counter className="number-pill">
                {`(01) / (${String(hero.slides.length).padStart(2, "0")})`}
              </span>
              {hero.eyebrow ? (
                <p className="label text-ink-muted">{hero.eyebrow}</p>
              ) : null}
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
                  data-hero-pill
                  data-active={index === 0 ? "true" : "false"}
                  aria-label={`Ver ${slide.title}`}
                  className="label inline-flex items-center gap-2 rounded-full border border-ink/25 px-3.5 py-1.5 text-[0.68rem] text-ink transition-all duration-300 hover:border-ink data-[active=true]:border-ink data-[active=true]:bg-ink data-[active=true]:text-concha-nacar"
                >
                  <span>{`(${String(index + 1).padStart(2, "0")})`}</span>
                  <span className="hidden sm:inline">{slide.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Framed uncropped photograph stage (expands smoothly on scroll via GSAP) */}
          <div
            data-hero-frame
            className="relative mx-auto w-full origin-center overflow-hidden border border-ink/15 bg-bone-100 p-2 shadow-sm md:p-3.5"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-bone-200/60">
              {hero.slides.map((slide, index) => (
                <div
                  key={slide.photo.src}
                  data-hero-slide
                  className="absolute inset-0 flex items-center justify-center bg-bone-100"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    zIndex: index === 0 ? 1 : 0,
                  }}
                >
                  <Photo
                    photo={slide.photo}
                    sizes="95vw"
                    priority={index === 0}
                    fit="contain"
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}

              {/* Thirdway central architectural monogram emblem */}
              <div
                data-hero-seal
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/55 bg-ink/45 text-white backdrop-blur-md md:h-24 md:w-24">
                  <span className="display text-lg tracking-widest md:text-xl">
                    CA
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-widest text-white/80">
                    2016
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll-scrubbed progress bar along the bottom of the frame */}
            <div className="mt-2.5 h-[2px] w-full overflow-hidden bg-ink/12">
              <div
                data-hero-scrub-bar
                className="h-full w-full origin-left scale-x-[0.15] bg-brand-800"
              />
            </div>
          </div>

          {/* Bottom Thirdway architectural word stack + right-aligned narrative */}
          <div
            data-hero-caption
            className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-8">
              <h1 className="display text-[clamp(1.6rem,4vw,3.35rem)] leading-[0.95] text-ink">
                {hero.slides.map((slide, index) => (
                  <span
                    key={slide.title}
                    data-hero-title
                    className="mr-5 inline-block cursor-pointer transition-opacity duration-300"
                    style={{ opacity: index === 0 ? 1 : 0.38 }}
                  >
                    {slide.title}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col items-start justify-between gap-3 lg:col-span-4 lg:items-end">
              <p className="voice max-w-[38ch] text-base leading-relaxed text-ink lg:text-right">
                {hero.subheadline}
              </p>
              <a
                href="#proyectos"
                className="group label inline-flex items-center gap-2.5 text-ink transition-colors hover:text-brand-800"
              >
                <span className="underline decoration-ink/40 underline-offset-[5px] group-hover:decoration-brand-800">
                  Explorar obra construida
                </span>
                <span aria-hidden="true" className="arrow-pill arrow-pill-ink">
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
        </Container>
      </div>
    </section>
  );
}
