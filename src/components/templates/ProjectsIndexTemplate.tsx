"use client";

import { useState } from "react";
import { ArchitectQuote } from "@/components/organisms/ArchitectQuote";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { ProjectCaseStudyModal } from "@/components/organisms/ProjectCaseStudyModal";
import { ProjectsShowcaseCR } from "@/components/organisms/ProjectsShowcaseCR";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  EditorialQuote,
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
  /** Optional editorial quote rendered after the selected portfolio. */
  quote?: EditorialQuote;
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
  quote,
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
            heading="Proyectos"
            photos={heroPhotos}
          />
        ) : null}

        <ProjectsShowcaseCR
          projects={projects}
          intro={intro}
          onSelectProject={handleOpenProject}
        />

        {quote ? (
          <ArchitectQuote
            quote={quote.text}
            author={quote.author}
            eyebrow={quote.eyebrow}
          />
        ) : null}

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
