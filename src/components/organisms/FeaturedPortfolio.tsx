import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Project, SectionIntro } from "@/types/content";

interface FeaturedPortfolioProps {
  intro: SectionIntro;
  /** The brief's ranking, lead first. */
  projects: Project[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  /**
   * The portfolio's later rows. They render inside this section, below the
   * featured row, so the whole portfolio reveals as one unit instead of a second
   * independent `[data-reveal]` section starting mid-list.
   */
  children?: React.ReactNode;
}

/** One cell of the two-column grid, so the 2-column tier is the exact slot. */
const CELL_SIZES = "(min-width: 768px) 50vw, 100vw";

/**
 * The portfolio's flagship row: the four projects the brief ranks first
 * (Conjunto Zicatela, Casa Charco Seco, Plaza Esmeralda, Casa Blake),
 * followed by the studio's remaining featured works and a direct link to the
 * interactive `/proyectos` explorer.
 */
export function FeaturedPortfolio({
  intro,
  projects,
  tone = "canvas",
  id,
  children,
}: FeaturedPortfolioProps) {
  if (projects.length === 0) return null;

  return (
    <Section id={id} tone={tone} reveal="stagger">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
          />
          <div className="shrink-0">
            <Button href="/proyectos" variant="secondary" size="sm" arrow>
              Explorar los 17 proyectos
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              sizes={CELL_SIZES}
              revealIndex={index}
            />
          ))}
        </div>
      </Container>
      {children}
    </Section>
  );
}
