import { EditorialImage } from "@/components/organisms/EditorialImage";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { cx } from "@/lib/cx";
import type { Service } from "@/types/content";

type ServiceRowVariant = "featured" | "compact";

interface ServiceRowProps {
  service: Service;
  /** Position in the whole catalogue, 1-based, rendered as a two-digit index. */
  index: number;
  /** Flip the featured panel: image right at md+ for every other chapter. */
  flip?: boolean;
  /**
   * Visual weight. `featured` is the full editorial panel that used to be the
   * only treatment; `compact` is the lighter card the rest of the catalogue
   * falls into, so one treatment is no longer repeated thirteen times. Both
   * carry the photo -- the tier changes its size and framing, never its
   * presence.
   */
  variant?: ServiceRowVariant;
}

/**
 * `50vw` from `md` is the shipped tier and it is exact here: the featured panel
 * is a two-column grid, so the image slot is half the viewport from 768px up.
 * Below that it is one column and the image is full width.
 */
const PANEL_SIZES = "(min-width: 768px) 50vw, 100vw";

/**
 * The compact cards sit two up from `md` inside the capped Container, so each
 * card is a little under half the viewport. Declaring `sizes` honestly is what
 * lets the loader pick a tier that exists and matches the rendered slot.
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
 * One service. The `featured` tier is the editorial panel: a photograph on one
 * side at its own ratio, the index, the title, the summary and the deliverable
 * list on the other. The `compact` tier is the lighter card the catalogue's
 * remaining services share: a fixed-ratio crop so a two-up grid keeps its rows
 * aligned, then the same content at a smaller scale.
 *
 * Either tier renders without an ingested image: the photo is texture, never a
 * dependency, so a service without one is still complete.
 */
export function ServiceRow({
  service,
  index,
  flip = false,
  variant = "featured",
}: ServiceRowProps) {
  const label = String(index).padStart(2, "0");

  if (variant === "compact") {
    return (
      <li className="flex flex-col">
        {service.image ? (
          // Cropped to a common ratio, unlike the featured panel's own ratio:
          // in a two-up grid, ragged heights would break the card rhythm.
          <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
            <Photo photo={service.image} sizes={CARD_SIZES} fit="cover" />
          </div>
        ) : null}

        <div className="mt-5">
          <span className="label text-brand-800">{label}</span>
          <Heading
            as="h4"
            voice="plain"
            sizeClassName="text-xl leading-snug md:text-[1.375rem]"
            className="mt-2 max-w-[20ch]"
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
      <span className="label text-brand-800">{label}</span>
      <Heading as="h4" voice="plain" className="mt-3 max-w-[24ch]">
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
    return <li className="max-w-[62ch] md:col-span-2">{body}</li>;
  }

  return (
    <li className="grid items-center gap-8 md:col-span-2 md:grid-cols-2 md:gap-14">
      <EditorialImage
        photo={service.image}
        sizes={PANEL_SIZES}
        className={cx(flip && "md:order-2")}
      />
      <div className={cx(flip && "md:order-1")}>{body}</div>
    </li>
  );
}
