"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import type {
  CallToAction,
  ContactLine,
  NavLink,
  SocialLink,
} from "@/types/content";

interface NavToggleProps {
  /** The full navigation, exactly the links the inline nav would have shown. */
  nav: NavLink[];
  cta: CallToAction;
  /** The primary phone line; the first entry of the site's contact list. */
  phone: ContactLine;
  social: SocialLink[];
}

/**
 * The burger toggle and its panel.
 *
 * Below `xl` the inline nav overflows (six tracked labels plus the logo and the
 * CTA do not fit between 1024px and 1280px), so this owns the navigation there.
 * The panel holds everything the collapsed header leaves out: the nav links,
 * the CTA, the phone and the social profiles.
 *
 * The panel is portalled to `document.body`, not rendered inside the `<header>`:
 * the header's `backdrop-filter` makes it a containing block for fixed
 * descendants, so an in-place `fixed` panel would be positioned against the
 * header instead of the viewport and scroll away with it.
 */
export function NavToggle({ nav, cta, phone, social }: NavToggleProps) {
  const [open, setOpen] = useState(false);

  // Lock scroll while open and close on Escape. Restored on close/unmount.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  // Closes and releases the scroll lock synchronously. A link click navigates
  // (to a route or a hash) in the same event, before React flushes the effect
  // cleanup above -- so the lock must come off here or the hash scroll lands on
  // a page that is still `overflow: hidden` and stays put.
  const close = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  const panel = open ? (
    <div
      id="site-nav-panel"
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

        <Button href={cta.href} className="w-full" onClick={close}>
          {cta.label}
        </Button>

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
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="chrome-fg -m-2 p-2 transition-opacity duration-200 hover:opacity-70 xl:hidden"
      >
        <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
      </button>

      {open ? createPortal(panel, document.body) : null}
    </>
  );
}
