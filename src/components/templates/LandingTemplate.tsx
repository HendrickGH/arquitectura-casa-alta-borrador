import { FeaturedPortfolio } from "@/components/organisms/FeaturedPortfolio";
import { Hero } from "@/components/organisms/Hero";
import { IntroSection } from "@/components/organisms/IntroSection";
import { StatsBand } from "@/components/organisms/StatsBand";
import { ServicesEditorialShowcase } from "@/components/organisms/ServicesEditorialShowcase";
import { ProcessBand } from "@/components/organisms/ProcessBand";
import { ArchitectQuote } from "@/components/organisms/ArchitectQuote";
import { ContactEditorial } from "@/components/organisms/ContactEditorial";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type {
  DivisionCard,
  HomePage,
  ProcessStep,
  Project,
  ServiceGroup,
  SiteConfig,
} from "@/types/content";

interface LandingTemplateProps {
  site: SiteConfig;
  home: HomePage;
  divisions: DivisionCard[];
  groups: ServiceGroup[];
  steps: ProcessStep[];
  /** The brief's four flagship projects. */
  featured: Project[];
  /** The projects the featured row did not take, continuing it. */
  remaining: Project[];
  /** Primary WhatsApp target, for the contact form's secondary action. */
  whatsappHref: string;
}

export function LandingTemplate({
  site,
  home,
  divisions,
  groups,
  steps,
  featured,
  remaining,
  whatsappHref,
}: LandingTemplateProps) {
  void divisions;
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* 01. Hero Carrusel de 3 slides seleccionados con títulos contenidos */}
        <Hero hero={home.hero} />

        {/* 02. Quiénes somos con texto literal del PDF del Lic. Gerardo y foto horizontal de Punta Zicatela */}
        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />

        {/* Cifras clave reducidas en escala discreta y elegante */}
        <StatsBand stats={home.stats} />

        {/* 03. Obras seleccionadas */}
        <FeaturedPortfolio
          id="proyectos"
          intro={home.projects}
          projects={featured}
          remaining={remaining}
          tone="bone"
          whatsappHref={whatsappHref}
        />

        {/* 04. Los 3 pilares de servicios solicitados (Arquitectura, Ingeniería y obra civil, Construcción sustentable) */}
        <ServicesEditorialShowcase groups={groups} id="servicios" />

        {/* 05. Bloque oscuro: De la primera conversación a la obra terminada */}
        <ProcessBand steps={steps} id="proceso" />

        {/* 06. Cita del Arquitecto Felipe Humberto Hernández Bejarano */}
        <ArchitectQuote
          quote={home.manifesto}
          architect={site.architect}
        />

        {/* 07. Contacto directo con teléfonos duales, redes y botón de acción */}
        <ContactEditorial
          phones={site.contact.filter((c) => c.href.startsWith("tel:"))}
          social={site.social}
          id="contacto"
        />
      </main>
    </SiteChrome>
  );
}
