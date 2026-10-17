import type { Metadata } from "next";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";
import {
  getHomePage,
  getSiteConfig,
  getWhatsappHref,
} from "@/lib/content";

const site = getSiteConfig();
const home = getHomePage();

export const metadata: Metadata = {
  title: `Contacto y Primera Reunión — ${site.name}`,
  description: home.contact.body,
};

export default function ContactRoutePage() {
  return (
    <ContactPageTemplate
      site={site}
      contact={home.contact}
      whatsappHref={getWhatsappHref()}
    />
  );
}
