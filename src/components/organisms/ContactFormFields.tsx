"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { cx } from "@/lib/cx";
import { sendContactMessage } from "@/lib/email/emailjs";
import type { ContactFormContent } from "@/types/content";

interface ContactFormFieldsProps {
  contact: ContactFormContent;
  /** The WhatsApp target, supplied by the seam. */
  whatsappHref: string;
}

type Status = "idle" | "sending" | "success" | "error";

const SPECIALTY_OPTIONS = [
  "Arquitectura Residencial",
  "Ingeniería y Obra Civil",
  "Interiores y Cosentino",
  "Construcción Sustentable",
  "Remodelación / Gabinete",
] as const;

const LOCALITY_OPTIONS = [
  "Puerto Escondido",
  "Oaxaca Centro",
  "Salina Cruz",
  "Costa / Otra región",
] as const;

/**
 * Architectural Consultation Hub (`ContactFormFields`).
 *
 * Enhanced with Wenda-inspired microinteractions:
 * - Interactive specialty selector chips to guide the client's inquiry.
 * - Project location chips for Puerto Escondido, Oaxaca Centro, Salina Cruz, etc.
 * - Dynamic WhatsApp synchronization: updates the prefilled WhatsApp message in real-time.
 * - Animated sending indicator and styled confirmation banners in the firm's brand palette.
 */
export function ContactFormFields({
  contact,
  whatsappHref,
}: ContactFormFieldsProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    SPECIALTY_OPTIONS[0],
  );
  const [selectedLocality, setSelectedLocality] = useState<string>(
    LOCALITY_OPTIONS[0],
  );
  const [status, setStatus] = useState<Status>("idle");

  // Compute dynamic WhatsApp target with prefilled context based on user chips
  const dynamicWhatsappHref = (() => {
    if (!whatsappHref) return "";
    const query = encodeURIComponent(
      `Hola Casa Alta, deseo agendar una primera reunión técnica para un proyecto de ${selectedSpecialty} en ${selectedLocality}.`,
    );
    const separator = whatsappHref.includes("?") ? "&" : "?";
    return `${whatsappHref}${separator}text=${query}`;
  })();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    const rawMessage = String(data.get("message") ?? "");
    const contextHeader = `[Especialidad: ${selectedSpecialty}] [Ubicación: ${selectedLocality}]`;
    const formattedMessage = `${contextHeader}\n\n${rawMessage}`;

    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: formattedMessage,
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* 1. Specialty Selection Chips (Borderless) */}
      <div>
        <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          1. Especialidad de su proyecto
        </label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTY_OPTIONS.map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={cx(
                  "cursor-pointer px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-200",
                  isSelected
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-bone-100 text-ink/80 hover:bg-bone-200 hover:text-ink",
                )}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Locality Selection Chips (Borderless) */}
      <div>
        <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          2. Ubicación o plaza de ejecución
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCALITY_OPTIONS.map((loc) => {
            const isSelected = selectedLocality === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocality(loc)}
                className={cx(
                  "cursor-pointer px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-200",
                  isSelected
                    ? "bg-brand-800 text-white shadow-xs"
                    : "bg-bone-100 text-ink/80 hover:bg-bone-200 hover:text-ink",
                )}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Text inputs grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="contact-name"
          name="name"
          label={contact.name.label}
          placeholder={contact.name.placeholder}
          autoComplete="name"
          required
        />
        <FormField
          id="contact-email"
          name="email"
          type="email"
          label={contact.email.label}
          placeholder={contact.email.placeholder}
          autoComplete="email"
          required
        />
        <FormField
          id="contact-phone"
          name="phone"
          type="tel"
          label={contact.phone.label}
          placeholder={contact.phone.placeholder}
          autoComplete="tel"
          className="md:col-span-2"
        />
        <FormField
          id="contact-message"
          name="message"
          label={contact.message.label}
          placeholder={contact.message.placeholder}
          multiline
          required
          className="md:col-span-2"
        />

        {/* CTA Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-2 md:col-span-2">
          <Button type="submit" disabled={sending} className="min-w-[180px]">
            {sending ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                {contact.sending}
              </span>
            ) : (
              contact.submit
            )}
          </Button>

          <Button href={dynamicWhatsappHref} variant="secondary" external>
            {contact.whatsapp}
          </Button>
        </div>

        {/* Status Feedback Announcements */}
        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-3 border border-emerald-300 bg-emerald-50/90 p-4 text-sm text-emerald-900 md:col-span-2"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M3 8.5l3.5 3.5 6.5-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-semibold">{contact.success}</p>
              <p className="mt-0.5 text-xs text-emerald-800">
                Un arquitecto de nuestro equipo revisará su proyecto y le responderá a la brevedad.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-amber-300 bg-amber-50/90 p-4 text-sm text-amber-900 md:col-span-2"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white">
              !
            </span>
            <div>
              <p className="font-semibold">{contact.error}</p>
              <p className="mt-1 text-xs">
                Puede escribirnos directamente por WhatsApp al{" "}
                <a
                  href={dynamicWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  951 458 1395
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
