import type { Metadata } from "next";
import { SustainabilityPageTemplate } from "@/components/templates/SustainabilityPageTemplate";
import {
  getClosing,
  getSiteConfig,
  getSustainabilityPage,
} from "@/lib/content";

const site = getSiteConfig();
const page = getSustainabilityPage();

export const metadata: Metadata = {
  title: `Construcción Sustentable y Bioclimática — ${site.name}`,
  description: page.hero.subheadline,
};

export default function SustainabilityRoutePage() {
  return (
    <SustainabilityPageTemplate
      site={site}
      page={page}
      closing={getClosing()}
      whatsappHref={site.whatsapp.href}
    />
  );
}
