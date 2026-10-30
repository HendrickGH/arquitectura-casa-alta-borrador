"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceScopeModal } from "@/components/organisms/ServiceScopeModal";
import type { SectionIntro, Service, ServiceGroup } from "@/types/content";

interface ServicesIndexProps {
  intro: SectionIntro;
  groups: ServiceGroup[];
  tone?: "canvas" | "bone";
  id?: string;
  whatsappHref: string;
}

interface FlattenedService {
  service: Service;
  groupTitle: string;
  groupSlug: string;
  globalIndex: number;
}

/**
 * Editorial Technical Services Index (`ServicesIndex`).
 *
 * Implements an architectural select filter (0px geometry, Montserrat typography,
 * default "Todos nuestros servicios") and a responsive 3-column monograph grid
 * of `MonolithCard` components with deliverables modal inspection.
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

        {/* Filter Control Bar with Casa Alta Architectural Select */}
        <div className="mt-10 sm:mt-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="w-full sm:max-w-md">
            <label
              htmlFor="services-filter"
              className="label mb-2.5 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-800"
            >
              Filtrar por especialidad o interés
            </label>
            <div className="relative">
              <select
                id="services-filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                aria-label="Filtrar servicios por especialidad o interés"
                className="min-h-[48px] w-full appearance-none rounded-none border border-bone-200 bg-canvas px-5 py-3.5 pr-12 text-sm sm:text-base font-medium text-ink transition-colors duration-200 hover:border-brand-800/50 focus:border-brand-800 focus:outline-none focus:ring-1 focus:ring-brand-800 cursor-pointer"
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

              {/* Custom 0px orthogonal architectural chevron indicator */}
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

          {/* Counter metadata and Reset action */}
          <div className="label text-xs tracking-wider text-ink-muted">
            Mostrando {visibleServices.length}{" "}
            {visibleServices.length === 1 ? "partida" : "partidas"}
            {selectedFilter !== "all" ? (
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className="ml-3 underline decoration-ink/30 hover:text-brand-800 hover:decoration-brand-800 cursor-pointer"
              >
                (Ver todos)
              </button>
            ) : null}
          </div>
        </div>

        {/* Unified Responsive Monograph Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleServices.map((item) => (
            <MonolithCard
              key={item.service.slug}
              variant="grid"
              title={item.service.title}
              description={item.service.summary}
              kicker={`Partida ${String(item.globalIndex + 1).padStart(2, "0")} · ${item.groupTitle}`}
              photo={item.service.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
