import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CosentinoInspirationExperience } from "@/components/organisms/CosentinoInspirationExperience";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  HomePage,
  InteriorsPageContent,
  SiteConfig,
} from "@/types/content";

interface InteriorsPageTemplateProps {
  site: SiteConfig;
  page: InteriorsPageContent;
  closing: HomePage["closing"];
}

/**
 * `/arquitectura-interiores` — Arquitectura de Interiores / Cosentino.
 *
 * Presents:
 * - 100vw × 100vh Full Bleed Hero with transparent header.
 * - Cosentino-inspired "Meaningful Design to Inspire People's Lives" space tabs and portrait cards.
 * - Certified technical guarantee and installation pillars.
 * - "Galerías de inspiración" full photographic catalog with interactive inspection.
 */
export function InteriorsPageTemplate({
  site,
  page,
  closing,
}: InteriorsPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        <PageHero
          badge="(DIVISIÓN 03 · COSENTINO)"
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <CosentinoInspirationExperience
          cosentino={page.cosentino}
          interiorsPhotos={page.interiorsPhotos}
          lifestylePhotos={page.lifestylePhotos}
        />

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
