"use client";

import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import type { SiteConfig } from "@/types/content";

interface FooterProps {
  site: SiteConfig;
}

/**
 * Dark architectural footer (`--color-ink`) with 0px geometry, studio office
 * presence, and monumental wordmark.
 */
export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-concha-nacar">
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Navigation + Offices + Contact */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="label mb-5 text-concha-nacar/50">Navegación</p>
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
              <p className="label mb-5 text-concha-nacar/50">Sedes</p>
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
                Contacto directo
              </p>
              <ul className="flex flex-col gap-4">
                {site.contact.map((line) => (
                  <li key={line.href} className="flex flex-col gap-0.5">
                    <span className="label text-concha-nacar/50">
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

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {site.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-concha-nacar/80 underline decoration-concha-nacar/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: claim, coverage, logo */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="voice text-xl leading-snug text-concha-nacar md:text-2xl">
                {site.claim}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-concha-nacar/65">
                {site.coverage}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4">
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
                aria-label="Volver arriba al inicio de la página"
                className="group label inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-concha-nacar transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className="underline decoration-concha-nacar/40 underline-offset-4 group-hover:decoration-white">
                  Volver arriba
                </span>
                <span className="inline-flex items-center justify-center text-concha-nacar transition-transform duration-300 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Monumental architectural wordmark + legal line */}
        <div className="mt-16 pt-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.86] tracking-[-0.03em] text-concha-nacar/90">
                CASA ALTA
              </p>
              <p className="label mt-2 text-concha-nacar/55">{site.tagline}</p>
            </div>

            <div className="flex flex-col gap-1 text-left md:text-right">
              <p className="label text-concha-nacar/60 tabular-nums">
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
