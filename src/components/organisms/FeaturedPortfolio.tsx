"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ProjectCaseStudyModal } from "@/components/organisms/ProjectCaseStudyModal";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import type { Project, SectionIntro } from "@/types/content";

interface FeaturedPortfolioProps {
  intro: SectionIntro;
  /** The brief's 4 flagship projects, lead first. */
  projects: Project[];
  /** Remaining featured projects rendered in the editorial grid below the pinned stage. */
  remaining?: Project[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  whatsappHref?: string;
}

/**
 * Thirdway `featured-projects-full-bleed` GSAP ScrollTrigger Pinned Showcase.
 *
 * - Pins a full-bleed `100vw × 100svh` architectural stage (`pin: true, scrub: 0.7`)
 *   and wipes through the 4 flagship works (Conjunto Zicatela, Casa Charco Seco,
 *   Plaza Esmeralda, Casa Blake) as the visitor scrolls.
 * - Includes Thirdway's horizontal scrub progress hairline across the lower
 *   third, `(01) / (04)` oval capsule counter, monumental project title on the
 *   left, and large quotation mark `“` + summary on the right.
 * - Clicking any project (in the pinned stage or the continuation grid below)
 *   opens the full-screen `ProjectCaseStudyModal` dossier.
 */
export function FeaturedPortfolio({
  intro,
  projects,
  remaining = [],
  tone = "canvas",
  id,
  whatsappHref,
}: FeaturedPortfolioProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || projects.length < 2) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>(
          "[data-pinned-project-slide]",
          stage,
        );
        const total = slides.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * (total - 0.35)}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                total - 1,
                Math.floor(self.progress * total),
              );
              setActiveIndex(idx);
            },
          },
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;
          const imgWrap = slide.querySelector<HTMLElement>(
            "[data-pinned-project-img]",
          );
          tl.fromTo(
            slide,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              duration: 1,
            },
            i - 1,
          );
          if (imgWrap) {
            tl.fromTo(
              imgWrap,
              { scale: 1.08 },
              { scale: 1, ease: "none", duration: 1 },
              i - 1,
            );
          }
        });

        if (progressRef.current) {
          tl.fromTo(
            progressRef.current,
            { scaleX: 1 / total },
            { scaleX: 1, ease: "none", duration: total - 1 },
            0,
          );
        }
      }, stage);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [projects.length]);

  if (projects.length === 0) return null;

  const activeProject = projects[activeIndex] ?? projects[0];
  const totalFlagship = projects.length;

  return (
    <>
      <Section id={id} tone={tone} reveal="stagger" className="!pb-0">
        <Container className="pb-12 md:pb-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="number-pill">(04)</span>
                <p className="eyebrow">{intro.eyebrow}</p>
              </div>
              <SectionHeading heading={intro.heading} body={intro.body} />
            </div>
            <div className="shrink-0">
              <Button href="/proyectos" variant="secondary" size="sm" arrow>
                Explorar los 17 proyectos
              </Button>
            </div>
          </div>
        </Container>

        {/* Thirdway `featured-projects-full-bleed` GSAP Pinned Stage */}
        <div
          ref={stageRef}
          className="relative h-[100svh] w-full overflow-hidden bg-ink text-white"
        >
          {/* Full-bleed stacked project photographs */}
          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-pinned-project-slide
              className="absolute inset-0 h-full w-full overflow-hidden bg-ink"
              style={{ zIndex: index + 1 }}
            >
              <div
                data-pinned-project-img
                className="relative h-full w-full overflow-hidden"
              >
                <Photo
                  photo={project.wideCover ?? project.cover}
                  sizes="100vw"
                  priority={index === 0}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/30"
              />
            </div>
          ))}

          {/* Foreground HUD pinned over the full-bleed stage (Thirdway layout) */}
          <div className="pointer-events-none relative z-30 flex h-full flex-col justify-end pb-12 md:pb-16">
            <Container className="pointer-events-auto">
              {/* Top pills row above the horizontal scrub line */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="number-pill-inverse">
                    {`(${String(activeIndex + 1).padStart(2, "0")}) / (${String(totalFlagship).padStart(2, "0")})`}
                  </span>
                  <span className="number-pill-inverse">
                    {activeProject.categoryLabel}
                  </span>
                  {activeProject.location ? (
                    <span className="number-pill-inverse">
                      {activeProject.location}
                    </span>
                  ) : null}
                </div>

                <span className="font-mono text-[0.68rem] tracking-widest text-white/75 uppercase">
                  DESPLAZA PARA CAMBIAR OBRA · SCROLL PINNED
                </span>
              </div>

              {/* Thirdway 1px horizontal scrub progress bar */}
              <div className="h-[1px] w-full overflow-hidden bg-white/25">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left bg-white"
                  style={{ transform: `scaleX(${1 / totalFlagship})` }}
                />
              </div>

              {/* Bottom two-column split: Monumental Title (left) + Quote/Summary (right) */}
              <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
                <div className="lg:col-span-7">
                  <h3 className="voice text-[clamp(2rem,4.5vw,3.9rem)] leading-[1.04] text-white">
                    {activeProject.title}
                  </h3>

                  <div className="mt-5 flex flex-wrap items-center gap-6">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(activeProject)}
                      className="group label inline-flex items-center gap-3 text-white transition-colors hover:text-concha-nacar"
                    >
                      <span className="underline decoration-white/50 underline-offset-[6px] group-hover:decoration-white">
                        {`Abrir expediente (${activeProject.photoCount} fotos)`}
                      </span>
                      <span aria-hidden="true" className="arrow-pill">
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
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <span
                    aria-hidden="true"
                    className="voice block text-4xl leading-none text-white/60"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-white/90 md:text-base">
                    {activeProject.summary}
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Continuation editorial grid for the remaining featured projects */}
        {remaining.length > 0 ? (
          <div className="bg-canvas py-20 md:py-28">
            <Container className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="number-pill">(04.B)</span>
                <p className="label text-brand-800">
                  Más obras residenciales, comerciales y civiles en Oaxaca
                </p>
              </div>
              <Button href="/proyectos" variant="secondary" size="sm" arrow>
                Ver archivo completo (17 obras)
              </Button>
            </Container>
            <ProjectsGrid
              projects={remaining}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          </div>
        ) : null}
      </Section>

      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
