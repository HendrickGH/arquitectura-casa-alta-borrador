import { Container } from "@/components/atoms/Container";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { Architect } from "@/types/content";

interface ManifestoLineProps {
  line: string;
  architect: Architect;
}

/**
 * The breath, spoken as a quote: the studio's mission sentence, set larger than
 * anything else on the page, on a quiet bone plate, with the architect's name
 * beneath it as the attribution.
 *
 * The plate never animates -- it is structure, not content. The quote mark, the
 * sentence and the signature are the reveal steps, so the words fade in on top
 * of an already-present background instead of the whole band fading as a block.
 * The hierarchy is carried by colour and size now that the dark plate is gone:
 * the sentence is the loudest line in the brand's deepest blue, the signature is
 * a whisper beneath it.
 *
 * Deliberately not a heading. It opens no section and lists nothing, so it stays
 * a `figure` + `blockquote` rather than adding a page-structure `h2`. No
 * photograph either: an image inside the pause contradicts the pause.
 */
export function ManifestoLine({ line, architect }: ManifestoLineProps) {
  return (
    <section {...revealAttrs("stagger")} className="bg-bone-50">
      <Container className="py-24 md:py-36 lg:py-44">
        <figure className="max-w-[56rem]">
          {/* The quote's own signifier, larger than the sentence and faded back
              so it decorates without competing. */}
          <span
            aria-hidden="true"
            {...revealStep(0)}
            className="voice pointer-events-none block select-none text-[4.5rem] leading-[0.75] text-brand-500/30 md:text-[6rem]"
          >
            &ldquo;
          </span>

          <blockquote {...revealStep(1)} className="mt-2 md:mt-4">
            <p className="voice max-w-[34ch] text-[1.75rem] leading-[1.28] text-brand-900 md:text-[2.5rem] md:leading-[1.22] lg:text-[3rem] lg:leading-[1.16]">
              {line}
            </p>
          </blockquote>

          <figcaption {...revealStep(2)} className="mt-12 md:mt-16">
            <span
              aria-hidden="true"
              className="block h-px w-14 bg-brand-800/30"
            />
            <p className="label mt-6 text-brand-800">{architect.name}</p>
            <p className="label mt-2 text-ink-muted">{architect.role}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
