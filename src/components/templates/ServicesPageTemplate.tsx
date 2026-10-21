import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { ContactForm } from "@/components/organisms/ContactForm";
import { EditorialSplitSection } from "@/components/organisms/EditorialSplitSection";
import { PageHero } from "@/components/organisms/PageHero";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { SpecialtiesShowcase } from "@/components/organisms/SpecialtiesShowcase";
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
 * Showcases the studio's four field execution specialties (`proyectos-integrales`,
 * `obra-civil`, `naves-industriales`, `remodelacion`), the complete 13-service
 * technical catalog (`ServicesIndex`).
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
        />

        <EditorialSplitSection
          variant="compact"
          eyebrow={page.intro.eyebrow}
          heading={page.intro.heading}
          paragraphs={page.intro.paragraphs ?? [page.intro.body]}
          photo={page.intro.photo}
          photoCaption={page.intro.photoCaption}
        />

        <Section id="especialidades" tone="bone" reveal="stagger">
          <Container>
            <SectionHeading
              eyebrow={page.specialties.eyebrow}
              heading={page.specialties.heading}
              body={page.specialties.body}
            />

            <div className="mt-12 md:mt-16">
              <SpecialtiesShowcase
                sections={page.specialties.sections}
                deliverablesLabel={page.specialties.deliverablesLabel}
                ctaLabel={page.specialties.ctaLabel}
                ctaHref={page.specialties.ctaHref}
              />
            </div>
          </Container>
        </Section>

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
          tone="canvas"
          showSidebar={false}
        />

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
