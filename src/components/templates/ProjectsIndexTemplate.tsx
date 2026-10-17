"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
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

const DRAWER_PHOTO_SIZES = "(min-width: 1024px) 48vw, 100vw";

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
 * project in a full-screen Case Study Drawer (with its verbatim narrative,
 * technical sheet, and complete photo gallery) without losing their place in
 * the index, or navigate to the standalone SEO URL `/proyectos/[slug]`.
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

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const handleCategoryChange = (next: "all" | ProjectCategory) => {
    runViewTransition(() => setCategory(next));
  };

  const handleOpenProject = (project: Project) => {
    runViewTransition(() => setSelected(project));
  };

  const handleCloseProject = () => {
    runViewTransition(() => setSelected(null));
  };

  return (
    <SiteChrome site={site}>
      <main id="main">
        <Section tone="canvas" className="!pb-10 md:!pb-14">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                as="h1"
                eyebrow={intro.eyebrow}
                heading={intro.heading}
                body={intro.body}
              />
              <div className="flex items-center gap-3">
                <span className="number-pill">
                  {`${String(filtered.length).padStart(2, "0")} PROYECTOS`}
                </span>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar proyectos por tipología"
              className="ruler-top mt-10 flex flex-wrap items-center gap-2 pt-6"
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
                    className={`label inline-flex items-center gap-2.5 border px-4 py-2.5 transition-colors duration-200 ${
                      active
                        ? "border-brand-800 bg-brand-800 text-white"
                        : "border-bone-200 bg-bone-50 text-ink hover:border-ink"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`px-1.5 py-0.5 text-[0.65rem] tabular-nums ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-bone-200/80 text-brand-800"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section tone="canvas" className="pt-0 md:pt-0 lg:pt-0">
          <ProjectsGrid projects={filtered} onSelect={handleOpenProject} />
        </Section>

        <ClosingCTA closing={closing} />

        {selected ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas"
          >
            <div className="sticky top-0 z-20 border-b border-bone-200 bg-canvas/95 backdrop-blur-md">
              <Container className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="number-pill">
                    {selected.categoryLabel || "Proyecto"}
                  </span>
                  <span className="label hidden text-ink-muted sm:inline">
                    {selected.location}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/proyectos/${selected.slug}`}
                    className="label hidden text-brand-800 underline underline-offset-4 hover:text-ink sm:inline"
                  >
                    Abrir enlace permanente
                  </Link>
                  <button
                    type="button"
                    onClick={handleCloseProject}
                    className="label inline-flex items-center gap-2 border border-ink px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    <span>Cerrar</span>
                    <Icon name="close" className="h-4 w-4" />
                  </button>
                </div>
              </Container>
            </div>

            <Container className="py-12 md:py-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <Heading as="h2" voice="serif" className="max-w-[22ch]">
                    {selected.title}
                  </Heading>

                  {selected.paragraphs && selected.paragraphs.length > 0 ? (
                    <div className="mt-6 flex flex-col gap-4">
                      {selected.paragraphs.map((paragraph, idx) => (
                        <Text
                          key={paragraph}
                          size={idx === 0 ? "lede" : undefined}
                          className={
                            idx === 0 ? "text-ink" : "text-ink-muted"
                          }
                        >
                          {paragraph}
                        </Text>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 flex flex-col gap-4">
                      {selected.summary ? (
                        <Text size="lede">{selected.summary}</Text>
                      ) : null}
                      {selected.story ? (
                        <Text className="text-ink-muted">{selected.story}</Text>
                      ) : null}
                      {selected.outcome ? (
                        <Text className="text-ink-muted">
                          {selected.outcome}
                        </Text>
                      ) : null}
                    </div>
                  )}
                </div>

                {selected.specs && selected.specs.length > 0 ? (
                  <aside className="lg:col-span-5">
                    <div className="ruler-top border border-bone-200 bg-concha-nacar/55 p-6">
                      <div className="flex items-center justify-between border-b border-bone-200 pb-3">
                        <p className="label text-brand-800">Ficha técnica</p>
                        <span className="number-pill">
                          {`${String(selected.photos.length).padStart(2, "0")} FOTOS`}
                        </span>
                      </div>
                      <dl className="mt-3 divide-y divide-bone-200">
                        {selected.specs.map((spec, idx) => (
                          <div
                            key={spec.label}
                            className="grid grid-cols-12 items-baseline gap-2 py-3 text-sm"
                          >
                            <dt className="col-span-5 flex items-center gap-2 font-medium text-ink">
                              <span className="text-[0.6875rem] font-semibold text-brand-800 tabular-nums">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span>{spec.label}</span>
                            </dt>
                            <dd className="col-span-7 text-ink-muted">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-6 flex flex-col gap-3">
                        <Button href="/contacto" size="sm" arrow>
                          Cotizar un proyecto similar
                        </Button>
                      </div>
                    </div>
                  </aside>
                ) : null}
              </div>

              <div className="ruler-top mt-14 pt-10">
                <div className="mb-8 flex items-center justify-between">
                  <p className="eyebrow">Registro fotográfico de obra</p>
                  <span className="number-pill">
                    {`${String(selected.photos.length).padStart(2, "0")} IMÁGENES`}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {selected.photos.map((photo, idx) => (
                    <div
                      key={photo.src}
                      className="overflow-hidden border border-bone-200 bg-bone-100"
                    >
                      <Photo
                        photo={photo}
                        sizes={DRAWER_PHOTO_SIZES}
                        priority={idx < 2}
                        fit="intrinsic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        ) : null}
      </main>
    </SiteChrome>
  );
}
