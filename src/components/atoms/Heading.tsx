import { cx } from "@/lib/cx";

type Voice = "display" | "serif" | "plain";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  /**
   * display: Montserrat, uppercase, tight leading -- the house display voice.
   * serif:   Marcellus, for project titles and the emotional line.
   * plain:   sentence-case sans, for smaller section headings.
   */
  voice?: Voice;
  /**
   * Replaces the voice's default scale. A prop rather than a class the caller
   * appends: two size utilities on the same element resolve by their order in
   * the stylesheet, not by the order they were written, so a card that needs a
   * smaller title than the section scale cannot reliably say so with `className`.
   */
  sizeClassName?: string;
  className?: string;
}

const sizes: Record<Voice, string> = {
  display: "text-[2.5rem] leading-[0.95] md:text-6xl lg:text-7xl",
  /* The editorial scale: sentence-case serif can breathe, so it is set larger
     and looser than the uppercase display face would allow at the same size. */
  serif: "text-[2.25rem] leading-[1.06] md:text-[3rem] md:leading-[1.04] lg:text-[3.75rem]",
  plain: "text-2xl md:text-3xl",
};

const voices: Record<Voice, string> = {
  display: "display",
  /* text-balance keeps a one-word last line off the serif headings. */
  serif: "voice",
  plain: "font-medium",
};

export function Heading({
  children,
  as: Tag = "h2",
  voice = "display",
  sizeClassName,
  className,
}: HeadingProps) {
  return (
    <Tag className={cx(voices[voice], sizeClassName ?? sizes[voice], className)}>
      {children}
    </Tag>
  );
}
