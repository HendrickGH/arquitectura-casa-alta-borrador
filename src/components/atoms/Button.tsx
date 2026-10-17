import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "quiet" | "inverse" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  /**
   * An anchor when present. Omit it to render a real `<button>` -- the submit
   * control a form needs. The two are exclusive: a link that navigates and a
   * control that submits are not the same thing, and the variants are shared so
   * the primary action still has exactly one owner.
   */
  href?: string;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  /** Opens in a new tab and gets the matching rel. Anchors only. */
  external?: boolean;
  /** Submit controls only. */
  type?: "button" | "submit";
  disabled?: boolean;
  /** Renders the Thirdway-style double-arrow pill alongside the label. */
  arrow?: boolean;
}

/**
 * The only place a filled brand-blue surface appears.
 *
 * One rule keeps the next action unambiguous: `primary` is the sole user of the
 * solid brand fill, and everything else stays on translucent or bare chrome. A
 * call to action that is also a background is no longer a call to action.
 */
const variants: Record<Variant, string> = {
  primary: "bg-brand-800 text-white hover:bg-ink",
  secondary:
    "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white",
  quiet: "text-brand-700 underline underline-offset-4 hover:text-brand-900",
  /* For use over a photograph or a dark panel; no brand fill, so the primary
     action stays unambiguous. */
  inverse: "bg-canvas text-ink hover:bg-bone-100",
  outline:
    "border border-canvas/70 text-canvas hover:border-canvas hover:bg-canvas hover:text-ink",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-9 py-[1.15rem]",
  sm: "px-6 py-3",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external = false,
  type = "button",
  disabled = false,
  arrow = false,
}: ButtonProps) {
  const isQuiet = variant === "quiet";

  const classes = cx(
    "group label inline-flex items-center justify-center gap-3 transition-colors duration-200",
    !isQuiet && sizes[size],
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  const arrowPill = arrow ? (
    <span
      aria-hidden="true"
      className={cx(
        "arrow-pill",
        (variant === "inverse" || variant === "secondary" || isQuiet) &&
          "arrow-pill-ink",
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="arrow-pill-out h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M2.5 8h11m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="arrow-pill-in h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M2.5 8h11m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        <span>{children}</span>
        {arrowPill}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      <span>{children}</span>
      {arrowPill}
    </button>
  );
}
