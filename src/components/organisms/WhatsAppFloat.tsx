import { Icon } from "@/components/atoms/Icon";
import type { CallToAction } from "@/types/content";

interface WhatsAppFloatProps {
  link: CallToAction;
}

/**
 * The persistent WhatsApp button, present on every page.
 *
 * It replaced the hero's own WhatsApp CTA: one floating point of contact is
 * reachable from anywhere instead of only the first screen. The label comes
 * from the content seam and is used as the accessible name; the control is
 * icon-only by design.
 */
export function WhatsAppFloat({ link }: WhatsAppFloatProps) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="fixed right-5 bottom-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition duration-200 hover:scale-105 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
