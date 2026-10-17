import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";
import type { ProcessStep } from "@/types/content";

interface ProcessEntryProps {
  step: ProcessStep;
  /** Zero-based position in the `stagger` cascade; omitted when unstaggered. */
  revealIndex?: number;
}

/**
 * One step of the process. Numbered because the process genuinely is a
 * sequence -- this is the only place on the landing where a number marker
 * carries meaning rather than decorating a set.
 */
export function ProcessEntry({ step, revealIndex }: ProcessEntryProps) {
  const marker = String(step.order).padStart(2, "0");

  return (
    <li
      {...revealStep(revealIndex)}
      className="grid gap-5 py-9 md:grid-cols-12 md:gap-10 md:py-11"
    >
      <div className="flex items-baseline gap-5 md:col-span-5">
        <span className="number-pill shrink-0">{marker}</span>
        <Heading
          as="h3"
          voice="serif"
          sizeClassName="text-[1.35rem] leading-[1.2] md:text-[1.6rem]"
          className="max-w-[24ch]"
        >
          {step.title}
        </Heading>
      </div>

      <div className="flex flex-col gap-4 md:col-span-7">
        <Text className="text-ink-muted">{step.description}</Text>

        {step.deliverables && step.deliverables.length > 0 ? (
          <ul className="flex flex-wrap gap-2 pt-1">
            {step.deliverables.map((item) => (
              <li
                key={item}
                className="border border-bone-200 bg-canvas px-3 py-1 text-xs font-medium text-brand-900"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
