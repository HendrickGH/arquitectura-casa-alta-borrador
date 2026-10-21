"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { ContactFormFields } from "@/components/organisms/ContactFormFields";
import type { ContactFormContent } from "@/types/content";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactFormContent;
  whatsappHref: string;
}

/**
 * Centered Architectural Consultation Modal (`ContactModal`).
 *
 * Implements the Cosentino Architectural Editorial contract:
 * - 0px orthogonal geometry throughout.
 * - 44×44px square close trigger (bg-bone-100 hover:bg-bone-200 text-ink).
 * - Trapped keyboard navigation (Tab / Shift+Tab) and Escape dismissal.
 * - Document scroll lock and return-of-focus to invoking trigger.
 * - Reduced-motion safety (prefers-reduced-motion).
 */
export function ContactModal({
  isOpen,
  onClose,
  contact,
  whatsappHref,
}: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reducedMotion && overlayRef.current && dialogRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        dialogRef.current,
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out", delay: 0.04 },
      );
    }

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm sm:p-6 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="relative my-auto w-full max-w-2xl bg-canvas p-6 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Cerrar formulario de consulta"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 sm:right-6 sm:top-6"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-12">
          {contact.eyebrow ? (
            <p className="eyebrow text-brand-800">{contact.eyebrow}</p>
          ) : null}
          <Heading
            as="h2"
            voice="serif"
            id="contact-modal-title"
            className="mt-1 text-2xl text-ink sm:text-3xl"
          >
            {contact.heading}
          </Heading>
          {contact.body ? (
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {contact.body}
            </p>
          ) : null}
        </div>

        <ContactFormFields
          contact={contact}
          whatsappHref={whatsappHref}
          idPrefix="modal"
        />
      </div>
    </div>
  );
}
