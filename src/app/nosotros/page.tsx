import type { Metadata } from "next";
import { AboutPageTemplate } from "@/components/templates/AboutPageTemplate";
import {
  getAboutPage,
  getClosing,
  getHomePage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getAboutPage();

export const metadata: Metadata = {
  title: `Nosotros y Credibilidad en Obra — ${site.name}`,
  description: page.hero.subheadline,
};

export default function AboutRoutePage() {
  const home = getHomePage();

  return (
    <AboutPageTemplate
      site={site}
      page={page}
      phases={page.methodology}
      stats={home.stats}
      manifesto={home.manifesto}
      closing={getClosing()}
    />
  );
}
