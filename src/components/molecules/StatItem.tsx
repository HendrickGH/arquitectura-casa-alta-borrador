import { Text } from "@/components/atoms/Text";

interface StatItemProps {
  value: string;
  label: string;
  index?: number;
}

const STAT_METRICS_INFO: Record<number, { tag: string; sub: string }> = {
  1: { tag: "TRAYECTORIA", sub: "Presencia continua en Oaxaca" },
  2: { tag: "PROYECTOS", sub: "Edificación habitacional y civil" },
  3: { tag: "SUPERFICIE", sub: "Cálculo y estructura ejecutada" },
  4: { tag: "GARANTÍA", sub: "Certeza técnica y contractual" },
};

/**
 * One figure in the ledger. The figure is set in the editorial serif at display
 * size with an architectural discipline tag and tabular numerals.
 *
 * `data-count` carries the authored value to the reveal script, which counts it
 * up from zero the first time the band enters.
 */
export function StatItem({ value, label, index }: StatItemProps) {
  const meta = index !== undefined ? STAT_METRICS_INFO[index] : null;

  return (
    <div className="group flex flex-col justify-between gap-3 p-1 transition-all duration-300">
      <div className="flex items-center justify-between gap-2 pr-4">
        {meta ? (
          <span className="label text-[0.65rem] tracking-widest text-brand-800 font-semibold">
            {meta.tag}
          </span>
        ) : <span />}
        {index !== undefined ? (
          <span className="number-pill transition-colors duration-300 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div>
        <p
          data-count={value}
          className="voice text-3xl leading-[1.05] text-brand-900 tabular-nums transition-transform duration-300 group-hover:translate-x-0.5 md:text-4xl lg:text-5xl"
        >
          {value}
        </p>
        <Text size="sm" className="mt-2 text-ink font-medium leading-snug">
          {label}
        </Text>
        {meta?.sub ? (
          <p className="mt-1 text-[0.75rem] text-ink-muted leading-relaxed">
            {meta.sub}
          </p>
        ) : null}
      </div>
    </div>
  );
}

