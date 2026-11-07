/**
 * The contact form's mail transport.
 *
 * EmailJS is wired but inert until the three `NEXT_PUBLIC_EMAILJS_*` values in
 * `.env.example` are filled in: `sendContactMessage` throws before it touches
 * the network when the configuration is incomplete, and the form surfaces that
 * as its normal error state. That is deliberate -- the setup ships ready, but a
 * missing key is a missing key, not a silent success.
 *
 * `@emailjs/browser` is dynamically imported on submit so it adds zero bytes to
 * the initial bundle across the 7 site routes that mount `ContactModal`.
 *
 * The template parameter names below (`from_name`, `reply_to`, `phone`,
 * `whatsapp_url`, `specialty`, `locality`, `timeframe`, `message`, `source`,
 * `submitted_at`) are the contract with the EmailJS template (`template_2lu0phi`).
 * They are not authored content and must match the template's variables exactly;
 * rename both sides together or not at all.
 */

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  locality: string;
  timeframe: string;
  message: string;
  source: string;
  /** Hidden honeypot field; non-empty values indicate automated bot traffic. */
  website?: string;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/** True once all three EmailJS values are present at build time. */
export function isEmailConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

function buildWhatsappReplyUrl(rawPhone: string, clientName: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length < 10) return "";

  const target = digits.length === 10 ? `52${digits}` : digits;
  const greeting = `Hola${clientName ? ` ${clientName}` : ""}, le escribimos de Constructora Casa Alta en seguimiento a su solicitud recibida en nuestro sitio web.`;
  return `https://wa.me/${target}?text=${encodeURIComponent(greeting)}`;
}

function formatSubmittedAt(): string {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Mexico_City",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("EmailJS is not configured");
  }

  // Silently drop automated submissions that fill the hidden honeypot field.
  if (message.website && message.website.trim().length > 0) {
    return;
  }

  const trimmedName = message.name.trim();
  const trimmedEmail = message.email.trim();
  const trimmedPhone = message.phone.trim();
  const trimmedMessage = message.message.trim();

  const { default: emailjs } = await import("@emailjs/browser");

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: trimmedName,
      name: trimmedName,
      reply_to: trimmedEmail,
      email: trimmedEmail,
      phone: trimmedPhone || "No proporcionado",
      whatsapp_url: buildWhatsappReplyUrl(trimmedPhone, trimmedName),
      specialty: message.specialty.trim() || "Por definir",
      locality: message.locality.trim() || "Por definir",
      timeframe: message.timeframe.trim() || "Por definir",
      message: trimmedMessage,
      source: message.source.trim() || "Sitio web",
      submitted_at: formatSubmittedAt(),
    },
    {
      publicKey: PUBLIC_KEY,
      limitRate: {
        id: "casa-alta-contact",
        throttle: 15000,
      },
    },
  );
}
