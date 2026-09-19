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
}

/**
 * The heading block a section opens with.
 *
 * Empty strings remove their element entirely rather than rendering a hollow
 * tag, which is what lets a section carry no eyebrow without leaving a gap
 * where one would have been.
 *
 * The eyebrow, heading and body are marked as reveal steps 0, 1 and 2, so a
 * `stagger` section brings them in in reading order; in a `fade` section the
 * markers are inert and the block still reveals as one.
 */
export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
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

      {/* Sentence-case serif, so the heading can wrap on its own and needs no
          non-breaking measure. The width cap keeps it to a comfortable measure
          rather than a full-width banner. */}
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
}
