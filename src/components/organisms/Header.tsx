import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { NavItem } from "@/components/molecules/NavItem";
import type { SiteConfig } from "@/types/content";

interface HeaderProps {
  site: SiteConfig;
}

/**
 * Sticky header: logo, navigation, primary CTA.
 *
 * The nav is hidden below `lg` rather than `md`, and that is a measurement, not
 * a preference: six tracked labels plus the logo plus the CTA need about 560px
 * of the 688px available at 768px, so a `md` breakpoint overflowed the viewport
 * between 768px and 1024px. There is no hamburger because there is no client
 * JS; at 375px the header is the logo and the CTA, which is the whole point of
 * the sticky bar.
 *
 * The CTA comes from `site.cta`, not from a nav entry. An earlier version found
 * it with `nav.find(link => link.href === "/contacto")`, which returned
 * undefined -- and rendered nothing -- the moment the nav switched to anchors,
 * so the button disappeared without an error.
 */
export function Header({ site }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-bone-200 bg-canvas/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="shrink-0" aria-label={site.name}>
          <Logo />
        </Link>

        <nav className="hidden lg:block">
          {/* gap-7 only from xl: the six tracked labels plus the logo and the
              CTA come to 893px, which is within 3px of the 896px available at
              exactly 1024px. gap-4 leaves 63px of slack there. */}
          <ul className="flex items-center gap-4 xl:gap-7">
            {site.nav.map((link) => (
              <li key={link.href}>
                <NavItem link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <Button href={site.cta.href} className="shrink-0">
          {site.cta.label}
        </Button>
      </Container>
    </header>
  );
}
