import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import { ContactForm } from "@/components/organisms/ContactForm";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealStep } from "@/lib/reveal";
import type { HomePage, SiteConfig } from "@/types/content";

interface ContactPageTemplateProps {
  site: SiteConfig;
  contact: HomePage["contact"];
  whatsappHref: string;
}

/**
 * `/contacto` — Contacto, Oficinas y Primera Reunión Sin Costo.
 *
 * Displays the Puerto Escondido and Salina Cruz offices, both direct telephone
 * lines (`951 458 1395` / `951 165 0678`), WhatsApp, email, social profiles
 * (including TikTok), what happens in the complimentary first consultation,
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
        <Section
          tone="canvas"
          reveal="stagger"
          className="!pt-12 !pb-16 md:!pt-16 md:!pb-20"
        >
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-6">
                <div {...revealStep(0)} className="flex items-center gap-3">
                  <span className="number-pill">PRIMERA REUNIÓN SIN COSTO</span>
                  <p className="eyebrow">Contacto directo</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h1" voice="serif" className="max-w-[20ch]">
                    Hablemos de su proyecto en la costa o el Istmo de Oaxaca.
                  </Heading>
                </div>

                <div {...revealStep(2)}>
                  <Text size="lede" className="text-ink-muted">
                    En nuestra primera sesión gratuita revisamos ubicación,
                    programa arquitectónico, normativa aplicable y alcances de
                    inversión para trazar una ruta técnica con certeza jurídica
                    y presupuestal.
                  </Text>
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
                    >
                      {`Llamar al ${site.contact[0].value}`}
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                {site.offices.map((office, idx) => (
                  <div
                    key={office.city}
                    {...revealStep(idx)}
                    className="ruler-top flex flex-col justify-between border border-bone-200 bg-bone-50 p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="number-pill">
                        {`SEDE 0${idx + 1}`}
                      </span>
                      <span className="label text-brand-800">{office.region}</span>
                    </div>
                    <div className="mt-6">
                      <h2 className="voice text-xl text-ink">{office.city}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        Atención presencial y supervisión de proyectos en{" "}
                        {office.city} ({office.region}).
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  {...revealStep(2)}
                  className="ruler-top border border-bone-200 bg-concha-nacar/60 p-6 sm:col-span-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone-200 pb-4">
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
                        className="flex flex-col gap-1 border border-bone-200 bg-canvas p-4 transition-colors hover:border-brand-800"
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
