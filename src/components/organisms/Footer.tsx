"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoType, SiteConfig } from "@/types/content";

interface FooterProps {
  site: SiteConfig;
}

const FOOTER_STUDIO_PHOTO: PhotoType = {
  src: "/images/arquitectura-que-perdura/05-volumen-tres-niveles-chukum-remate-palapa.avif",
  alt: "Volumen arquitectónico de tres niveles en chukum con remate de palapa en la costa de Oaxaca",
  width: 829,
  height: 1280,
};

/**
 * Thirdway-style dark architectural footer with vertical ruler scale (`ruler-y`),
 * live scroll-distance meter, real studio photograph thumbnail, and monumental
 * wordmark.
 */
export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear();
  const [metersScrolled, setMetersScrolled] = useState("2.40");

  useEffect(() => {
    const updateDistance = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        window.scrollY,
        1200,
      );
      // 96 CSS px = 1 inch = 0.0254 m
      const meters = (maxScroll * 0.0254) / 96;
      setMetersScrolled(meters.toFixed(2));
    };
    updateDistance();
    window.addEventListener("scroll", updateDistance, { passive: true });
    return () => window.removeEventListener("scroll", updateDistance);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="ruler-y relative overflow-hidden bg-ink text-concha-nacar">
      {/* Left vertical ruler scale numbers (Thirdway signature) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 bottom-10 left-4 hidden flex-col justify-between font-mono text-[0.65rem] tracking-widest text-concha-nacar/45 md:flex"
      >
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
      </div>

      <Container className="py-16 md:py-24 lg:pl-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Navigation + Offices + Contact */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="label mb-5 text-concha-nacar/50">(01) Navegación</p>
              <ul className="flex flex-col gap-3">
                {site.nav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="voice text-xl text-concha-nacar transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label mb-5 text-concha-nacar/50">(02) Sedes</p>
              <ul className="flex flex-col gap-5">
                {site.offices.map((office) => (
                  <li key={office.city} className="flex flex-col gap-1">
                    <span className="voice text-xl text-concha-nacar">
                      {office.city}
                    </span>
                    <span className="text-xs leading-relaxed text-concha-nacar/65">
                      {office.region}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label mb-5 text-concha-nacar/50">
                (03) Contacto directo
              </p>
              <ul className="flex flex-col gap-4">
                {site.contact.map((line) => (
                  <li key={line.href} className="flex flex-col gap-0.5">
                    <span className="text-[0.68rem] tracking-wider text-concha-nacar/50 uppercase">
                      {line.label}
                    </span>
                    <a
                      href={line.href}
                      className="text-sm font-medium text-concha-nacar underline decoration-concha-nacar/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                    >
                      {line.value}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {site.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-concha-nacar/25 px-3 py-1 text-[0.68rem] tracking-wider text-concha-nacar/80 uppercase transition-colors hover:border-concha-nacar hover:bg-concha-nacar hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Thirdway architectural scroll-distance box with real studio photo */}
          <div className="flex flex-col justify-between border border-concha-nacar/20 bg-white/[0.03] p-6 md:p-8 lg:col-span-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="inline-flex rounded-full border border-concha-nacar/35 px-2.5 py-0.5 font-mono text-[0.68rem] text-concha-nacar/80">
                  {`ESCALA 1:100 · ${site.foundedYear}—${year}`}
                </span>
                <p className="display mt-4 text-xl leading-tight text-concha-nacar md:text-2xl">
                  {`HA RECORRIDO ${metersScrolled} METROS DE OBRA CONSTRUIDA EN OAXACA`}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-concha-nacar/65">
                  {site.coverage}
                </p>
              </div>
              <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-concha-nacar/25 bg-ink">
                <Photo
                  photo={FOOTER_STUDIO_PHOTO}
                  sizes="96px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-concha-nacar/15 pt-4">
              <Link
                href="/"
                className="brightness-0 invert"
                aria-label={site.name}
              >
                <Logo />
              </Link>

              <button
                type="button"
                onClick={scrollToTop}
                className="group label inline-flex items-center gap-2.5 text-concha-nacar transition-colors hover:text-white"
              >
                <span className="underline decoration-concha-nacar/40 underline-offset-4 group-hover:decoration-white">
                  Volver arriba
                </span>
                <span className="inline-flex h-6 w-9 items-center justify-center rounded-full border border-concha-nacar/40 bg-concha-nacar text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Monumental architectural wordmark + legal line */}
        <div className="mt-16 border-t border-concha-nacar/15 pt-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.86] tracking-[-0.03em] text-concha-nacar/90">
                CASA ALTA
              </p>
              <p className="mt-2 text-xs tracking-widest text-concha-nacar/55 uppercase">
                {site.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-left md:text-right">
              <p className="label text-concha-nacar/60">
                {`© ${year} ${site.legalName}`}
              </p>
              <p className="text-xs text-concha-nacar/45">{site.claim}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
