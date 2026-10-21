"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Tabs } from "@/components/molecules/Tabs";
import { ServiceScopeModal } from "@/components/organisms/ServiceScopeModal";
import { useCarouselScroll } from "@/lib/hooks/useCarouselScroll";
import type { SectionIntro, Service, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  id?: string;
  whatsappHref: string;
}

const CARD_SIZES =
  "(min-width: 1280px) 480px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 85vw";

/**
 * Editorial Technical Services Index (`ServicesIndex`).
 *
 * Implements division tabs and an orthogonal snap carousel using
 * `MonolithCard` molecules and `CarouselNavButtons` controls.
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
  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight, updateScrollState } =
    useCarouselScroll(trackRef, { gap: 24, fallbackWidth: 440 });

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    updateScrollState();
  }, [activeGroupIndex, updateScrollState]);

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
          <div className="hidden sm:flex pb-3">
            <CarouselNavButtons
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              prevLabel="Ver partidas anteriores"
              nextLabel="Ver partidas siguientes"
            />
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
          {currentGroup.services.map((service, sIdx) => (
            <MonolithCard
              key={service.slug}
              title={service.title}
              description={service.summary}
              photo={service.image}
              sizes={CARD_SIZES}
              ctaLabel="Ver alcances y entregables"
              ariaLabel={`Ver alcances y entregables de ${service.title}`}
              onClick={() => setSelectedService({ service, index: sIdx })}
            />
          ))}
        </div>

        {/* Mobile Navigation Helper Indicator */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <span className="text-xs text-ink-muted">
            Desliza para explorar partidas
          </span>
          <CarouselNavButtons
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            prevLabel="Ver partidas anteriores"
            nextLabel="Ver partidas siguientes"
          />
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
