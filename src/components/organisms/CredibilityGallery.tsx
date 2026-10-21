"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Photo as PhotoModel, SectionIntro } from "@/types/content";

interface CredibilityGalleryProps {
  intro: SectionIntro;
  photos: PhotoModel[];
  tone?: "canvas" | "bone";
  id?: string;
}

/**
 * Interactive horizontal scroll gallery displaying on-site supervision photographs
 * in a dual-row continuous ribbon with snap-scrolling and lightbox inspection.
 */
export function CredibilityGallery({
  intro,
  photos,
  tone = "canvas",
  id,
}: CredibilityGalleryProps) {
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePhoto, setActivePhoto] = useState<PhotoModel | null>(null);

  const updateScrollButtons = useCallback(() => {
    const el = galleryTrackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollGallery = (direction: "left" | "right") => {
    const el = galleryTrackRef.current;
    if (!el) return;
    const delta = direction === "left" ? -400 : 400;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <Section
      id={id}
      tone={tone}
      density="default"
      reveal="stagger"
      className="overflow-hidden"
    >
      <Container>
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body}
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                disabled={!canScrollLeft}
                aria-label="Desplazar galería a la izquierda"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon name="arrow-left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery("right")}
                disabled={!canScrollRight}
                aria-label="Desplazar galería a la derecha"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </div>
          }
        />

        <div className="mt-10 overflow-hidden">
          <div
            ref={galleryTrackRef}
            role="region"
            aria-label={intro.heading}
            tabIndex={0}
            onScroll={updateScrollButtons}
            className="grid w-full grid-flow-col gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 focus-visible:outline-2 focus-visible:outline-brand-800 grid-rows-[repeat(2,260px)] sm:grid-rows-[repeat(2,320px)] lg:grid-rows-[repeat(2,380px)] auto-cols-[260px] sm:auto-cols-[320px] lg:auto-cols-[380px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActivePhoto(photo)}
                aria-label={photo.alt}
                className="group relative h-full w-full shrink-0 snap-start cursor-pointer overflow-hidden bg-bone-100 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand-800 focus-visible:outline-offset-2"
              >
                <Photo
                  photo={photo}
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 360px, 300px"
                  priority={index < 4}
                  fit="cover"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-4 md:p-8 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            aria-label="Cerrar vista ampliada"
            className="absolute top-4 right-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-ink text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Photo
              photo={activePhoto}
              sizes="90vw"
              priority
              fit="contain"
              className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
            />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
