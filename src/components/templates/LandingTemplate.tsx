import { CategoryTiles } from "@/components/organisms/CategoryTiles";
import { ContactForm } from "@/components/organisms/ContactForm";
import { Differentiators } from "@/components/organisms/Differentiators";
import { FeaturedPortfolio } from "@/components/organisms/FeaturedPortfolio";
import { FullBleedCTA } from "@/components/organisms/FullBleedCTA";
import { Hero } from "@/components/organisms/Hero";
import { IntroSection } from "@/components/organisms/IntroSection";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { MasonryGallery } from "@/components/organisms/MasonryGallery";
import { ScrollScene } from "@/components/organisms/MotionShell";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { StatsBand } from "@/components/organisms/StatsBand";
import { Testimonials } from "@/components/organisms/Testimonials";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  CategoryTile,
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
  groups: ServiceGroup[];
  steps: ProcessStep[];
  /** The brief's three, lead first. */
  featured: Project[];
  /** The projects the featured row did not take, continuing it. */
  remaining: Project[];
  tiles: CategoryTile[];
  masonry: MasonryItem[];
  moment: Photo | null;
  /** Primary WhatsApp target, for the contact form's secondary action. */
  whatsappHref: string;
}

/**
 * The landing, composed. Nothing here decides anything: it places the sections
 * and alternates their tone, so the page has a rhythm instead of being one
 * unbroken white column.
 *
 * Tone order, top to bottom:
 *   claim strip (brand) - header (canvas) - hero (photo)
 *   intro (canvas) - stats (bone) - tiles (canvas) - manifesto (brand)
 *   featured portfolio (canvas) - rest of the grid (canvas) - process (bone)
 *   services (canvas) - differentiators (bone) - masonry (canvas)
 *   testimonials (bone, absent today) - full-bleed closing CTA (photo)
 *   contact form (bone) - footer (canvas)
 *
 * Three adjacency rules are deliberate.
 *
 * Adjacent text sections alternate, so the page reads as structure rather than
 * as a stripe pattern. The intro and the stats now sit directly under the hero
 * instead of the tiles: the hero is the first photograph, and a four-up tile
 * band immediately beneath it opened the page on a second wall of images. The
 * studio says who it is and how much it has built before the next photograph
 * arrives.
 *
 * No two photographic masses are adjacent. The four photographic blocks -- the
 * tiles, the portfolio, the services and the masonry -- are separated by a text
 * section each, and the brief's original run (portfolio 6 -> services 13 ->
 * masonry 12) left thirty-one photographs with nothing but an intro between
 * them. Process now breaks portfolio from services, and differentiators breaks
 * services from masonry. The masonry's tone is `canvas`, not `bone`, because
 * that section follows the bone differentiators and the alternation has to hold
 * across the pair.
 *
 * The two portfolio rows are the exception to the tone alternation: both are
 * `canvas`, because the grid continues the featured row rather than opening a
 * second section, and a tone change there was read as a new section starting at
 * the fourth project.
 */
export function LandingTemplate({
  site,
  home,
  groups,
  steps,
  featured,
  remaining,
  tiles,
  masonry,
  moment,
  whatsappHref,
}: LandingTemplateProps) {
  return (
    <SiteChrome site={site} chrome={home.hero.chrome?.tone}>
      <main id="main">
        <Hero hero={home.hero} />

        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />
        <StatsBand stats={home.stats} />

        <CategoryTiles tiles={tiles} />
        <ManifestoLine line={home.manifesto} architect={site.architect} />

        <FeaturedPortfolio
          id="proyectos"
          intro={home.projects}
          projects={featured}
          total={featured.length + remaining.length}
          tone="canvas"
        >
          {/* The rest of the grid lives inside the projects section, not as a
              second `[data-reveal]` one starting mid-list. */}
          <ProjectsGrid
            projects={remaining}
            className="mt-20 md:mt-28 lg:mt-36"
          />
        </FeaturedPortfolio>

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
        />
      </main>
    </SiteChrome>
  );
}
