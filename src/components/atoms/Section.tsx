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
      className={cx(
        "py-20 md:py-28 lg:py-36",
        tone === "bone" ? "bg-bone-50" : "bg-canvas",
        // An anchored section must clear the sticky header when jumped to.
        id && "scroll-mt-28",
        className,
      )}
    >
      {children}
    </section>
  );
}
