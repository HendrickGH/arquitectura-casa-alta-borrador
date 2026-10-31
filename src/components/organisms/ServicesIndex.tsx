"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { Section } from "@/components/atoms/Section";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceScopeModal } from "@/components/organisms/ServiceScopeModal";
import { cx } from "@/lib/cx";
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
 * Implements an architectural custom select filter (0px geometry, Montserrat typography,
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    service: Service;
    index: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Filter options list
  const filterOptions = useMemo(
    () => [
      {
        slug: "all",
        title: "Todos nuestros servicios",
        count: allServices.length,
      },
      ...groups.map((group) => ({
        slug: group.slug,
        title: group.title,
        count: group.services.length,
      })),
    ],
    [allServices.length, groups]
  );

  const currentOption =
    filterOptions.find((opt) => opt.slug === selectedFilter) ??
    filterOptions[0];

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

        {/* Ambiented Architectural Select & Filter Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          {/* Custom Architectural Dropdown Select */}
          <div ref={dropdownRef} className="relative w-full sm:max-w-md">
            <span
              id="services-filter-label"
              className="label mb-2.5 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-800"
            >
              Filtrar por interés o especialidad
            </span>

            {/* Custom Architectural Trigger Button */}
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isSelectOpen}
              aria-labelledby="services-filter-label"
              onClick={() => setIsSelectOpen((prev) => !prev)}
              className="min-h-[52px] w-full rounded-none border border-bone-200 bg-canvas px-5 py-3.5 text-left transition-colors duration-200 hover:border-brand-800 focus-visible:outline-2 focus-visible:outline-brand-800 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-medium text-ink">
                  {currentOption.title}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="label tabular-nums text-xs text-ink-muted">
                  ({currentOption.count})
                </span>
                <svg
                  className={cx(
                    "h-4 w-4 text-ink transition-transform duration-200",
                    isSelectOpen && "rotate-180 text-brand-800"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Custom Dropdown Listbox */}
            {isSelectOpen ? (
              <ul
                role="listbox"
                aria-labelledby="services-filter-label"
                className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-canvas border border-bone-200 shadow-2xl overflow-hidden rounded-none py-1"
              >
                {filterOptions.map((option) => {
                  const isSelected = option.slug === selectedFilter;
                  return (
                    <li
                      key={option.slug}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedFilter(option.slug);
                        setIsSelectOpen(false);
                      }}
                      className={cx(
                        "flex items-center justify-between px-5 py-3.5 text-sm sm:text-base transition-colors cursor-pointer",
                        isSelected
                          ? "bg-brand-50 text-brand-800 font-semibold"
                          : "text-ink hover:bg-bone-100 hover:text-brand-800"
                      )}
                    >
                      <span>{option.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="label tabular-nums text-xs text-ink-muted">
                          ({option.count})
                        </span>
                        {isSelected ? (
                          <Icon name="check" className="h-4 w-4 text-brand-800" />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* Quick-filter Chips for Direct 1-Click Access on Desktop */}
          <div className="hidden lg:flex flex-wrap items-center gap-2">
            {filterOptions.map((option) => {
              const isSelected = option.slug === selectedFilter;
              return (
                <button
                  key={option.slug}
                  type="button"
                  onClick={() => setSelectedFilter(option.slug)}
                  className={cx(
                    "min-h-[44px] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer rounded-none border-0",
                    isSelected
                      ? "bg-brand-800 text-white"
                      : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink"
                  )}
                >
                  {option.title} ({option.count})
                </button>
              );
            })}
          </div>

          {/* Counter metadata and Reset action */}
          <div className="label text-xs tracking-wider text-ink-muted shrink-0">
            Mostrando {visibleServices.length}{" "}
            {visibleServices.length === 1 ? "servicio" : "servicios"}
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
              kicker={item.groupTitle}
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
