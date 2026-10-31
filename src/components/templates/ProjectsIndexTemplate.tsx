"use client";

import { useState } from "react";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { ProjectCaseStudyModal } from "@/components/organisms/ProjectCaseStudyModal";
import { ProjectsShowcaseCR } from "@/components/organisms/ProjectsShowcaseCR";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  HomePage,
  Project,
  SectionIntro,
  SiteConfig,
} from "@/types/content";

interface ProjectsIndexTemplateProps {
  site: SiteConfig;
  /** The portfolio intro, shared with the landing so the two cannot drift. */
  intro: SectionIntro;
  /** Every project the seam publishes, in canonical portfolio order. */
  projects: Project[];
  /** The closing block that ends the page. */
  closing: HomePage["closing"];
}

function runViewTransition(update: () => void) {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof document.startViewTransition === "function"
  ) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

/**
 * Interactive Portfolio Showcase (`/proyectos`).
 *
 * Implements:
 * - CAS-034: Hero carousel with cover photos of all portfolio works.
 * - CAS-035: "Nuestras obras" heading and justified enlarged description.
 * - CAS-036: CR Colectif Master-Detail Showcase and removal of category filter tabs.
 */
export function ProjectsIndexTemplate({
  site,
  intro,
  projects,
  closing,
}: ProjectsIndexTemplateProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    runViewTransition(() => setSelected(project));
  };

  const handleCloseProject = () => {
    runViewTransition(() => setSelected(null));
  };

  // CAS-034: Carrusel superior con fotos de portada de todas las obras
  const heroPhotos = projects.map((p) => p.wideCover ?? p.cover);

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {heroPhotos.length > 0 ? (
          <PageHero
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            subheadline={intro.body}
            photos={heroPhotos}
          />
        ) : null}

        <ProjectsShowcaseCR
          projects={projects}
          intro={intro}
          onSelectProject={handleOpenProject}
        />

        <ClosingCTA closing={closing} />

        <ProjectCaseStudyModal
          project={selected}
          onClose={handleCloseProject}
          whatsappHref={site.whatsapp.href}
        />
      </main>
    </SiteChrome>
  );
}
