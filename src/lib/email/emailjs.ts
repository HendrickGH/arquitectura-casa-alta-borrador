import emailjs from "@emailjs/browser";

/**
 * The contact form's mail transport.
 *
 * EmailJS is wired but inert until the three `NEXT_PUBLIC_EMAILJS_*` values in
 * `.env.example` are filled in: `sendContactMessage` throws before it touches
 * the network when the configuration is incomplete, and the form surfaces that
 * as its normal error state. That is deliberate -- the setup ships ready, but a
 * missing key is a missing key, not a silent success.
 *
 * The field names below (`from_name`, `reply_to`, `phone`, `message`) are the
 * contract with the EmailJS template. They are not authored content and must
 * match the template's variables exactly; rename both sides together or not at
 * all.
 */

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/** True once all three EmailJS values are present at build time. */
export function isEmailConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("EmailJS is not configured");
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: message.name,
      reply_to: message.email,
      phone: message.phone,
      message: message.message,
    },
    { publicKey: PUBLIC_KEY },
  );
}
