import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CredibilityGallery } from "@/components/organisms/CredibilityGallery";
import { IntroSection } from "@/components/organisms/IntroSection";
import { PageHero } from "@/components/organisms/PageHero";
import { PhilosophySection } from "@/components/organisms/PhilosophySection";
import { ProcessList } from "@/components/organisms/ProcessList";
import { StatsBand } from "@/components/organisms/StatsBand";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  AboutPageContent,
  HomePage,
  ProcessStep,
  SectionIntro,
  SiteConfig,
  Stat,
} from "@/types/content";

interface AboutPageTemplateProps {
  site: SiteConfig;
  page: AboutPageContent;
  stats: Stat[];
  processIntro?: SectionIntro;
  processSteps?: ProcessStep[];
  closing: HomePage["closing"];
}

/**
 * `/nosotros` — Quiénes Somos, Credibilidad en Obra y Metodología.
 *
 * Monograph layout:
 * 1. Entry: Full-bleed Hero (eyebrow omitted) + Numerical stats ground
 * 2. On-Site Supervision: Aligned dual-row continuous horizontal scroll gallery with lightbox
 * 3. Methodology: Split-screen pinned architectural process sequence
 * 4. Closing: Direct contact CTA
 */
export function AboutPageTemplate({
  site,
  page,
  stats,
  processIntro,
  processSteps,
  closing,
}: AboutPageTemplateProps) {
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

        {/* 01. Quiénes somos: Editorial Introduction */}
        {page.intro ? (
          <IntroSection
            intro={page.intro}
            tone="canvas"
            hideAction
          />
        ) : null}

        {/* Quiet Numerical Ground */}
        <StatsBand stats={stats} />

        {/* 02. Filosofía: Misión, Visión y Valores */}
        {page.philosophy ? (
          <PhilosophySection
            id="filosofia"
            philosophy={page.philosophy}
            tone="canvas"
          />
        ) : null}

        {/* Section: Credibility & On-site Supervision Ribbon Gallery */}
        <CredibilityGallery
          intro={page.credibilityIntro}
          photos={page.credibilityPhotos}
        />

        {/* Section: Metodología Casa Alta (Cómo trabajamos) */}
        {processIntro && processSteps && processSteps.length > 0 ? (
          <ProcessList
            intro={processIntro}
            steps={processSteps}
            tone="bone"
            id="proceso"
          />
        ) : null}

        {/* Closing Conversion Stage */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
