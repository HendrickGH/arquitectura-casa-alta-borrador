import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
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
 * - Architectural 16:9 cinematic video stage with high-resolution poster.
 * - Clear conversion CTA directing to /servicios.
 */
export function VirtualTourSection({
  tour,
  id = "recorrido-virtual",
  tone = "canvas",
}: VirtualTourSectionProps) {
  if (!tour) return null;

  return (
    <Section id={id} tone={tone} density="default">
      <Container>
        {/* Section Header with Hook phrase */}
        <SectionHeading
          eyebrow={tour.eyebrow ?? "Recorrido virtual"}
          heading={tour.heading}
          body={tour.hook}
          action={
            <Button
              href={tour.cta.href || "/servicios"}
              variant="primary"
              size="md"
              arrow
            >
              {tour.cta.label || "Conoce nuestros servicios"}
            </Button>
          }
          className="mb-8 md:mb-12"
        />

        {/* Cinematic Video Stage */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
          {tour.videoSrc ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={tour.poster.src}
              className="h-full w-full object-cover"
            >
              <source src={tour.videoSrc} type="video/mp4" />
              Tu navegador no soporta el formato de video.
            </video>
          ) : (
            <div className="relative h-full w-full">
              <Photo
                photo={tour.poster}
                sizes="(min-width: 1440px) 1400px, 100vw"
                fit="cover"
                className="h-full w-full object-cover opacity-90"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="label text-xs tracking-widest text-white/80 uppercase">
                  Recorrido virtual guiado
                </span>
                <p className="voice mt-2 text-2xl md:text-3xl lg:text-4xl text-white">
                  {tour.heading}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center bg-white text-ink transition-transform duration-300 hover:scale-105">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-6 w-6"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Action Bar */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button
            href={tour.cta.href || "/servicios"}
            variant="primary"
            size="md"
            arrow
            className="w-full justify-center"
          >
            {tour.cta.label || "Conoce nuestros servicios"}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
