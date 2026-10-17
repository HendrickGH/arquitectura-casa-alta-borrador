import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel } from "@/types/content";

interface PageHeroProps {
  badge?: string;
  eyebrow: string;
  heading: string;
  subheadline: string;
  photo: PhotoModel;
}

/**
 * Shared architectural hero for the dedicated division routes (`/servicios`,
 * `/arquitectura-interiores`, `/construccion-sustentable`, `/nosotros`).
 *
 * Uses `fit="contain"` inside a midnight architectural coordinate frame so the
 * photograph is never cropped aggressively, while `.hero-overlay` keeps the
 * floating header and white typography legible at every breakpoint.
 */
export function PageHero({
  badge = "CASA ALTA",
  eyebrow,
  heading,
  subheadline,
  photo,
}: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[64svh] flex-col justify-end overflow-hidden bg-[#081124] sm:min-h-[70svh] lg:min-h-[76svh]"
      style={{ marginTop: "calc(var(--chrome-h, 7.5rem) * -1)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "6rem 6rem",
        }}
      />

      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pt-[var(--chrome-h,7.5rem)]">
        <Photo photo={photo} sizes="100vw" priority fit="contain" />
      </div>

      <div className="hero-overlay absolute inset-0 z-[1]" aria-hidden="true" />

      <Container className="relative z-10 pt-36 pb-12 md:pb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <div className="flex flex-col items-start gap-4">
            <div className="hero-rise hero-rise-1 flex items-center gap-3">
              <span className="number-pill-inverse">{badge}</span>
              <p className="eyebrow text-bone-100">{eyebrow}</p>
            </div>

            <h1 className="voice hero-rise hero-rise-2 max-w-[22ch] text-[clamp(1.85rem,4.2vw,3.5rem)] leading-[1.1] text-white">
              {heading}
            </h1>
          </div>

          <p className="hero-rise hero-rise-3 max-w-[42ch] text-sm leading-relaxed text-white/90 lg:text-right lg:text-base">
            {subheadline}
          </p>
        </div>
      </Container>
    </section>
  );
}
