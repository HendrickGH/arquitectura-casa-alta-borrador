import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { HeaderShell } from "@/components/organisms/MotionShell";
import { SiteNav } from "@/components/organisms/SiteNav";
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
 * The navigation is a single component (`SiteNav`) that owns the inline links,
 * the CTA and the burger toggle. It shows the links inline from `xl` -- below
 * that, six tracked labels plus the logo plus the CTA do not fit, so the same
 * links live behind a burger. There is exactly one nav definition, so the two
 * presentations cannot drift apart.
 *
 * The CTA comes from `site.cta`, not from a nav entry. An earlier version found
 * it with `nav.find(link => link.href === "/contacto")`, which returned
 * undefined -- and rendered nothing -- the moment the nav switched to anchors,
 * so the button disappeared without an error.
 *
 * The contact strip is the top row of the same sticky header rather than a band
 * above it. The header is a filled surface at every scroll position, so the
 * photograph starts beneath it rather than running behind it.
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

      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="shrink-0" aria-label={site.name}>
          <Logo />
        </Link>

        <SiteNav
          nav={site.nav}
          cta={site.cta}
          phone={site.contact[0]}
          social={site.social}
        />
      </Container>
    </HeaderShell>
  );
}
