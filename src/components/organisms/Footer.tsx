import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { Rule } from "@/components/atoms/Rule";
import { ContactItem } from "@/components/molecules/ContactItem";
import { NavItem } from "@/components/molecules/NavItem";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import type { SiteConfig } from "@/types/content";

interface FooterProps {
  site: SiteConfig;
}

/**
 * The footer carries the facts that did not fit above: where the offices are,
 * how to reach them, and the coverage. Hairlines do the separating, so nothing
 * needs a heading to explain what a column is.
 *
 * The year is read at build time; the site is static, so it moves when the site
 * is rebuilt.
 */
export function Footer({ site }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-canvas">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 md:gap-10 md:py-20 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Link href="/" className="w-fit" aria-label={site.name}>
              <Logo />
            </Link>
            <p className="max-w-[28ch] text-sm text-ink-muted">
              {site.coverage}
            </p>
            <ul className="flex items-center gap-4">
              {site.social.map((link) => (
                <li key={link.label}>
                  <SocialLinkItem link={link} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ul className="flex flex-col gap-4">
              {site.offices.map((office) => (
                <li key={office.city} className="flex flex-col gap-1">
                  <span className="text-sm text-ink">{office.city}</span>
                  <span className="label text-ink-muted">{office.region}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ul className="flex flex-col gap-5">
              {site.contact.map((line) => (
                <li key={line.href}>
                  <ContactItem line={line} />
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-3">
            <ul className="flex flex-col gap-3">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <NavItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <Rule />

      <Container>
        <div className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
          <p className="label text-ink-muted">
            {`© ${year} ${site.legalName}`}
          </p>
          <p className="label text-ink-muted">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
