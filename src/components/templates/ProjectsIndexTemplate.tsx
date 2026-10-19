"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Tabs } from "@/components/molecules/Tabs";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { ProjectCaseStudyModal } from "@/components/organisms/ProjectCaseStudyModal";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  HomePage,
  Project,
  ProjectCategory,
  SectionIntro,
  SiteConfig,
} from "@/types/content";

interface ProjectsIndexTemplateProps {
  site: SiteConfig;
  /** The portfolio intro, shared with the landing so the two cannot drift. */
  intro: SectionIntro;
  /** Every project the seam publishes, in the pipeline's ranking order. */
  projects: Project[];
  /** The closing block that ends the page. */
  closing: HomePage["closing"];
}

const FILTER_LABELS: Array<{ id: "all" | ProjectCategory; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "habitacional", label: "Habitacional" },
  { id: "multifamiliar", label: "Multifamiliar y hospitalidad" },
  { id: "comercial", label: "Comercial" },
  { id: "obra-civil", label: "Ingeniería y obra civil" },
  { id: "espacios-publicos", label: "Equipamiento y espacio público" },
];

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
 * Interactive Portfolio Explorer (`/proyectos`).
 *
 * Visitors can filter all 17 projects by architectural typology and open any
 * project in the shared full-screen `ProjectCaseStudyModal` (with its verbatim
 * narrative, technical sheet, and complete photo gallery) without individual
 * `/proyectos/[slug]` routes.
 */
export function ProjectsIndexTemplate({
  site,
  intro,
  projects,
  closing,
}: ProjectsIndexTemplateProps) {
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const tabs = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      if (project.category) {
        counts[project.category] = (counts[project.category] ?? 0) + 1;
      }
    }
    return FILTER_LABELS.filter(
      (item) => item.id === "all" || (counts[item.id] ?? 0) > 0,
    ).map((item) => ({
      id: item.id,
      label: item.label,
      count: counts[item.id] ?? 0,
    }));
  }, [projects]);

  const filtered = useMemo(() => {
    if (category === "all") return projects;
    return projects.filter((p) => p.category === category);
  }, [category, projects]);

  const handleCategoryChange = (next: "all" | ProjectCategory) => {
    runViewTransition(() => setCategory(next));
  };

  const handleOpenProject = (project: Project) => {
    runViewTransition(() => setSelected(project));
  };

  const handleCloseProject = () => {
    runViewTransition(() => setSelected(null));
  };

  const leadHeroPhoto = projects[0]?.wideCover ?? projects[0]?.cover;

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {leadHeroPhoto ? (
          <PageHero
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            subheadline={intro.body}
            photo={leadHeroPhoto}
          />
        ) : null}

        <Section tone="canvas" density="compact">
          <div className="mx-auto w-full max-w-[1920px] px-2 sm:px-3 md:px-4 lg:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <Tabs
                tabs={tabs}
                activeId={category}
                onChange={handleCategoryChange}
                ariaLabel="Filtrar proyectos por tipología"
                className="flex-1"
              />

              <span className="label tabular-nums text-ink-muted">
                {`${String(filtered.length).padStart(2, "0")} OBRAS EN PANTALLA`}
              </span>
            </div>
          </div>
        </Section>

        <Section tone="canvas" className="pt-0 md:pt-0 lg:pt-0">
          <ProjectsGrid projects={filtered} onSelect={handleOpenProject} />
        </Section>

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
