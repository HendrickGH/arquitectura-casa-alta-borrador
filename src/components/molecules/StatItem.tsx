interface StatItemProps {
  value: string;
  label: string;
  tag?: string;
  sub?: string;
}

/**
 * One figure in the ledger. The figure is set in the editorial serif at display
 * size with an architectural discipline tag and tabular numerals.
 *
 * `data-count` carries the authored value to the reveal script, which counts it
 * up from zero the first time the band enters.
 */
export function StatItem({ value, label, tag, sub }: StatItemProps) {
  return (
    <div className="group flex flex-col justify-start gap-1 p-1">
      {tag ? (
        <span className="text-[10px] tracking-wider uppercase text-ink-muted">{tag}</span>
      ) : null}

      <div>
        <p
          data-count={value}
          className="font-serif text-xl text-brand-900 tabular-nums md:text-2xl"
        >
          {value}
        </p>
        <p className="text-xs font-medium text-ink">
          {label}
        </p>
        {sub ? (
          <p className="text-[11px] text-ink-muted">{sub}</p>
        ) : null}
      </div>
    </div>
  );
}

