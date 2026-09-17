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
  className?: string;
}

const sizes: Record<Voice, string> = {
  display: "text-[2.5rem] leading-[0.95] md:text-6xl lg:text-7xl",
  serif: "text-3xl md:text-4xl lg:text-5xl",
  plain: "text-2xl md:text-3xl",
};

const voices: Record<Voice, string> = {
  display: "display",
  /* text-balance avoids a one-word last line in the serif headings. */
  serif: "voice text-balance",
  plain: "font-medium",
};

export function Heading({
  children,
  as: Tag = "h2",
  voice = "display",
  className,
}: HeadingProps) {
  return (
    <Tag className={cx(voices[voice], sizes[voice], className)}>{children}</Tag>
  );
}
