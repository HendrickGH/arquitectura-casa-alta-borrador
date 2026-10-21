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
  HighEndFinishesContent,
  InteriorsPageContent,
  Photo as PhotoModel,
  SpaceCategory,
} from "@/types/content";

export interface InteriorsSurfacesExperienceProps {
  inspiration: InteriorsPageContent["inspiration"];
  surfaces: HighEndFinishesContent;
  whatsappHref?: string;
}

export function InteriorsSurfacesExperience({
  inspiration,
  surfaces,
  whatsappHref,
}: InteriorsSurfacesExperienceProps) {
  const content = surfaces;
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModel | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (
    photo: PhotoModel,
    trigger?: HTMLElement | React.MouseEvent<HTMLElement> | null,
    cardId?: string,
  ) => {
    let el: HTMLElement | null = null;
    if (trigger && "currentTarget" in trigger) {
      el = trigger.currentTarget as HTMLElement;
    } else if (trigger instanceof HTMLElement) {
      el = trigger;
    } else if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
    ) {
      el = document.activeElement;
    } else if (cardId) {
      el = document.getElementById(`space-trigger-${cardId}`);
    }
    lastTriggerRef.current = el;
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
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
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
      const trigger = lastTriggerRef.current;
      if (trigger && typeof trigger.focus === "function") {
        trigger.focus();
        requestAnimationFrame(() => {
          if (
            document.activeElement === document.body ||
            !document.activeElement
          ) {
            trigger.focus();
          }
        });
      }
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
                  {/* 1° Photo: Accessible semantic button trigger */}
                  <button
                    id={`space-trigger-${card.id}`}
                    type="button"
                    onClick={(e) =>
                      openLightbox(card.photo, e.currentTarget, card.id)
                    }
                    aria-label={`Ampliar fotografía de ${card.title}`}
                    className="aspect-[4/3] w-full cursor-pointer overflow-hidden bg-bone-100 text-left focus-visible:outline-2 focus-visible:outline-brand-800"
                  >
                    <Photo
                      photo={card.photo}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      fit="cover"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </button>

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

                {/* 5° Action: Min 44px touch target */}
                <div className="mt-5 flex items-center justify-between pt-3.5">
                  <span className="label text-ink-muted">Alta gama</span>
                  <Button
                    id={`space-action-${card.id}`}
                    variant="secondary"
                    size="sm"
                    arrow
                    className="min-h-[44px]"
                    onClick={(e) =>
                      openLightbox(
                        card.photo,
                        e?.currentTarget as HTMLElement,
                        card.id,
                      )
                    }
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
      {content ? (
        <Section tone="bone">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="flex flex-col gap-6 lg:col-span-5">
                <p className="eyebrow">{content.eyebrow}</p>

                <Heading as="h2" voice="serif" className="max-w-[20ch]">
                  {content.heading}
                </Heading>

                <blockquote className="py-2 pl-4">
                  <p className="voice text-lg leading-relaxed text-brand-900 md:text-xl">
                    &ldquo;{content.claim}&rdquo;
                  </p>
                </blockquote>

                <Text className="text-ink-muted">{content.body}</Text>

                <ul className="flex flex-wrap gap-2 pt-1">
                  {content.badges.map((badge) => (
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
                    Cotizar proyecto de interiorismo y cocinas
                  </Button>
                  {whatsappHref ? (
                    <Button
                      href={`${whatsappHref}?text=${encodeURIComponent(
                        "Hola Casa Alta, me interesa cotizar acabados de alta gama y superficies nobles para mi proyecto residencial.",
                      )}`}
                      variant="secondary"
                      external
                      arrow
                      className="min-h-[44px]"
                    >
                      Consultar acabados por WhatsApp
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-10 lg:col-span-7">
                {content.pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="pt-4"
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
      ) : null}

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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full max-h-[80vh]">
              <Photo
                photo={selectedPhoto}
                sizes="95vw"
                fit="contain"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 pt-3 text-white">
              <p className="voice text-sm md:text-base">{selectedPhoto.alt}</p>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Cerrar visor de fotografía"
                className="label inline-flex min-h-[44px] cursor-pointer items-center gap-2 bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
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
