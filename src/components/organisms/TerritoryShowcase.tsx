import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import type { Photo as PhotoModel } from "@/types/content";

interface TerritoryShowcaseProps {
  id?: string;
  photo: PhotoModel;
}

/**
 * Editorial Territory Showcase Section (`Obra y territorio`).
 * Adheres strictly to DESIGN.md:
 * - Zero border strokes (no border-bone-200 or dividing hairlines).
 * - Typography register: Marcellus (voice="serif") for headings, Montserrat for label/body.
 * - Generous whitespace and orthogonal geometry.
 */
export function TerritoryShowcase({
  id = "obra-y-territorio",
  photo,
}: TerritoryShowcaseProps) {
  return (
    <section id={id} className="bg-canvas py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="mb-8">
          <p className="eyebrow mb-2">Proyectos seleccionados</p>
          <Heading
            voice="serif"
            as="h2"
            sizeClassName="text-3xl md:text-5xl text-ink"
          >
            Obra y territorio.
          </Heading>
        </div>

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
        <div className="mt-6 flex flex-col gap-2">
          <Heading
            voice="serif"
            as="h3"
            sizeClassName="text-xl md:text-2xl text-ink"
          >
            El Bicho
          </Heading>
          <Text
            size="sm"
            className="max-w-[62ch] text-ink-muted leading-relaxed"
          >
            Integración armónica entre arquitectura contemporánea, sistemas tradicionales de palapa y paisaje natural costero, priorizando confort térmico y materiales nobles de la región.
          </Text>
        </div>
      </Container>
    </section>
  );
}
