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
 * The portfolio's first row: the three projects the brief ranks first, the
 * leading one across both columns so the row reads as a selection rather than
 * as a gallery.
 *
 * This section carries the projects heading, and the grid under it carries
 * neither: the two rows are one run, and the same heading twice would be one
 * heading too many.
 *
 * The lead card is no longer `priority`. It used to sit directly under the
 * hero; the tiles, the manifesto and the intro now stand above it, so it is
 * several screens down and an eager fetch would take bandwidth from the hero --
 * the page's own LCP image -- to pay for it.
 */
export function FeaturedPortfolio({
  intro,
  projects,
  tone = "canvas",
  id,
  children,
}: FeaturedPortfolioProps) {
  const [lead, ...cells] = projects;
  if (!lead) return null;

  return (
    <Section id={id} tone={tone} reveal="stagger">
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          <div className="md:col-span-2">
            {/* wideCover, not cover: this slot is full width, and most covers
                are portrait -- stretched across ~1310px a 1200x1600 photo is
                being upscaled by the browser. */}
            <ProjectCard
              project={lead}
              photo={lead.wideCover}
              href={`/proyectos/${lead.slug}`}
              sizes="100vw"
              revealIndex={0}
            />
          </div>

          {cells.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              href={`/proyectos/${project.slug}`}
              sizes={CELL_SIZES}
              revealIndex={1 + index}
            />
          ))}
        </div>
      </Container>
      {children}
    </Section>
  );
}
