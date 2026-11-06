import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CredibilityGallery } from "@/components/organisms/CredibilityGallery";
import { IntroSection } from "@/components/organisms/IntroSection";
import { MethodologyZigzag } from "@/components/organisms/MethodologyZigzag";
import { PageHero } from "@/components/organisms/PageHero";
import { PhilosophySection } from "@/components/organisms/PhilosophySection";
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
  phases?: MethodologyPhase[];
  closing: HomePage["closing"];
}

/**
 * `/nosotros` — Quiénes Somos, Credibilidad en Obra y Metodología Tectónica.
 *
 * Monograph layout:
 * 1. Entry: Full-bleed Hero (eyebrow omitted) + Numerical stats ground
 * 2. On-Site Supervision: Aligned dual-row continuous horizontal scroll gallery with lightbox
 * 3. Methodology: Three master phases in alternating editorial zigzag with large photography
 * 4. Closing: Direct contact CTA
 */
export function AboutPageTemplate({
  site,
  page,
  stats,
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

        {/* Section: Methodology in 3 Master Alternating Zigzag Phases */}
        <MethodologyZigzag
          intro={page.methodologyIntro}
          phases={methodologyPhases}
        />

        {/* Closing Conversion Stage */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
