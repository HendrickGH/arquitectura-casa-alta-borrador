"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { cx } from "@/lib/cx";
import type { SectionIntro, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * Interactive 2-Column Sticky Architectural Catalogue (`ServicesIndex`).
 *
 * Replaces the static sequential list with an interactive architectural stage:
 * - Chapter tabs at the top for instant switching between the studio's 4 technical divisions.
 * - On desktop (`lg+`), the left column scrolls through the chapter's services while the right
 *   column remains sticky (`sticky top-28`), showcasing the primary studio photograph, active
 *   HUD specs, and a clickable thumbnail gallery to inspect sister services.
 * - GSAP ScrollTrigger tracks the centered service to synchronize the sticky media stage.
 * - On mobile/tablet (`< lg`), each service renders an inline framed photograph and deliverable chips.
 */
export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
}: ServicesIndexProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const scopeRef = useRef<HTMLDivElement>(null);
  const serviceItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyStageRef = useRef<HTMLDivElement>(null);

  const currentGroup = groups[activeGroupIndex] ?? groups[0];
  const activeService =
    currentGroup.services[activeServiceIndex] ?? currentGroup.services[0];

  // GSAP ScrollTrigger tracking for desktop sticky stage synchronization
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || currentGroup.services.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          serviceItemRefs.current.forEach((itemEl, idx) => {
            if (!itemEl) return;
            ScrollTrigger.create({
              trigger: itemEl,
              start: "top center+=80",
              end: "bottom center+=80",
              onEnter: () => setActiveServiceIndex(idx),
              onEnterBack: () => setActiveServiceIndex(idx),
            });
          });
        });
      }, scope);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [activeGroupIndex, currentGroup.services.length]);

  if (groups.length === 0) return null;

  return (
    <Section id={id} tone={tone} className="!py-16 md:!py-24">
      <Container>
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-ink/15 pb-8 md:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="number-pill">(06)</span>
              <p className="eyebrow">{intro.eyebrow}</p>
            </div>
            <SectionHeading heading={intro.heading} body={intro.body} />
          </div>
          <div className="shrink-0">
            <span className="number-pill bg-white">
              {`${groups.reduce((acc, g) => acc + g.services.length, 0)} PARTIDAS EN CATÁLOGO`}
            </span>
          </div>
        </div>

        {/* Chapter Switcher Tabs (Borderless) */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {groups.map((group, gIdx) => {
            const isCurrent = gIdx === activeGroupIndex;
            return (
              <button
                key={group.slug}
                type="button"
                onClick={() => {
                  setActiveGroupIndex(gIdx);
                  setActiveServiceIndex(0);
                }}
                className={cx(
                  "group flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer",
                  isCurrent
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink",
                )}
              >
                <span
                  className={cx(
                    "font-mono text-[0.6875rem] font-semibold transition-colors",
                    isCurrent ? "text-white/80" : "text-brand-800",
                  )}
                >
                  {`(${String(gIdx + 1).padStart(2, "0")})`}
                </span>
                <span>{group.title}</span>
                <span
                  className={cx(
                    "rounded-full px-1.5 py-0.5 text-[0.62rem]",
                    isCurrent
                      ? "bg-white/20 text-white"
                      : "bg-bone-200 text-ink-muted",
                  )}
                >
                  {group.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Intro Strip */}
        <div className="mt-8 mb-12 flex flex-col justify-between gap-4 pb-4 lg:flex-row lg:items-end">
          <div className="max-w-[46rem]">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="number-pill">
                {`CAPÍTULO ${String(activeGroupIndex + 1).padStart(2, "0")} / 04`}
              </span>
              <span className="label text-brand-800 font-semibold">
                DIVISIÓN TÉCNICA CASA ALTA
              </span>
            </div>
            <h3 className="voice text-2xl leading-tight text-ink md:text-3xl lg:text-[2.25rem]">
              {currentGroup.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {currentGroup.intro}
            </p>
          </div>
          <div className="shrink-0 text-xs text-ink-muted">
            <span>{`${currentGroup.services.length} ESPECIALIDADES EN ESTE FRENTE`}</span>
          </div>
        </div>

        {/* 2-Column Stage: Left Column scrolls, Right Column remains sticky */}
        <div
          ref={scopeRef}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left Column: Services list without heavy borders */}
          <div className="space-y-16 lg:col-span-7 lg:space-y-20 pb-12">
            {currentGroup.services.map((service, sIdx) => {
              const isActive = sIdx === activeServiceIndex;
              const numStr = String(sIdx + 1).padStart(2, "0");

              return (
                <div
                  key={service.slug}
                  ref={(el) => {
                    serviceItemRefs.current[sIdx] = el;
                  }}
                  onClick={() => setActiveServiceIndex(sIdx)}
                  className={cx(
                    "group flex flex-col justify-center transition-all duration-300 cursor-pointer pt-2",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )}
                >
                  {/* Top metadata tags */}
                  <div className="mb-3 flex items-center gap-2.5">
                    <span
                      className={cx(
                        "number-pill transition-colors duration-300",
                        isActive
                          ? "!border-brand-800 !bg-brand-800 !text-white"
                          : "",
                      )}
                    >
                      {`(${numStr})`}
                    </span>
                    <span className="label text-brand-800 font-semibold">
                      {`PARTIDA ${numStr} · ${service.items.length} ALCANCES`}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h4 className="voice text-2xl leading-snug text-ink md:text-3xl">
                    {service.title}
                  </h4>

                  {/* Summary */}
                  <p className="voice mt-3 text-base leading-relaxed text-ink-muted">
                    {service.summary}
                  </p>

                  {/* Technical Deliverables List (Unboxed) */}
                  <div className="mt-5 space-y-2">
                    <span className="label text-[0.65rem] tracking-wider text-ink-muted block mb-2 font-semibold uppercase">
                      Alcances y entregables ejecutivos:
                    </span>
                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-ink/85">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 leading-relaxed"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-800" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile & Tablet Inline Photograph (hidden on lg+) */}
                  {service.image ? (
                    <div className="mt-6 overflow-hidden lg:hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-100">
                        <Photo
                          photo={service.image}
                          sizes="(max-width: 1024px) 95vw, 45vw"
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                        <div className="absolute right-3 bottom-3 left-3 text-white">
                          <span className="text-xs font-medium">
                            {service.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Bottom Action Link */}
                  <div className="mt-6 pt-1">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-800 hover:text-ink transition-colors"
                    >
                      <span className="underline decoration-brand-800/40 underline-offset-4">
                        Consultar alcances y presupuesto de esta partida
                      </span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Monumental Sticky Media Stage (Desktop lg+) */}
          <div className="hidden lg:col-span-5 lg:block relative">
            <div ref={stickyStageRef} className="sticky top-28 space-y-3 pb-12">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                {activeService?.image ? (
                  <Photo
                    key={activeService.slug}
                    photo={activeService.image}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-bone-100 text-xs text-ink-muted">
                    <span>Registro fotográfico de obra en archivo</span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

                <div className="absolute right-4 bottom-4 left-4 text-white">
                  <span className="text-[0.65rem] uppercase tracking-widest text-concha-nacar/90">
                    Registro de obra en Oaxaca
                  </span>
                  <h4 className="voice text-xl font-normal leading-snug text-white line-clamp-1">
                    {activeService?.title}
                  </h4>
                </div>
              </div>

              {/* Minimal caption & direct action - NO boxes, NO borders */}
              <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
                <span>{`Partida ${String(activeServiceIndex + 1).padStart(2, "0")} de ${String(currentGroup.services.length).padStart(2, "0")}`}</span>
                <a
                  href="#contacto"
                  className="font-semibold text-brand-800 underline underline-offset-4 hover:text-ink transition-colors"
                >
                  Cotizar partida →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Next Chapter Quick Stepper at bottom */}
        {activeGroupIndex < groups.length - 1 ? (
          <div className="mt-12 flex items-center justify-between border-t border-bone-200 pt-6">
            <span className="text-xs text-ink-muted">
              {`Continuar con la siguiente división técnica (${groups[activeGroupIndex + 1].title})`}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveGroupIndex(activeGroupIndex + 1);
                setActiveServiceIndex(0);
                const catalogElem = document.getElementById(id || "servicios");
                if (catalogElem) {
                  catalogElem.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-800 hover:text-brand-900 transition-colors cursor-pointer"
            >
              <span>{`Siguiente: ${groups[activeGroupIndex + 1].title}`}</span>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M2.5 8h11m-4-4 4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
