import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ClosingCTA } from "@/components/organisms/ClosingCTA";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
import type {
  HomePage,
  SiteConfig,
  SustainabilityPageContent,
} from "@/types/content";

interface SustainabilityPageTemplateProps {
  site: SiteConfig;
  page: SustainabilityPageContent;
  closing: HomePage["closing"];
  whatsappHref?: string;
}

const GALLERY_SIZES =
  "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";

/**
 * `/construccion-sustentable` — Arquitectura Sostenible y Bioclimática.
 *
 * Features the verbatim tropical climate narrative ("Proyecto de arquitectura
 * sostenible para un clima y ambiente tropical..."), the four bioclimatic
 * engineering pillars, the `arquitectura-sostenible` gallery, and the
 * `arquitectura-que-perdura` structural durability gallery.
 */
export function SustainabilityPageTemplate({
  site,
  page,
  closing,
  whatsappHref,
}: SustainabilityPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        <Section tone="canvas" density="default" reveal="stagger">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-6">
                <div {...revealStep(0)}>
                  <p className="eyebrow">{page.narrative.eyebrow}</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[22ch]">
                    {page.narrative.heading}
                  </Heading>
                </div>

                <blockquote
                  {...revealStep(2)}
                  className="py-2 pl-4"
                >
                  <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                    &ldquo;{page.narrative.verbatimQuote}&rdquo;
                  </p>
                </blockquote>

                <div {...revealStep(3)} className="flex flex-col gap-4">
                  {page.narrative.paragraphs.map((paragraph) => (
                    <Text key={paragraph} className="text-ink-muted">
                      {paragraph}
                    </Text>
                  ))}
                </div>

                {(page.narrative.photo ?? page.bioclimaticPhotos[0]) ? (
                  <div {...revealStep(3)} className="mt-2 overflow-hidden">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200">
                      <Photo
                        photo={page.narrative.photo ?? page.bioclimaticPhotos[0]}
                        sizes="(min-width: 1024px) 44vw, 95vw"
                      />
                    </div>
                  </div>
                ) : null}

                <div
                  {...revealStep(4)}
                  className="mt-4 flex flex-wrap items-center gap-6"
                >
                  <Button href={page.narrative.ctaHref ?? "/contacto"} arrow>
                    {page.narrative.ctaLabel ?? "Planear un proyecto bioclimático"}
                  </Button>
                  {whatsappHref ? (
                    <Button
                      href={`${whatsappHref}?text=${encodeURIComponent(
                        "Hola Casa Alta, me interesa planear un proyecto de arquitectura bioclimática y construcción sustentable.",
                      )}`}
                      variant="secondary"
                      external
                      arrow
                      className="min-h-[44px]"
                    >
                      Consultar por WhatsApp
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-6">
                {page.pillars.map((pillar, index) => (
                  <div
                    key={pillar.number}
                    {...revealStep(index)}
                    className="flex flex-col pt-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="label tabular-nums text-brand-800">
                        {pillar.number}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Heading
                        as="h3"
                        voice="serif"
                        sizeClassName="text-xl leading-snug"
                      >
                        {pillar.title}
                      </Heading>
                      <Text size="sm" className="mt-3 text-ink-muted">
                        {pillar.description}
                      </Text>
                      {pillar.items && pillar.items.length > 0 ? (
                        <ul className="mt-4 flex flex-col gap-2">
                          {pillar.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs text-ink-muted"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="bone" reveal="stagger">
          <Container>
            <SectionHeading
              eyebrow={page.bioclimaticGalleryIntro.eyebrow}
              heading={page.bioclimaticGalleryIntro.heading}
              body={page.bioclimaticGalleryIntro.body}
              action={
                <span className="label tabular-nums text-ink-muted">
                  {`${String(page.bioclimaticPhotos.length).padStart(2, "0")} SOLUCIONES`}
                </span>
              }
            />

            <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {page.bioclimaticPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  {...revealStep(index)}
                  className="overflow-hidden"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                    <Photo photo={photo} sizes={GALLERY_SIZES} />
                  </div>
                </figure>
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="canvas" reveal="stagger">
          <Container>
            <SectionHeading
              eyebrow={page.enduringGalleryIntro.eyebrow}
              heading={page.enduringGalleryIntro.heading}
              body={page.enduringGalleryIntro.body}
              action={
                <span className="label tabular-nums text-ink-muted">
                  {`${String(page.enduringPhotos.length).padStart(2, "0")} REGISTROS`}
                </span>
              }
            />

            <div className="mt-12 grid grid-cols-1 gap-8 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
              {page.enduringPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  {...revealStep(index)}
                  className="overflow-hidden"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                    <Photo photo={photo} sizes={GALLERY_SIZES} />
                  </div>
                </figure>
              ))}
            </div>
          </Container>
        </Section>

        <ClosingCTA closing={closing} />
      </main>
    </SiteChrome>
  );
}
