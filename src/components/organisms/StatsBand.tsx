import { cx } from "@/lib/cx";
import { Container } from "@/components/atoms/Container";
import { StatItem } from "@/components/molecules/StatItem";
import type { Stat } from "@/types/content";

interface StatsBandProps {
  stats: Stat[];
}

/**
 * A flat band of figures under the hero. Vertical hairlines separate them, one
 * per breakpoint: two columns below lg means a rule on the second of each pair,
 * four at lg and up means a rule on every one but the first. Nothing here is a
 * card.
 *
 * The rules only move at lg because the band only becomes four columns at lg --
 * four columns of a 768px viewport leave 132px per cell, which is less than the
 * widest figure needs.
 */
function ruleClass(index: number): string {
  return cx(
    index % 2 === 1 && "border-l border-bone-200 pl-6",
    index === 0 ? "lg:border-l-0" : "lg:border-l lg:border-bone-200 lg:pl-10",
  );
}

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <section className="bg-bone-50">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 py-14 md:py-20 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={cx("py-2", ruleClass(index))}>
              <StatItem value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
