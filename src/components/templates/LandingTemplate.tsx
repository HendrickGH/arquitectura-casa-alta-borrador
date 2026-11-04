import { Hero } from "@/components/organisms/Hero";
import { IntroSection } from "@/components/organisms/IntroSection";
import { TerritoryShowcase } from "@/components/organisms/TerritoryShowcase";
import { VirtualTourSection } from "@/components/organisms/VirtualTourSection";
import { StatsBand } from "@/components/organisms/StatsBand";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ArchitectQuote } from "@/components/organisms/ArchitectQuote";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
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
  void groups;
  void featured;
  void remaining;
  void whatsappHref;

  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* 01. Hero Carrusel de slides con "Casa Alta" y eslogan "Arquitectura que perdura" */}
        <Hero hero={home.hero} />

        {/* 02. Quiénes somos: Despacho y estudio de arquitectura (40px) */}
        <IntroSection id="nosotros" intro={home.intro} tone="canvas" />

        {/* Cifras clave reducidas en escala discreta y elegante */}
        <StatsBand stats={home.stats} />

        {/* 03. Sección Arquitectura COSTA NATURA: "El nuevo lujo no se ve, se siente" */}
        {home.territoryShowcase || home.intro.photo ? (
          <TerritoryShowcase
            id="arquitectura-costa-natura"
            showcase={home.territoryShowcase}
            photo={home.intro.photo}
            tone="bone"
          />
        ) : null}

        {/* 04. Cita del Arquitecto Felipe Humberto Hernández Bejarano */}
        <ArchitectQuote
          quote={home.manifesto}
          architect={site.architect}
        />

        {/* 05. Recorrido virtual guiado ("Charco Seco") con botón a Servicios */}
        <VirtualTourSection tour={home.virtualTour} tone="canvas" />

        {/* 06. Metodología Casa Alta: Proceso secuencial con split-screen anclado */}
        <ProcessList
          intro={home.process}
          steps={steps}
          tone="bone"
          id="proceso"
        />

        {/* 07. Cierre monumental (150vh) con imagen arquitectónica destacada y llamada a la acción */}
        <ClosingCTA closing={home.closing} isLanding />
      </main>
    </SiteChrome>
  );
}
