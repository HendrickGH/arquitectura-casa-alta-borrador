import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { Differentiators } from "@/components/organisms/Differentiators";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { IntroSection } from "@/components/organisms/IntroSection";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { StatsBand } from "@/components/organisms/StatsBand";
import { Testimonials } from "@/components/organisms/Testimonials";
import { UtilityBar } from "@/components/organisms/UtilityBar";
import type {
  HomePage,
  ProcessStep,
  Project,
  ServiceGroup,
  SiteConfig,
} from "@/types/content";

interface LandingTemplateProps {
  site: SiteConfig;
  home: HomePage;
  groups: ServiceGroup[];
  steps: ProcessStep[];
  projects: Project[];
}

/**
 * The landing, composed. Nothing here decides anything: it places the sections
 * and alternates their tone, so the page has a rhythm instead of being one
 * unbroken white column.
 *
 * Tone order, top to bottom:
 *   claim strip (brand) - header (canvas) - hero (photo)
 *   stats (bone) - intro (canvas) - services (bone) - projects (canvas)
 *   process (bone) - differentiators (canvas) - testimonials (bone, absent today)
 *   closing (bone) - footer (canvas)
 */
export function LandingTemplate({
  site,
  home,
  groups,
  steps,
  projects,
}: LandingTemplateProps) {
  return (
    <>
      <UtilityBar
        claim={site.claim}
        phone={site.contact[0]}
        social={site.social}
      />
      <Header site={site} />

      <main>
        <Hero hero={home.hero} />
        <StatsBand stats={home.stats} />

        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />
        <ServicesIndex
          id="servicios"
          intro={home.services}
          groups={groups}
          tone="bone"
        />
        <ProjectsGrid
          id="proyectos"
          intro={home.projects}
          projects={projects}
          tone="canvas"
        />
        <ProcessList
          id="proceso"
          intro={home.process}
          steps={steps}
          tone="bone"
        />
        <Differentiators
          intro={home.differentiators.intro}
          items={home.differentiators.items}
          tone="canvas"
        />
        <Testimonials
          intro={home.testimonials.intro}
          items={home.testimonials.items}
          tone="bone"
        />

        <ClosingCTA id="contacto" closing={home.closing} />
      </main>

      <Footer site={site} />
    </>
  );
}
