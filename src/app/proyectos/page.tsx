import type { Metadata } from "next";
import { ProjectsIndexTemplate } from "@/components/templates/ProjectsIndexTemplate";
import {
  getClosing,
  getProjects,
  getProjectsIntro,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const intro = getProjectsIntro();

/** The index is the portfolio's own landing page, so it says what it holds. */
export const metadata: Metadata = {
  title: `Proyectos — ${site.name}`,
  description: intro.body,
};

/**
 * The complete portfolio. `/proyectos` is a real route now, which is why the
 * header's Proyectos entry and the category tiles point here instead of at the
 * landing's `#proyectos` anchor. That anchor still resolves on the landing.
 */
export default function ProjectsIndexPage() {
  return (
    <ProjectsIndexTemplate
      site={site}
      intro={intro}
      projects={getProjects()}
      closing={getClosing()}
    />
  );
}
