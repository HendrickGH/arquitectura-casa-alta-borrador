import { Icon } from "@/components/atoms/Icon";
import { cx } from "@/lib/cx";

export interface CarouselNavButtonsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  /** Tailwind size classes for the arrow glyphs. */
  iconClassName?: string;
}

/**
 * 0px Square Carousel Navigation Controls (`CarouselNavButtons`).
 *
 * Pair of 44x44px architectural navigation buttons with zero border-radius,
 * disabled contrast reduction, and keyboard accessibility.
 */
export function CarouselNavButtons({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  prevLabel = "Ver anterior",
  nextLabel = "Ver siguiente",
  className,
  iconClassName = "h-4 w-4",
}: CarouselNavButtonsProps) {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        aria-label={prevLabel}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrow-left" className={iconClassName} />
      </button>
      <button
        type="button"
        onClick={onScrollRight}
        disabled={!canScrollRight}
        aria-label={nextLabel}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-bone-100 text-ink transition-colors hover:bg-bone-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrow-right" className={iconClassName} />
      </button>
    </div>
  );
}
