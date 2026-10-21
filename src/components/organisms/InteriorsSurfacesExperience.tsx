"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Tabs } from "@/components/molecules/Tabs";
import { SpaceDossierModal } from "@/components/organisms/SpaceDossierModal";
import type {
  HighEndFinishesContent,
  InteriorsPageContent,
  SpaceCategory,
  SpaceDossier,
} from "@/types/content";

export interface InteriorsSurfacesExperienceProps {
  inspiration: InteriorsPageContent["inspiration"];
  engineeringGuarantee?: InteriorsPageContent["engineeringGuarantee"];
  surfaces?: HighEndFinishesContent;
  whatsappHref?: string;
}

/**
 * Layers 3 & 4: Space Explorer with Technical Dossiers & DRO Engineering Guarantee.
 *
 * Space Explorer (Layer 3 - tone="bone"):
 *   Presents residential spaces organized by architectural typologies. Every card
 *   opens a comprehensive SpaceDossierModal with specs, joinery details,
 *   delivery time, and contextual WhatsApp routing.
 *
 * Engineering Guarantee (Layer 4 - tone="canvas"):
 *   Articulates detail engineering, laser scanning, anti-seismic joints,
 *   and formal contractual DRO warranty.
 *
 * Adheres strictly to DESIGN.md: 0px geometry, Marcellus/Montserrat hierarchy,
 * zero hairline borders, and pure surface contrast.
 */
export function InteriorsSurfacesExperience({
  inspiration,
  engineeringGuarantee,
  surfaces,
  whatsappHref = "https://wa.me/529514581395",
}: InteriorsSurfacesExperienceProps) {
  const guaranteeContent = engineeringGuarantee ?? surfaces;
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>("all");
  const [selectedSpace, setSelectedSpace] = useState<SpaceDossier | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const openDossier = (
    space: SpaceDossier,
    triggerEl?: HTMLElement | null,
  ) => {
    activeTriggerRef.current = triggerEl ?? null;
    setSelectedSpace(space);
  };

  const filteredCards = useMemo(() => {
    if (activeCategory === "all") return inspiration.spaces;
    return inspiration.spaces.filter(
      (card) => card.category === activeCategory,
    );
  }, [inspiration.spaces, activeCategory]);

  const tabsWithCounts = useMemo(
    () =>
      inspiration.tabs.map((tab) => ({
        ...tab,
        count:
          tab.id === "all"
            ? inspiration.spaces.length
            : inspiration.spaces.filter((s) => s.category === tab.id).length,
      })),
    [inspiration.tabs, inspiration.spaces],
  );

  const droWhatsappHref = useMemo(() => {
    const baseClean = whatsappHref.split("?")[0];
    const msg =
      "Hola Casa Alta, me interesa conocer la garantía técnica y respaldo DRO para mi proyecto de interiores y acabados.";
    return `${baseClean}?text=${encodeURIComponent(msg)}`;
  }, [whatsappHref]);

  return (
    <>
      {/* ---------------- LAYER 3: Explorador de Espacios (tone="bone") ---------------- */}
      <section id="espacios">
        <Section tone="bone" density="default">
          <Container>
            <SectionHeading
              eyebrow={inspiration.eyebrow}
              heading={inspiration.heading}
              body={inspiration.body}
            />

            <Tabs
              tabs={tabsWithCounts}
              activeId={activeCategory}
              onChange={setActiveCategory}
              ariaLabel="Filtrar por tipología de espacio"
              className="mt-10"
            />

            {/* Clean-Ground Space Dossier Cards */}
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card) => (
                <article
                  key={card.id}
                  className="group flex flex-col justify-between bg-canvas p-4 sm:p-5 transition-shadow duration-300 hover:shadow-lg"
                >
                  <div>
                    {/* Visual Card Trigger */}
                    <button
                      id={`space-trigger-${card.id}`}
                      type="button"
                      onClick={(e) => openDossier(card, e.currentTarget)}
                      aria-label={`Abrir ficha técnica de ${card.title}`}
                      className="aspect-[4/3] w-full cursor-pointer overflow-hidden bg-bone-200 text-left focus-visible:outline-2 focus-visible:outline-brand-800"
                    >
                      <Photo
                        photo={card.photo}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        fit="cover"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Metadata & Tag */}
                    <span className="label mt-4 block text-brand-800">
                      {card.categoryLabel}
                    </span>

                    {/* Architectural Title */}
                    <Heading
                      as="h3"
                      voice="serif"
                      sizeClassName="mt-2 text-[1.35rem] leading-[1.15] md:text-[1.5rem] transition-colors group-hover:text-brand-800"
                    >
                      {card.title}
                    </Heading>

                    {/* Materials Summary */}
                    <Text size="sm" className="mt-2 text-ink-muted">
                      {card.materials}
                    </Text>
                  </div>

                  {/* Footer Action Bar */}
                  <div className="mt-6 flex items-center justify-between pt-4">
                    <span className="label text-[0.6875rem] text-ink-muted tabular-nums">
                      {`REF · ${card.id.toUpperCase()}`}
                    </span>
                    <Button
                      id={`space-action-${card.id}`}
                      variant="secondary"
                      size="sm"
                      arrow
                      className="min-h-[44px]"
                      onClick={(e) =>
                        openDossier(card, e?.currentTarget as HTMLElement)
                      }
                    >
                      Ver ficha técnica
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      </section>

      {/* ---------------- LAYER 4: Ingeniería de Detalle & Respaldo DRO (tone="canvas") ---------------- */}
      {guaranteeContent ? (
        <Section tone="canvas" density="default">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: DRO Value Proposition & Guarantee Badges */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <p className="eyebrow">{guaranteeContent.eyebrow}</p>

                <Heading as="h2" voice="serif" className="max-w-[20ch]">
                  {guaranteeContent.heading}
                </Heading>

                <blockquote className="py-2 pl-4">
                  <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                    &ldquo;{guaranteeContent.claim}&rdquo;
                  </p>
                </blockquote>

                <Text className="text-ink-muted">{guaranteeContent.body}</Text>

                {/* 0px Badges — Pure surface contrast, zero border-color (DESIGN.md Section 4.1) */}
                <ul className="flex flex-wrap gap-2 pt-1">
                  {guaranteeContent.badges.map((badge) => (
                    <li
                      key={badge}
                      className="label bg-bone-100 px-3 py-1.5 text-ink"
                    >
                      {badge}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button href="/contacto" arrow>
                    Agendar asesoría técnica sin costo
                  </Button>
                  {whatsappHref ? (
                    <Button
                      href={droWhatsappHref}
                      variant="secondary"
                      external
                      arrow
                      className="min-h-[44px]"
                    >
                      Consultar con Perito DRO
                    </Button>
                  ) : null}
                </div>
              </div>

              {/* Right Column: 3 Certified Technical Pillars */}
              <div className="flex flex-col gap-10 lg:col-span-7">
                {guaranteeContent.pillars.map((pillar) => (
                  <div key={pillar.number} className="pt-4">
                    <span className="label text-brand-800 tabular-nums">
                      {pillar.number}
                    </span>
                    <Heading
                      as="h3"
                      voice="serif"
                      sizeClassName="mt-3 text-2xl leading-snug"
                    >
                      {pillar.title}
                    </Heading>
                    <Text className="mt-3 text-ink-muted">
                      {pillar.description}
                    </Text>
                    {pillar.items && pillar.items.length > 0 ? (
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {pillar.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-ink/85"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Accessible Space Dossier Modal */}
      <SpaceDossierModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
        whatsappBaseHref={whatsappHref}
        triggerRef={activeTriggerRef}
      />
    </>
  );
}
