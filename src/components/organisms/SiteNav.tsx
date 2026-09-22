"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { useNavOpen } from "@/components/organisms/MotionShell";
import { NavItem } from "@/components/molecules/NavItem";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import type {
  CallToAction,
  ContactLine,
  NavLink,
  SocialLink,
} from "@/types/content";

interface SiteNavProps {
  nav: NavLink[];
  cta: CallToAction;
  /** The primary phone line; the first entry of the site's contact list. */
  phone: ContactLine;
  social: SocialLink[];
}

/** Tailwind's `xl` breakpoint. The burger owns the nav below this width. */
const XL_QUERY = "(min-width: 1280px)";

/**
 * The site's single navigation.
 *
 * One component owns the whole nav so there is exactly one definition of the
 * links: inline from `xl`, behind a burger below it. The burger reveals the
 * same links plus the phone and social profiles that the collapsed header drops.
 *
 * The overlay is portalled to `document.body` rather than rendered inside the
 * `<header>`: a `fixed` descendant of a `position: sticky` ancestor would
 * position against the header (which also carries a `transform` while it hides
 * on scroll) instead of the viewport.
 */
export function SiteNav({ nav, cta, phone, social }: SiteNavProps) {
  const { open, setOpen } = useNavOpen();

  // Lock scroll while open, close on Escape, and close if the viewport crosses
  // into `xl` (where the inline nav takes over).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const media = window.matchMedia(XL_QUERY);
    const onMedia = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      document.documentElement.style.overflow = previous;
    };
  }, [open, setOpen]);

  // Closes and releases the scroll lock synchronously. A link click navigates
  // (to a route or a hash) in the same event, before React flushes the effect
  // cleanup above -- so the lock must come off here or the hash scroll lands on
  // a page that is still `overflow: hidden` and stays put.
  const close = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  const overlay = open ? (
    <div
      id="site-nav"
      className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-canvas xl:hidden"
      style={{ top: "var(--chrome-h)" }}
    >
      <Container className="flex flex-col gap-10 py-8">
        <nav aria-label="Principal">
          <ul className="flex flex-col">
            {nav.map((link) => (
              <li key={link.href} className="border-b border-bone-200">
                <Link
                  href={link.href}
                  onClick={close}
                  className="label block py-4 text-base text-ink transition-colors duration-200 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6">
          <a
            href={phone.href}
            className="flex items-center gap-3 text-ink transition-colors duration-200 hover:text-brand-700"
          >
            <Icon name="phone" className="h-5 w-5 shrink-0" />
            <span className="text-sm">{phone.value}</span>
          </a>

          <ul className="flex items-center gap-5">
            {social.map((link) => (
              <li key={link.label}>
                <SocialLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  ) : null;

  return (
    <>
      <div className="flex items-center gap-2 xl:gap-7">
        <nav className="hidden xl:block" aria-label="Principal">
          <ul className="flex items-center gap-7">
            {nav.map((link) => (
              <li key={link.href}>
                <NavItem link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <Button href={cta.href} className="chrome-cta shrink-0 max-sm:px-4">
          {cta.label}
        </Button>

        {/* A clean 44px target with no `:hover` state: on iOS Safari a hover
            style that changes appearance makes the first tap "hover" and
            demands a second to fire, and a negative-margin target mis-hits.
            44px is Apple's minimum touch target. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
          className="chrome-fg flex h-11 w-11 items-center justify-center text-ink xl:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {open ? createPortal(overlay, document.body) : null}
    </>
  );
}
