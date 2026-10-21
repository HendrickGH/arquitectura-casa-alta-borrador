import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { CredibilityGallery } from "@/components/organisms/CredibilityGallery";
import { ManifestoLine } from "@/components/organisms/ManifestoLine";
import { PageHero } from "@/components/organisms/PageHero";
import { SpecialtiesShowcase } from "@/components/organisms/SpecialtiesShowcase";
import { WhyCasaAltaEditorial } from "@/components/organisms/WhyCasaAltaEditorial";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  HomePage,
  Photo,
  SectionIntro,
  SiteConfig,
} from "@/types/content";

type SpecialtiesProps = React.ComponentProps<
  typeof SpecialtiesShowcase
>["sections"];
type PillarItems = React.ComponentProps<typeof WhyCasaAltaEditorial>["items"];

export interface ThematicPillarPageTemplateProps {
  site: SiteConfig;
  closing: HomePage["closing"];
  hero: {
    eyebrow: string;
    heading: string;
    subheadline: string;
    photo: Photo;
    catalogCtaLabel: string;
    consultationCtaLabel: string;
    /** Resolved WhatsApp URL with prefill. When absent, the consultation CTA is omitted. */
    whatsappHref?: string;
  };
  specialties: {
    id: string;
    eyebrow: string;
    heading: string;
    body: string;
    sections: SpecialtiesProps;
    deliverablesLabel: string;
    ctaLabel: string;
  };
  manifesto: { text: string; photo?: Photo };
  gallery: { id: string; intro: SectionIntro; photos: Photo[] };
  pillars: { id: string; intro: SectionIntro; items: PillarItems };
}

/**
 * Shared 6-layer page cadence for the thematic pillar pages
 * (`/arquitectura-interiores`, `/construccion-sustentable`):
 * hero with dual CTAs, specialties showcase, manifesto, ribbon gallery,
 * editorial pillars, and closing CTA.
 */
export function ThematicPillarPageTemplate({
  site,
  closing,
  hero,
  specialties,
  manifesto,
  gallery,
  pillars,
}: ThematicPillarPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* Layer 1: Hero with dual actions */}
        <PageHero
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          subheadline={hero.subheadline}
          photo={hero.photo}
          actions={
            <>
              <Button variant="inverse" href={`#${specialties.id}`} arrow>
                {hero.catalogCtaLabel}
              </Button>
              {hero.whatsappHref ? (
                <Button
                  variant="outline"
                  href={hero.whatsappHref}
                  external
                  arrow
                >
                  {hero.consultationCtaLabel}
                </Button>
              ) : null}
            </>
          }
        />

        {/* Layer 2: Specialties showcase */}
        <Section id={specialties.id} tone="canvas" density="default">
          <Container>
            <SectionHeading
              eyebrow={specialties.eyebrow}
              heading={specialties.heading}
              body={specialties.body}
            />
            <div className="mt-12 sm:mt-16">
              <SpecialtiesShowcase
                sections={specialties.sections}
                deliverablesLabel={specialties.deliverablesLabel}
                ctaLabel={specialties.ctaLabel}
                ctaHref={hero.whatsappHref}
              />
            </div>
          </Container>
        </Section>

        {/* Layer 3: Manifesto */}
        <ManifestoLine
          line={manifesto.text}
          architect={site.architect}
          photo={manifesto.photo}
        />

        {/* Layer 4: Ribbon gallery */}
        <CredibilityGallery
          id={gallery.id}
          intro={gallery.intro}
          photos={gallery.photos}
          tone="canvas"
        />

        {/* Layer 5: Editorial pillars */}
        <WhyCasaAltaEditorial
          id={pillars.id}
          intro={pillars.intro}
          items={pillars.items}
          tone="bone"
        />

        {/* Closing CTA */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
