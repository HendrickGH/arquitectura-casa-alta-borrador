import { LandingTemplate } from "@/components/templates/LandingTemplate";
import {
  getHomePage,
  getLandingPortfolio,
  getMasonry,
  getMomentPhoto,
  getProcessSteps,
  getServiceGroups,
  getSiteConfig,
  getTiles,
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
  const groups = getServiceGroups();
  const steps = getProcessSteps();
  const { featured, remaining } = getLandingPortfolio();
  const tiles = getTiles();
  const masonry = getMasonry();
  const moment = getMomentPhoto();
  const whatsappHref = getWhatsappHref();

  return (
    <LandingTemplate
      site={site}
      home={home}
      groups={groups}
      steps={steps}
      featured={featured}
      remaining={remaining}
      tiles={tiles}
      masonry={masonry}
      moment={moment}
      whatsappHref={whatsappHref}
    />
  );
}
