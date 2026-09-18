import { Container } from "@/components/atoms/Container";

interface ManifestoLineProps {
  line: string;
}

/**
 * The breath: one sentence the client wrote, set large, with nothing beside it.
 *
 * This is the page's one dark band, and the only place it raises its voice. The
 * sentence is the studio's own mission statement, so it is given the weight of a
 * full-bleed plate in the brand's deepest blue, set in the editorial serif at a
 * size no other line on the page reaches; everything around it stays white and
 * quiet. Spending the boldness in a single place is what keeps the rest of the
 * page disciplined.
 *
 * Deliberately not a heading. It opens no section and lists nothing, so an `h2`
 * would put a page structure where the page is only speaking. No photograph
 * either: an image inside the pause contradicts the pause.
 */
export function ManifestoLine({ line }: ManifestoLineProps) {
  return (
    <section data-reveal="idle" className="bg-brand-900 text-white">
      <Container className="py-20 md:py-32 lg:py-40">
        <p className="voice max-w-[34ch] text-[1.75rem] leading-[1.28] md:text-[2.5rem] md:leading-[1.22] lg:text-[3rem] lg:leading-[1.16]">
          {line}
        </p>
      </Container>
    </section>
  );
}
