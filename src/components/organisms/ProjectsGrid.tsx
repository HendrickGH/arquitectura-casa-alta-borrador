import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Counter } from "@/components/molecules/Counter";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Project, SectionIntro } from "@/types/content";

interface ProjectsGridProps {
  intro: SectionIntro;
  projects: Project[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The built work, on a two-column grid. The first project is the featured one:
 * it spans both columns and is therefore twice as tall as the single cells
 * under it, which is what makes the grid read as a selection rather than a
 * gallery. Five of six featured projects then land as two, two and one, so the
 * last row is deliberately short.
 *
 * Two columns rather than four is the measured choice: on a four-column grid a
 * single cell is 200px at 1024px, and a 48px serif project title needs 341px
 * for "Departamentos" alone. Two columns give that cell 432px.
 *
 * `sizes` follows the grid exactly -- full width below 768px, half above it --
 * because the custom loader picks the file from it.
 */
export function ProjectsGrid({
  intro,
  projects,
  tone = "canvas",
  id,
}: ProjectsGridProps) {
  const [featured, ...rest] = projects;
  if (!featured) return null;

  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
          />
          <Counter current={1} total={projects.length} className="md:pb-2" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          <div className="md:col-span-2">
            {/* wideCover, not cover: this slot is full width, and four of the
                six featured covers are portrait -- stretched across ~1310px a
                1200x1600 photo is being upscaled by the browser. */}
            <ProjectCard
              project={featured}
              photo={featured.wideCover}
              sizes="100vw"
              priority
            />
          </div>

          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
