"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { PhotoLightboxModal } from "@/components/molecules/PhotoLightboxModal";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { useCarouselScroll } from "@/lib/hooks/useCarouselScroll";
import type { Photo as PhotoModel, SectionIntro } from "@/types/content";

interface CredibilityGalleryProps {
  intro: SectionIntro;
  photos: PhotoModel[];
  tone?: "canvas" | "bone";
  id?: string;
}

/**
 * Interactive horizontal scroll gallery (`CredibilityGallery`).
 *
 * Displays on-site supervision photographs in a dual-row continuous ribbon
 * with snap-scrolling controls and lightbox inspection.
 */
export function CredibilityGallery({
  intro,
  photos,
  tone = "canvas",
  id,
}: CredibilityGalleryProps) {
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoModel | null>(null);

  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight, updateScrollState } =
    useCarouselScroll(galleryTrackRef, { fallbackWidth: 380, gap: 16 });

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
            <CarouselNavButtons
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              prevLabel="Desplazar galería a la izquierda"
              nextLabel="Desplazar galería a la derecha"
            />
          }
        />

        <div className="mt-10 overflow-hidden">
          <div
            ref={galleryTrackRef}
            role="region"
            aria-label={intro.heading}
            tabIndex={0}
            onScroll={updateScrollState}
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
      <PhotoLightboxModal
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
      />
    </Section>
  );
}
