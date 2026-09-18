import { cx } from "@/lib/cx";

interface CounterProps {
  current: number;
  total: number;
  className?: string;
}

/** Zero-padded, so "1 of 6" sets as "01 / 06" and never changes width. */
function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * The count that sits beside the portfolio heading: how many projects the
 * landing is showing out of the set. Set in the editorial serif so it reads as
 * a caption to the section rather than as a control.
 *
 * It carries no progress bar. The bar belongs to a carousel, where it encodes
 * which slice is on screen; the grid is static and shows everything at once, so
 * a bar at "1 of 6" would be an affordance that lies about the page.
 */
export function Counter({ current, total, className }: CounterProps) {
  return (
    <p className={cx("voice text-lg text-ink-muted", className)}>
      <span className="text-ink">{pad(current)}</span>
      <span aria-hidden="true"> / </span>
      {pad(total)}
    </p>
  );
}
