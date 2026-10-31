import { ThematicPillarPageTemplate } from "@/components/templates/ThematicPillarPageTemplate";
import type {
  CivilWorksPageContent,
  HomePage,
  SiteConfig,
} from "@/types/content";

interface CivilWorksPageTemplateProps {
  site: SiteConfig;
  page: CivilWorksPageContent;
  closing: HomePage["closing"];
  whatsappHref: string;
}

/**
 * `/obra-civil` — Infraestructura Pesada, Puentes y Prefabricados de Concreto.
 *
 * Implements the canonical Cosentino Architectural Editorial contract:
 * - Layer 1: PageHero (bg-ink) with Dual CTAs (#especialidades and WhatsApp consultation)
 * - Layer 2: SpecialtiesShowcase (tone="canvas") — 4 heavy civil specialties with zero-CLS hover expansion
 * - Layer 3: ManifestoLine (bg-concha-nacar) — signature engineering quote and portrait
 * - Layer 4: CredibilityGallery (tone="canvas") — dynamic ribbon of 5-star heavy civil & infrastructure records
 * - Layer 5: WhyCasaAltaEditorial (tone="bone") — 4 structural rigor & DRO engineering pillars with harmonic overlap
 * - Closing: ClosingCTA (bg-concha-nacar)
 */
export function CivilWorksPageTemplate({
  site,
  page,
  closing,
  whatsappHref,
}: CivilWorksPageTemplateProps) {
  const heroWhatsappHref =
    whatsappHref && page.hero.consultationCtaLabel
      ? `${whatsappHref.split("?")[0]}?text=${encodeURIComponent(
          "Hola Casa Alta, me interesa cotizar un proyecto de ingeniería civil y obra pesada.",
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
        catalogCtaLabel: page.hero.catalogCtaLabel,
        consultationCtaLabel: page.hero.consultationCtaLabel,
        whatsappHref: heroWhatsappHref,
      }}
      specialties={{
        id: "especialidades",
        eyebrow: page.specialties.eyebrow,
        heading: page.specialties.heading,
        body: page.specialties.body,
        sections: page.specialties.sections,
        deliverablesLabel: "Capacidad de maniobra y especificaciones técnicas:",
        ctaLabel: "Solicitar cotización técnica",
      }}
      manifesto={page.manifesto}
      gallery={{
        id: "infraestructura",
        intro: page.gallery.intro,
        photos: page.gallery.photos,
      }}
      pillars={{
        id: "respaldo-tecnico",
        intro: page.engineering.intro,
        items: page.engineering.items,
      }}
    />
  );
}
