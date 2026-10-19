"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { Tabs } from "@/components/molecules/Tabs";
import type {
  InteriorsPageContent,
  Photo as PhotoModel,
  SpaceCategory,
} from "@/types/content";

interface CosentinoExperienceProps {
  inspiration: InteriorsPageContent["inspiration"];
  cosentino: InteriorsPageContent["cosentino"];
}

export function CosentinoInspirationExperience({
  inspiration,
  cosentino,
}: CosentinoExperienceProps) {
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModel | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (photo: PhotoModel) => {
    if (document.activeElement instanceof HTMLElement) {
      lastTriggerRef.current = document.activeElement;
    }
    setSelectedPhoto(photo);
  };

  useEffect(() => {
    if (!selectedPhoto) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastTriggerRef.current?.focus();
    };
  }, [selectedPhoto]);

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

  return (
    <>
      {/* ---------------- SECTION 1: Catálogo de Espacios ---------------- */}
      <Section tone="canvas">
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

          {/* Canonical Clean-Ground Space Cards */}
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card) => (
              <article
                key={card.id}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* 1° Photo */}
                  <div
                    onClick={() => openLightbox(card.photo)}
                    className="aspect-[4/3] w-full cursor-pointer overflow-hidden bg-bone-100"
                  >
                    <Photo
                      photo={card.photo}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      fit="cover"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* 2° Metadata */}
                  <span className="label mt-4 block text-brand-800">
                    {card.categoryLabel}
                  </span>

                  {/* 3° Title */}
                  <Heading
                    as="h3"
                    voice="serif"
                    sizeClassName="mt-2 text-[1.35rem] leading-[1.15] md:text-[1.5rem] transition-colors group-hover:text-brand-800"
                  >
                    {card.title}
                  </Heading>

                  {/* 4° Summary */}
                  <Text size="sm" className="mt-2 text-ink-muted">
                    {card.materials}
                  </Text>
                </div>

                {/* 5° Action */}
                <div className="mt-5 flex items-center justify-between border-t border-bone-200 pt-3.5">
                  <span className="label text-ink-muted">Alta gama</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    arrow
                    onClick={() => openLightbox(card.photo)}
                  >
                    Ampliar fotografía
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- SECTION 2: Technical Certification Pillars ---------------- */}
      <Section tone="bone">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col gap-6 lg:col-span-5">
              <p className="eyebrow">{cosentino.eyebrow}</p>

              <Heading as="h2" voice="serif" className="max-w-[20ch]">
                {cosentino.heading}
              </Heading>

              <blockquote className="border-l-2 border-brand-800 py-2 pl-6">
                <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                  &ldquo;{cosentino.claim}&rdquo;
                </p>
              </blockquote>

              <Text className="text-ink-muted">{cosentino.body}</Text>

              <ul className="flex flex-wrap gap-2 pt-1">
                {cosentino.badges.map((badge) => (
                  <li
                    key={badge}
                    className="label border border-bone-200 bg-canvas px-3 py-1.5 text-ink"
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
                  className="border-t border-bone-200 pt-6"
                >
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

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto ? (
        <div
          ref={dialogRef}
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

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/20 pt-3 text-white">
              <p className="voice text-sm md:text-base">{selectedPhoto.alt}</p>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Cerrar visor de fotografía"
                className="label inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-white/40 px-4 py-2 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Cerrar</span>
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
