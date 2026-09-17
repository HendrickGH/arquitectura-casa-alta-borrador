import { cx } from "@/lib/cx";

type Tone = "canvas" | "bone";

interface SectionProps {
  children: React.ReactNode;
  /** Alternating tint. The page base is always canvas; bone never leads. */
  tone?: Tone;
  /** Anchor target for in-page navigation. */
  id?: string;
  className?: string;
}

export function Section({
  children,
  tone = "canvas",
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-reveal="idle"
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
