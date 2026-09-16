import { LandingTemplate } from "@/components/templates/LandingTemplate";
import {
  getFeaturedProjects,
  getHomePage,
  getProcessSteps,
  getServiceGroups,
  getSiteConfig,
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
  const projects = getFeaturedProjects();

  return (
    <LandingTemplate
      site={site}
      home={home}
      groups={groups}
      steps={steps}
      projects={projects}
    />
  );
}
