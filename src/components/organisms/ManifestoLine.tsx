import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";

interface ManifestoLineProps {
  line: string;
  tone?: "canvas" | "bone";
}

/**
 * The breath: one sentence the client wrote, set large, with nothing beside it.
 *
 * Deliberately not a heading. It opens no section and lists nothing, so an `h2`
 * would put a page structure where the page is only speaking; the serif voice
 * is the one the site already uses for its emotional lines.
 *
 * No photograph either, and that is a decision rather than an omission: an
 * image inside the pause contradicts the pause. The sections around it carry
 * the imagery.
 */
export function ManifestoLine({ line, tone = "bone" }: ManifestoLineProps) {
  return (
    <Section tone={tone}>
      <Container>
        <p className="voice max-w-[36ch] text-3xl leading-snug text-ink md:text-4xl lg:text-5xl">
          {line}
        </p>
      </Container>
    </Section>
  );
}
