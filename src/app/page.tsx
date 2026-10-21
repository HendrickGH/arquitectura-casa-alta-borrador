import { LandingTemplate } from "@/components/templates/LandingTemplate";
import {
  getDivisionCards,
  getHomePage,
  getLandingPortfolio,
  getProcessSteps,
  getServiceGroups,
  getSiteConfig,
  getWhatsappHref,
} from "@/lib/content";

/**
 * The landing.
 *
 * This is the only file that reads content. Every component under it receives
 * props, which is what keeps the Payload CMS seam in src/lib/content: when
 * those accessors become async reads, this function becomes async and nothing
 * below it changes.
 */
export default function HomePage() {
  const site = getSiteConfig();
  const home = getHomePage();
  const divisions = getDivisionCards();
  const groups = getServiceGroups();
  const steps = getProcessSteps();
  const { featured, remaining } = getLandingPortfolio();
  const whatsappHref = getWhatsappHref();

  return (
    <LandingTemplate
      site={site}
      home={home}
      divisions={divisions}
      groups={groups}
      steps={steps}
      featured={featured}
      remaining={remaining}
      whatsappHref={whatsappHref}
    />
  );
}
