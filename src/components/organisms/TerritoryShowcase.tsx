import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel } from "@/types/content";

interface TerritoryShowcaseProps {
  id?: string;
  photo: PhotoModel;
}

/**
 * Editorial Territory Showcase Section (`Obra y territorio`).
 * Replicates the client's approved reference mockup with full-width monograph framing,
 * minimal metadata caption and clean architectural white-space.
 */
export function TerritoryShowcase({
  id = "obra-y-territorio",
  photo,
}: TerritoryShowcaseProps) {
  return (
    <section id={id} className="bg-canvas py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="label mb-2 text-ink-muted">Proyectos seleccionados</p>
            <Heading
              voice="serif"
              as="h2"
              sizeClassName="text-3xl md:text-5xl text-ink"
            >
              Obra y territorio.
            </Heading>
          </div>
          <p className="text-xs text-ink-muted md:text-sm">
            Cada proyecto responde a su contexto.
          </p>
        </div>

        {/* Protagonist Full Photograph */}
        <div className="overflow-hidden border border-bone-200 bg-bone-100">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/8.5]">
            <Photo
              photo={photo}
              sizes="(min-width: 1440px) 1400px, 100vw"
              fit="cover"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Architectural Caption & Project Tag */}
        <div className="mt-4 flex flex-col justify-between gap-2 border-b border-bone-200 pb-4 text-xs md:flex-row md:items-baseline">
          <p className="font-serif text-base text-ink md:text-lg">
            El Bicho
          </p>
          <p className="label text-ink-muted uppercase tracking-wider">
            Proyecto Real
          </p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink md:text-sm">
          Integración armónica entre arquitectura contemporánea, sistemas tradicionales de palapa y paisaje natural costero, priorizando confort térmico y materiales nobles de la región.
        </p>
      </Container>
    </section>
  );
}
