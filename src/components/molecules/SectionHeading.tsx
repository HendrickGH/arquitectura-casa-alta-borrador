import { cx } from "@/lib/cx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";

interface SectionHeadingProps {
  /** Short kicker above the heading. The element is dropped when empty. */
  eyebrow?: string;
  heading: string;
  /** Opening paragraph. The element is dropped when empty. */
  body?: string;
  align?: "left" | "center";
}

/**
 * The heading block a section opens with.
 *
 * Empty strings remove their element entirely rather than rendering a hollow
 * tag, which is what lets a section carry no eyebrow without leaving a gap
 * where one would have been.
 */
export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        centered && "items-center text-center",
      )}
    >
      {eyebrow ? <p className="label text-brand-700">{eyebrow}</p> : null}

      {/*
        The clamp only ever shrinks the heading, and only below a 417px
        viewport; from there up it resolves to the atom's own 2.5rem. It is
        here because the display face is uppercase and cannot break: measured
        against the shipped Montserrat 600, "Arquitectura" sets 8.171em, which
        is 327px at 40px -- exactly the 327px a 375px viewport offers, leaving
        no margin for rendering variance.
      */}
      <Heading
        voice="display"
        className={cx(
          "max-w-[22ch] text-[clamp(2rem,9.6vw,2.5rem)]",
          centered && "mx-auto",
        )}
      >
        {heading}
      </Heading>

      {body ? (
        <Text size="lede" className={cx(centered && "mx-auto")}>
          {body}
        </Text>
      ) : null}
    </div>
  );
}
