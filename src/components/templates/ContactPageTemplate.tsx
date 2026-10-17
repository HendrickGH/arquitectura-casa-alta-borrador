import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
import type { HomePage, Photo as PhotoModel, SiteConfig } from "@/types/content";

interface ContactPageTemplateProps {
  site: SiteConfig;
  contact: HomePage["contact"];
  whatsappHref: string;
}

const CONTACT_HERO_PHOTO: PhotoModel = {
  src: "/images/proyectos-integrales/03-sesion-trabajo-revision-proyecto-ejecutivo-oficina.avif",
  alt: "Sesión de revisión de proyecto ejecutivo en oficina de Constructora Casa Alta",
  width: 1200,
  height: 1600,
};

const OFFICE_STUDIO_PHOTO: PhotoModel = {
  src: "/images/credibilidad/03-camioneta-constructora-casa-alta-frente-obra.avif",
  alt: "Unidad institucional de Constructora Casa Alta en supervisión de obra en Oaxaca",
  width: 1200,
  height: 1600,
};

/**
 * `/contacto` — Contacto, Oficinas y Primera Reunión Sin Costo.
 *
 * Displays the uncropped Thirdway architectural Hero, the Puerto Escondido and
 * Salina Cruz offices paired with real studio photography, direct telephone
 * lines (`951 458 1395` / `951 165 0678`), WhatsApp, email, social profiles,
 * and the project inquiry form.
 */
export function ContactPageTemplate({
  site,
  contact,
  whatsappHref,
}: ContactPageTemplateProps) {
  return (
    <SiteChrome site={site}>
      <main id="main">
        <PageHero
          badge="(PRIMERA REUNIÓN SIN COSTO)"
          eyebrow="Contacto directo · Puerto Escondido y Salina Cruz"
          heading="Hablemos de su proyecto en la costa, el valle o el Istmo de Oaxaca."
          subheadline="En nuestra primera sesión gratuita por Zoom o en oficina revisamos ubicación, programa arquitectónico, viabilidad estructural y presupuesto estimado."
          photo={CONTACT_HERO_PHOTO}
        />

        <Section
          tone="canvas"
          reveal="stagger"
          className="!pt-14 !pb-16 md:!pt-20 md:!pb-24"
        >
          <Container>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-5">
                <div {...revealStep(0)} className="flex items-center gap-2.5">
                  <span className="number-pill">(01)</span>
                  <p className="eyebrow">Sedes y cobertura regional</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[20ch]">
                    Presencia directa en obra en las 8 regiones de Oaxaca.
                  </Heading>
                </div>

                <div {...revealStep(2)}>
                  <Text className="text-ink-muted">
                    Atendemos de manera directa desde nuestras oficinas en
                    Puerto Escondido y Salina Cruz, coordinando topografía,
                    cálculo estructural, licencias y ejecución llave en mano.
                  </Text>
                </div>

                <div
                  {...revealStep(2)}
                  className="overflow-hidden border border-ink/15 bg-concha-nacar p-3"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                    <Photo
                      photo={OFFICE_STUDIO_PHOTO}
                      sizes="(min-width: 1024px) 38vw, 95vw"
                    />
                  </div>
                </div>

                <div
                  {...revealStep(3)}
                  className="mt-2 flex flex-wrap items-center gap-4"
                >
                  <Button href={whatsappHref} external arrow>
                    Escribir por WhatsApp
                  </Button>
                  {site.contact[0] ? (
                    <Button
                      href={site.contact[0].href}
                      variant="secondary"
                      size="sm"
                      arrow
                    >
                      {`Llamar al ${site.contact[0].value}`}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {site.offices.map((office, idx) => (
                  <div
                    key={office.city}
                    {...revealStep(idx)}
                    className="ruler-top flex flex-col justify-between border border-ink/15 bg-concha-nacar p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="number-pill">
                        {`(SEDE 0${idx + 1})`}
                      </span>
                      <span className="label text-brand-800">{office.region}</span>
                    </div>
                    <div className="mt-6">
                      <h3 className="voice text-xl text-ink">{office.city}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        Atención presencial y supervisión de proyectos en{" "}
                        {office.city} ({office.region}).
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  {...revealStep(2)}
                  className="ruler-top border border-ink/15 bg-concha-nacar p-6 sm:col-span-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
                    <p className="label text-brand-800">
                      Líneas directas y correo electrónico
                    </p>
                    <ul className="flex items-center gap-4">
                      {site.social.map((link) => (
                        <li key={link.label}>
                          <SocialLinkItem link={link} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {site.contact.map((line) => (
                      <a
                        key={line.href}
                        href={line.href}
                        className="flex flex-col gap-1 border border-ink/15 bg-canvas p-4 transition-colors hover:border-brand-800"
                      >
                        <span className="label text-ink-muted">
                          {line.label}
                        </span>
                        <span className="mt-1 flex items-center gap-2 text-sm font-medium text-ink tabular-nums">
                          <Icon
                            name={
                              line.href.startsWith("mailto:") ? "mail" : "phone"
                            }
                            className="h-4 w-4 text-brand-800"
                          />
                          <span className="truncate">{line.value}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <ContactForm
          id="formulario"
          contact={contact}
          whatsappHref={whatsappHref}
        />
      </main>
    </SiteChrome>
  );
}
