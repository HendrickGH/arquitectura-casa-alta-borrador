"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { ContactForm } from "@/components/organisms/ContactForm";
import { PageHero } from "@/components/organisms/PageHero";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { ContactPageContent, SiteConfig } from "@/types/content";

export interface ContactPageTemplateProps {
  site: SiteConfig;
  page: ContactPageContent;
  whatsappHref: string;
}

/**
 * `/contacto` — Comprehensive 3-Section Architectural Contact Experience:
 *
 * 1. Section 1: PageHero (100vh / 100svh) — Canonical full-bleed dark hero
 *    with authentic office/gabinete photography (`proyectos-integrales/03-...`).
 * 2. Section 2: ContactForm — Tactile surface (`tone="bone"`), consultation checklist,
 *    specialty, locality, budget, and timeframe chip selectors, dedicated authentic
 *    photography (`proyectos-integrales/01-...`), and seamless EmailJS / WhatsApp integration.
 * 3. Section 3: Monumental Direct Contact & Maps Stage (150svh) — El Bicho Score 5★
 *    with continuous GSAP parallax scrub, dark gradient scrim, Google Maps iframe embed,
 *    direct telephone lines with technical roles, and operating hours.
 */
export function ContactPageTemplate({
  site,
  page,
  whatsappHref,
}: ContactPageTemplateProps) {
  return (
    <SiteChrome site={site} chrome="canvas">
      <main id="main">
        {/* Section 1: PageHero (100vh / 100svh) */}
        <PageHero
          eyebrow={page.hero.eyebrow}
          heading={page.hero.heading}
          subheadline={page.hero.subheadline}
          photo={page.hero.photo}
        />

        {/* Section 2: ContactForm (Formulario de Contacto en Superficie Clara) */}
        <ContactForm
          id="formulario-contacto"
          tone="canvas"
          contact={page.contactForm}
          whatsappHref={whatsappHref}
          photo={page.formPhoto}
        />

        {/* Section 3: Monumental Direct Contact & Maps Stage (150svh) */}
        <ContactStage
          site={site}
          page={page}
          whatsappHref={whatsappHref}
        />
      </main>
    </SiteChrome>
  );
}

function ContactStage({
  page,
  whatsappHref,
}: ContactPageTemplateProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const stageData = page.stage ?? {
    eyebrow: page.eyebrow,
    regionBadge: "Oaxaca · Costa e Istmo",
    heading: page.heading,
    body: page.body,
    photo: page.photo,
  };

  const whatsappWithPrefill = page.whatsappPrefill
    ? `${whatsappHref}?text=${encodeURIComponent(page.whatsappPrefill)}`
    : whatsappHref;

  useEffect(() => {
    const container = containerRef.current;
    const target = imageWrapperRef.current;
    if (!container || !target) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("@/components/organisms/gsap-scenes")
      .then(({ createParallaxStage }) => {
        if (cancelled) return;
        revert = createParallaxStage({
          container,
          target,
          start: "top bottom",
          end: "bottom top",
        });
      })
      .catch(() => {
        // Fallback gracefully without throwing: image remains visible statically.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      {...revealAttrs("stagger")}
      className="relative flex min-h-[150svh] w-full flex-col justify-end overflow-hidden bg-ink pt-28 pb-16 sm:pb-24 lg:pb-32"
    >
      {/* Parallax background wrapper: oversized height ensures clean vertical travel */}
      <div
        ref={imageWrapperRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-0 right-0 h-[140%] w-full select-none will-change-transform"
      >
        <Photo photo={stageData.photo} sizes="100vw" fit="cover" />
      </div>

      {/* Architectural gradient scrims ensuring WCAG AAA text contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-ink via-ink/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/85 to-transparent via-65%"
      />

      {/* Bottom-anchored monumental direct contact stage */}
      <Container className="relative z-20 w-full">
        <div {...revealStep(0)} className="max-w-[48rem]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
            <p className="eyebrow !text-white/85">{stageData.eyebrow}</p>
            {stageData.regionBadge ? (
              <span className="label text-white/70">
                {stageData.regionBadge}
              </span>
            ) : null}
          </div>

          <Heading
            as="h2"
            voice="serif"
            sizeClassName="text-[2.25rem] leading-[1.08] text-white sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] max-w-[20ch]"
          >
            {stageData.heading}
          </Heading>

          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-white/85 sm:text-lg">
            {stageData.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
            <Button
              href={whatsappWithPrefill}
              variant="primary"
              size="md"
              external
              arrow
            >
              {stageData.whatsappCta ?? "Escribir por WhatsApp"}
            </Button>

            <Button
              href="#formulario-contacto"
              variant="outline"
              size="md"
              arrow
            >
              {stageData.consultationCta ?? "Iniciar consulta"}
            </Button>
          </div>
        </div>

        {/* Information Grid: Channels, Hours, Location & Google Maps Widget */}
        <div
          {...revealStep(1)}
          className="mt-14 grid grid-cols-1 gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-14 items-start"
        >
          {/* Left Column: Direct telephone lines, operating hours & address */}
          <div className="flex flex-col gap-10 lg:col-span-6 xl:col-span-6">
            {/* Telephone lines with roles */}
            <div>
              <span className="label text-white/70 block mb-4">
                {stageData.phonesLabel ?? "Líneas directas de atención"}
              </span>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {page.phones.map((phone) => (
                  <a
                    key={phone.number}
                    href={phone.href}
                    className="group flex flex-col justify-between p-4 bg-white/[0.04] hover:bg-white/[0.08] transition-colors duration-200 min-h-[44px]"
                  >
                    <span className="label text-white/60 text-[0.6875rem]">
                      {phone.role}
                    </span>
                    <span className="mt-2 flex items-center gap-2.5 text-base sm:text-lg font-medium text-white tabular-nums group-hover:text-concha-nacar transition-colors">
                      <Icon
                        name="phone"
                        className="h-4 w-4 text-brand-500 shrink-0"
                      />
                      <span>{phone.number}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Operating hours & email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="label text-white/70 block mb-3">
                  {stageData.scheduleLabel ?? "Horarios de atención"}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {page.schedule.map((slot) => (
                    <li key={slot.label} className="text-sm leading-snug">
                      <span className="block font-medium text-white">
                        {slot.label}
                      </span>
                      <span className="text-white/75 text-xs sm:text-sm">
                        {slot.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="label text-white/70 block mb-3">
                  {page.email.label}
                </span>
                <a
                  href={page.email.href}
                  className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-white hover:text-concha-nacar transition-colors py-1.5 min-h-[44px]"
                >
                  <Icon
                    name="mail"
                    className="h-4 w-4 text-brand-500 shrink-0"
                  />
                  <span className="break-all">{page.email.value}</span>
                </a>
              </div>
            </div>

            {/* Physical address */}
            <div>
              <span className="label text-white/70 block mb-2">
                {page.address.label}
              </span>
              <p className="text-base text-white/90 leading-relaxed">
                {page.address.street}
                <br />
                {page.address.neighborhood}, {page.address.city}
              </p>
              <div className="mt-4">
                <Button
                  href={page.address.mapsUrl}
                  external
                  variant="outline"
                  size="sm"
                  arrow
                >
                  {stageData.mapsCta ?? "Abrir en Google Maps"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Widget Embed */}
          <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-6">
            <span className="label text-white/70 block">
              {stageData.mapLabel ?? "Mapa de localización · Puerto Escondido"}
            </span>
            <div className="relative w-full overflow-hidden bg-white/5 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]">
              <iframe
                src={page.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Constructora Casa Alta en Google Maps"
                className="h-full w-full border-0"
              />
            </div>
            <p className="text-xs text-white/60">
              {stageData.mapNote ??
                "Colonia Brisas de Zicatela · Atención presencial con cita previa."}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
