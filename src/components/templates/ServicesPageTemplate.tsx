import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PageHero } from "@/components/organisms/PageHero";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  HomePage,
  ServiceGroup,
  ServicesPageContent,
  SiteConfig,
} from "@/types/content";

interface ServicesPageTemplateProps {
  site: SiteConfig;
  page: ServicesPageContent;
  groups: ServiceGroup[];
  closing: HomePage["closing"];
  contact: HomePage["contact"];
  whatsappHref: string;
}

/**
 * `/servicios` — Ingeniería, Proyectos Ejecutivos y Construcción.
 *
 * Catálogo integral homologado en la sección de alcances por etapa de proyecto y construcción:
 * - PageHero: carrusel con fotos de obra civil/ingeniería y título proporcionado.
 * - ServicesIndex: select arquitectónico (default: "Todos nuestros servicios") y cuadrícula
 *   monográfica de partidas con modal de entregables detallados.
 * - ContactForm: consulta y cotización directa con residencia técnica.
 * - ClosingCTA: cierre institucional Casa Alta.
 */
export function ServicesPageTemplate({
  site,
  page,
  groups,
  closing,
  contact,
  whatsappHref,
}: ServicesPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
          photos={page.hero.photos}
          headingClassName="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12]"
        />

        <ServicesIndex
          id="catalogo-servicios"
          intro={page.catalog}
          groups={groups}
          tone="canvas"
          whatsappHref={whatsappHref}
        />

        <ContactForm
          id="contacto"
          contact={contact}
          whatsappHref={whatsappHref}
          tone="bone"
          showSidebar={false}
        />

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
