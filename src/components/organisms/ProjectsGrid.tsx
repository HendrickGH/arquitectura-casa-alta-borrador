import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import type { Project } from "@/types/content";

interface ProjectsGridProps {
  projects: Project[];
  tone?: "canvas" | "bone";
}

/** Three columns from 1200px, two from 768px: the CSS below is what makes it true. */
const CARD_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * The portfolio's second row: the projects the featured row did not take, three
 * up from 1200px. A project appears once, so this renders whatever the seam
 * left rather than a second copy of the ranking.
 *
 * No heading and no top padding of its own. It continues the row above it on
 * the same canvas instead of opening a second portfolio section, which is why
 * the section that leads the portfolio carries the only projects heading on the
 * page. The shared tone is deliberate: a change of background at the fourth
 * project read as a new section starting mid-list.
 *
 * The top padding is zeroed at every breakpoint rather than at the base only:
 * Tailwind's responsive utilities land after their unprefixed counterparts in
 * the stylesheet, so a bare `pt-0` would lose to `md:py-28` and `lg:py-36` and
 * the row would drift away from the one it continues.
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
export function ProjectsGrid({ projects, tone = "canvas" }: ProjectsGridProps) {
  if (projects.length === 0) return null;

  return (
    <Section tone={tone} className="pt-0 md:pt-0 lg:pt-0">
      <Container>
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
    </Section>
  );
}
