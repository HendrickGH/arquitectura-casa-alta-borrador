import type { Metadata } from "next";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";
import { getContactPage, getSiteConfig, getWhatsappHref } from "@/lib/content";

const site = getSiteConfig();
const page = getContactPage();

export const metadata: Metadata = {
  title: `Contacto Directo y Ubicación — ${site.name}`,
  description: page.body,
};

export default function ContactRoutePage() {
  return (
    <ContactPageTemplate
      site={site}
      page={page}
      whatsappHref={getWhatsappHref()}
    />
  );
}
