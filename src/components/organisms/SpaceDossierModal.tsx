"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import type { SpaceDossier } from "@/types/content";

export interface SpaceDossierModalProps {
  space: SpaceDossier | null;
  onClose: () => void;
  whatsappBaseHref?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const PHOTO_SIZES = "(min-width: 1024px) 50vw, 100vw";

/**
 * Technical Architectural Space Dossier Modal.
 *
 * Replaces the passive photo lightbox with an actionable architectural dossier
 * containing macro specifications, joinery details, delivery timeline,
 * and pre-filled WhatsApp consultation routing.
 *
 * Adheres strictly to DESIGN.md: 0px geometry, Marcellus/Montserrat hierarchy,
 * WCAG accessible keyboard trap, and no decorative hairline borders.
 */
export function SpaceDossierModal({
  space,
  onClose,
  whatsappBaseHref = "https://wa.me/529514581395",
  triggerRef,
}: SpaceDossierModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!space) return;

    const triggerEl = triggerRef?.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerEl && typeof triggerEl.focus === "function") {
        triggerEl.focus();
      }
    };
  }, [space, onClose, triggerRef]);

  if (!space) return null;

  // Construct contextual WhatsApp URL
  const baseClean = whatsappBaseHref.split("?")[0];
  const encodedText = encodeURIComponent(space.quoteContext);
  const whatsappUrl = `${baseClean}?text=${encodedText}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-6 lg:p-10 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative flex w-full max-w-5xl max-h-[92vh] flex-col overflow-hidden bg-canvas text-ink shadow-2xl lg:grid lg:grid-cols-12"
      >
        {/* Close Button — 44x44px 0px square per DESIGN.md Section 5.4 */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha técnica"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center bg-canvas/90 text-ink backdrop-blur hover:bg-bone-100 transition-colors duration-150"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>

        {/* Column 1: Uncropped Architectural Photograph */}
        <div className="relative aspect-[4/3] max-h-[36vh] sm:max-h-none w-full overflow-hidden bg-bone-200 lg:col-span-7 lg:h-full lg:aspect-auto">
          <Photo
            photo={space.photo}
            sizes={PHOTO_SIZES}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        {/* Column 2: Architectural Technical Dossier */}
        <div className="flex flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="label text-brand-800">
                {space.categoryLabel}
              </span>
              <span className="label tabular-nums text-ink-muted">
                {`REF · ${space.id.toUpperCase()}`}
              </span>
            </div>

            <Heading
              id="dossier-title"
              as="h3"
              voice="serif"
              className="mt-2 text-2xl lg:text-[1.75rem] text-ink leading-snug"
            >
              {space.title}
            </Heading>

            <Text size="sm" className="mt-4 text-ink-muted leading-relaxed">
              {space.description}
            </Text>

            {/* Technical Specification Matrix */}
            <div className="mt-8 space-y-4 bg-bone-50 p-5">
              <div className="space-y-1">
                <span className="label text-[0.6875rem] text-ink-muted">
                  Cubierta y Acabado Principal
                </span>
                <p className="text-xs sm:text-sm font-medium text-ink leading-snug">
                  {space.specs.cubierta}
                </p>
              </div>

              <div className="space-y-1">
                <span className="label text-[0.6875rem] text-ink-muted">
                  Cuerpo y Modulación
                </span>
                <p className="text-xs sm:text-sm font-medium text-ink leading-snug">
                  {space.specs.cuerpo}
                </p>
              </div>

              <div className="space-y-1">
                <span className="label text-[0.6875rem] text-ink-muted">
                  Herrajes y Sistemas
                </span>
                <p className="text-xs sm:text-sm font-medium text-ink leading-snug">
                  {space.specs.herrajes}
                </p>
              </div>

              <div className="space-y-1">
                <span className="label text-[0.6875rem] text-ink-muted">
                  Plazo Estimado de Fabricación
                </span>
                <p className="text-xs sm:text-sm font-medium text-brand-900 leading-snug">
                  {space.specs.entrega}
                </p>
              </div>
            </div>
          </div>

          {/* Action Zone: Contextual WhatsApp Prefill & Free Consultation Guarantee */}
          <div className="mt-8 pt-4">
            <Button
              variant="primary"
              href={whatsappUrl}
              external
              arrow
              className="w-full justify-center text-center"
            >
              Cotizar este espacio por WhatsApp
            </Button>
            <p className="mt-3 text-center text-[0.75rem] text-ink-muted leading-relaxed">
              Asesoría técnica inicial 100% gratuita en estudio o por videollamada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
