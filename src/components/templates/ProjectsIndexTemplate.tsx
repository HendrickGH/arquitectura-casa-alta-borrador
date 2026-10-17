"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
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

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      if (project.category) {
        map[project.category] = (map[project.category] ?? 0) + 1;
      }
    }
    return map;
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
    <SiteChrome site={site}>
      <main id="main">
        {leadHeroPhoto ? (
          <PageHero
            badge="(DIVISIÓN 01 · PORTAFOLIO)"
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            subheadline={intro.body}
            photo={leadHeroPhoto}
          />
        ) : null}

        <Section tone="canvas" className="!pt-12 !pb-8 md:!pt-16 md:!pb-12">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Filtrar proyectos por tipología"
                className="flex flex-wrap items-center gap-2"
              >
                {FILTER_LABELS.map((item) => {
                  const count = counts[item.id] ?? 0;
                  if (item.id !== "all" && count === 0) return null;
                  const active = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleCategoryChange(item.id)}
                      className={`label inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors duration-200 ${
                        active
                          ? "border-ink bg-ink text-concha-nacar"
                          : "border-ink/25 bg-concha-nacar text-ink hover:border-ink"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.65rem] tabular-nums ${
                          active
                            ? "bg-white/20 text-concha-nacar"
                            : "bg-ink/10 text-ink"
                        }`}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="number-pill">
                {`(${String(filtered.length).padStart(2, "0")} OBRAS EN PANTALLA)`}
              </span>
            </div>
          </Container>
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
