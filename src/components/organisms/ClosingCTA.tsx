import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import type { CallToAction } from "@/types/content";

interface ClosingCTAProps {
  closing: { heading: string; body: string; cta: CallToAction };
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The last thing on the page before the footer: one sentence, one button, on
 * the bone plate. The heading is set in the serif face rather than the display
 * face, so the page ends quietly instead of shouting one more time.
 */
export function ClosingCTA({ closing, id }: ClosingCTAProps) {
  const external = closing.cta.href.startsWith("http");

  return (
    <section id={id} data-reveal="idle" className="bg-bone-50">
      <Container className="flex flex-col items-center gap-8 py-20 text-center md:py-28">
        <Heading voice="serif" className="max-w-[24ch]">
          {closing.heading}
        </Heading>

        <p className="max-w-[58ch] text-lg leading-relaxed text-ink-muted">
          {closing.body}
        </p>

        <Button href={closing.cta.href} external={external} className="mt-2">
          {closing.cta.label}
        </Button>
      </Container>
    </section>
  );
}
