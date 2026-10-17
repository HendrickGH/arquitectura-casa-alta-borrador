"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import type { Photo as PhotoModel, ThematicPillar } from "@/types/content";

interface CosentinoExperienceProps {
  cosentino: {
    eyebrow: string;
    heading: string;
    claim: string;
    body: string;
    badges: string[];
    pillars: ThematicPillar[];
  };
  interiorsPhotos: PhotoModel[];
  lifestylePhotos: PhotoModel[];
}

type SpaceCategory = "all" | "cocinas" | "banos" | "interiores" | "showroom";

interface SpaceCard {
  id: string;
  category: SpaceCategory;
  categoryLabel: string;
  title: string;
  materials: string;
  photo: PhotoModel;
}

const CATEGORY_TABS: Array<{ id: SpaceCategory; label: string }> = [
  { id: "all", label: "Todos los espacios" },
  { id: "cocinas", label: "Cocinas e Islas" },
  { id: "banos", label: "Baños residenciales" },
  { id: "interiores", label: "Comedores y galerías" },
  { id: "showroom", label: "Showroom y Convivencia" },
];

export function CosentinoInspirationExperience({
  cosentino,
  interiorsPhotos,
  lifestylePhotos,
}: CosentinoExperienceProps) {
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModel | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedPhoto]);

  // Curate all meaningful design items mapped from real project and showroom photography
  const allCards: SpaceCard[] = useMemo(() => {
    const list: SpaceCard[] = [];

    // Categorize interior architecture photos
    interiorsPhotos.forEach((photo, idx) => {
      const src = photo.src;
      if (src.includes("bano") || src.includes("lavabo")) {
        list.push({
          id: `bano-${idx}`,
          category: "banos",
          categoryLabel: "Baño residencial",
          title: src.includes("marmol")
            ? "Baño principal en mármol con luz perimetral"
            : "Lavabo flotante negro mate y monomando",
          materials: "Mármol importado · Herrajes y monomando negro mate",
          photo,
        });
      } else if (
        src.includes("isla") ||
        src.includes("cocina") ||
        src.includes("cubierta")
      ) {
        list.push({
          id: `cocina-${idx}`,
          category: "cocinas",
          categoryLabel: "Cocina e Isla",
          title: src.includes("piedra")
            ? "Isla monolítica en piedra sinterizada"
            : src.includes("ventanal")
              ? "Cocina integral integrada a patio interior"
              : "Cubierta continua con veta lineal",
          materials: "Superficie ultracompacta Cosentino · Veta continua",
          photo,
        });
      } else {
        list.push({
          id: `interior-${idx}`,
          category: "interiores",
          categoryLabel: "Comedor y estancia",
          title: src.includes("galeria")
            ? "Pasillo galería con muro terracota"
            : "Comedor residencial en parota con vista a jardín",
          materials: "Madera tropical certificada · Acabado concha nácar",
          photo,
        });
      }
    });

    // Add curated showroom lifestyle photos
    lifestylePhotos.slice(0, 6).forEach((photo, idx) => {
      list.push({
        id: `lifestyle-${idx}`,
        category: "showroom",
        categoryLabel: "Showroom Casa Alta",
        title: idx === 0
          ? "Convivencia diaria en isla de piedra natural"
          : idx === 1
            ? "Barra contemporánea con iluminación cálida"
            : "Cocina integral negro mate en showroom",
        materials: "Superficies Cosentino de importación · Mobiliario sobre diseño",
        photo,
      });
    });

    return list;
  }, [interiorsPhotos, lifestylePhotos]);

  const filteredCards = useMemo(() => {
    if (activeCategory === "all") return allCards;
    return allCards.filter((card) => card.category === activeCategory);
  }, [allCards, activeCategory]);

  return (
    <>
      {/* ---------------- SECTION 1: Meaningful Design to Inspire People's Lives ---------------- */}
      <Section tone="canvas" className="!pt-16 !pb-20 md:!pt-24 md:!pb-28">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-[48ch]">
              <p className="eyebrow">Meaningful Design to Inspire People’s Lives</p>
              <Heading as="h2" voice="serif" className="mt-4 text-3xl md:text-5xl">
                Diseño con propósito para inspirar la vida de las personas.
              </Heading>
              <Text className="mt-4 text-ink-muted">
                {cosentino.claim} Cada superficie y espacio está concebido para resistir el tiempo,
                el clima costero y enriquecer la convivencia cotidiana.
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <span className="number-pill">
                {`${String(filteredCards.length).padStart(2, "0")} ESPACIOS`}
              </span>
            </div>
          </div>

          {/* Cosentino-style horizontal category tabs */}
          <div className="mt-10 border-b border-ink/15 pb-4">
            <div
              role="tablist"
              aria-label="Filtrar por tipología de espacio"
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`label inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-ink/20 bg-transparent text-ink hover:border-ink"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tall portrait cards (Cosentino layout: aspect-[3/4.2], pure minimalism) */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPhoto(card.photo)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPhoto(card.photo);
                  }
                }}
                aria-label={`Ver detalle de espacio: ${card.title}`}
                className="group relative aspect-[3/4.2] w-full cursor-pointer overflow-hidden bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* Background Photo */}
                <div className="absolute inset-0 h-full w-full">
                  <Photo
                    photo={card.photo}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    fit="cover"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/40 opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                {/* Top badge */}
                <div className="absolute left-6 top-6 z-10">
                  <span className="label rounded-full border border-white/40 bg-ink/40 px-3 py-1 text-[0.65rem] text-white/95 backdrop-blur-md">
                    {card.categoryLabel}
                  </span>
                </div>

                {/* Bottom metadata */}
                <div className="absolute inset-x-6 bottom-6 z-10 flex flex-col gap-2">
                  <h3 className="voice text-xl leading-snug text-white transition-colors group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/75">
                    {card.materials}
                  </p>

                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/15">
                    <span className="label text-[0.68rem] text-white/70">
                      Explorar detalle
                    </span>
                    <span
                      aria-hidden="true"
                      className="arrow-pill border-white/40 bg-white/10 text-white group-hover:border-white group-hover:bg-white group-hover:text-ink"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="arrow-pill-out h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path
                          d="M2.5 8h11m-4-4 4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 16 16"
                        className="arrow-pill-in h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path
                          d="M2.5 8h11m-4-4 4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- SECTION 2: Technical Certification Pillars ---------------- */}
      <Section tone="bone" className="!pt-16 !pb-20 md:!pt-20 md:!pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col gap-6 lg:col-span-5">
              <p className="eyebrow">{cosentino.eyebrow}</p>

              <Heading as="h2" voice="serif" className="max-w-[20ch]">
                {cosentino.heading}
              </Heading>

              <blockquote className="border-l-2 border-brand-800 pl-6 py-2">
                <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                  &ldquo;{cosentino.claim}&rdquo;
                </p>
              </blockquote>

              <Text className="text-ink-muted">{cosentino.body}</Text>

              <ul className="flex flex-wrap gap-2 pt-1">
                {cosentino.badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink"
                  >
                    {badge}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <Button href="/contacto" arrow>
                  Cotizar proyecto de interiorismo y cocinas
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-10 lg:col-span-7">
              {cosentino.pillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="ruler-top border-t border-ink/20 pt-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="number-pill">{`(${pillar.number})`}</span>
                  </div>
                  <h3 className="voice mt-4 text-2xl text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>
                  {pillar.items && pillar.items.length > 0 ? (
                    <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-ink/80"
                        >
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-800" />
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

      {/* ---------------- SECTION 3: Galerías de Inspiración ---------------- */}
      <Section tone="canvas" className="!pt-16 !pb-24 md:!pt-24 md:!pb-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-[48ch]">
              <p className="eyebrow">Galerías de inspiración</p>
              <Heading as="h2" voice="serif" className="mt-4 text-3xl md:text-5xl">
                Espacios habitados, superficies que perduran.
              </Heading>
              <Text className="mt-4 text-ink-muted">
                Explore nuestra colección fotográfica de obra concluida: piedra veteada, carpintería
                en maderas tropicales, iluminación integrada y el showroom en escala real.
              </Text>
            </div>

            <span className="number-pill self-start lg:self-auto">
              {`${String(allCards.length).padStart(2, "0")} OBRAS TOTALES`}
            </span>
          </div>

          {/* Clean architectural photo gallery (zero box borders, pure photography) */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allCards.map((card) => (
              <figure
                key={card.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedPhoto(card.photo)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPhoto(card.photo);
                  }
                }}
                aria-label={`Ver fotografía ampliada: ${card.title}`}
                className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Photo
                  photo={card.photo}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  fit="cover"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <figcaption className="absolute inset-x-4 bottom-4 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="label text-[0.65rem] text-white/80">
                    {card.categoryLabel}
                  </p>
                  <p className="voice text-base text-white">
                    {card.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.alt || "Visor de fotografía"}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full min-w-[300px] sm:min-w-[500px] md:min-w-[750px] lg:min-w-[900px]">
              <Photo
                photo={selectedPhoto}
                sizes="95vw"
                fit="contain"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-white">
              <p className="voice text-sm md:text-base">
                {selectedPhoto.alt}
              </p>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Cerrar visor de fotografía"
                className="label inline-flex min-h-[44px] items-center rounded-full border border-white/40 px-4 py-2 text-xs text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
              >
                Cerrar ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
