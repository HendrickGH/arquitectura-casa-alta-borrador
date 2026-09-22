import { EditorialImage } from "@/components/organisms/EditorialImage";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { cx } from "@/lib/cx";
import { revealStep } from "@/lib/reveal";
import type { Service } from "@/types/content";

type ServiceRowVariant = "panel" | "card";

interface ServiceRowProps {
  service: Service;
  /** Flip the panel: image on the right once it is alone in its row. */
  flip?: boolean;
  /**
   * `panel` for a service that occupies a whole row on its own -- the leading
   * service of a chapter, and any compact the two-up grid would strand. Its
   * image is the larger one. `card` for the two-up services that share a row.
   *
   * Both carry the photo; the variant changes its size and framing, never its
   * presence.
   */
  variant?: ServiceRowVariant;
  /** Zero-based position in the `stagger` cascade; omitted when unstaggered. */
  revealIndex?: number;
}

/**
 * A panel is alone in its row, so its image earns the wider slot: 70% of the
 * container from `lg` and 50% at `md`, where the text column would otherwise
 * squeeze the deliverable list. Below `md` the panel is one column and the
 * image is full width.
 */
const PANEL_SIZES = "(min-width: 1024px) 70vw, (min-width: 768px) 50vw, 100vw";

/**
 * The two-up cards sit inside the capped Container, so each is a little under
 * half the viewport. Declaring `sizes` honestly is what lets the loader pick a
 * tier that exists and matches the rendered slot.
 */
const CARD_SIZES = "(min-width: 768px) 45vw, 100vw";

function ServiceItems({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <Text as="li" size="sm" key={item}>
          {item}
        </Text>
      ))}
    </ul>
  );
}

/**
 * One service. The `panel` tier is the editorial layout: a photograph on one
 * side at its own ratio, the title, the summary and the deliverable list on
 * the other. The `card` tier is the lighter layout the services sharing a
 * two-up row fall into: a fixed-ratio crop so the row stays aligned, then the
 * same content at a smaller scale.
 *
 * Either tier renders without an ingested image: the photo is texture, never a
 * dependency, so a service without one is still complete.
 */
export function ServiceRow({
  service,
  flip = false,
  variant = "panel",
  revealIndex,
}: ServiceRowProps) {
  if (variant === "card") {
    return (
      <li {...revealStep(revealIndex)} className="flex flex-col">
        {service.image ? (
          // Cropped to a common ratio, unlike the panel's own ratio: in a two-up
          // grid, ragged heights would break the card rhythm.
          <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
            <Photo photo={service.image} sizes={CARD_SIZES} fit="cover" />
          </div>
        ) : null}

        <div className="mt-5">
          <Heading
            as="h4"
            voice="plain"
            sizeClassName="text-xl leading-snug md:text-[1.375rem]"
            className="max-w-[20ch]"
          >
            {service.title}
          </Heading>
          <Text className="voice mt-3 max-w-[46ch] text-base leading-relaxed text-ink-muted">
            {service.summary}
          </Text>
          <ServiceItems
            items={service.items}
            className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2"
          />
        </div>
      </li>
    );
  }

  const body = (
    <>
      <Heading as="h4" voice="plain" className="max-w-[24ch]">
        {service.title}
      </Heading>
      <Text className="voice mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
        {service.summary}
      </Text>
      {/* Capped measure: the list stays a compact spec under the summary, not a
          table spanning the panel. */}
      <ServiceItems
        items={service.items}
        className="mt-7 grid max-w-[56rem] grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2"
      />
    </>
  );

  if (!service.image) {
    return (
      <li {...revealStep(revealIndex)} className="max-w-[62ch] md:col-span-2">
        {body}
      </li>
    );
  }

  // The image column is always the one that grows. Because `flip` reorders the
  // children rather than the grid tracks, the wider track has to move with it:
  // tracking by column alone would hand the extra space to the text.
  const panelGrid = flip
    ? "md:grid-cols-2 lg:grid-cols-[3fr_7fr]"
    : "md:grid-cols-2 lg:grid-cols-[7fr_3fr]";

  return (
    <li
      {...revealStep(revealIndex)}
      className={cx(
        "grid items-center gap-8 md:col-span-2 md:gap-14",
        panelGrid,
      )}
    >
      <EditorialImage
        photo={service.image}
        sizes={PANEL_SIZES}
        className={cx(flip && "md:order-2")}
      />
      <div className={cx(flip && "md:order-1")}>{body}</div>
    </li>
  );
}
