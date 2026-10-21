"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { cx } from "@/lib/cx";
import type { SpecialtySection } from "@/types/content";

interface SpecialtiesShowcaseProps {
  sections: SpecialtySection[];
  deliverablesLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Interactive Showcase for Studio Specialties.
 *
 * Implements the Cosentino Architectural Editorial contract with zero vertical CLS:
 * - Desktop (>= md):
 *   - Default / Idle State: 4 equal columns side-by-side with clean photographs on bone-50
 *     background (no black gaps) and clean-ground titles below.
 *   - Hover State: Activated ONLY when hovering directly over the photographs. The hovered
 *     photograph smoothly takes 100% of the stage width in a full panoramic view (fixed height,
 *     zero CLS), revealing the dark scrim, Marcellus title, description, deliverables, and CTA.
 *   - Hovering over titles or eyebrows below does NOT trigger the effect.
 *   - Leaving the image stage smoothly returns to the 4-column overview.
 * - Mobile (< md): Fluid horizontal scroll carousel (snap-x) of self-contained cards
 *   (photo, short eyebrow, title, brief summary, zero expansion effect, zero buttons).
 */
export function SpecialtiesShowcase({
  sections,
  deliverablesLabel = "Entregables clave de ingeniería:",
  ctaLabel = "Solicitar asesoría técnica",
  ctaHref = "#contacto",
}: SpecialtiesShowcaseProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeSection = sections.find((s) => s.slug === hoveredSlug) ?? null;

  return (
    <div className="w-full">
      {/* ====================================================================
          DESKTOP VIEW (>= md): Fixed-height container (Zero CLS)
          - Idle: 4 photos side-by-side with bone-50 gaps (matching section background)
          - Hover: ONLY hovering on the photos triggers the 100% width panoramic stage
          ==================================================================== */}
      <div className="hidden md:block">
        {/* Stage Container: Fixed height with bone-50 background so gaps match the section */}
        <div
          ref={stageRef}
          onMouseLeave={() => setHoveredSlug(null)}
          className="relative h-[480px] lg:h-[540px] w-full overflow-hidden bg-bone-50"
        >
          {/* 1. Idle State: 4 Photos side-by-side */}
          <div
            className={cx(
              "absolute inset-0 grid grid-cols-4 gap-6 lg:gap-8 transition-opacity duration-500 ease-out",
              hoveredSlug === null
                ? "opacity-100 z-10"
                : "opacity-0 pointer-events-none z-0",
            )}
          >
            {sections.map((section) => (
              <div
                key={section.slug}
                onMouseEnter={() => setHoveredSlug(section.slug)}
                className="group relative h-full w-full overflow-hidden bg-bone-200 cursor-pointer"
              >
                <Photo
                  photo={section.photo}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle dark tint on hover to signal interactivity */}
                <div className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* 2. Hovered State: Active photo takes 100% width with panoramic editorial content */}
          <div
            className={cx(
              "absolute inset-0 bg-ink text-white transition-opacity duration-500 ease-out",
              hoveredSlug !== null
                ? "opacity-100 z-20"
                : "opacity-0 pointer-events-none z-0",
            )}
          >
            {/* Background 100% width photos with smooth crossfade */}
            <div
              className="absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              {sections.map((section) => {
                const isSelected = section.slug === hoveredSlug;
                return (
                  <div
                    key={section.slug}
                    className={cx(
                      "absolute inset-0 transition-opacity duration-700 ease-out",
                      isSelected
                        ? "opacity-100 z-10 scale-100"
                        : "opacity-0 pointer-events-none z-0 scale-105",
                    )}
                  >
                    <Photo
                      photo={section.photo}
                      sizes="(min-width: 1024px) 100vw, 100vw"
                      priority={isSelected}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            {/* Architectural gradient scrim for WCAG AAA legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/30 md:bg-gradient-to-r md:from-ink md:via-ink/80 md:to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-ink/20"
            />

            {/* Editorial Content */}
            {activeSection ? (
              <div
                id={`panel-${activeSection.slug}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeSection.slug}`}
                className="relative z-20 flex flex-col justify-center h-full p-8 md:p-12 lg:p-16 max-w-2xl"
              >
                <div
                  key={activeSection.slug}
                  className="animate-[rise_300ms_cubic-bezier(0.22,1,0.36,1)]"
                >
                  {/* Short Eyebrow */}
                  <p className="eyebrow !text-white/80">
                    {activeSection.subtitle || activeSection.shortTitle}
                  </p>

                  {/* Title in Marcellus */}
                  <Heading
                    as="h3"
                    voice="serif"
                    sizeClassName="text-2xl sm:text-3xl lg:text-4xl leading-tight text-white mt-3"
                  >
                    {activeSection.title}
                  </Heading>

                  {/* Description in Montserrat */}
                  <Text className="text-white/85 text-sm sm:text-base leading-relaxed mt-4 max-w-[54ch]">
                    {activeSection.description}
                  </Text>

                  {/* Deliverables with strict 0px square bullets */}
                  <div className="mt-6">
                    <p className="label text-[11px] text-white/60 mb-2.5 tracking-wider">
                      {deliverablesLabel}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {activeSection.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs text-white/90 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-7">
                    <Button href={ctaHref} variant="inverse" size="sm" arrow>
                      {ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* 3. Bottom 4-Column Titles & Eyebrows (No hover effect on titles, only active reflection) */}
        <div
          role="tablist"
          aria-label="Especialidades de ejecución"
          className="mt-6 grid grid-cols-4 gap-6 lg:gap-8"
        >
          {sections.map((section) => {
            const isActive = section.slug === hoveredSlug;
            return (
              <div
                key={section.slug}
                id={`tab-${section.slug}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${section.slug}`}
                className="flex flex-col text-left pb-2"
              >
                {/* Short Eyebrow */}
                <span
                  className={cx(
                    "label text-xs uppercase tracking-wider transition-colors duration-200",
                    isActive
                      ? "text-brand-800 font-semibold"
                      : "text-ink-muted",
                  )}
                >
                  {section.subtitle || section.shortTitle}
                </span>

                {/* Section title in Marcellus */}
                <Heading
                  as="h4"
                  voice="serif"
                  sizeClassName={cx(
                    "text-lg lg:text-xl transition-colors duration-200 mt-1",
                    isActive
                      ? "text-ink font-normal"
                      : "text-ink-muted/80 font-normal",
                  )}
                >
                  {section.title}
                </Heading>

                {/* Active Indicator Underline */}
                <div
                  className={cx(
                    "mt-3 h-[2px] w-full transition-all duration-300",
                    isActive ? "bg-brand-800" : "bg-transparent",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          MOBILE VIEW (< md): Horizontal scroll carousel (snap-x)
          Self-contained cards (photo, short eyebrow, title, summary, zero expansion)
          ==================================================================== */}
      <div className="md:hidden">
        {/* `relative` contains the cards' absolutely positioned `sr-only` lists:
            without a positioned ancestor they resolve against the initial
            containing block, escape the scroll clip, and widen the document. */}
        <div
          role="region"
          aria-label="Carrusel de especialidades"
          className="relative flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((section) => (
            <article
              key={section.slug}
              id={`mobile-${section.slug}`}
              className="w-[82vw] sm:w-[340px] shrink-0 snap-start flex flex-col"
            >
              {/* Photo aspect 4/3 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                <Photo
                  photo={section.photo}
                  sizes="82vw"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Clean ground details below photo */}
              <div className="mt-4 flex flex-col gap-1.5 flex-1">
                <span className="label text-[11px] text-brand-800 font-semibold uppercase tracking-wider">
                  {section.subtitle || section.shortTitle}
                </span>

                <Heading
                  as="h3"
                  voice="serif"
                  sizeClassName="text-xl text-ink leading-snug"
                >
                  {section.title}
                </Heading>

                <Text
                  size="sm"
                  className="text-ink-muted mt-1 leading-relaxed line-clamp-3"
                >
                  {section.description}
                </Text>

                {/* Complete deliverables in DOM for assistive tech & search engines */}
                <ul className="sr-only">
                  {section.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
