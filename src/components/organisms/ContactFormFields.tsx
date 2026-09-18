"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { sendContactMessage } from "@/lib/email/emailjs";
import type { ContactFormContent } from "@/types/content";

interface ContactFormFieldsProps {
  contact: ContactFormContent;
  /** The WhatsApp target, supplied by the seam. */
  whatsappHref: string;
}

type Status = "idle" | "sending" | "success" | "error";

/**
 * The contact form's interactive half: the only stateful module on the landing
 * besides the header shell.
 *
 * It owns no copy -- every label and message arrives in `contact` -- and its
 * fields are uncontrolled. On submit it takes a `FormData` snapshot, hands the
 * four values to the mail transport, and reports the outcome in a live region.
 * The WhatsApp action sits beside the submit control as the immediate
 * alternative: both are real actions, not a fallback for the other.
 */
export function ContactFormFields({
  contact,
  whatsappHref,
}: ContactFormFieldsProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      <FormField
        id="contact-name"
        name="name"
        label={contact.name.label}
        placeholder={contact.name.placeholder}
        required
      />
      <FormField
        id="contact-email"
        name="email"
        type="email"
        label={contact.email.label}
        placeholder={contact.email.placeholder}
        required
      />
      <FormField
        id="contact-phone"
        name="phone"
        type="tel"
        label={contact.phone.label}
        placeholder={contact.phone.placeholder}
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

      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Button type="submit" disabled={sending}>
          {sending ? contact.sending : contact.submit}
        </Button>

        <Button href={whatsappHref} variant="secondary" external>
          {contact.whatsapp}
        </Button>
      </div>

      {/* One live region for every outcome, so the state is announced once and
          the layout never jumps: the paragraph is always present. */}
      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.5rem] text-sm text-ink-muted md:col-span-2"
      >
        {status === "success" ? contact.success : null}
        {status === "error" ? contact.error : null}
      </p>
    </form>
  );
}
