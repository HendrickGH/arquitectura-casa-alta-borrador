"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { useContactModal } from "@/components/organisms/ContactModalContext";
import { useModalDialog } from "@/lib/hooks/useModalDialog";
import type { Service } from "@/types/content";

interface ServiceScopeModalProps {
  service: Service | null;
  partidaIndex: number;
  totalPartidas: number;
  onClose: () => void;
  whatsappHref: string;
  contactAnchorId?: string;
}

/**
 * Centered Architectural Deliverables Dialog (`ServiceScopeModal`).
 *
 * Displays the complete technical deliverables, executive scope checklist,
 * and dual consultation actions (smooth scroll to #contacto and direct WhatsApp)
 * adhering strictly to the Architectural Editorial contract:
 * 0px orthogonal geometry, Marcellus/Montserrat typography, and keyboard focus trap.
 */
export function ServiceScopeModal({
  service,
  partidaIndex,
  totalPartidas,
  onClose,
  whatsappHref,
  contactAnchorId = "contacto",
}: ServiceScopeModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contactModal = useContactModal();
  const router = useRouter();

  const { triggerElementRef } = useModalDialog({
    isOpen: Boolean(service),
    onClose,
    overlayRef,
    dialogRef,
    closeButtonRef,
  });

  if (!service) return null;

  const numStr = String(partidaIndex + 1).padStart(2, "0");
  const totalStr = String(totalPartidas).padStart(2, "0");

  const whatsappMessageHref = (() => {
    if (!whatsappHref) return "";
    const text = encodeURIComponent(
      `Hola Casa Alta, deseo consultar los alcances y cotización de la Partida ${numStr}: ${service.title}.`,
    );
    const separator = whatsappHref.includes("?") ? "&" : "?";
    return `${whatsappHref}${separator}text=${text}`;
  })();

  const handleConsultarPresupuesto = () => {
    triggerElementRef.current = null;
    onClose();
    window.setTimeout(() => {
      if (contactModal) {
        contactModal.openContactModal();
        return;
      }
      const contactEl = document.getElementById(contactAnchorId);
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
        const focusable = contactEl.querySelector<HTMLElement>(
          "input, textarea, select, button",
        );
        focusable?.focus({ preventScroll: true });
      } else {
        router.push("/contacto");
      }
    }, 120);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-6 md:p-8"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-canvas p-6 text-ink shadow-2xl sm:p-8 md:p-10"
      >
        {/* Top Header bar: Technical Partida Identifier and 0px Close Button */}
        <div className="flex items-start justify-between gap-4 pb-5">
          <div className="flex flex-col gap-1">
            <span className="label text-brand-800 tabular-nums">
              {`Partida ${numStr} / ${totalStr} · ${service.items.length} alcances`}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle de partida"
            className="group inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 focus-visible:outline-2 focus-visible:outline-brand-800"
          >
            <Icon name="close" className="h-4 w-4 transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Service Title in Editorial Voice */}
        <div className="mt-6">
          <Heading
            id="modal-service-title"
            as="h3"
            voice="serif"
            sizeClassName="text-2xl leading-tight sm:text-3xl md:text-[2rem]"
          >
            {service.title}
          </Heading>

          {/* Summary */}
          <Text className="mt-4 text-ink-muted leading-relaxed">
            {service.summary}
          </Text>
        </div>

        {/* Technical Deliverables Checklist */}
        <div className="mt-8 pt-6">
          <span className="label mb-4 block text-ink">
            Alcances y entregables ejecutivos:
          </span>

          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs text-ink/85 leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dual Conversion Actions Footer */}
        <div className="mt-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="primary"
            onClick={handleConsultarPresupuesto}
            arrow
            className="w-full sm:w-auto"
          >
            Consultar alcances y presupuesto de esta partida
          </Button>

          {whatsappMessageHref ? (
            <Button
              href={whatsappMessageHref}
              external
              variant="secondary"
              arrow
              className="w-full sm:w-auto justify-center"
            >
              Consultar por WhatsApp
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
