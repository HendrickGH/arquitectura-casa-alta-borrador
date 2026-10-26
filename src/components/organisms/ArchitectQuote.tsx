import { Container } from "@/components/atoms/Container";
import type { Architect } from "@/types/content";

interface ArchitectQuoteProps {
  quote: string;
  architect: Architect;
}

export function ArchitectQuote({ quote, architect }: ArchitectQuoteProps) {
  return (
    <section className="bg-bone-100/70 py-24 md:py-32">
      <Container className="max-w-4xl text-center">
        <p className="eyebrow mb-6 text-brand-800">Una visión de la arquitectura</p>
        <blockquote className="voice text-2xl font-normal leading-relaxed text-ink sm:text-3xl md:text-4xl">
          “{quote}”
        </blockquote>
        <div className="mt-8">
          <p className="label uppercase tracking-widest text-ink">
            Arq. {architect.name}
          </p>
        </div>
      </Container>
    </section>
  );
}
