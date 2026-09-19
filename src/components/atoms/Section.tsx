import { cx } from "@/lib/cx";
import { revealAttrs, type RevealVariant } from "@/lib/reveal";

type Tone = "canvas" | "bone";

interface SectionProps {
  children: React.ReactNode;
  /** Alternating tint. The page base is always canvas; bone never leads. */
  tone?: Tone;
  /** Anchor target for in-page navigation. */
  id?: string;
  className?: string;
  /**
   * How this section joins the scroll reveal. `fade` (default) transitions the
   * section as one block; `stagger` hands the gesture to its children; `none`
   * opts out entirely. See `src/lib/reveal.ts`.
   */
  reveal?: RevealVariant;
}

export function Section({
  children,
  tone = "canvas",
  id,
  className,
  reveal = "fade",
}: SectionProps) {
  return (
    <section
      id={id}
      {...revealAttrs(reveal)}
      className={cx(
        "py-20 md:py-28 lg:py-36",
        tone === "bone" ? "bg-bone-50" : "bg-canvas",
        // Anchored sections clear the sticky header through the global
        // `scroll-padding-top` in globals.css, which reads `--chrome-h`.
        className,
      )}
    >
      {children}
    </section>
  );
}
