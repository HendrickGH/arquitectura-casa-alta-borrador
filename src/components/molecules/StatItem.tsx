import { Text } from "@/components/atoms/Text";

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
    <div className="group flex flex-col justify-between gap-3 p-1 transition-all duration-300">
      {tag ? (
        <span className="label text-brand-800">{tag}</span>
      ) : null}

      <div>
        <p
          data-count={value}
          className="voice text-3xl leading-[1.05] text-brand-900 tabular-nums transition-transform duration-300 group-hover:translate-x-0.5 md:text-4xl lg:text-5xl"
        >
          {value}
        </p>
        <Text size="sm" className="mt-2 font-medium leading-snug text-ink">
          {label}
        </Text>
        {sub ? (
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{sub}</p>
        ) : null}
      </div>
    </div>
  );
}

