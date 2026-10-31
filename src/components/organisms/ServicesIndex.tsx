"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceScopeModal } from "@/components/organisms/ServiceScopeModal";
import { useCarouselScroll } from "@/lib/hooks/useCarouselScroll";
import { cx } from "@/lib/cx";
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

        {/* Top Bar: Left Cosentino Catalogue Bar (Tabs) and Right Carousel Navigation Arrows */}
        <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div
            role="tablist"
            aria-label="Filtrar servicios por especialidad o interés"
            className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
              className={cx(
                "min-h-[44px] pb-2 label cursor-pointer transition-colors duration-200 text-left",
                selectedFilter === "all"
                  ? "font-semibold text-brand-800"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              Todos{" "}
              <span className="tabular-nums text-ink-muted">
                {String(allServices.length).padStart(2, "0")}
              </span>
            </button>
            {groups.map((group) => {
              const isSelected = selectedFilter === group.slug;
              return (
                <button
                  key={group.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFilter(group.slug)}
                  className={cx(
                    "min-h-[44px] pb-2 label cursor-pointer transition-colors duration-200 text-left",
                    isSelected
                      ? "font-semibold text-brand-800"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {group.title}{" "}
                  <span className="tabular-nums text-ink-muted">
                    {String(group.services.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
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
