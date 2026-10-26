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
    index % 2 === 1 && "pl-6",
    index === 0 ? "lg:pl-0" : "lg:pl-8 xl:pl-10",
  );
}

export function StatsBand({ stats }: StatsBandProps) {
  return (
    <section
      {...revealAttrs("stagger")}
      className="bg-bone-50/50 py-6"
    >
      <Container>
        <div className="grid grid-cols-2 gap-y-4 py-1 sm:grid-cols-4">
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

