import { cx } from "@/lib/cx";
import { revealAttrs, revealStep } from "@/lib/reveal";
import { Container } from "@/components/atoms/Container";
import { StatItem } from "@/components/molecules/StatItem";
import type { Stat } from "@/types/content";

interface StatsBandProps {
  stats: Stat[];
}

function ruleClass(index: number): string {
  return cx(
    index % 2 === 1 && "border-l border-bone-200 pl-6",
    index === 0
      ? "lg:border-l-0"
      : "lg:border-l lg:border-bone-200 lg:pl-8 xl:pl-10",
  );
}

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <section
      {...revealAttrs("stagger")}
      className="border-t border-b border-bone-200 bg-bone-50/70 py-8"
    >
      <Container>
        {/* Subtle architectural ledger header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-brand-800" />
            <span className="label text-ink">Registro técnico de obra</span>
            <span className="text-ink-muted">·</span>
            <span className="label text-ink-muted">
              Costa y Valles Centrales de Oaxaca
            </span>
          </div>
          <span className="label text-brand-800">Bitácora de obra</span>
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
                tag={stat.tag}
                sub={stat.sub}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

