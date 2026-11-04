import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type {
  Photo as PhotoModel,
  TerritoryShowcaseContent,
} from "@/types/content";

interface TerritoryShowcaseProps {
  id?: string;
  showcase?: TerritoryShowcaseContent;
  photo?: PhotoModel;
  tone?: "canvas" | "bone";
}

/**
 * Editorial Territory Showcase Section (`Arquitectura COSTA NATURA`).
 * Adheres strictly to DESIGN.md:
 * - Uses canonical Section and SectionHeading molecular hierarchy.
 * - Standard editorial serif scale (`text-[2.25rem] md:text-[3rem] lg:text-[3.75rem]`).
 * - Generous lede typography scale for architectural caption, coherent with landing.
 * - Zero border strokes (no border-bone-200 or dividing hairlines).
 * - Orthogonal 0px geometry.
 */
export function TerritoryShowcase({
  id = "arquitectura-costa-natura",
  showcase,
  photo,
  tone = "bone",
}: TerritoryShowcaseProps) {
  const activePhoto = showcase?.photo ?? photo;
  if (!activePhoto) return null;

  const heading = showcase?.heading ?? "El nuevo lujo no se ve, se siente";
  const title = showcase?.title ?? "Arquitectura COSTA NATURA";
  const lede = showcase?.lede;
  const paragraphs = showcase?.paragraphs ?? [
    "Integración armónica entre arquitectura contemporánea, sistemas tradicionales de palapa y paisaje natural costero, priorizando confort térmico y materiales nobles de la región.",
  ];
  const closing = showcase?.closing;
  const cta = showcase?.cta ?? {
    label: "Conoce todos nuestros proyectos",
    href: "/proyectos",
  };

  return (
    <Section id={id} tone={tone} density="default">
      <Container>
        {/* Canonical Section Header without eyebrow */}
        <SectionHeading
          heading={heading}
          className="mb-8 md:mb-12"
        />

        {/* Protagonist Full Photograph without borders */}
        <div className="overflow-hidden bg-bone-100">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/8.5]">
            <Photo
              photo={activePhoto}
              sizes="(min-width: 1440px) 1400px, 100vw"
              fit="cover"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Architectural Caption & CTA: Side-by-Side on Desktop/Tablet, Aligned at Top */}
        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-start md:gap-10 lg:gap-16">
          <div className="flex max-w-[68ch] flex-col gap-4">
            <Heading
              voice="serif"
              as="h3"
              sizeClassName="text-2xl md:text-3xl text-ink"
            >
              {title}
            </Heading>

            {lede ? (
              <Text
                size="lede"
                className="font-normal text-ink leading-relaxed"
              >
                {lede}
              </Text>
            ) : null}

            <div className="flex flex-col gap-3">
              {paragraphs.map((para, idx) => (
                <Text
                  key={idx}
                  size="base"
                  className="text-ink-muted leading-relaxed text-justify"
                >
                  {para}
                </Text>
              ))}
            </div>

            {closing ? (
              <Text
                size="base"
                className="pt-1 font-medium text-brand-800 leading-relaxed text-left"
              >
                {closing}
              </Text>
            ) : null}
          </div>

          <div className="shrink-0 self-start pt-1 md:self-start">
            <Button
              href={cta.href}
              variant="primary"
              size="md"
              arrow
              className="w-full justify-center sm:w-auto"
            >
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
