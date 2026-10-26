"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/molecules/SectionHeading";
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
        <SectionHeading
          eyebrow="Lo que hacemos"
          heading="Servicios."
          action={
            <Button href="/servicios" variant="secondary" size="sm" arrow>
              Conoce todos nuestros servicios
            </Button>
          }
          className="mb-12 md:flex-row md:items-end"
        />

        <div className="divide-y divide-bone-200">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group flex flex-col justify-between py-8 transition-colors duration-200 hover:bg-bone-50/50 md:flex-row md:items-baseline md:gap-8"
            >
              <div className="flex items-baseline md:w-1/3">
                <h3 className="voice text-xl font-normal text-ink transition-colors group-hover:text-brand-900 md:text-2xl">
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
