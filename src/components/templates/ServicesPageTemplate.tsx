import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { ProcessList } from "@/components/organisms/ProcessList";
import { ServicesIndex } from "@/components/organisms/ServicesIndex";
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
  processIntro: SectionIntro;
  steps: ProcessStep[];
  closing: HomePage["closing"];
}

const SPECIALTY_PHOTO_SIZES =
  "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

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
}: ServicesPageTemplateProps) {
  return (
    <SiteChrome site={site}>
      <main id="main">
        <PageHero
          badge="(DIVISIÓN 02)"
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <Section
          tone="canvas"
          reveal="stagger"
          className="!pt-12 !pb-16 md:!pt-16 md:!pb-20"
        >
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div {...revealStep(0)} className="flex items-center gap-2.5">
                  <span className="number-pill">(01)</span>
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

              <div {...revealStep(2)} className="lg:col-span-5">
                <div className="overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Photo
                      photo={{
                        src: "/images/proyectos-integrales/01-arquitectos-revisando-planos-estructurales-mesa-madera.avif",
                        alt: "Arquitectos e ingenieros de Casa Alta revisando planos ejecutivos y cálculo estructural",
                        width: 960,
                        height: 1280,
                      }}
                      sizes="(min-width: 1024px) 40vw, 95vw"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 text-xs text-ink-muted">
                    <span>Ingeniería y proyecto ejecutivo en gabinete</span>
                    <span className="number-pill">(CÁLCULO)</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="bone" reveal="stagger">
          <Container>
            <SectionHeading
              eyebrow={page.specialties.eyebrow}
              heading={page.specialties.heading}
              body={page.specialties.body}
            />

            <div className="mt-14 flex flex-col gap-16 md:gap-24">
              {page.specialties.sections.map((specialty, sIdx) => (
                <article
                  key={specialty.slug}
                  id={specialty.slug}
                  {...revealStep(sIdx)}
                  className="ruler-top pt-10"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="flex flex-col gap-4 lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="number-pill">{specialty.number}</span>
                        <span className="label text-brand-800">
                          {specialty.subtitle}
                        </span>
                      </div>

                      <Heading
                        as="h3"
                        voice="serif"
                        sizeClassName="text-[1.6rem] leading-[1.15] md:text-[2rem]"
                      >
                        {specialty.title}
                      </Heading>

                      <Text className="text-ink-muted">
                        {specialty.description}
                      </Text>

                      <ul className="mt-2 flex flex-wrap gap-2">
                        {specialty.deliverables.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3">
                        <Button
                          href="/contacto"
                          variant="secondary"
                          size="sm"
                          arrow
                        >
                          Solicitar asesoría técnica
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-2 lg:col-span-7">
                      {specialty.photos.slice(0, 4).map((photo) => (
                        <div
                          key={photo.src}
                          className="relative aspect-[4/3] overflow-hidden"
                        >
                          <Photo
                            photo={photo}
                            sizes={SPECIALTY_PHOTO_SIZES}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <ServicesIndex
          id="catalogo-servicios"
          intro={{
            eyebrow: "Catálogo técnico",
            heading: "Alcances por etapa de proyecto y construcción.",
            body: "Contrate el desarrollo integral llave en mano o la especialidad técnica que su obra requiera.",
          }}
          groups={groups}
          tone="canvas"
        />

        <ProcessList
          id="proceso"
          intro={processIntro}
          steps={steps}
          tone="bone"
        />

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
