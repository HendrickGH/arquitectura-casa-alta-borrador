import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { Differentiators } from "@/components/organisms/Differentiators";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { PageHero } from "@/components/organisms/PageHero";
import { ProcessList } from "@/components/organisms/ProcessList";
import { StatsBand } from "@/components/organisms/StatsBand";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
import type {
  AboutPageContent,
  Differentiator,
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
  manifesto: string;
  processIntro: SectionIntro;
  steps: ProcessStep[];
  differentiatorsIntro: SectionIntro;
  differentiators: Differentiator[];
  closing: HomePage["closing"];
}

const GALLERY_SIZES =
  "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * `/nosotros` — Quiénes Somos, Credibilidad en Obra y Cómo Trabajamos.
 *
 * Combines the studio's institutional story, Mission & Vision, the Architect's
 * philosophy quote, the `credibilidad` supervision & uniform photo set (with
 * CASA ALTA shirts/helmets in active sites), the 7-step methodology, and the
 * `arquitectura-que-perdura` structural archive.
 */
export function AboutPageTemplate({
  site,
  page,
  stats,
  manifesto,
  processIntro,
  steps,
  differentiatorsIntro,
  differentiators,
  closing,
}: AboutPageTemplateProps) {
  return (
    <SiteChrome site={site}>
      <main id="main">
        <PageHero
          badge="(NOSOTROS · CASA ALTA)"
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <StatsBand stats={stats} />

        <Section
          tone="canvas"
          reveal="stagger"
          className="!pt-14 !pb-16 md:!pt-20 md:!pb-24"
        >
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-7">
                <div {...revealStep(0)} className="flex items-center gap-3">
                  <span className="number-pill">(HISTORIA)</span>
                  <p className="eyebrow">{page.story.eyebrow}</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[24ch]">
                    {page.story.heading}
                  </Heading>
                </div>

                <div {...revealStep(2)} className="flex flex-col gap-4">
                  {page.story.paragraphs.map((paragraph, index) => (
                    <Text
                      key={paragraph}
                      size={index === 0 ? "lede" : undefined}
                      className={index === 0 ? "text-ink" : "text-ink-muted"}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </div>

                {page.credibilityPhotos[0] ? (
                  <div
                    {...revealStep(3)}
                    className="mt-2 overflow-hidden border border-ink/15 bg-concha-nacar p-3"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-100">
                      <Photo
                        photo={page.credibilityPhotos[0]}
                        sizes="(min-width: 1024px) 50vw, 95vw"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-5 lg:col-span-5">
                <div
                  {...revealStep(2)}
                  className="ruler-top border border-ink/15 bg-concha-nacar p-6 md:p-8"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="label text-brand-800">Misión</span>
                    <span className="number-pill">(01)</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    {page.story.mission}
                  </p>
                </div>

                <div
                  {...revealStep(3)}
                  className="ruler-top border border-ink/15 bg-concha-nacar p-6 md:p-8"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="label text-brand-800">Visión</span>
                    <span className="number-pill">(02)</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    {page.story.vision}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <ManifestoLine
          line={manifesto}
          architect={site.architect}
          photo={page.enduringPhotos[0]}
        />

        <Section tone="canvas" reveal="stagger">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={page.credibilityIntro.eyebrow}
                heading={page.credibilityIntro.heading}
                body={page.credibilityIntro.body}
              />
              <span className="number-pill self-start lg:self-auto">
                SUPERVISIÓN DIRECTA EN CAMPO
              </span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.credibilityHighlights.map((item, idx) => (
                <div
                  key={item.number}
                  {...revealStep(idx)}
                  className="ruler-top border border-bone-200 bg-bone-50 p-6"
                >
                  <span className="number-pill">{item.number}</span>
                  <h3 className="voice mt-5 text-lg leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {page.credibilityPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  {...revealStep(index)}
                  className="overflow-hidden border border-bone-200 bg-bone-50"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                    <Photo photo={photo} sizes={GALLERY_SIZES} />
                  </div>
                </figure>
              ))}
            </div>
          </Container>
        </Section>

        <ProcessList
          id="proceso"
          intro={processIntro}
          steps={steps}
          tone="bone"
        />

        <Differentiators
          intro={differentiatorsIntro}
          items={differentiators}
          tone="canvas"
        />

        <Section tone="bone" reveal="stagger">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={page.enduringIntro.eyebrow}
                heading={page.enduringIntro.heading}
                body={page.enduringIntro.body}
              />
              <span className="number-pill self-start lg:self-auto">
                ESTRUCTURA Y PERMANENCIA
              </span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-4">
              {page.enduringPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  {...revealStep(index)}
                  className="overflow-hidden border border-bone-200 bg-canvas"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                    <Photo photo={photo} sizes={GALLERY_SIZES} />
                  </div>
                </figure>
              ))}
            </div>
          </Container>
        </Section>

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
