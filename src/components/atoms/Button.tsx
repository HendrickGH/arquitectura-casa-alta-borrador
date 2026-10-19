import { Icon } from "@/components/atoms/Icon";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary" | "quiet" | "inverse" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  /**
   * An anchor when present. Omit it to render a real `<button>` -- the submit
   * or interactive control. The two are exclusive: a link that navigates and a
   * control that triggers an action are not the same thing, and the variants
   * are shared so the primary action still has exactly one owner.
   */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  /** Opens in a new tab and gets the matching rel. Anchors only. */
  external?: boolean;
  /** Submit controls only. */
  type?: "button" | "submit";
  disabled?: boolean;
  /** Renders a clean directional arrow icon alongside the label. */
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
    "text-ink underline decoration-ink/40 underline-offset-[6px] hover:text-brand-800 hover:decoration-brand-800",
  quiet: "text-brand-700 underline underline-offset-4 hover:text-brand-900",
  /* For use over a photograph or a dark panel; no brand fill, so the primary
     action stays unambiguous. */
  inverse: "bg-canvas text-ink hover:bg-bone-100",
  outline:
    "text-canvas underline decoration-canvas/50 underline-offset-[6px] hover:text-concha-nacar hover:decoration-concha-nacar",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "min-h-[48px] px-8 py-3.5",
  sm: "min-h-[44px] px-5 py-2.5",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  external = false,
  type = "button",
  disabled = false,
  arrow = false,
}: ButtonProps) {
  const isInlineLink =
    variant === "quiet" || variant === "secondary" || variant === "outline";

  const classes = cx(
    "group label inline-flex items-center justify-center gap-3 transition-colors duration-200",
    !isInlineLink ? sizes[size] : "py-1.5",
    variants[variant],
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    className,
  );

  const arrowIcon = arrow ? (
    <Icon
      name="arrow-right"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    />
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        <span>{children}</span>
        {arrowIcon}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      <span>{children}</span>
      {arrowIcon}
    </button>
  );
}
