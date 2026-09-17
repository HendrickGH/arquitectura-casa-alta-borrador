import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "quiet";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab and gets the matching rel. */
  external?: boolean;
}

/**
 * The only place a filled brand-blue surface appears.
 *
 * One rule keeps the next action unambiguous: `primary` is the sole user of the
 * solid brand fill, and everything else stays on translucent or bare chrome. A
 * call to action that is also a background is no longer a call to action.
 */
const variants: Record<Variant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-900",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
  quiet: "text-brand-700 underline underline-offset-4 hover:text-brand-900",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonProps) {
  const isQuiet = variant === "quiet";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        "label inline-flex items-center justify-center transition-colors duration-200",
        !isQuiet && "px-8 py-4",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
