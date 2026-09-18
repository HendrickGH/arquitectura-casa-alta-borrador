import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { ProjectGallery } from "@/components/organisms/ProjectGallery";
import { SiteChrome } from "@/components/templates/SiteChrome";
import type { Project, SiteConfig } from "@/types/content";

interface ProjectDetailTemplateProps {
  site: SiteConfig;
  project: Project;
}

/**
 * One project's page: the confirmed narrative, then every publishable
 * photograph.
 *
 * The gallery leads rather than sitting under a hero, because the first photo is
 * the page's LCP image (`ProjectGallery` marks it priority) and a second copy of
 * the cover above it would spend the same file twice -- the repository's own
 * rule against showing one photograph in two slots.
 *
 * Fields the client has not confirmed are empty strings, so each block is
 * dropped rather than printed as a hollow heading or a dangling separator.
 */
export function ProjectDetailTemplate({
  site,
  project,
}: ProjectDetailTemplateProps) {
  const meta = [project.categoryLabel, project.location, project.year]
    .filter(Boolean)
    .join(", ");

  return (
    <SiteChrome site={site}>
      <main id="main">
        <Section tone="canvas">
          <Container>
            <Link
              href="/proyectos"
              className="label text-brand-700 transition-colors duration-200 hover:text-brand-900"
            >
              ← Proyectos
            </Link>

            <Heading as="h1" voice="serif" className="mt-7 max-w-[20ch]">
              {project.title}
            </Heading>

            {meta ? <p className="label mt-6 text-ink-muted">{meta}</p> : null}

            {project.summary ? (
              <Text size="lede" className="mt-8">
                {project.summary}
              </Text>
            ) : null}

            {project.story ? (
              <Text className="mt-6 max-w-[62ch]">{project.story}</Text>
            ) : null}

            {project.outcome ? (
              <Text className="mt-6 max-w-[62ch]">{project.outcome}</Text>
            ) : null}
          </Container>
        </Section>

        <ProjectGallery photos={project.photos} />

        <Section tone="canvas">
          <Container>
            <Button href={site.cta.href}>{site.cta.label}</Button>
          </Container>
        </Section>
      </main>
    </SiteChrome>
  );
}
