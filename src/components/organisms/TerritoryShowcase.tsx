import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Photo as PhotoModel } from "@/types/content";

interface TerritoryShowcaseProps {
  id?: string;
  photo: PhotoModel;
  tone?: "canvas" | "bone";
}

/**
 * Editorial Territory Showcase Section (`Arquitectura nativa`).
 * Adheres strictly to DESIGN.md:
 * - Uses canonical Section and SectionHeading molecular hierarchy.
 * - Standard editorial serif scale (`text-[2.25rem] md:text-[3rem] lg:text-[3.75rem]`).
 * - Generous lede typography scale for architectural caption, coherent with landing.
 * - Zero border strokes (no border-bone-200 or dividing hairlines).
 * - Orthogonal 0px geometry.
 */
export function TerritoryShowcase({
  id = "arquitectura-nativa",
  photo,
  tone = "bone",
}: TerritoryShowcaseProps) {
  return (
    <Section id={id} tone={tone} density="default">
      <Container>
        {/* Canonical Section Header without eyebrow */}
        <SectionHeading
          heading="El nuevo lujo no se ve, se siente"
          className="mb-8 md:mb-12"
        />

        {/* Protagonist Full Photograph without borders */}
        <div className="overflow-hidden bg-bone-100">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/8.5]">
            <Photo
              photo={photo}
              sizes="(min-width: 1440px) 1400px, 100vw"
              fit="cover"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Architectural Caption */}
        <div className="mt-8 flex flex-col items-start gap-4">
          <Heading
            voice="serif"
            as="h3"
            sizeClassName="text-2xl md:text-3xl text-ink"
          >
            Arquitectura nativa
          </Heading>
          <Text
            size="lede"
            className="max-w-[62ch] text-ink-muted leading-relaxed text-justify"
          >
            Integración armónica entre arquitectura contemporánea, sistemas tradicionales de palapa y paisaje natural costero, priorizando confort térmico y materiales nobles de la región.
          </Text>

          <div className="mt-2">
            <Button href="/proyectos" variant="primary" size="md" arrow>
              Conoce todos nuestros proyectos
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
