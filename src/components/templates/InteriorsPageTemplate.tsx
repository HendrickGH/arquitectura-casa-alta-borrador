import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CosentinoInspirationExperience } from "@/components/organisms/CosentinoInspirationExperience";
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
 * Presents:
 * - 100vw × 100vh Full Bleed Hero with transparent header.
 * - Cosentino-inspired space tabs and clean-ground cards.
 * - Certified technical guarantee and installation pillars.
 * - Photographic galleries of interior architecture and residential lifestyle.
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
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <CosentinoInspirationExperience
          inspiration={page.inspiration}
          cosentino={page.cosentino}
        />

        {page.interiorsPhotos.length > 0 ? (
          <Section tone="canvas" reveal="stagger">
            <Container>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <SectionHeading
                  eyebrow={page.interiorsGalleryIntro.eyebrow}
                  heading={page.interiorsGalleryIntro.heading}
                  body={page.interiorsGalleryIntro.body}
                />
                <span className="label self-start tabular-nums text-ink-muted lg:self-auto">
                  {`${String(page.interiorsPhotos.length).padStart(2, "0")} REGISTROS`}
                </span>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
                {page.interiorsPhotos.map((photo, index) => (
                  <figure
                    key={photo.src}
                    {...revealStep(index)}
                    className="overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                      <Photo photo={photo} sizes={GALLERY_SIZES} />
                    </div>
                  </figure>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {page.lifestylePhotos.length > 0 ? (
          <Section tone="bone" reveal="stagger">
            <Container>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <SectionHeading
                  eyebrow={page.lifestyleIntro.eyebrow}
                  heading={page.lifestyleIntro.heading}
                  body={page.lifestyleIntro.body}
                />
                <span className="label self-start tabular-nums text-ink-muted lg:self-auto">
                  {`${String(page.lifestylePhotos.length).padStart(2, "0")} ESPACIOS`}
                </span>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
                {page.lifestylePhotos.map((photo, index) => (
                  <figure
                    key={photo.src}
                    {...revealStep(index)}
                    className="overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                      <Photo photo={photo} sizes={GALLERY_SIZES} />
                    </div>
                  </figure>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
