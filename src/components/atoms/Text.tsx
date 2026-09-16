import { cx } from "@/lib/cx";

type Size = "sm" | "base" | "lg" | "lede";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span" | "div" | "li" | "figcaption";
  size?: Size;
  className?: string;
}

const sizes: Record<Size, string> = {
  sm: "text-sm leading-relaxed text-ink-muted",
  base: "text-base leading-relaxed",
  lg: "text-lg leading-relaxed",
  /** Opening paragraph: larger, quieter colour, capped measure. */
  lede: "text-lg leading-relaxed text-ink-muted md:text-xl md:leading-relaxed max-w-[62ch]",
};

export function Text({
  children,
  as: Tag = "p",
  size = "base",
  className,
}: TextProps) {
  return <Tag className={cx(sizes[size], className)}>{children}</Tag>;
}
