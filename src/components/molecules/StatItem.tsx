import { Text } from "@/components/atoms/Text";

interface StatItemProps {
  value: string;
  label: string;
}

/**
 * One figure in the stats band. The number carries the weight; the label is a
 * plain sentence, not a tracked-out caption, because four of them in a row
 * would read as decoration.
 */
export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* lg, not md: the band is four columns from lg up, and the widest
          figure ("50,000", 3.46em) needs 166px at 48px, which four columns of
          a 1024px viewport cannot give at 60px. */}
      {/* tabular-nums: the four figures are read as a set and compared, so
          their digits should align. */}
      <p className="display text-4xl leading-[0.92] tabular-nums lg:text-5xl">
        {value}
      </p>
      <Text size="sm">{label}</Text>
    </div>
  );
}
