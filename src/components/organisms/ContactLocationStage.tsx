"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { ContactPageContent } from "@/types/content";

export interface ContactLocationStageProps {
  page: ContactPageContent;
  whatsappHref: string;
}

/**
 * Monumental Direct Contact Stage (150svh) with continuous GSAP
 * parallax scrub, telephone lines, operating hours, and physical location.
 */
export function ContactLocationStage({
  page,
  whatsappHref,
}: ContactLocationStageProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const stageData = page.stage ?? {
    eyebrow: page.eyebrow,
    regionBadge: undefined,
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

    void import("@/lib/animation/gsap")
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

      {/* Architectural gradient scrim ensuring WCAG AAA text contrast with universal browser fallback */}
      <div
        aria-hidden="true"
        className="scrim-contact-stage-gradient pointer-events-none absolute inset-0 z-10"
      />

      {/* Bottom-anchored monumental direct contact stage */}
      <Container className="relative z-20 w-full">
        <div {...revealStep(0)} className="max-w-[48rem]">
          {stageData.eyebrow || stageData.regionBadge ? (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
              {stageData.eyebrow ? (
                <p className="eyebrow !text-white/85">{stageData.eyebrow}</p>
              ) : null}
              {stageData.regionBadge ? (
                <span className="label text-white/70">
                  {stageData.regionBadge}
                </span>
              ) : null}
            </div>
          ) : null}

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
          </div>
        </div>

        {/* Information Grid: Channels, Hours & Location */}
        <div
          {...revealStep(1)}
          className="mt-14 grid grid-cols-1 gap-12 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-16 items-start"
        >
          {/* Left Column: Direct telephone lines & Email */}
          <div className="flex flex-col gap-10">
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
                    className="group flex flex-col justify-center gap-1 py-1 min-h-[44px] transition-colors duration-200"
                  >
                    <span className="label text-white/60 text-[0.6875rem]">
                      {phone.role}
                    </span>
                    <span className="flex items-center gap-2.5 text-base sm:text-lg font-medium text-white tabular-nums group-hover:text-concha-nacar transition-colors">
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

            {/* Email */}
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

          {/* Right Column: Physical address & Operating hours */}
          <div className="flex flex-col gap-10">
            {/* Physical address */}
            <div>
              <span className="label text-white/70 block mb-2">
                {page.address.label}
              </span>
              <p className="text-base text-white/90 leading-relaxed">
                {page.address.street}
                <br />
                {page.address.neighborhood}
                <br />
                {page.address.city}
              </p>
              {stageData.mapNote ? (
                <p className="mt-2 text-xs text-white/60">
                  {stageData.mapNote}
                </p>
              ) : null}
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

            {/* Operating hours */}
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
          </div>
        </div>
      </Container>
    </section>
  );
}
