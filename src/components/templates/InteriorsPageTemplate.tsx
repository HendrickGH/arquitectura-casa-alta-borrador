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
  InteriorsPageContent,
  SiteConfig,
} from "@/types/content";

interface InteriorsPageTemplateProps {
  site: SiteConfig;
  page: InteriorsPageContent;
  closing: HomePage["closing"];
  whatsappHref: string;
}

/**
 * `/arquitectura-interiores` — Arquitectura de Interiores y Acabados de Alta Gama.
 *
 * Implements the canonical Cosentino Architectural Editorial contract:
 * - Layer 1: PageHero (bg-ink) with Dual CTAs (#materiales and WhatsApp consultation)
 * - Layer 2: SpecialtiesShowcase (tone="canvas") — 4 tactile materials with zero-CLS hover expansion
 * - Layer 3: ManifestoLine (bg-concha-nacar) — signature architect quote and portrait
 * - Layer 4: FeaturedPortfolio (tone="canvas") — dynamic 2-3 row cadence of executed interior works
 * - Layer 5: WhyCasaAltaEditorial (tone="bone") — 4 DRO engineering & craftsmanship pillars with harmonic overlap
 * - Closing: ClosingCTA (bg-concha-nacar)
 */
export function InteriorsPageTemplate({
  site,
  page,
  closing,
  whatsappHref,
}: InteriorsPageTemplateProps) {
  const heroWhatsappHref = `${whatsappHref.split("?")[0]}?text=${encodeURIComponent(
    "Hola Casa Alta, me interesa agendar una asesoría técnica gratuita para mi proyecto de arquitectura de interiores.",
  )}`;

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* Layer 1: Hero Editorial de Autor con Acciones Duales */}
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
          actions={
            <>
              <Button variant="inverse" href="#materiales" arrow>
                {page.hero.catalogCtaLabel ?? "Explorar catálogo de materiales"}
              </Button>
              <Button
                variant="outline"
                href={heroWhatsappHref}
                external
                arrow
              >
                {page.hero.consultationCtaLabel ?? "Agendar asesoría gratuita"}
              </Button>
            </>
          }
        />

        {/* Layer 2: Catálogo de Materialidad y Superficies Nobles (SpecialtiesShowcase) */}
        <Section id="materiales" tone="canvas" density="default">
          <Container>
            <SectionHeading
              eyebrow={page.materials.eyebrow}
              heading={page.materials.heading}
              body={page.materials.body}
            />
            <div className="mt-12 sm:mt-16">
              <SpecialtiesShowcase
                sections={page.materials.sections}
                deliverablesLabel="Propiedades y tolerancias técnicas:"
                ctaLabel="Consultar especificación en taller"
                ctaHref={heroWhatsappHref}
              />
            </div>
          </Container>
        </Section>

        {/* Layer 3: Manifiesto de Arquitectura de Interiores (ManifestoLine) */}
        <ManifestoLine
          line={page.manifesto.text}
          architect={site.architect}
          photo={page.manifesto.photo}
        />

        {/* Layer 4: Dossier Fotográfico en Doble Cinta (CredibilityGallery) */}
        <CredibilityGallery
          id="espacios"
          intro={page.gallery.intro}
          photos={page.gallery.photos}
          tone="canvas"
        />

        {/* Layer 5: Ingeniería de Detalle y Respaldo DRO (WhyCasaAltaEditorial) */}
        <WhyCasaAltaEditorial
          id="garantia-dro"
          intro={page.engineering.intro}
          items={page.engineering.items}
          tone="bone"
        />

        {/* Closing CTA */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
