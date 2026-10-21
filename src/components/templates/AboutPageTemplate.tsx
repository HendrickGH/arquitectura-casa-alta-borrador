import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CredibilityGallery } from "@/components/organisms/CredibilityGallery";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { MethodologyZigzag } from "@/components/organisms/MethodologyZigzag";
import { PageHero } from "@/components/organisms/PageHero";
import { StatsBand } from "@/components/organisms/StatsBand";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
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
        <Section tone="canvas" density="default" reveal="stagger">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Narrative and Manifesto */}
              <div className="flex flex-col gap-6 lg:col-span-6">
                {page.story.eyebrow ? (
                  <div {...revealStep(0)}>
                    <p className="eyebrow">{page.story.eyebrow}</p>
                  </div>
                ) : null}

                <div {...revealStep(1)}>
                  <Heading
                    as="h2"
                    voice="serif"
                    sizeClassName="text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.12]"
                    className="max-w-[22ch]"
                  >
                    {page.story.heading}
                  </Heading>
                </div>

                <div {...revealStep(2)} className="flex flex-col gap-4">
                  {page.story.paragraphs.map((paragraph, index) => (
                    <Text
                      key={paragraph}
                      size={index === 0 ? "lede" : undefined}
                      className={
                        index === 0
                          ? "max-w-[48ch] text-ink"
                          : "max-w-[48ch] text-ink-muted"
                      }
                    >
                      {paragraph}
                    </Text>
                  ))}
                </div>
              </div>

              {/* Right Column: Architectural Photography in Clean Frame */}
              {page.credibilityPhotos[0] ? (
                <div {...revealStep(2)} className="lg:col-span-6">
                  <figure className="overflow-hidden bg-bone-100">
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/5]">
                      <Photo
                        photo={page.credibilityPhotos[0]}
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        fit="cover"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                      />
                    </div>
                  </figure>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>

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
