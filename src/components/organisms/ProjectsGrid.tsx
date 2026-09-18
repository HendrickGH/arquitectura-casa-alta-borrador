import { Container } from "@/components/atoms/Container";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { Project } from "@/types/content";

interface ProjectsGridProps {
  projects: Project[];
  /** Spacing between this grid and whatever precedes it in the section. */
  className?: string;
}

/** Three columns from 1200px, two from 768px: the CSS below is what makes it true. */
const CARD_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * The portfolio's grid of cards, with no section of its own.
 *
 * On the landing it is handed to `FeaturedPortfolio` as a child and completes
 * that section's run: the same tone and no heading, so the projects the featured
 * row did not take read as a continuation rather than a second portfolio. On
 * `/proyectos` the page wraps it in its own `Section`.
 *
 * The column chain is written as arbitrary variants at BOTH steps, not as `md:`
 * plus `min-[1200px]:`, and that is not a style preference. Tailwind emits its
 * arbitrary-value media variants in an earlier pass than the named breakpoints,
 * so a bare `md:` rule wins against `min-[1200px]:` on the same property however
 * the class list is ordered. Measured on the built stylesheet: the 1200px block
 * sits ~500 bytes before the 48rem block, and the grid rendered two columns wide
 * at 1440px until both steps were moved into the same bucket. Tailwind's own
 * `xl` is 1280px and is not the answer either -- the tier says 1200px, and a
 * layout whose CSS disagrees with its own label mis-serves the loader.
 */
export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  if (projects.length === 0) return null;

  return (
    <Container className={className}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            href={`/proyectos/${project.slug}`}
            sizes={CARD_SIZES}
          />
        ))}
      </div>
    </Container>
  );
}
