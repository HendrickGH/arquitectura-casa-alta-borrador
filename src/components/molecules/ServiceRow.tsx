import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import type { Service } from "@/types/content";

interface ServiceRowProps {
  service: Service;
}

/**
 * One entry in the services index. A titled block with its deliverable list,
 * not a card: no border, no background, no shadow. The rule that separates two
 * of these is drawn by the index around them, so the first entry has none.
 */
export function ServiceRow({ service }: ServiceRowProps) {
  return (
    <li className="py-10 md:py-12">
      <Heading as="h4" voice="plain" className="max-w-[26ch]">
        {service.title}
      </Heading>

      <Text className="mt-4 max-w-[62ch] text-ink-muted">
        {service.summary}
      </Text>

      {/* Capped measure: the index runs to 1312px on a wide canvas, and two
          columns of short deliverables 636px apart would read as a table. */}
      <ul className="mt-7 grid max-w-[56rem] grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
        {service.items.map((item) => (
          <Text as="li" size="sm" key={item}>
            {item}
          </Text>
        ))}
      </ul>
    </li>
  );
}
