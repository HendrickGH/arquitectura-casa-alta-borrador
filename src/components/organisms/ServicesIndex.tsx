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

        {/* Chapter Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-bone-200 pb-5">
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
                  "group flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer",
                  isCurrent
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-bone-100/70 text-ink-muted hover:bg-bone-200 hover:text-ink",
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
                      : "bg-bone-200/90 text-ink-muted",
                  )}
                >
                  {group.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Intro Strip */}
        <div className="mt-8 mb-12 flex flex-col justify-between gap-4 border-b border-bone-200/80 pb-6 lg:flex-row lg:items-end">
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
            <span className="number-pill bg-white">
              {`${currentGroup.services.length} ESPECIALIDADES EN ESTE FRENTE`}
            </span>
          </div>
        </div>

        {/* 2-Column Stage: Left Column scrolls, Right Column remains sticky */}
        <div
          ref={scopeRef}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left Column: Services list with active indicators and deliverable grids */}
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
                    "group flex flex-col justify-center border-l-2 pl-5 sm:pl-8 transition-all duration-400 cursor-pointer pt-2",
                    isActive
                      ? "border-brand-800 opacity-100"
                      : "border-bone-200 opacity-80 hover:opacity-100 hover:border-ink/40",
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
                  <h4 className="voice text-2xl leading-snug text-ink md:text-[1.75rem]">
                    {service.title}
                  </h4>

                  {/* Summary */}
                  <p className="voice mt-3 text-base leading-relaxed text-ink-muted">
                    {service.summary}
                  </p>

                  {/* Technical Deliverables List */}
                  <div className="mt-5 space-y-2 border-t border-bone-200/70 pt-4">
                    <span className="label text-[0.65rem] tracking-wider text-ink block mb-2 font-semibold">
                      ALCANCES Y ENTREGABLES EJECUTIVOS:
                    </span>
                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs sm:text-[0.8125rem] text-ink/90 leading-snug"
                        >
                          <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-800">
                            <svg
                              viewBox="0 0 16 16"
                              className="h-2 w-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                d="M3 8.5l3.5 3.5 6.5-7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="number-pill-inverse !text-[0.62rem]">
                            {service.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Bottom Action Link */}
                  <div className="mt-6 pt-2">
                    <a
                      href="#contacto"
                      className="group/link inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-brand-800 hover:text-brand-900 transition-colors"
                    >
                      <span className="underline decoration-brand-800/40 underline-offset-4 group-hover/link:decoration-brand-800">
                        Consultar alcances y presupuesto de esta partida
                      </span>
                      <span aria-hidden="true" className="arrow-pill arrow-pill-ink">
                        <svg
                          viewBox="0 0 16 16"
                          className="arrow-pill-out h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            d="M2.5 8h11m-4-4 4 4-4 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          viewBox="0 0 16 16"
                          className="arrow-pill-in h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
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
              );
            })}
          </div>

          {/* Right Column: Sticky Media Stage (Desktop lg+) */}
          <div className="hidden lg:col-span-5 lg:block relative">
            <div ref={stickyStageRef} className="sticky top-28 space-y-4 pb-12">
              <div className="overflow-hidden border border-bone-200 bg-white p-4 shadow-sm transition-all duration-300">
                {/* Primary Photograph Container with HUD */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                  {activeService?.image ? (
                    <Photo
                      key={activeService.slug}
                      photo={activeService.image}
                      sizes="(min-width: 1024px) 38vw, 90vw"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-bone-100 text-xs text-ink-muted">
                      <span>Registro fotográfico de obra en archivo</span>
                    </div>
                  )}

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none" />

                  {/* Active HUD text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none space-y-1">
                    <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-wider text-concha-nacar/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      <span>PARTIDA SELECCIONADA EN OBRA</span>
                    </div>
                    <h4 className="voice text-xl font-normal leading-snug text-white line-clamp-1">
                      {activeService?.title}
                    </h4>
                  </div>
                </div>

                {/* Chapter Thumbnails Strip */}
                <div className="mt-3.5 space-y-2 border-t border-bone-200/80 pt-3">
                  <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-wider text-ink-muted">
                    <span className="font-semibold text-ink">
                      Partidas del capítulo ({currentGroup.services.length})
                    </span>
                    <span>Click para alternar</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {currentGroup.services.map((srv, sIdx) => {
                      const isSelected = sIdx === activeServiceIndex;
                      return (
                        <button
                          key={srv.slug}
                          type="button"
                          onClick={() => setActiveServiceIndex(sIdx)}
                          className={cx(
                            "relative aspect-[16/11] overflow-hidden border text-left transition-all duration-200 cursor-pointer group focus:outline-none",
                            isSelected
                              ? "border-brand-800 ring-2 ring-brand-800/30"
                              : "border-bone-200 opacity-65 hover:opacity-100 hover:border-ink/40",
                          )}
                          title={srv.title}
                        >
                          {srv.image ? (
                            <Photo
                              photo={srv.image}
                              sizes="12vw"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-bone-100 flex items-center justify-center text-[0.6rem] text-ink-muted p-1">
                              {srv.title.slice(0, 14)}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                          <span className="absolute bottom-1 left-1.5 right-1 text-[0.62rem] font-medium text-white line-clamp-1 leading-tight">
                            {srv.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-bone-200/80 pt-3">
                  <span className="number-pill !py-0.5 !px-2.5 !text-[0.62rem]">
                    {`${activeService?.items.length ?? 0} ALCANCES`}
                  </span>

                  <a
                    href="#contacto"
                    className="arrow-pill arrow-pill-ink group/btn inline-flex items-center gap-2 !w-auto !px-4 !h-8 text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-brand-900"
                  >
                    <span>Cotizar partida</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3"
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
                  </a>
                </div>
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
