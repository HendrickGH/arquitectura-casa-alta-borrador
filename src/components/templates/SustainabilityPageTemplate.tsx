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
  SiteConfig,
  SustainabilityPageContent,
} from "@/types/content";

interface SustainabilityPageTemplateProps {
  site: SiteConfig;
  page: SustainabilityPageContent;
  closing: HomePage["closing"];
  whatsappHref?: string;
}

/**
 * `/construccion-sustentable` — Arquitectura Sostenible y Bioclimática.
 *
 * Implements the canonical Cosentino Architectural Editorial contract:
 * - Layer 1: PageHero (bg-ink) with Dual CTAs (#pilares and WhatsApp consultation)
 * - Layer 2: SpecialtiesShowcase (tone="canvas") — 4 bioclimatic pillars with zero-CLS hover expansion
 * - Layer 3: ManifestoLine (bg-concha-nacar) — client's verbatim tropical architecture statement
 * - Layer 4: CredibilityGallery (tone="canvas") — dual-row continuous ribbon of bioclimatic & durable records
 * - Layer 5: WhyCasaAltaEditorial (tone="bone") — 4 field construction strategies in the tropics with harmonic overlap
 * - Closing: ClosingCTA (bg-concha-nacar)
 */
export function SustainabilityPageTemplate({
  site,
  page,
  closing,
  whatsappHref,
}: SustainabilityPageTemplateProps) {
  const heroWhatsappHref = whatsappHref
    ? `${whatsappHref.split("?")[0]}?text=${encodeURIComponent(
        "Hola Casa Alta, me interesa planear un proyecto de arquitectura bioclimática y construcción sustentable.",
      )}`
    : undefined;

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
              <Button variant="inverse" href="#pilares" arrow>
                {page.hero.catalogCtaLabel ?? "Explorar pilares bioclimáticos"}
              </Button>
              {heroWhatsappHref ? (
                <Button
                  variant="outline"
                  href={heroWhatsappHref}
                  external
                  arrow
                >
                  {page.hero.consultationCtaLabel ?? "Planear proyecto bioclimático"}
                </Button>
              ) : null}
            </>
          }
        />

        {/* Layer 2: Pilares de Ingeniería Bioclimática (SpecialtiesShowcase) */}
        <Section id="pilares" tone="canvas" density="default">
          <Container>
            <SectionHeading
              eyebrow={page.pillars.eyebrow}
              heading={page.pillars.heading}
              body={page.pillars.body}
            />
            <div className="mt-12 sm:mt-16">
              <SpecialtiesShowcase
                sections={page.pillars.sections}
                deliverablesLabel="Estrategias y especificaciones técnicas:"
                ctaLabel="Consultar viabilidad de terreno"
                ctaHref={heroWhatsappHref}
              />
            </div>
          </Container>
        </Section>

        {/* Layer 3: Manifiesto Bioclimático en Concha-Nácar (ManifestoLine) */}
        <ManifestoLine
          line={page.manifesto.text}
          architect={site.architect}
          photo={page.manifesto.photo}
        />

        {/* Layer 4: Registro Continuo de Obra en Doble Cinta (CredibilityGallery) */}
        <CredibilityGallery
          id="galeria"
          intro={page.gallery.intro}
          photos={page.gallery.photos}
          tone="canvas"
        />

        {/* Layer 5: Estrategias Constructivas en el Trópico (WhyCasaAltaEditorial) */}
        <WhyCasaAltaEditorial
          id="estrategias"
          intro={page.strategies.intro}
          items={page.strategies.items}
          tone="bone"
        />

        {/* Closing CTA */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
