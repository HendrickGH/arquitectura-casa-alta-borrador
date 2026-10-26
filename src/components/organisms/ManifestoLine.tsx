"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { Architect, Photo as PhotoModel } from "@/types/content";

interface ManifestoLineProps {
  line: string;
  architect: Architect;
  photo?: PhotoModel;
}

/**
 * Architectural manifesto spread on `--color-concha-nacar`.
 *
 * Pairs the principal architect's statement with a framed real studio
 * photograph (`arquitectura-que-perdura`) and a GSAP scroll-scrubbed reveal.
 */
export function ManifestoLine({ line, architect, photo }: ManifestoLineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photoWrap = photoWrapRef.current;
    if (!section || !photoWrap) return;

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
        gsap.fromTo(
          photoWrap,
          { y: 24, scale: 0.96 },
          {
            y: -18,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
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
      {...revealAttrs("stagger")}
      className="bg-concha-nacar"
    >
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {photo ? (
            <div {...revealStep(0)} className="lg:col-span-5">
              <div ref={photoWrapRef} className="overflow-hidden">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Photo
                    photo={photo}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-muted">
                  <span>Arquitectura que perdura · Costa del Pacífico</span>
                </div>
              </div>
            </div>
          ) : null}

          <figure
            className={photo ? "lg:col-span-7" : "lg:col-span-12 max-w-[56rem]"}
          >
            <div {...revealStep(0)} className="mb-4 flex items-center gap-2.5">
              <span className="eyebrow">Visión arquitectónica</span>
            </div>

            <span
              aria-hidden="true"
              {...revealStep(0)}
              className="voice pointer-events-none block select-none text-[4.25rem] leading-[0.72] text-brand-800/35 md:text-[5.5rem]"
            >
              &ldquo;
            </span>

            <blockquote {...revealStep(1)} className="mt-2">
              <p className="voice max-w-[30ch] text-[1.75rem] leading-[1.24] text-ink md:text-[2.4rem] lg:text-[2.85rem] lg:leading-[1.16]">
                {line}
              </p>
            </blockquote>

            <figcaption
              {...revealStep(2)}
              className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-4"
            >
              <div>
                <p className="label text-brand-800">{architect.name}</p>
                <p className="label mt-1.5 text-ink-muted">{architect.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
