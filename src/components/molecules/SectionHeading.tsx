import { cx } from "@/lib/cx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";

interface SectionHeadingProps {
  /** Short kicker above the heading. The element is dropped when empty. */
  eyebrow?: string;
  heading: string;
  /** Opening paragraph. The element is dropped when empty. */
  body?: string;
  align?: "left" | "center";
  /**
   * The heading's level. `h2` on the landing, where it labels a section under
   * the hero's `h1`; `h1` on a route that has no hero and must supply its own.
   */
  as?: "h1" | "h2";
  /** Optional right-aligned editorial CTA when header splits across the grid. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * The heading block a section opens with.
 *
 * Canonical order: 1° Eyebrow (.eyebrow) -> 2° Heading (.voice) -> 3° Body
 * -> 4° Action (optional right-aligned CTA on desktop).
 */
export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  as = "h2",
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center" && !action;

  const copyStack = (
    <div
      className={cx(
        "flex flex-col gap-4",
        centered && "items-center text-center",
      )}
    >
      {eyebrow ? (
        <div {...revealStep(0)}>
          <p className="eyebrow">{eyebrow}</p>
        </div>
      ) : null}

      <div {...revealStep(1)}>
        <Heading
          as={as}
          voice="serif"
          className={cx("max-w-[26ch]", centered && "mx-auto")}
        >
          {heading}
        </Heading>
      </div>

      {body ? (
        <div {...revealStep(2)}>
          <Text size="lede" className={cx("mt-1", centered && "mx-auto")}>
            {body}
          </Text>
        </div>
      ) : null}
    </div>
  );

  if (action) {
    return (
      <div
        className={cx(
          "flex flex-col justify-between gap-6 border-b border-bone-200 pb-8 lg:flex-row lg:items-end",
          className,
        )}
      >
        {copyStack}
        <div {...revealStep(2)} className="shrink-0">
          {action}
        </div>
      </div>
    );
  }

  return <div className={className}>{copyStack}</div>;
}
