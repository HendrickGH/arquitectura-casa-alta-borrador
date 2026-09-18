import { CategoryTiles } from "@/components/organisms/CategoryTiles";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { Differentiators } from "@/components/organisms/Differentiators";
import { FeaturedPortfolio } from "@/components/organisms/FeaturedPortfolio";
import { FullBleedMoment } from "@/components/organisms/FullBleedMoment";
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
}

/**
 * The landing, composed. Nothing here decides anything: it places the sections
 * and alternates their tone, so the page has a rhythm instead of being one
 * unbroken white column.
 *
 * Tone order, top to bottom:
 *   claim strip (brand) - header (canvas) - hero (photo)
 *   tiles (canvas) - manifesto (bone) - intro (canvas) - stats (bone)
 *   featured portfolio (canvas) - rest of the grid (canvas) - services (canvas)
 *   masonry (bone) - process (canvas) - differentiators (bone)
 *   full-bleed moment (photo) - testimonials (bone, absent today) - closing (bone)
 *   footer (canvas)
 *
 * Two adjacency rules are deliberate. Adjacent text sections alternate, which is
 * why the intro sits above the stats rather than under the hero: as a run, the
 * five additions and the sections they sit between have to still alternate after
 * every insert. And the photographic rows sit between runs of text, so the
 * alternation reads as structure rather than as a stripe pattern.
 *
 * The two portfolio rows are the exception: both are `canvas`, because the grid
 * continues the featured row rather than opening a second section, and a tone
 * change there was read as a new section starting at the fourth project.
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
}: LandingTemplateProps) {
  return (
    <SiteChrome site={site} chrome={home.hero.chrome?.tone}>
      <main id="main">
        <Hero hero={home.hero} />
        <CategoryTiles tiles={tiles} />
        <ManifestoLine line={home.manifesto} />

        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />
        <StatsBand stats={home.stats} />

        <FeaturedPortfolio
          id="proyectos"
          intro={home.projects}
          projects={featured}
          total={featured.length + remaining.length}
          tone="canvas"
        />
        <ProjectsGrid projects={remaining} />

        <ServicesIndex
          id="servicios"
          intro={home.services}
          groups={groups}
          tone="canvas"
        />

        <ScrollScene mode="drift">
          <MasonryGallery items={masonry} tone="bone" />
        </ScrollScene>

        <ProcessList
          id="proceso"
          intro={home.process}
          steps={steps}
          tone="canvas"
        />
        <Differentiators
          intro={home.differentiators.intro}
          items={home.differentiators.items}
          tone="bone"
        />
        <Testimonials
          intro={home.testimonials.intro}
          items={home.testimonials.items}
          tone="bone"
        />

        <ScrollScene mode="breathe">
          <FullBleedMoment photo={moment} />
        </ScrollScene>

        <ClosingCTA id="contacto" closing={home.closing} />
      </main>
    </SiteChrome>
  );
}
