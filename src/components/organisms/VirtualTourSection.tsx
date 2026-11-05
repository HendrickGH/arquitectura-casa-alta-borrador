"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { VirtualTourContent } from "@/types/content";

interface VirtualTourSectionProps {
  tour?: VirtualTourContent;
  id?: string;
  tone?: "canvas" | "bone";
}

/**
 * Editorial Virtual Tour Video Section (`Casa Charco Seco`).
 * Adheres strictly to DESIGN.md:
 * - 0px orthogonal geometry.
 * - SectionHeading molecular hierarchy.
 * - Interactive cinematic teaser card opening a lazy-loaded video modal on click.
 * - 0px square accessible close button with focus handling and ESC closure.
 * - Clear conversion CTA directing to /servicios.
 */
export function VirtualTourSection({
  tour,
  id = "recorrido-virtual",
  tone = "canvas",
}: VirtualTourSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open for accessibility
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!tour) return null;

  return (
    <>
      <Section id={id} tone={tone} density="default">
        <Container>
          {/* Section Header with Hook phrase */}
          <SectionHeading
            eyebrow={tour.eyebrow ?? "Recorrido virtual"}
            heading={tour.heading}
            body={tour.hook}
            className="mb-8 md:mb-12"
          />

          {/* Cinematic Interactive Video Trigger Card */}
          <div
            onClick={() => setIsOpen(true)}
            className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden bg-ink"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen(true);
              }
            }}
            aria-label="Reproducir recorrido virtual de Casa Charco Seco"
          >
            <Photo
              photo={tour.poster}
              sizes="(min-width: 1440px) 1400px, 100vw"
              fit="cover"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <span className="label text-xs tracking-widest text-white/80 uppercase">
                Recorrido virtual guiado
              </span>
              <p className="voice mt-2 text-2xl sm:text-3xl lg:text-4xl text-white">
                {tour.heading}
              </p>
              <div className="mt-6 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center bg-white text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-7 w-7"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-xs font-medium tracking-wider text-white/80 uppercase">
                Click para ver el recorrido completo
              </p>
            </div>
          </div>

          {/* Architectural Narrative Caption & CTA */}
          {(tour.paragraphs && tour.paragraphs.length > 0) || tour.closing ? (
            <div className="mt-8 flex w-full flex-col gap-4">
              <div className="flex flex-col gap-3">
                {tour.paragraphs?.map((para, idx) => (
                  <Text
                    key={idx}
                    size="base"
                    className="text-ink-muted leading-relaxed text-justify"
                  >
                    {para}
                  </Text>
                ))}
              </div>

              <div className="mt-2 flex flex-col justify-between gap-6 pt-1 md:flex-row md:items-center">
                {tour.closing ? (
                  <div className="pt-2">
                    <span className="label text-brand-800">
                      CASA ALTA | Arquitectura Costa Natura
                    </span>
                    <Text
                      size="base"
                      className="mt-1 font-medium text-ink leading-relaxed"
                    >
                      {tour.closing}
                    </Text>
                  </div>
                ) : <div />}

                <div className="shrink-0">
                  <Button
                    href={tour.cta.href || "/servicios"}
                    variant="primary"
                    size="md"
                    arrow
                    className="w-full justify-center sm:w-auto"
                  >
                    {tour.cta.label || "Conoce nuestros servicios"}
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Lazy-Loaded Video Player Modal */}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${tour.heading}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 sm:p-6 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Close button (0px square, 44x44px minimum touch area per DESIGN.md) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar video"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          {/* Modal Content / Video Wrapper */}
          <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center">
            {tour.videoSrc ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="auto"
                poster={tour.poster.src}
                className="max-h-[85vh] w-auto max-w-[90vw] bg-black shadow-2xl object-contain"
              >
                <source src={tour.videoSrc} type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
