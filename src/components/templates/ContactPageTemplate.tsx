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
import type {
  ContactPageContent,
  HomePage,
  SiteConfig,
} from "@/types/content";

interface ContactPageTemplateProps {
  site: SiteConfig;
  page: ContactPageContent;
  contact: HomePage["contact"];
  whatsappHref: string;
}

/**
 * `/contacto` — Contacto, Oficinas y Primera Reunión Sin Costo.
 *
 * Displays the architectural Hero, the Puerto Escondido and Salina Cruz offices
 * paired with real studio photography, direct telephone lines (`951 458 1395` /
 * `951 165 0678`), WhatsApp, email, social profiles, and the project inquiry form.
 */
export function ContactPageTemplate({
  site,
  page,
  contact,
  whatsappHref,
}: ContactPageTemplateProps) {
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
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col gap-5 lg:col-span-5">
                <div {...revealStep(0)}>
                  <p className="eyebrow">{page.officesIntro.eyebrow}</p>
                </div>

                <div {...revealStep(1)}>
                  <Heading as="h2" voice="serif" className="max-w-[20ch]">
                    {page.officesIntro.heading}
                  </Heading>
                </div>

                <div {...revealStep(2)}>
                  <Text className="text-ink-muted">
                    {page.officesIntro.body}
                  </Text>
                </div>

                <div {...revealStep(2)} className="overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                    <Photo
                      photo={page.officesIntro.photo}
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

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7">
                {site.offices.map((office, idx) => (
                  <div
                    key={office.city}
                    {...revealStep(idx)}
                    className="flex flex-col justify-between border-t border-bone-200 pt-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="label tabular-nums text-brand-800">
                        {`SEDE 0${idx + 1}`}
                      </span>
                      <span className="label text-ink-muted">
                        {office.region}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Heading as="h3" voice="serif" sizeClassName="text-xl">
                        {office.city}
                      </Heading>
                      <Text size="sm" className="mt-2 text-ink-muted">
                        Atención presencial y supervisión de proyectos en{" "}
                        {office.city} ({office.region}).
                      </Text>
                    </div>
                  </div>
                ))}

                <div
                  {...revealStep(2)}
                  className="border-t border-bone-200 pt-8 sm:col-span-2"
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

                  <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {site.contact.map((line) => (
                      <a
                        key={line.href}
                        href={line.href}
                        className="flex flex-col gap-1 border-b border-bone-200 pb-3 transition-colors hover:border-brand-800"
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
          photo={homeContactPhotoFallback(page)}
        />
      </main>
    </SiteChrome>
  );
}

function homeContactPhotoFallback(page: ContactPageContent) {
  return page.officesIntro.photo;
}
