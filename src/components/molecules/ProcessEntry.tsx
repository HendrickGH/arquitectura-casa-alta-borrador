import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import type { ProcessStep } from "@/types/content";

interface ProcessEntryProps {
  step: ProcessStep;
}

/**
 * One step of the process. Numbered because the process genuinely is a
 * sequence -- this is the only place on the landing where a number marker
 * carries meaning rather than decorating a set.
 */
export function ProcessEntry({ step }: ProcessEntryProps) {
  const marker = String(step.order).padStart(2, "0");

  return (
    <li className="grid gap-5 py-10 md:grid-cols-12 md:gap-10 md:py-12">
      <div className="flex items-baseline gap-6 md:col-span-5">
        <span className="display text-3xl leading-[0.92] text-brand-700 md:text-4xl">
          {marker}
        </span>
        <Heading as="h3" voice="plain" className="max-w-[20ch]">
          {step.title}
        </Heading>
      </div>

      <Text className="text-ink-muted md:col-span-7">{step.description}</Text>
    </li>
  );
}
