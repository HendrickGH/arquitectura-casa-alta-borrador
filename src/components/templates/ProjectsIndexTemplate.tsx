import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type { HomePage, Project, SectionIntro, SiteConfig } from "@/types/content";

interface ProjectsIndexTemplateProps {
  site: SiteConfig;
  /** The portfolio intro, shared with the landing so the two cannot drift. */
  intro: SectionIntro;
  /** Every project the seam publishes, in the pipeline's ranking order. */
  projects: Project[];
  /** The closing block that ends the page. */
  closing: HomePage["closing"];
}

/**
 * The full portfolio: every published project, three columns from 1200px, two
 * from 768px. The landing shows a selection; this is the complete list, and the
 * card grid it delegates to is the same component the landing's second row uses.
 *
 * The heading is the page's `h1`, since this route has no hero to supply one.
 */
export function ProjectsIndexTemplate({
  site,
  intro,
  projects,
  closing,
}: ProjectsIndexTemplateProps) {
  return (
    <SiteChrome site={site}>
      <main id="main">
        <Section tone="canvas">
          <Container>
            <SectionHeading
              as="h1"
              eyebrow={intro.eyebrow}
              heading={intro.heading}
              body={intro.body}
            />
          </Container>
        </Section>

        <Section tone="canvas" className="pt-0 md:pt-0 lg:pt-0">
          <ProjectsGrid projects={projects} />
        </Section>

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
