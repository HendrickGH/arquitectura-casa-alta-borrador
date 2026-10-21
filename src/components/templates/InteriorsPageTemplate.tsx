import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { InteriorsSurfacesExperience } from "@/components/organisms/InteriorsSurfacesExperience";
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
  whatsappHref: string;
}

const GALLERY_SIZES =
  "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * `/arquitectura-interiores` — Arquitectura de Interiores y Acabados de Alta Gama.
 *
 * Presents:
 * - 100vw × 100vh Full Bleed Hero with transparent header.
 * - Architectural space tabs and clean-ground cards.
 * - Certified technical guarantee and installation pillars.
 * - Photographic galleries of interior architecture and residential lifestyle.
 */
export function InteriorsPageTemplate({
  site,
  page,
  closing,
  whatsappHref,
}: InteriorsPageTemplateProps) {
  // Deduplicate lower gallery photographs against Space Explorer cards and hero photo
  const featuredSources = new Set(
    page.inspiration.spaces.map((card) => card.photo.src),
  );
  if (page.hero.photo?.src) {
    featuredSources.add(page.hero.photo.src);
  }

  const galleryInteriorsPhotos = page.interiorsPhotos.filter(
    (photo) => !featuredSources.has(photo.src),
  );

  const galleryLifestylePhotos = page.lifestylePhotos.filter(
    (photo) => !featuredSources.has(photo.src),
  );

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <InteriorsSurfacesExperience
          inspiration={page.inspiration}
          surfaces={page.surfaces}
          whatsappHref={whatsappHref}
        />

        {galleryInteriorsPhotos.length > 0 ? (
          <Section tone="canvas" reveal="stagger">
            <Container>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <SectionHeading
                  eyebrow={page.interiorsGalleryIntro.eyebrow}
                  heading={page.interiorsGalleryIntro.heading}
                  body={page.interiorsGalleryIntro.body}
                />
                <span className="label self-start tabular-nums text-ink-muted lg:self-auto">
                  {`${String(galleryInteriorsPhotos.length).padStart(2, "0")} REGISTROS`}
                </span>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
                {galleryInteriorsPhotos.map((photo, index) => (
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

        {galleryLifestylePhotos.length > 0 ? (
          <Section tone="bone" reveal="stagger">
            <Container>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <SectionHeading
                  eyebrow={page.lifestyleIntro.eyebrow}
                  heading={page.lifestyleIntro.heading}
                  body={page.lifestyleIntro.body}
                />
                <span className="label self-start tabular-nums text-ink-muted lg:self-auto">
                  {`${String(galleryLifestylePhotos.length).padStart(2, "0")} ESPACIOS`}
                </span>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
                {galleryLifestylePhotos.map((photo, index) => (
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
