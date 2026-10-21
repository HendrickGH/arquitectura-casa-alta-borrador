import { Button } from "@/components/atoms/Button";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { InteriorsQuickEstimator } from "@/components/organisms/InteriorsQuickEstimator";
import { InteriorsSurfacesExperience } from "@/components/organisms/InteriorsSurfacesExperience";
import { MaterialFinishesMatrix } from "@/components/organisms/MaterialFinishesMatrix";
import { PageHero } from "@/components/organisms/PageHero";
import { ShowroomLifestyleStory } from "@/components/organisms/ShowroomLifestyleStory";
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
 * Implements the approved 6-layer editorial & conversion architecture:
 * Layer 1: PageHero (bg-ink) with Dual CTAs (#espacios and free consultation)
 * Layer 2: MaterialFinishesMatrix (tone="canvas") — tactile stone, wood, and mineral samples
 * Layer 3: Space Explorer with SpaceDossierModal (tone="bone") — zero orphan figures
 * Layer 4: Engineering DRO Guarantee (tone="canvas") — technical precision & warranty
 * Layer 5: ShowroomLifestyleStory (tone="bone") — curated diptych scenes from showroom
 * Layer 6: InteriorsQuickEstimator (tone="canvas") — 3-step assistant & free consultation guarantee
 * Closing: ClosingCTA (tone="bone")
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
              <Button variant="inverse" href="#espacios" arrow>
                {page.hero.catalogCtaLabel ?? "Explorar espacios y acabados"}
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

        {/* Layer 2: Matriz Táctil de Materialidad y Resistencia Bioclimática */}
        <MaterialFinishesMatrix
          eyebrow={page.materialsMatrix.eyebrow}
          heading={page.materialsMatrix.heading}
          body={page.materialsMatrix.body}
          materials={page.materialsMatrix.materials}
          whatsappHref={whatsappHref}
        />

        {/* Layers 3 & 4: Explorador de Espacios con Dossier Modal & Garantía DRO */}
        <InteriorsSurfacesExperience
          inspiration={page.inspiration}
          engineeringGuarantee={page.engineeringGuarantee}
          surfaces={page.surfaces}
          whatsappHref={whatsappHref}
        />

        {/* Layer 5: Monografía Editorial "El Showroom Habitado" */}
        <ShowroomLifestyleStory
          eyebrow={page.showroomStory.eyebrow}
          heading={page.showroomStory.heading}
          body={page.showroomStory.body}
          scenes={page.showroomStory.scenes}
        />

        {/* Layer 6: Pre-cotizador Interactivo en 3 Pasos & Asesoría sin Costo */}
        <InteriorsQuickEstimator
          estimator={page.estimator}
          whatsappHref={whatsappHref}
        />

        {/* Closing CTA */}
        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
