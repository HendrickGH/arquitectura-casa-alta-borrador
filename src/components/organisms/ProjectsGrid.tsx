import { Container } from "@/components/atoms/Container";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { Project } from "@/types/content";

interface ProjectsGridProps {
  projects: Project[];
  /** Spacing between this grid and whatever precedes it in the section. */
  className?: string;
  /** Optional interactive drawer handler for the /proyectos explorer. */
  onSelect?: (project: Project) => void;
}

/** Three columns from 1200px, two from 768px: the CSS below is what makes it true. */
const CARD_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

export function ProjectsGrid({
  projects,
  className,
  onSelect,
}: ProjectsGridProps) {
  if (projects.length === 0) return null;

  return (
    <Container className={className}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            sizes={CARD_SIZES}
            revealIndex={index}
            onSelect={onSelect}
          />
        ))}
      </div>
    </Container>
  );
}
