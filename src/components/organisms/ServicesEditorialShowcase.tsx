"use client";

import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import type { ServiceGroup } from "@/types/content";

interface ServicesEditorialShowcaseProps {
  groups?: ServiceGroup[];
  id?: string;
}

export function ServicesEditorialShowcase({
  id = "servicios",
}: ServicesEditorialShowcaseProps) {
  // Sourced strictly from the 3 core pillars requested by the client
  const pillars = [
    {
      title: "Arquitectura",
      description:
        "Diseño arquitectónico y desarrollo de proyecto ejecutivo, atendiendo la funcionalidad, las proporciones, los materiales y el entorno.",
      href: "/servicios",
    },
    {
      title: "Ingeniería y obra civil",
      description:
        "Planeación técnica, soluciones estructurales, infraestructura y ejecución de obra con seguimiento riguroso en cada etapa.",
      href: "/servicios",
    },
    {
      title: "Construcción sustentable",
      description:
        "Soluciones que consideran el clima, la innovación, los recursos y las condiciones propias de cada sitio.",
      href: "/construccion-sustentable",
    },
  ];

  return (
    <Section id={id} tone="canvas" density="default">
      <Container>
        <div className="mb-12">
          <p className="label mb-3 text-ink-muted">03 / Lo que hacemos</p>
          <Heading voice="serif" as="h2" sizeClassName="text-3xl md:text-5xl text-ink">
            Servicios.
          </Heading>
        </div>

        <div className="border-t border-bone-300">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group flex flex-col justify-between border-b border-bone-200 py-8 transition-colors duration-200 hover:bg-bone-50/50 md:flex-row md:items-baseline md:gap-8"
            >
              <div className="flex items-baseline gap-4 md:w-1/3">
                <span className="text-xs text-ink-muted transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
                <h3 className="font-serif text-xl font-normal text-ink transition-colors group-hover:text-brand-900 md:text-2xl">
                  {pillar.title}
                </h3>
              </div>

              <div className="mt-2 flex items-center justify-between md:mt-0 md:w-2/3">
                <p className="max-w-2xl text-xs leading-relaxed text-ink-muted md:text-sm">
                  {pillar.description}
                </p>
                <span className="ml-4 shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrow-right" className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
