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
 * Architectural catalogue tab bar.
 *
 * Uses clean typographic contrast without border strokes at 0px geometry.
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
        "flex flex-wrap items-center gap-6 md:gap-8",
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
              "label inline-flex min-h-[44px] cursor-pointer items-center gap-2 pb-2 transition-colors duration-200",
              active
                ? "font-semibold text-brand-800"
                : "text-ink-muted hover:text-ink",
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
