import { EditorialImage } from "@/components/organisms/EditorialImage";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { cx } from "@/lib/cx";
import type { Service } from "@/types/content";

interface ServiceRowProps {
  service: Service;
  /** Position in the whole catalogue, 1-based, rendered as a two-digit index. */
  index: number;
  /** Flip the panel: image right at md+ for every other row. */
  flip?: boolean;
}

/**
 * `50vw` from `md` is the shipped tier and it is exact here: the panel is a
 * two-column grid, so the image slot is half the viewport from 768px up. Below
 * that it is one column and the image is full width.
 */
const PANEL_SIZES = "(min-width: 768px) 50vw, 100vw";

/**
 * One service as an editorial panel: a photograph on one side, the index, the
 * title, the summary and the deliverable list on the other. Alternating the
 * image side is what gives the catalogue its rhythm instead of a flat list.
 *
 * A service with no ingested image renders as the plain block it always was:
 * no empty half, no placeholder.
 */
export function ServiceRow({ service, index, flip = false }: ServiceRowProps) {
  const label = String(index).padStart(2, "0");

  const body = (
    <>
      <span className="label text-brand-800">{label}</span>
      <Heading as="h4" voice="plain" className="mt-3 max-w-[24ch]">
        {service.title}
      </Heading>
      <Text className="voice mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
        {service.summary}
      </Text>
      {/* Capped measure: the list stays a compact spec under the summary, not a
          table spanning the panel. */}
      <ul className="mt-7 grid max-w-[56rem] grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
        {service.items.map((item) => (
          <Text as="li" size="sm" key={item}>
            {item}
          </Text>
        ))}
      </ul>
    </>
  );

  if (!service.image) {
    return <li className="max-w-[62ch]">{body}</li>;
  }

  return (
    <li className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <EditorialImage
        photo={service.image}
        sizes={PANEL_SIZES}
        className={cx(flip && "md:order-2")}
      />
      <div className={cx(flip && "md:order-1")}>{body}</div>
    </li>
  );
}
