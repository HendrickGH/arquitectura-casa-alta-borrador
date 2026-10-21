"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { MaterialSwatch } from "@/types/content";

export interface MaterialFinishesMatrixProps {
  eyebrow: string;
  heading: string;
  body: string;
  materials: MaterialSwatch[];
  whatsappHref?: string;
}

const SWATCH_PHOTO_SIZES = "(min-width: 1024px) 50vw, 100vw";

/**
 * Layer 2: Tactile Matrix of Architectural Finishes & Bioclimatic Durability.
 *
 * Replaces plain text bullets with an interactive material selector that pairs
 * macro photography of actual installed stones, woods, and minerals with their
 * technical test specs and resistance attributes in Oaxaca's climate.
 *
 * Adheres to DESIGN.md: 0px geometry, Marcellus/Montserrat hierarchy,
 * zero hairline borders, and pure surface contrast.
 */
export function MaterialFinishesMatrix({
  eyebrow,
  heading,
  body,
  materials,
  whatsappHref = "https://wa.me/529514581395",
}: MaterialFinishesMatrixProps) {
  const [activeId, setActiveId] = useState<string>(materials[0]?.id ?? "");

  const activeMaterial =
    materials.find((m) => m.id === activeId) ?? materials[0];

  if (!materials || materials.length === 0) return null;

  return (
    <Section tone="canvas" density="default">
      <Container>
        <SectionHeading eyebrow={eyebrow} heading={heading} body={body} />

        {/* Material Category Switcher — Cosentino Catalogue Bar (DESIGN.md Section 5.2) */}
        <div
          role="tablist"
          aria-label="Selector de superficies y materiales"
          className="mt-12 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6"
        >
          {materials.map((mat, index) => {
            const isSelected = mat.id === activeMaterial?.id;
            return (
              <button
                key={mat.id}
                role="tab"
                type="button"
                id={`material-tab-${mat.id}`}
                aria-selected={isSelected}
                aria-controls={`material-panel-${mat.id}`}
                onClick={() => setActiveId(mat.id)}
                className={`min-h-[44px] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-brand-50 text-brand-900"
                    : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink"
                }`}
              >
                <span className="tabular-nums mr-2 text-ink-muted">
                  {`0${index + 1}`}
                </span>
                {mat.name.split(" ")[0]} {mat.name.split(" ")[1] ?? ""}
              </button>
            );
          })}
        </div>

        {/* Active Material Architectural Monograph Panel */}
        {activeMaterial ? (
          <div
            id={`material-panel-${activeMaterial.id}`}
            role="tabpanel"
            aria-labelledby={`material-tab-${activeMaterial.id}`}
            className="mt-10 bg-bone-50 p-6 sm:p-8 lg:p-12 transition-opacity duration-300"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
              {/* Macro Texture Photography */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200 lg:col-span-6 lg:aspect-[16/11]">
                <Photo
                  photo={activeMaterial.photo}
                  sizes={SWATCH_PHOTO_SIZES}
                  priority
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              {/* Technical Dossier Content */}
              <div className="flex flex-col justify-between lg:col-span-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="label text-brand-800">
                      {activeMaterial.category}
                    </span>
                  </div>

                  <Heading
                    as="h3"
                    voice="serif"
                    className="mt-3 text-2xl sm:text-3xl lg:text-[2rem] text-ink leading-tight"
                  >
                    {activeMaterial.name}
                  </Heading>

                  <p className="mt-2 text-sm sm:text-base font-medium text-brand-900">
                    {activeMaterial.subtitle}
                  </p>

                  <Text size="base" className="mt-4 text-ink-muted leading-relaxed">
                    {activeMaterial.description}
                  </Text>

                  {/* Technical Specifications Breakdown with 0px Square Bullets */}
                  <div className="mt-8 space-y-3">
                    <p className="label text-[0.6875rem] text-ink-muted">
                      Comprobaciones Técnicas y Resistencia
                    </p>
                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {activeMaterial.specs.map((spec, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-ink leading-snug"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800"
                          />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6">
                  <Button
                    variant="primary"
                    href={`${whatsappHref.split("?")[0]}?text=${encodeURIComponent(
                      `Hola Casa Alta, me interesa conocer muestras y cotizar el material: ${activeMaterial.name}. Quisiera agendar asesoría técnica gratuita.`,
                    )}`}
                    external
                    arrow
                  >
                    Consultar muestras de este material
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
