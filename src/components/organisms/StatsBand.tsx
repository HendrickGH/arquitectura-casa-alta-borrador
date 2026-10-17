import { cx } from "@/lib/cx";
import { revealAttrs, revealStep } from "@/lib/reveal";
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
    index % 2 === 1 && "border-l border-bone-200/90 pl-6",
    index === 0
      ? "lg:border-l-0"
      : "lg:border-l lg:border-bone-200/90 lg:pl-8 xl:pl-10",
  );
}

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <section
      {...revealAttrs("stagger")}
      className="ruler-top border-b border-bone-200 bg-bone-50/70 py-4"
    >
      <Container>
        {/* Subtle architectural ledger header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] uppercase tracking-wider text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-800" />
            <span className="font-semibold text-ink">Registro técnico de obra</span>
            <span>·</span>
            <span>Costa y Valles Centrales de Oaxaca</span>
          </div>
          <span className="text-[0.6875rem] font-medium text-brand-800">
            Bitácora de obra
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-10 py-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              {...revealStep(index)}
              className={cx("py-1", ruleClass(index))}
            >
              <StatItem
                value={stat.value}
                label={stat.label}
                index={index + 1}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

