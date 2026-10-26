import { ThematicPillarPageTemplate } from "@/components/templates/ThematicPillarPageTemplate";
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
    <ThematicPillarPageTemplate
      site={site}
      closing={closing}
      hero={{
        eyebrow: page.hero.eyebrow,
        heading: page.hero.heading,
        subheadline: page.hero.subheadline,
        photo: page.hero.photo,
        catalogCtaLabel:
          page.hero.catalogCtaLabel ?? "Explorar catálogo de materiales",
        consultationCtaLabel:
          page.hero.consultationCtaLabel ?? "Agendar asesoría gratuita",
        whatsappHref: heroWhatsappHref,
      }}
      specialties={{
        id: "materiales",
        eyebrow: page.materials.eyebrow,
        heading: page.materials.heading,
        body: page.materials.body,
        sections: page.materials.sections,
        deliverablesLabel: "Propiedades y tolerancias técnicas:",
        ctaLabel: "Consultar especificación en taller",
      }}
      gallery={{
        id: "espacios",
        intro: page.gallery.intro,
        photos: page.gallery.photos,
      }}
      pillars={{
        id: "garantia-dro",
        intro: page.engineering.intro,
        items: page.engineering.items,
      }}
    />
  );
}
