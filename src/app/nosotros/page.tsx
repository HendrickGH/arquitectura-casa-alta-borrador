import type { Metadata } from "next";
import { AboutPageTemplate } from "@/components/templates/AboutPageTemplate";
import {
  getAboutClosing,
  getAboutPage,
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
  const processSteps = getProcessSteps();

  return (
    <AboutPageTemplate
      site={site}
      page={page}
      stats={home.stats}
      processIntro={home.process}
      processSteps={processSteps}
      closing={getAboutClosing()}
    />
  );
}
