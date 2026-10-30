import type { Metadata } from "next";
import { ServicesPageTemplate } from "@/components/templates/ServicesPageTemplate";
import {
  getClosing,
  getHomePage,
  getServiceGroups,
  getServicesPage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getServicesPage();

export const metadata: Metadata = {
  title: `Servicios de Ingeniería y Construcción — ${site.name}`,
  description:
    "Catálogo técnico integral de alcances por etapa de proyecto y construcción de Casa Alta.",
};

export default function ServicesRoutePage() {
  const home = getHomePage();

  return (
    <ServicesPageTemplate
      site={site}
      page={page}
      groups={getServiceGroups()}
      closing={getClosing()}
      contact={home.contact}
      whatsappHref={site.whatsapp.href}
    />
  );
}
