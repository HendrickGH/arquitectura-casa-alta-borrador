"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ProjectCaseStudyModal } from "@/components/organisms/ProjectCaseStudyModal";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import type { Project, SectionIntro } from "@/types/content";

interface FeaturedPortfolioProps {
  intro: SectionIntro;
  /** Flagship curated projects. */
  projects: Project[];
  /** Optional remaining featured projects to combine into the unified showcase. */
  remaining?: Project[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  whatsappHref?: string;
  action?: React.ReactNode;
}

/**
 * Unified Architectural Monograph Portfolio Section (Landing).
 *
 * Takes the authoritative ProjectsGrid module as reference and feeds it
 * directly with the studio's curated flagship works, providing a clean,
 * responsive, and performant architectural gallery without scroll-jacking.
 */
export function FeaturedPortfolio({
  intro,
  projects,
  remaining = [],
  tone = "canvas",
  id,
  whatsappHref,
  action,
}: FeaturedPortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Combine flagship and remaining to form the unified featured set
  const displayProjects =
    remaining.length > 0 ? [...projects, ...remaining] : projects;

  if (displayProjects.length === 0) return null;

  return (
    <>
      <Section id={id} tone={tone} density="compact">
        <div className="mx-auto mb-10 w-full max-w-[1920px] px-2 sm:px-3 md:px-4 lg:px-6">
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
            action={
              action !== undefined ? (
                action
              ) : (
                <Button href="/proyectos" variant="secondary" size="sm" arrow>
                  Ver archivo completo (17 obras)
                </Button>
              )
            }
          />
        </div>

        <ProjectsGrid
          projects={displayProjects}
          onSelect={(proj) => setSelectedProject(proj)}
        />
      </Section>

      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
