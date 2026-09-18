import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { NavItem } from "@/components/molecules/NavItem";
import { HeaderShell } from "@/components/organisms/MotionShell";
import { UtilityBar } from "@/components/organisms/UtilityBar";
import type { SiteConfig } from "@/types/content";

interface HeaderProps {
  site: SiteConfig;
  /**
   * The hero's authored chrome polarity, when one has been measured and
   * authored. Undefined today, which keeps the header filled at every scroll
   * position; see `home.hero.chrome`.
   */
  chrome?: "ink" | "canvas";
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
 *
 * The contact strip is the top row of the same sticky header rather than a band
 * above it. That is what lets the hero photograph run to the top edge of the
 * page: over the hero both rows are transparent, so the image is unbroken
 * behind them, and both invert to the filled surface together on scroll.
 *
 * Every string and link here is composed on the server; `HeaderShell` only adds
 * the scroll state and the `--chrome-h` measurement around them.
 */
export function Header({ site, chrome }: HeaderProps) {
  return (
    <HeaderShell chrome={chrome}>
      <UtilityBar
        claim={site.claim}
        phone={site.contact[0]}
        social={site.social}
      />

      <Container className="flex items-center justify-between gap-6 pb-4 pt-1">
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

        <Button href={site.cta.href} className="chrome-cta shrink-0">
          {site.cta.label}
        </Button>
      </Container>
    </HeaderShell>
  );
}
