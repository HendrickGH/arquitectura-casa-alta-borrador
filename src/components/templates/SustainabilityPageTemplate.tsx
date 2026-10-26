import { ThematicPillarPageTemplate } from "@/components/templates/ThematicPillarPageTemplate";
import type {
  HomePage,
  SustainabilityPageContent,
  SiteConfig,
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
    <ThematicPillarPageTemplate
      site={site}
      closing={closing}
      hero={{
        eyebrow: page.hero.eyebrow,
        heading: page.hero.heading,
        subheadline: page.hero.subheadline,
        photo: page.hero.photo,
        catalogCtaLabel:
          page.hero.catalogCtaLabel ?? "Explorar pilares bioclimáticos",
        consultationCtaLabel:
          page.hero.consultationCtaLabel ?? "Planear proyecto bioclimático",
        whatsappHref: heroWhatsappHref,
      }}
      specialties={{
        id: "pilares",
        eyebrow: page.pillars.eyebrow,
        heading: page.pillars.heading,
        body: page.pillars.body,
        sections: page.pillars.sections,
        deliverablesLabel: "Estrategias y especificaciones técnicas:",
        ctaLabel: "Consultar viabilidad de terreno",
      }}
      gallery={{
        id: "galeria",
        intro: page.gallery.intro,
        photos: page.gallery.photos,
      }}
      pillars={{
        id: "estrategias",
        intro: page.strategies.intro,
        items: page.strategies.items,
      }}
    />
  );
}
