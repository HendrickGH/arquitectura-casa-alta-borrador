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
          className="group flex w-full cursor-pointer items-start gap-3.5 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:gap-4 xl:gap-5 xl:py-2.5"
          aria-current={isActive ? "step" : undefined}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center text-xs tabular-nums transition-all duration-300 sm:h-8 sm:w-8 2xl:h-9 2xl:w-9 2xl:text-sm ${
              isActive
                ? "bg-bone-200 text-brand-800 font-semibold"
                : "bg-bone-100 text-ink-muted/70 font-medium group-hover:bg-bone-200 group-hover:text-ink"
            }`}
          >
            {marker}
          </span>

          <div className="min-w-0 flex-1">
            <Heading
              as="h3"
              voice="serif"
              sizeClassName="text-base leading-snug sm:text-lg lg:text-lg xl:text-xl 2xl:text-[1.35rem]"
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-ink"
                  : "text-ink-muted/50 group-hover:text-ink-muted"
              }`}
            >
              {step.title}
            </Heading>

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
                  className="max-w-[42ch] leading-relaxed text-ink-muted xl:max-w-[46ch] 2xl:max-w-[48ch]"
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
      className="py-8 md:py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 md:items-center md:gap-8 lg:gap-10">
        <div className={step.photo ? "md:col-span-6" : "md:col-span-12"}>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center bg-bone-200 text-xs font-semibold tabular-nums text-brand-800">
              {marker}
            </span>
            <span className="label tabular-nums text-ink-muted">
              {`Etapa ${marker} de ${String(total).padStart(2, "0")}`}
            </span>
          </div>

          <Heading
            as="h3"
            voice="serif"
            sizeClassName="mt-3 text-2xl leading-tight md:text-[1.65rem]"
          >
            {step.title}
          </Heading>

          <Text className="mt-3 max-w-[48ch] leading-relaxed text-ink-muted">
            {step.description}
          </Text>
        </div>

        {step.photo ? (
          <div className="mt-5 overflow-hidden md:col-span-6 md:mt-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bone-200 md:aspect-[4/3]">
              <Photo
                photo={step.photo}
                sizes="(min-width: 768px) 46vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
