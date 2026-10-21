import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PageHero } from "@/components/organisms/PageHero";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
import { SpecialtiesShowcase } from "@/components/organisms/SpecialtiesShowcase";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
import type {
  HomePage,
  ProcessStep,
  SectionIntro,
  ServiceGroup,
  ServicesPageContent,
  SiteConfig,
} from "@/types/content";

interface ServicesPageTemplateProps {
  site: SiteConfig;
  page: ServicesPageContent;
  groups: ServiceGroup[];
  processIntro?: SectionIntro;
  steps?: ProcessStep[];
  closing: HomePage["closing"];
  contact: HomePage["contact"];
  whatsappHref: string;
}

/**
 * `/servicios` — Ingeniería, Proyectos Ejecutivos y Construcción.
 *
 * Showcases the studio's four field execution specialties (`proyectos-integrales`,
 * `obra-civil`, `naves-industriales`, `remodelacion`), the complete 13-service
 * technical catalog (`ServicesIndex`), and the 7-step methodology (`ProcessList`).
 */
export function ServicesPageTemplate({
  site,
  page,
  groups,
  processIntro,
  steps,
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

        <Section tone="canvas" density="compact" reveal="stagger">
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div {...revealStep(0)}>
                  <p className="eyebrow">{page.intro.eyebrow}</p>
                </div>
                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[24ch]">
                    {page.intro.heading}
                  </Heading>
                </div>
                <div {...revealStep(2)} className="mt-2 flex flex-col gap-4">
                  {(page.intro.paragraphs ?? [page.intro.body]).map(
                    (paragraph, index) => (
                      <Text
                        key={paragraph}
                        size={index === 0 ? "lede" : undefined}
                        className={index === 0 ? "text-ink" : "text-ink-muted"}
                      >
                        {paragraph}
                      </Text>
                    ),
                  )}
                </div>
              </div>

              {page.intro.photo ? (
                <div {...revealStep(2)} className="lg:col-span-5">
                  <figure className="overflow-hidden">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                      <Photo
                        photo={page.intro.photo}
                        sizes="(min-width: 1024px) 40vw, 95vw"
                      />
                    </div>
                    {page.intro.photoCaption ? (
                      <figcaption className="mt-3 text-xs text-ink-muted">
                        {page.intro.photoCaption}
                      </figcaption>
                    ) : null}
                  </figure>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>

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

        {processIntro && steps ? (
          <ProcessList
            id="proceso"
            intro={processIntro}
            steps={steps}
            tone="bone"
          />
        ) : null}

        <ContactForm
          id="contacto"
          contact={contact}
          whatsappHref={whatsappHref}
          tone="canvas"
        />

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
