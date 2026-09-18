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
    <section
      id={id}
      data-reveal="idle"
      className="border-t border-bone-200 bg-bone-50"
    >
      <Container className="flex flex-col items-center gap-7 py-24 text-center md:py-32 lg:py-40">
        <Heading voice="serif" className="max-w-[22ch]">
          {closing.heading}
        </Heading>

        <p className="max-w-[56ch] text-lg leading-relaxed text-ink-muted">
          {closing.body}
        </p>

        <Button href={closing.cta.href} external={external} className="mt-4">
          {closing.cta.label}
        </Button>
      </Container>
    </section>
  );
}
