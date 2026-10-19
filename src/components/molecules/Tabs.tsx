"use client";

import { cx } from "@/lib/cx";

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string = string> {
  tabs: readonly TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Cosentino-style architectural catalogue tab bar.
 *
 * Uses a clean bottom hairline (`border-b border-bone-200`) and a 2px active
 * underline (`border-brand-800`) at 0px geometry — never oval capsule buttons.
 */
export function Tabs<T extends string = string>({
  tabs,
  activeId,
  onChange,
  ariaLabel,
  className,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cx(
        "flex flex-wrap items-center gap-6 border-b border-bone-200 md:gap-8",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cx(
              "label -mb-px inline-flex min-h-[44px] cursor-pointer items-center gap-2 border-b-2 pb-3 transition-colors duration-200",
              active
                ? "border-brand-800 font-medium text-ink"
                : "border-transparent text-ink-muted hover:border-ink/30 hover:text-ink",
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" ? (
              <span
                className={cx(
                  "tabular-nums",
                  active ? "text-brand-800" : "text-ink-muted/75",
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
