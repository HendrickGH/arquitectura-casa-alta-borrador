"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { FormField } from "@/components/molecules/FormField";
import { cx } from "@/lib/cx";
import { sendContactMessage } from "@/lib/email/emailjs";
import type { ContactFormContent } from "@/types/content";

interface ContactFormFieldsProps {
  contact: ContactFormContent;
  /** The WhatsApp target, supplied by the seam. */
  whatsappHref: string;
  idPrefix?: string;
}

type Status = "idle" | "sending" | "success" | "error";

/**
 * Architectural Consultation Hub (`ContactFormFields`).
 *
 * - 0px rectangular specialty, locality, budget, and timeframe selector chips.
 * - Dynamic WhatsApp synchronization: updates the prefilled WhatsApp message in real-time.
 */
export function ContactFormFields({
  contact,
  whatsappHref,
  idPrefix = "contact",
}: ContactFormFieldsProps) {
  const prefix = idPrefix;
  const specialties = contact.specialties ?? [];
  const localities = contact.localities ?? [];
  const budgetRanges = contact.budgetRanges ?? [];
  const timeframes = contact.timeframes ?? [];

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    specialties[0] ?? "",
  );
  const [selectedLocality, setSelectedLocality] = useState<string>(
    localities[0] ?? "",
  );
  const [selectedBudget, setSelectedBudget] = useState<string>(
    budgetRanges[0] ?? "",
  );
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(
    timeframes[0] ?? "",
  );
  const [status, setStatus] = useState<Status>("idle");

  // Compute dynamic WhatsApp target with prefilled context based on user chips
  const dynamicWhatsappHref = (() => {
    if (!whatsappHref) return "";
    const details = [
      selectedSpecialty ? `un proyecto de ${selectedSpecialty}` : "",
      selectedLocality ? `en ${selectedLocality}` : "",
      selectedBudget ? `inversión de ${selectedBudget}` : "",
      selectedTimeframe ? `plazo: ${selectedTimeframe}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    const text = details
      ? `Hola Casa Alta, deseo agendar una primera reunión técnica para ${details}.`
      : "Hola Casa Alta, deseo agendar una primera reunión técnica para cotizar un proyecto arquitectónico.";

    try {
      const url = new URL(whatsappHref);
      url.searchParams.set("text", text);
      return url.toString();
    } catch {
      const base = whatsappHref.split("?")[0];
      return `${base}?text=${encodeURIComponent(text)}`;
    }
  })();

  const phoneDisplay =
    whatsappHref
      .replace(/\D/g, "")
      .slice(-10)
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3") || "WhatsApp";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    const rawMessage = String(data.get("message") ?? "");
    const contextParts = [
      selectedSpecialty ? `[Especialidad: ${selectedSpecialty}]` : "",
      selectedLocality ? `[Ubicación: ${selectedLocality}]` : "",
      selectedBudget ? `[Presupuesto: ${selectedBudget}]` : "",
      selectedTimeframe ? `[Plazo: ${selectedTimeframe}]` : "",
    ]
      .filter(Boolean)
      .join(" ");
    const formattedMessage = `${contextParts}\n\n${rawMessage}`;

    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: formattedMessage,
      });
      form.reset();
      setSelectedSpecialty(specialties[0] ?? "");
      setSelectedLocality(localities[0] ?? "");
      setSelectedBudget(budgetRanges[0] ?? "");
      setSelectedTimeframe(timeframes[0] ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <input type="hidden" name="specialty" value={selectedSpecialty} />
      <input type="hidden" name="locality" value={selectedLocality} />
      {selectedBudget ? (
        <input type="hidden" name="budget" value={selectedBudget} />
      ) : null}
      {selectedTimeframe ? (
        <input type="hidden" name="timeframe" value={selectedTimeframe} />
      ) : null}

      {/* 1. Specialty Selection Chips (0px rectangular) */}
      {specialties.length > 0 ? (
        <div>
          <label className="label mb-2.5 block text-ink-muted">
            {contact.specialtiesLabel || "1. Especialidad de su proyecto"}
          </label>
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => {
              const isSelected = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={cx(
                    "label min-h-[44px] cursor-pointer px-4 py-2.5 transition-colors duration-200",
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-semibold"
                      : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink",
                  )}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* 2. Locality Selection Chips (0px rectangular) */}
      {localities.length > 0 ? (
        <div>
          <label className="label mb-2.5 block text-ink-muted">
            {contact.localitiesLabel || "2. Ubicación o plaza de ejecución"}
          </label>
          <div className="flex flex-wrap gap-2">
            {localities.map((loc) => {
              const isSelected = selectedLocality === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedLocality(loc)}
                  className={cx(
                    "label min-h-[44px] cursor-pointer px-4 py-2.5 transition-colors duration-200",
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-semibold"
                      : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink",
                  )}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* 3. Budget Range Selection Chips (0px rectangular) */}
      {budgetRanges.length > 0 ? (
        <div>
          <label className="label mb-2.5 block text-ink-muted">
            {contact.budgetRangesLabel || "3. Rango de inversión estimada"}
          </label>
          <div className="flex flex-wrap gap-2">
            {budgetRanges.map((range) => {
              const isSelected = selectedBudget === range;
              return (
                <button
                  key={range}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedBudget(range)}
                  className={cx(
                    "label min-h-[44px] cursor-pointer px-4 py-2.5 transition-colors duration-200",
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-semibold"
                      : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink",
                  )}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* 4. Timeframe Selection Chips (0px rectangular) */}
      {timeframes.length > 0 ? (
        <div>
          <label className="label mb-2.5 block text-ink-muted">
            {contact.timeframesLabel || "4. Plazo proyectado de inicio"}
          </label>
          <div className="flex flex-wrap gap-2">
            {timeframes.map((timeframe) => {
              const isSelected = selectedTimeframe === timeframe;
              return (
                <button
                  key={timeframe}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={cx(
                    "label min-h-[44px] cursor-pointer px-4 py-2.5 transition-colors duration-200",
                    isSelected
                      ? "bg-brand-50 text-brand-900 font-semibold"
                      : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink",
                  )}
                >
                  {timeframe}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* 3. Text inputs grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id={`${prefix}-name`}
          name="name"
          label={contact.name.label}
          placeholder={contact.name.placeholder}
          autoComplete="name"
          required
        />
        <FormField
          id={`${prefix}-email`}
          name="email"
          type="email"
          label={contact.email.label}
          placeholder={contact.email.placeholder}
          autoComplete="email"
          required
        />
        <FormField
          id={`${prefix}-phone`}
          name="phone"
          type="tel"
          label={contact.phone.label}
          placeholder={contact.phone.placeholder}
          autoComplete="tel"
          className="md:col-span-2"
        />
        <FormField
          id={`${prefix}-message`}
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

          <Button href={dynamicWhatsappHref} variant="secondary" external arrow>
            {contact.whatsapp}
          </Button>
        </div>

        {/* Status Feedback Announcements (0px geometry) */}
        {status === "success" && (
          <div
            role="status"
            className="flex items-start gap-3 bg-emerald-50/90 p-4 text-sm text-emerald-900 md:col-span-2"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-emerald-600 text-white">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-semibold">{contact.success}</p>
              <p className="mt-0.5 text-xs text-emerald-800">
                Un arquitecto de nuestro equipo revisará su proyecto y le
                responderá a la brevedad.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 bg-amber-50/90 p-4 text-sm text-amber-900 md:col-span-2"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-amber-600 text-white">
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
                  {phoneDisplay}
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
