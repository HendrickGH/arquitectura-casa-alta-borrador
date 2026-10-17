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
    .join(" · ");

  const hasParagraphs = project.paragraphs && project.paragraphs.length > 0;
  const hasSpecs = project.specs && project.specs.length > 0;

  return (
    <SiteChrome site={site}>
      <main id="main">
        <Section tone="canvas" className="!pb-12 md:!pb-16">
          <Container>
            <Link
              href="/proyectos"
              className="label inline-flex items-center gap-2 text-brand-700 transition-colors duration-200 hover:text-brand-900"
            >
              <span>← Portafolio de proyectos</span>
            </Link>

            <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                {meta ? (
                  <div className="mb-4 flex items-center gap-3">
                    <span className="number-pill">
                      {`${String(project.photos.length).padStart(2, "0")} FOTOS`}
                    </span>
                    <p className="label text-brand-800">{meta}</p>
                  </div>
                ) : null}

                <Heading as="h1" voice="serif" className="max-w-[22ch]">
                  {project.title}
                </Heading>

                {hasParagraphs ? (
                  <div className="mt-8 flex flex-col gap-5">
                    {project.paragraphs!.map((paragraph, index) => (
                      <Text
                        key={paragraph}
                        size={index === 0 ? "lede" : undefined}
                        className={
                          index === 0
                            ? "max-w-[64ch] text-ink"
                            : "max-w-[64ch] text-ink-muted"
                        }
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                ) : (
                  <>
                    {project.summary ? (
                      <Text size="lede" className="mt-8 max-w-[62ch]">
                        {project.summary}
                      </Text>
                    ) : null}

                    {project.story ? (
                      <Text className="mt-6 max-w-[62ch] text-ink-muted">
                        {project.story}
                      </Text>
                    ) : null}

                    {project.outcome ? (
                      <Text className="mt-6 max-w-[62ch] text-ink-muted">
                        {project.outcome}
                      </Text>
                    ) : null}
                  </>
                )}
              </div>

              {hasSpecs ? (
                <aside className="lg:col-span-5">
                  <div className="ruler-top border border-bone-200 bg-concha-nacar/55 p-6 md:p-8">
                    <div className="flex items-center justify-between gap-3 border-b border-bone-200 pb-4">
                      <p className="label text-brand-800">Ficha técnica</p>
                      <span className="number-pill">CASA ALTA</span>
                    </div>

                    <dl className="mt-4 divide-y divide-bone-200">
                      {project.specs!.map((spec, idx) => (
                        <div
                          key={spec.label}
                          className="grid grid-cols-12 items-baseline gap-3 py-3.5 text-sm"
                        >
                          <dt className="col-span-5 flex items-center gap-2 font-medium text-ink">
                            <span className="text-[0.6875rem] font-semibold text-brand-800 tabular-nums">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span>{spec.label}</span>
                          </dt>
                          <dd className="col-span-7 text-ink-muted">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 pt-2">
                      <Button
                        href={site.cta.href}
                        size="sm"
                        arrow
                        className="w-full"
                      >
                        Solicitar proyecto similar
                      </Button>
                    </div>
                  </div>
                </aside>
              ) : null}
            </div>
          </Container>
        </Section>

        <ProjectGallery photos={project.photos} />

        <Section tone="canvas">
          <Container className="flex flex-wrap items-center justify-between gap-6 border-t border-bone-200 pt-10">
            <div>
              <p className="eyebrow">¿Tiene un terreno o proyecto en puerta?</p>
              <p className="mt-1 text-sm text-ink-muted">
                Agende su primera reunión sin costo con dirección de proyectos.
              </p>
            </div>
            <Button href={site.cta.href} arrow>
              {site.cta.label}
            </Button>
          </Container>
        </Section>
      </main>
    </SiteChrome>
  );
}
