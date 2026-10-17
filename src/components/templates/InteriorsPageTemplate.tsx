import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
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

const GALLERY_SIZES =
  "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * `/arquitectura-interiores` — Arquitectura de Interiores / Cosentino.
 *
 * Presents the studio's imported residential materials division ("Materiales de
 * importación para proyectos residenciales, instalación certificada y garantizada"),
 * the `arquitectura-interiores` gallery, and the real showroom lifestyle photo
 * session (`modelos-mujeres`).
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
          badge="DIVISIÓN 03 · COSENTINO"
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <Section
          tone="canvas"
          reveal="stagger"
          className="!pt-12 !pb-16 md:!pt-16 md:!pb-24"
        >
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-6">
                <div {...revealStep(0)} className="flex items-center gap-3">
                  <span className="number-pill">COSENTINO</span>
                  <p className="eyebrow">{page.cosentino.eyebrow}</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[22ch]">
                    {page.cosentino.heading}
                  </Heading>
                </div>

                <blockquote
                  {...revealStep(2)}
                  className="border-l-2 border-brand-800 bg-concha-nacar/60 p-5"
                >
                  <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                    &ldquo;{page.cosentino.claim}&rdquo;
                  </p>
                </blockquote>

                <div {...revealStep(3)} className="flex flex-col gap-4">
                  <Text className="text-ink-muted">{page.cosentino.body}</Text>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {page.cosentino.badges.map((badge) => (
                      <li
                        key={badge}
                        className="border border-bone-200 bg-bone-50 px-3 py-1 text-xs font-medium text-brand-900"
                      >
                        {badge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div {...revealStep(4)} className="mt-2">
                  <Button href="/contacto" arrow>
                    Cotizar proyecto de interiorismo y cocinas
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                {page.cosentino.pillars.map((pillar, index) => (
                  <div
                    key={pillar.number}
                    {...revealStep(index)}
                    className="ruler-top flex flex-col justify-between border border-bone-200 bg-bone-50 p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="number-pill">{pillar.number}</span>
                      <span className="label text-brand-800">GARANTIZADO</span>
                    </div>
                    <div className="mt-6">
                      <h3 className="voice text-xl leading-snug text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="bone" reveal="stagger">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={page.interiorsGalleryIntro.eyebrow}
                heading={page.interiorsGalleryIntro.heading}
                body={page.interiorsGalleryIntro.body}
              />
              <span className="number-pill self-start lg:self-auto">
                {`${String(page.interiorsPhotos.length).padStart(2, "0")} OBRAS`}
              </span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {page.interiorsPhotos.map((photo, index) => (
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

        <Section tone="canvas" reveal="stagger">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={page.lifestyleIntro.eyebrow}
                heading={page.lifestyleIntro.heading}
                body={page.lifestyleIntro.body}
              />
              <span className="number-pill self-start lg:self-auto">
                SHOWROOM · CASA ALTA
              </span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {page.lifestylePhotos.map((photo, index) => (
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

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
