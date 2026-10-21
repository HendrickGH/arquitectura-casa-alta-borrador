import type { Metadata } from "next";
import { InteriorsPageTemplate } from "@/components/templates/InteriorsPageTemplate";
import {
  getClosing,
  getInteriorsPage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getInteriorsPage();

export const metadata: Metadata = {
  title: `Arquitectura de Interiores y Acabados de Alta Gama — ${site.name}`,
  description: page.surfaces.claim,
};

export default function InteriorsRoutePage() {
  return (
    <InteriorsPageTemplate
      site={site}
      page={page}
      closing={getClosing()}
      whatsappHref={site.whatsapp.href}
    />
  );
}
