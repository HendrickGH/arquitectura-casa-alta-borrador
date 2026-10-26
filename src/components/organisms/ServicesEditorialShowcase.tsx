import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { ServiceGroup, ServicePillar } from "@/types/content";

interface ServicesEditorialShowcaseProps {
  pillars?: ServicePillar[];
  groups?: ServiceGroup[];
  id?: string;
}

const defaultPillars: ServicePillar[] = [
  {
    title: "Arquitectura",
    description:
      "Diseño arquitectónico y desarrollo de proyecto ejecutivo, atendiendo la funcionalidad, las proporciones, los materiales y el entorno.",
    href: "/servicios",
  },
  {
    title: "Arquitectura de interiores",
    description:
      "Materiales de importación para proyectos residenciales con instalación certificada: islas monolíticas, cuarzo, piedra sinterizada y carpintería a medida.",
    href: "/arquitectura-interiores",
  },
  {
    title: "Construcción sustentable",
    description:
      "Soluciones que consideran el clima, la innovación, los recursos y las condiciones propias de cada sitio.",
    href: "/construccion-sustentable",
  },
];

export function ServicesEditorialShowcase({
  pillars = defaultPillars,
  id = "servicios",
}: ServicesEditorialShowcaseProps) {
  const items = pillars.length > 0 ? pillars : defaultPillars;

  return (
    <Section id={id} tone="canvas" density="default">
      <Container>
        <SectionHeading
          eyebrow="Lo que hacemos"
          heading="Servicios."
          action={
            <Button href="/servicios" variant="secondary" size="sm" arrow>
              Conoce todos nuestros servicios
            </Button>
          }
          className="mb-12 md:mb-16 md:flex-row md:items-end"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {items.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group flex flex-col transition-colors"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
                {pillar.photo ? (
                  <Photo
                    photo={pillar.photo}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    fit="cover"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col justify-between pt-6">
                <div>
                  <h3 className="voice text-xl font-normal text-ink transition-colors group-hover:text-brand-900 md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted md:text-sm">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="label text-xs font-semibold text-brand-800 transition-colors group-hover:text-brand-900">
                    Ver servicio
                  </span>
                  <span className="text-brand-800 transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
