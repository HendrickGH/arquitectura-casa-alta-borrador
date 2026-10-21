import { ContactForm } from "@/components/organisms/ContactForm";
import { ContactLocationStage } from "@/components/organisms/ContactLocationStage";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type { ContactPageContent, SiteConfig } from "@/types/content";

export interface ContactPageTemplateProps {
  site: SiteConfig;
  page: ContactPageContent;
  whatsappHref: string;
}

/**
 * `/contacto` — Comprehensive 3-Section Architectural Contact Experience:
 *
 * 1. Section 1: PageHero (100vh / 100svh) — Canonical full-bleed dark hero
 *    with authentic office/gabinete photography (`proyectos-integrales/03-...`).
 * 2. Section 2: ContactForm — Tactile surface (`tone="bone"`), consultation checklist,
 *    specialty, locality, budget, and timeframe chip selectors, dedicated authentic
 *    photography (`proyectos-integrales/01-...`), and seamless EmailJS / WhatsApp integration.
 * 3. Section 3: Monumental Direct Contact & Maps Stage (150svh) — El Bicho Score 5★
 *    with continuous GSAP parallax scrub, dark gradient scrim, Google Maps iframe embed,
 *    direct telephone lines with technical roles, and operating hours.
 */
export function ContactPageTemplate({
  site,
  page,
  whatsappHref,
}: ContactPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas" disableContactModal>
      <main id="main">
        {/* Section 1: PageHero (100vh / 100svh) */}
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        {/* Section 2: ContactForm (Formulario de Contacto en Superficie Clara) */}
        <ContactForm
          id="formulario-contacto"
          tone="canvas"
          contact={page.contactForm}
          whatsappHref={whatsappHref}
          showSidebar={false}
        />

        {/* Section 3: Monumental Direct Contact & Maps Stage (150svh) */}
        <ContactLocationStage page={page} whatsappHref={whatsappHref} />
      </main>
    </SiteChrome>
  );
}
