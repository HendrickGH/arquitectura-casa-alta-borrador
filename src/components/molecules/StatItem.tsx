import { Text } from "@/components/atoms/Text";

interface StatItemProps {
  value: string;
  label: string;
  index?: number;
}

/**
 * One figure in the ledger. The figure is set in the editorial serif at display
 * size and the label is a plain sentence underneath it, so the band reads as a
 * record of work rather than as four cards.
 *
 * `data-count` carries the authored value to the reveal script, which counts it
 * up from zero the first time the band enters.
 */
export function StatItem({ value, label, index }: StatItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2 pr-4">
        <p
          data-count={value}
          className="voice text-3xl leading-[1] text-brand-900 tabular-nums md:text-4xl lg:text-5xl"
        >
          {value}
        </p>
        {index !== undefined ? (
          <span className="number-pill">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <Text size="sm" className="text-ink-muted">
        {label}
      </Text>
    </div>
  );
}
