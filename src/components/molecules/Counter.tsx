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
 * The pagination treatment borrowed from Cosentino's carousel: a small counter
 * with a hairline progress bar under it. On a static grid the bar encodes how
 * much of the set is on screen, which is the same job it does on the carousel.
 */
export function Counter({ current, total, className }: CounterProps) {
  const ratio = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
  const percent = `${(ratio * 100).toFixed(2)}%`;

  return (
    <div className={cx("flex w-full max-w-[220px] flex-col gap-3", className)}>
      <p className="label text-ink-muted">
        <span className="text-ink">{pad(current)}</span>
        <span aria-hidden="true"> / </span>
        <span>{pad(total)}</span>
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        className="h-px w-full bg-bone-200"
      >
        <div className="h-px bg-brand-700" style={{ width: percent }} />
      </div>
    </div>
  );
}
