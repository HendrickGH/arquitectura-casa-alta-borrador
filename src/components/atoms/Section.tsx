import { cx } from "@/lib/cx";
import { revealAttrs, type RevealVariant } from "@/lib/reveal";

type Tone = "canvas" | "bone" | "concha-nacar";
type Density = "default" | "compact";

interface SectionProps {
  children: React.ReactNode;
  /** Alternating tint. The page base is always canvas; bone never leads. */
  tone?: Tone;
  /** Vertical rhythm scale. Use `compact` for dense bands or editorial splits. */
  density?: Density;
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

const tones: Record<Tone, string> = {
  canvas: "bg-canvas",
  bone: "bg-bone-50",
  "concha-nacar": "bg-concha-nacar/35",
};

const densities: Record<Density, string> = {
  default: "py-20 md:py-28 lg:py-36",
  compact: "py-12 md:py-16 lg:py-20",
};

export function Section({
  children,
  tone = "canvas",
  density = "default",
  id,
  className,
  reveal = "fade",
}: SectionProps) {
  return (
    <section
      id={id}
      {...revealAttrs(reveal)}
      className={cx(
        densities[density],
        tones[tone],
        // Anchored sections clear the sticky header through the global
        // `scroll-padding-top` in globals.css, which reads `--chrome-h`.
        className,
      )}
    >
      {children}
    </section>
  );
}
