import type { Metadata } from "next";
import { ServicesPageTemplate } from "@/components/templates/ServicesPageTemplate";
import {
  getClosing,
  getHomePage,
  getProcessSteps,
  getServiceGroups,
  getServicesPage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getServicesPage();

export const metadata: Metadata = {
  title: `Servicios de Ingeniería y Construcción — ${site.name}`,
  description: page.hero.subheadline,
};

export default function ServicesRoutePage() {
  const home = getHomePage();

  return (
    <ServicesPageTemplate
      site={site}
      page={page}
      groups={getServiceGroups()}
      processIntro={home.process}
      steps={getProcessSteps()}
      closing={getClosing()}
      contact={home.contact}
      whatsappHref={site.whatsapp.href}
    />
  );
}
