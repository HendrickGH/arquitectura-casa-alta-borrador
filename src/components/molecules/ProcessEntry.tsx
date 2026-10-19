import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";
import type { ProcessStep } from "@/types/content";

interface ProcessEntryProps {
  step: ProcessStep;
  index: number;
  total: number;
  isActive?: boolean;
  onSelect?: () => void;
  variant?: "pinned" | "card";
  /** Zero-based position in the `stagger` cascade; omitted when unstaggered. */
  revealIndex?: number;
}

/**
 * One step of the methodology sequence.
 *
 * Supports two presentation variants:
 * - `pinned`: Interactive desktop ledger item with 0px tabular marker,
 *   active serif title, and smoothly collapsible narrative description.
 * - `card`: Sequential mobile/fallback presentation with inline photograph.
 */
export function ProcessEntry({
  step,
  index,
  total,
  isActive = false,
  onSelect,
  variant = "pinned",
  revealIndex,
}: ProcessEntryProps) {
  const marker = String(step.order).padStart(2, "0");

  if (variant === "pinned") {
    return (
      <li className="list-none">
        <button
          type="button"
          onClick={onSelect}
          className="group flex w-full cursor-pointer items-start gap-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          aria-current={isActive ? "step" : undefined}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-medium tabular-nums transition-all duration-300 sm:h-8 sm:w-8 ${
              isActive
                ? "border-brand-800 bg-canvas text-brand-800"
                : "border-bone-200 bg-transparent text-ink-muted/50 group-hover:border-ink-muted/60 group-hover:text-ink-muted"
            }`}
          >
            {marker}
          </span>

          <div className="min-w-0 flex-1">
            <h3
              className={`font-serif text-base leading-snug transition-colors duration-300 sm:text-lg lg:text-xl ${
                isActive
                  ? "font-medium text-ink"
                  : "text-ink-muted/50 group-hover:text-ink-muted"
              }`}
            >
              {step.title}
            </h3>

            <div
              className={`grid transition-all duration-500 ease-out ${
                isActive
                  ? "mt-2 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <Text
                  size="sm"
                  className="max-w-[46ch] leading-relaxed text-ink-muted"
                >
                  {step.description}
                </Text>
              </div>
            </div>
          </div>
        </button>
      </li>
    );
  }

  return (
    <li
      {...revealStep(revealIndex ?? index)}
      className="border-b border-bone-200 py-8 first:border-t"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center border border-brand-800 text-xs font-medium tabular-nums text-brand-800">
          {marker}
        </span>
        <span className="label tabular-nums text-ink-muted">
          {`Etapa ${marker} de ${String(total).padStart(2, "0")}`}
        </span>
      </div>

      <Heading
        as="h3"
        voice="serif"
        sizeClassName="mt-3 text-2xl leading-tight md:text-[1.75rem]"
      >
        {step.title}
      </Heading>

      <Text className="mt-3 text-ink-muted">{step.description}</Text>

      {step.photo ? (
        <div className="mt-5 overflow-hidden">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200">
            <Photo photo={step.photo} sizes="95vw" />
          </div>
        </div>
      ) : null}
    </li>
  );
}
