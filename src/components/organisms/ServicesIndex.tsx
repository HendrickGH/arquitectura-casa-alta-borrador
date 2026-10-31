"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
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

interface FlattenedService {
  service: Service;
  groupTitle: string;
  groupSlug: string;
  globalIndex: number;
}

/**
 * Editorial Technical Services Index (`ServicesIndex`).
 *
 * Implements a single architectural select filter (0px geometry, Montserrat typography,
 * default "Todos nuestros servicios") and a generous horizontal snap overflow carousel
 * of `MonolithCard` molecules with deliverables modal inspection.
 */
export function ServicesIndex({
  intro,
  groups,
  tone = "canvas",
  id,
  whatsappHref,
}: ServicesIndexProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<{
    service: Service;
    index: number;
  } | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const {
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    updateScrollState,
  } = useCarouselScroll(trackRef, { gap: 24, fallbackWidth: 440 });

  // Flatten all services from all divisions into a single unified index
  const allServices: FlattenedService[] = useMemo(() => {
    let count = 0;
    return groups.flatMap((group) =>
      group.services.map((service) => ({
        service,
        groupTitle: group.title,
        groupSlug: group.slug,
        globalIndex: count++,
      }))
    );
  }, [groups]);

  // Filter services according to the active select choice
  const visibleServices = useMemo(() => {
    if (selectedFilter === "all") return allServices;
    return allServices.filter((item) => item.groupSlug === selectedFilter);
  }, [allServices, selectedFilter]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    updateScrollState();
  }, [selectedFilter, updateScrollState]);

  if (groups.length === 0 || allServices.length === 0) return null;

  return (
    <Section id={id} tone={tone}>
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
        />

        {/* Top Bar: Left Single Select and Right Carousel Navigation Arrows */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="w-full sm:max-w-md">
            <label
              htmlFor="services-filter"
              className="label mb-2.5 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-800"
            >
              Filtrar por interés o especialidad
            </label>
            <div className="relative">
              <select
                id="services-filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                aria-label="Filtrar servicios por especialidad o interés"
                className="min-h-[50px] w-full appearance-none rounded-none border border-bone-200 bg-canvas px-5 py-3.5 pr-12 text-sm sm:text-base font-medium text-ink transition-colors duration-200 hover:border-brand-800 focus:border-brand-800 focus:outline-none focus:ring-1 focus:ring-brand-800 cursor-pointer"
              >
                <option value="all">
                  Todos nuestros servicios ({allServices.length})
                </option>
                {groups.map((group) => (
                  <option key={group.slug} value={group.slug}>
                    {group.title} ({group.services.length})
                  </option>
                ))}
              </select>

              {/* 0px architectural chevron icon */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-ink"
              >
                <svg
                  className="h-4 w-4 text-ink"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Orthogonal Carousel Navigation Arrows (0px) */}
          <div className="hidden sm:flex pb-2">
            <CarouselNavButtons
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              prevLabel="Ver servicios anteriores"
              nextLabel="Ver servicios siguientes"
            />
          </div>
        </div>

        {/* Carousel Track: Horizontal Snap Overflow Slider */}
        <div
          ref={trackRef}
          role="region"
          aria-label="Carrusel de servicios"
          tabIndex={0}
          className="mt-8 sm:mt-10 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 focus-visible:outline-2 focus-visible:outline-brand-800"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleServices.map((item) => (
            <MonolithCard
              key={item.service.slug}
              variant="carousel"
              title={item.service.title}
              description={item.service.summary}
              kicker={item.groupTitle}
              photo={item.service.image}
              sizes={CARD_SIZES}
              ctaLabel="Ver alcances y entregables"
              ariaLabel={`Ver alcances y entregables de ${item.service.title}`}
              onClick={() =>
                setSelectedService({
                  service: item.service,
                  index: item.globalIndex,
                })
              }
            />
          ))}
        </div>

        {/* Mobile Navigation Helper Indicator */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <span className="text-xs text-ink-muted">
            Desliza para explorar servicios
          </span>
          <CarouselNavButtons
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            iconClassName="h-3.5 w-3.5"
            prevLabel="Ver servicios anteriores"
            nextLabel="Ver servicios siguientes"
          />
        </div>
      </Container>

      {/* Scope and Deliverables Modal Dialog */}
      {selectedService ? (
        <ServiceScopeModal
          service={selectedService.service}
          partidaIndex={selectedService.index}
          totalPartidas={allServices.length}
          onClose={() => setSelectedService(null)}
          whatsappHref={whatsappHref}
          contactAnchorId="contacto"
        />
      ) : null}
    </Section>
  );
}
