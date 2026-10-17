import { ContactForm } from "@/components/organisms/ContactForm";
import { Differentiators } from "@/components/organisms/Differentiators";
import { DivisionCards } from "@/components/organisms/DivisionCards";
import { FeaturedPortfolio } from "@/components/organisms/FeaturedPortfolio";
import { FullBleedCTA } from "@/components/organisms/FullBleedCTA";
import { Hero } from "@/components/organisms/Hero";
import { IntroSection } from "@/components/organisms/IntroSection";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { MasonryGallery } from "@/components/organisms/MasonryGallery";
import { ScrollScene } from "@/components/organisms/MotionShell";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { StatsBand } from "@/components/organisms/StatsBand";
import { Testimonials } from "@/components/organisms/Testimonials";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  CategoryTile,
  DivisionCard,
  HomePage,
  MasonryItem,
  Photo,
  ProcessStep,
  Project,
  ServiceGroup,
  SiteConfig,
} from "@/types/content";

interface LandingTemplateProps {
  site: SiteConfig;
  home: HomePage;
  divisions: DivisionCard[];
  groups: ServiceGroup[];
  steps: ProcessStep[];
  /** The brief's four flagship projects. */
  featured: Project[];
  /** The projects the featured row did not take, continuing it. */
  remaining: Project[];
  tiles: CategoryTile[];
  masonry: MasonryItem[];
  moment: Photo | null;
  /** Primary WhatsApp target, for the contact form's secondary action. */
  whatsappHref: string;
}

export function LandingTemplate({
  site,
  home,
  divisions,
  groups,
  steps,
  featured,
  remaining,
  masonry,
  moment,
  whatsappHref,
}: LandingTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        <Hero hero={home.hero} />

        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />
        <StatsBand stats={home.stats} />

        <DivisionCards
          intro={home.divisionsIntro}
          divisions={divisions}
          tone="canvas"
        />

        <ManifestoLine
          line={home.manifesto}
          architect={site.architect}
          photo={home.manifestoPhoto}
        />

        <FeaturedPortfolio
          id="proyectos"
          intro={home.projects}
          projects={featured}
          remaining={remaining}
          tone="canvas"
          whatsappHref={whatsappHref}
        />

        <ProcessList
          id="proceso"
          intro={home.process}
          steps={steps}
          tone="bone"
        />

        <ServicesIndex
          id="servicios"
          intro={home.services}
          groups={groups}
          tone="canvas"
        />

        <Differentiators
          intro={home.differentiators.intro}
          items={home.differentiators.items}
          tone="bone"
        />

        <ScrollScene>
          <MasonryGallery items={masonry} tone="canvas" />
        </ScrollScene>

        <Testimonials
          intro={home.testimonials.intro}
          items={home.testimonials.items}
          tone="bone"
        />

        <FullBleedCTA photo={moment} closing={home.closing} />

        <ContactForm
          id="contacto"
          contact={home.contact}
          whatsappHref={whatsappHref}
          photo={home.contactPhoto}
        />
      </main>
    </SiteChrome>
  );
}
