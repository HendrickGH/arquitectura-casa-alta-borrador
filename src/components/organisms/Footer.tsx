"use client";

import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { Photo } from "@/components/atoms/Photo";
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

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {site.social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border border-concha-nacar/25 px-3 py-1.5 text-concha-nacar/80 transition-colors hover:border-concha-nacar hover:bg-concha-nacar hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Studio institutional box with real studio photo */}
          <div className="flex flex-col justify-between border border-concha-nacar/20 bg-white/[0.03] p-6 md:p-8 lg:col-span-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="label inline-flex border border-concha-nacar/35 px-2.5 py-1 text-concha-nacar/80 tabular-nums">
                  {`Desde ${site.foundedYear} · Oaxaca (${site.foundedYear}—${year})`}
                </span>
                <p className="voice mt-4 text-xl leading-snug text-concha-nacar md:text-2xl">
                  {site.claim}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-concha-nacar/65">
                  {site.coverage}
                </p>
              </div>
              {site.footerPhoto ? (
                <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-concha-nacar/25 bg-ink">
                  <Photo
                    photo={site.footerPhoto}
                    sizes="96px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
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
                aria-label="Volver arriba al inicio de la página"
                className="group label inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 text-concha-nacar transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className="underline decoration-concha-nacar/40 underline-offset-4 group-hover:decoration-white">
                  Volver arriba
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center border border-concha-nacar/40 bg-concha-nacar text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
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
