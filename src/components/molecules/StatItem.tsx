import { Text } from "@/components/atoms/Text";

interface StatItemProps {
  value: string;
  label: string;
}

/**
 * One figure in the ledger. The figure is set in the editorial serif at display
 * size and the label is a plain sentence underneath it, so the band reads as a
 * record of work rather than as four cards.
 *
 * lg, not md: the band is four columns from lg up, and the widest figure
 * ("50,000", 3.46em) needs 166px at 48px, which four columns of a 1024px
 * viewport cannot give at 60px. tabular-nums because the four figures are read
 * as a set and compared, so their digits should align.
 *
 * `data-count` carries the authored value to the reveal script, which counts it
 * up from zero the first time the band enters. The text stays the final value in
 * the server HTML, so the figure is correct before any script runs and under
 * reduced motion; the count only rewrites it while the section animates in.
 */
export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-4">
      <p
        data-count={value}
        className="voice text-4xl leading-[1] tabular-nums md:text-5xl lg:text-6xl"
      >
        {value}
      </p>
      <Text size="sm">{label}</Text>
    </div>
  );
}
