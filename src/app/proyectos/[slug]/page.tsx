import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailTemplate } from "@/components/templates/ProjectDetailTemplate";
import { getProject, getProjects, getSiteConfig } from "@/lib/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every published slug is known at build time, so an unknown one is a 404 rather
 * than a route rendered on demand.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const site = getSiteConfig();
  const description =
    project.summary ||
    [project.categoryLabel, project.location].filter(Boolean).join(" · ");

  return {
    title: `${project.title} — ${site.name}`,
    description,
  };
}

/**
 * One project. `getProject` returns null for a slug that has no editorial entry,
 * no manifest entry or no cover, and each of those falls to the not-found route
 * instead of a half-rendered page.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailTemplate site={getSiteConfig()} project={project} />;
}
