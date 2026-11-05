import { Container } from "@/components/atoms/Container";
import type { Architect } from "@/types/content";

interface ArchitectQuoteProps {
  quote: string;
  architect?: Architect;
  author?: string;
  eyebrow?: string;
}

export function ArchitectQuote({
  quote,
  architect,
  author,
  eyebrow,
}: ArchitectQuoteProps) {
  const authorName = author ?? (architect ? `Arq. ${architect.name}` : undefined);

  return (
    <section className="bg-bone-100/70 py-24 md:py-32">
      <Container className="flex max-w-4xl flex-col items-center text-center">
        {eyebrow ? (
          <p className="eyebrow mb-6 w-full text-brand-800 !text-center">
            {eyebrow}
          </p>
        ) : null}
        <blockquote className="voice text-2xl font-normal leading-relaxed text-ink sm:text-3xl md:text-4xl !text-center">
          “{quote}”
        </blockquote>
        {authorName ? (
          <div className="mt-8 w-full text-center">
            <p className="label uppercase tracking-widest text-ink !text-center">
              {authorName}
            </p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
