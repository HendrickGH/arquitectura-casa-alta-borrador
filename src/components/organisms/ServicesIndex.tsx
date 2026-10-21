"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Tabs } from "@/components/molecules/Tabs";
import { ServiceScopeModal } from "@/components/organisms/ServiceScopeModal";
import type { SectionIntro, Service, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  /** Direct WhatsApp contact link */
  whatsappHref: string;
}

const CARD_SIZES =
  "(min-width: 1280px) 480px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 85vw";

/**
 * Editorial Architectural Carousel (`ServicesIndex`).
 *
 * Implements the Architectural Editorial reference:
 * - 0px architectural catalogue tabs at the top for switching between the studio's technical divisions.
 * - Top-right orthogonal carousel navigation controls (← / →).
 * - Horizontal scroll-snap track with expansive monolith cards matching DivisionCards proportions
 *   (h-[580px] to h-[680px], w-[85vw] to w-[480px]). Requires horizontal scrolling whenever 3 or more items exist.
 * - Tall full-bleed photograph cards with subtle legibility scrims, title in top-left, and deliverable summary + CTA in bottom.
 * - Interactive modal (ServiceScopeModal) that reveals technical deliverables, executive scope checklist,
 *   and dual conversion buttons (form scroll + WhatsApp).
 */
export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
  whatsappHref,
}: ServicesIndexProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<{
    service: Service;
    index: number;
  } | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const currentGroup = groups[activeGroupIndex] ?? groups[0];

  const groupTabs = useMemo(
    () =>
      groups.map((group, idx) => ({
        id: String(idx),
        label: group.title,
        count: group.services.length,
      })),
    [groups],
  );

  const updateScrollButtons = () => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Reset scroll position on group change
    track.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    updateScrollButtons();

    const handleScroll = () => updateScrollButtons();
    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeGroupIndex]);

  const handleScroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 440;
    const scrollAmount = cardWidth + 24; // card width + gap-6

    track.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (groups.length === 0 || !currentGroup) return null;

  return (
    <Section id={id} tone={tone}>
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        {/* Top Bar: Left Tabs and Right Carousel Navigation Arrows */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Tabs
            tabs={groupTabs}
            activeId={String(activeGroupIndex)}
            onChange={(nextId) => {
              setActiveGroupIndex(Number(nextId));
            }}
            ariaLabel="Seleccionar división técnica"
            className="pb-0"
          />

          {/* Orthogonal Carousel Navigation Arrows (0px) */}
          <div className="hidden sm:flex items-center gap-2 pb-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Ver partidas anteriores"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Ver partidas siguientes"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="arrow-right" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track: Horizontal Snap Slider */}
        <div
          ref={trackRef}
          role="region"
          aria-label={`Carrusel de partidas para ${currentGroup.title}`}
          tabIndex={0}
          className="mt-8 sm:mt-10 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 focus-visible:outline-2 focus-visible:outline-brand-800"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {currentGroup.services.map((service, sIdx) => {
            const hasPhoto = Boolean(service.image);

            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setSelectedService({ service, index: sIdx })}
                aria-label={`Ver alcances y entregables de ${service.title}`}
                className="group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-ink p-7 text-left text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 cursor-pointer sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9"
              >
                {/* Full-bleed Photo Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-bone-100">
                  {hasPhoto && service.image ? (
                    <Photo
                      photo={service.image}
                      sizes={CARD_SIZES}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-bone-200 text-xs text-ink-muted p-4 text-center">
                      <span>Fotografía de archivo en proceso</span>
                    </div>
                  )}
                </div>

                {/* Scrim gradients: subtle top, deep bottom for contrast */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent"
                />

                {/* Top: Service Title */}
                <div className="relative z-10">
                  <Heading
                    as="h3"
                    voice="serif"
                    sizeClassName="text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar"
                  >
                    {service.title}
                  </Heading>
                </div>

                {/* Bottom: Summary & CTA */}
                <div className="relative z-10 flex flex-col gap-5">
                  {service.summary ? (
                    <Text
                      size="base"
                      className="leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]"
                    >
                      {service.summary}
                    </Text>
                  ) : null}

                  <div className="flex items-center gap-3 pt-1 text-white transition-colors group-hover:text-concha-nacar">
                    <span className="label text-sm tracking-wider text-white transition-colors group-hover:text-concha-nacar">
                      Ver alcances y entregables
                    </span>
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-concha-nacar"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation Helper Indicator */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <span className="text-xs text-ink-muted">
            Desliza para explorar partidas
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Ver partidas anteriores"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="arrow-left" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Ver partidas siguientes"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon name="arrow-right" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Scope and Deliverables Modal Dialog */}
      {selectedService ? (
        <ServiceScopeModal
          service={selectedService.service}
          partidaIndex={selectedService.index}
          totalPartidas={currentGroup.services.length}
          onClose={() => setSelectedService(null)}
          whatsappHref={whatsappHref}
          contactAnchorId="contacto"
        />
      ) : null}
    </Section>
  );
}
