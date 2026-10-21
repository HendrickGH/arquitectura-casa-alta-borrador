import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CredibilityGallery } from "@/components/organisms/CredibilityGallery";
import { EditorialSplitSection } from "@/components/organisms/EditorialSplitSection";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { MethodologyZigzag } from "@/components/organisms/MethodologyZigzag";
import { PageHero } from "@/components/organisms/PageHero";
import { StatsBand } from "@/components/organisms/StatsBand";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  AboutPageContent,
  HomePage,
  MethodologyPhase,
  SiteConfig,
  Stat,
} from "@/types/content";

interface AboutPageTemplateProps {
  site: SiteConfig;
  page: AboutPageContent;
  stats: Stat[];
  manifesto: string;
  phases?: MethodologyPhase[];
  closing: HomePage["closing"];
}

/**
 * `/nosotros` — Quiénes Somos, Credibilidad en Obra y Metodología Tectónica.
 *
 * Monograph layout:
 * 1. Entry: Full-bleed Hero (eyebrow omitted) + Numerical stats ground
 * 2. Identity: Text on Left, Architectural Photograph on Right
 * 3. On-Site Supervision: Aligned dual-row continuous horizontal scroll gallery with lightbox
 * 4. Methodology: Three master phases in alternating editorial zigzag with large photography
 * 5. Closing: Architect manifesto quote + Direct contact CTA
 */
export function AboutPageTemplate({
  site,
  page,
  stats,
  manifesto,
  phases,
  closing,
}: AboutPageTemplateProps) {
  const methodologyPhases = phases ?? page.methodology ?? [];

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* Entry: Monumental Page Hero without eyebrow */}
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        {/* Quiet Numerical Ground */}
        <StatsBand stats={stats} />

        {/* Section: Nuestra Identidad (Text on Left, Image on Right) */}
        <EditorialSplitSection
          variant="monograph"
          eyebrow={page.story.eyebrow}
          heading={page.story.heading}
          paragraphs={page.story.paragraphs}
          photo={page.credibilityPhotos[0]}
        />

        {/* Section: Credibility & On-site Supervision Ribbon Gallery */}
        <CredibilityGallery
          intro={page.credibilityIntro}
          photos={page.credibilityPhotos}
        />

        {/* Section: Methodology in 3 Master Alternating Zigzag Phases */}
        <MethodologyZigzag
          intro={page.methodologyIntro}
          phases={methodologyPhases}
        />

        {/* Architect's Philosophical Statement */}
        <ManifestoLine
          line={manifesto}
          architect={site.architect}
          photo={page.enduringPhotos[0]}
        />

        {/* Closing Conversion Stage */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
