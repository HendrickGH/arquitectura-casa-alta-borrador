"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { useContactModal } from "@/components/organisms/ContactModalContext";
import { cx } from "@/lib/cx";
import type { Project, SectionIntro } from "@/types/content";

interface ProjectsShowcaseCRProps {
  projects: Project[];
  intro: SectionIntro;
  onSelectProject: (project: Project) => void;
}

/**
 * Architectural Master-Detail Portfolio Showcase (`ProjectsShowcaseCR`).
 *
 * Implements the CR Colectif inspiration layout for Casa Alta:
 * - Top header with justified enlarged narrative and Marcellus heading (CAS-035).
 * - Interactive central master stage with large photographic preview, slide counter,
 *   full technical specifications, "Ver proyecto" dossier trigger, and "Cotizar mi nuevo proyecto" CTA.
 * - Horizontal snap-scroll thumbnail track providing immediate access to all portfolio works.
 * - Strict 0px geometry, zero decorative borders, and pure surface tone alternation (DESIGN.md).
 */
export function ProjectsShowcaseCR({
  projects,
  intro,
  onSelectProject,
}: ProjectsShowcaseCRProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const contactModal = useContactModal();

  const total = projects.length;
  const activeProject = projects[activeIndex] ?? projects[0];

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Center the active thumbnail inside the snap track
  useEffect(() => {
    const cardEl = cardRefs.current[activeIndex];
    const trackEl = trackRef.current;
    if (cardEl && trackEl) {
      const trackRect = trackEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const offset =
        cardEl.offsetLeft -
        trackEl.offsetLeft -
        trackRect.width / 2 +
        cardRect.width / 2;
      trackEl.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeIndex]);

  // Keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft") {
        prevProject();
      } else if (e.key === "ArrowRight") {
        nextProject();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject]);

  if (!activeProject) return null;

  const leadPhoto = activeProject.wideCover ?? activeProject.cover;

  return (
    <section className="bg-canvas py-16 md:py-24 lg:py-28" aria-label="Catálogo de Obras Casa Alta">
      <Container className="max-w-[1920px]">
        {/* Top Header Row (CAS-035: Justified and enlarged narrative) */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 pb-12">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-brand-800 mb-3">{intro.eyebrow}</p>
            <Heading as="h2" voice="serif" className="text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight">
              {intro.heading}
            </Heading>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-base sm:text-lg lg:text-xl text-ink-muted text-justify leading-relaxed">
              {intro.body}
            </p>
          </div>
        </div>

        {/* Master-Detail Stage (Inspired by CR Colectif) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-stretch pt-4">
          {/* Left Column: Large Project Photograph */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <button
              type="button"
              onClick={() => onSelectProject(activeProject)}
              className="group relative aspect-[16/10] w-full overflow-hidden bg-bone-100 text-left focus-visible:outline-2 focus-visible:outline-brand-800 cursor-pointer"
              aria-label={`Abrir expediente de ${activeProject.title}`}
            >
              <div className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <Photo
                  photo={leadPhoto}
                  priority
                  fit="cover"
                  sizes="(min-width: 1200px) 60vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Tonal hover scrim with action callout */}
              <div className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="label text-white bg-ink/80 px-4 py-2 backdrop-blur-sm text-xs tracking-widest uppercase">
                  Ver expediente completo
                </span>
              </div>
            </button>
          </div>

          {/* Right Column: Project Dossier Snapshot & Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-brand-800" aria-hidden="true" />
                <span className="label text-xs uppercase tracking-widest text-brand-800 font-semibold">
                  {activeProject.categoryLabel || "Obra"}
                </span>
              </div>

              <Heading
                as="h3"
                voice="serif"
                className="text-3xl sm:text-4xl lg:text-5xl text-ink mt-3 leading-tight tracking-tight"
              >
                {activeProject.title}
              </Heading>

              <div className="hidden md:block">
                <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                  {activeProject.summary}
                </p>

                {/* Architectural Technical Specs List (Stacked vertically, no background box) */}
                <div className="flex flex-col gap-3 mt-8">
                  <div className="flex items-baseline gap-4">
                    <span className="label text-[11px] text-ink-muted w-24 flex-shrink-0 uppercase tracking-wider">
                      Ubicación
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                      {activeProject.location || "Oaxaca, México"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span className="label text-[11px] text-ink-muted w-24 flex-shrink-0 uppercase tracking-wider">
                      Año
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-ink tabular-nums">
                      {activeProject.year || "2024–2025"}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span className="label text-[11px] text-ink-muted w-24 flex-shrink-0 uppercase tracking-wider">
                      Tipología
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-ink truncate">
                      {activeProject.categoryLabel || "Arquitectura"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons & Navigation Arrows */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 md:pt-8 md:mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => onSelectProject(activeProject)}
                  className="min-h-[48px] px-6 text-xs uppercase tracking-widest"
                >
                  Ver proyecto
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => contactModal?.openContactModal()}
                  className="min-h-[48px] px-4 text-xs uppercase tracking-wider"
                >
                  Cotizar mi nuevo proyecto
                </Button>
              </div>

              {/* Prev / Next 0px square buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Ver obra anterior"
                  className="inline-flex h-11 w-11 items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-brand-800 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-800 cursor-pointer"
                >
                  <Icon name="arrow-left" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Ver obra siguiente"
                  className="inline-flex h-11 w-11 items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-brand-800 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-800 cursor-pointer"
                >
                  <Icon name="arrow-right" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Snap Track Selector */}
        <div className="mt-6 pt-2 md:mt-12 md:pt-4">
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Selector de obras del portafolio"
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none focus-visible:outline-2 focus-visible:outline-brand-800"
          >
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              const thumb = project.cover;

              return (
                <button
                  key={project.slug}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={cx(
                    "snap-start flex-shrink-0 w-[80vw] sm:w-[360px] md:w-[420px] p-3.5 sm:p-4 flex flex-col gap-3.5 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-800",
                    isActive
                      ? "bg-ink text-white"
                      : "bg-bone-50 text-ink hover:bg-bone-100"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200">
                    <Photo
                      photo={thumb}
                      fit="cover"
                      sizes="(min-width: 640px) 420px, 360px"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 w-full">
                    <h4
                      className={cx(
                        "text-base font-semibold truncate leading-snug",
                        isActive ? "text-white" : "text-ink"
                      )}
                    >
                      {project.title}
                    </h4>
                    <p
                      className={cx(
                        "text-xs sm:text-sm truncate mt-1",
                        isActive ? "text-white/70" : "text-ink-muted"
                      )}
                    >
                      {project.location || project.categoryLabel || "Oaxaca"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
