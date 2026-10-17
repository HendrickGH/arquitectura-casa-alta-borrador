import type { Metadata } from "next";
import { AboutPageTemplate } from "@/components/templates/AboutPageTemplate";
import {
  getAboutPage,
  getClosing,
  getHomePage,
  getProcessSteps,
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
      stats={home.stats}
      manifesto={home.manifesto}
      processIntro={home.process}
      steps={getProcessSteps()}
      differentiatorsIntro={home.differentiators.intro}
      differentiators={home.differentiators.items}
      closing={getClosing()}
    />
  );
}
