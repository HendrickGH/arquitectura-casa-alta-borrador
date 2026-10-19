import type { Metadata } from "next";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";
import {
  getContactPage,
  getHomePage,
  getSiteConfig,
  getWhatsappHref,
} from "@/lib/content";

const site = getSiteConfig();
const home = getHomePage();
const page = getContactPage();

export const metadata: Metadata = {
  title: `Contacto y Primera Reunión — ${site.name}`,
  description: home.contact.body,
};

export default function ContactRoutePage() {
  return (
    <ContactPageTemplate
      site={site}
      page={page}
      contact={home.contact}
      whatsappHref={getWhatsappHref()}
    />
  );
}
