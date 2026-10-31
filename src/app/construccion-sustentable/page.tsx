import type { Metadata } from "next";
import { SustainabilityPageTemplate } from "@/components/templates/SustainabilityPageTemplate";
import {
  getSiteConfig,
  getSustainabilityClosing,
  getSustainabilityPage,
} from "@/lib/content";

const site = getSiteConfig();
const page = getSustainabilityPage();
const closing = getSustainabilityClosing();

export const metadata: Metadata = {
  title: `Construcción Sustentable y Bioclimática — ${site.name}`,
  description:
    page.hero.subheadline ||
    "Sistemas pasivos de confort térmico, arquitectura bioclimática y materiales regionales en Oaxaca.",
};

export default function SustainabilityRoutePage() {
  return (
    <SustainabilityPageTemplate
      site={site}
      page={page}
      closing={closing}
      whatsappHref={site.whatsapp.href}
    />
  );
}
