import Link from "next/link";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { cx } from "@/lib/cx";
import type { Photo as PhotoModel } from "@/types/content";

export interface MonolithCardProps {
  title: string;
  description?: string;
  photo?: PhotoModel | null;
  href?: string;
  onClick?: () => void;
  ctaLabel?: string;
  sizes?: string;
  ariaLabel?: string;
  className?: string;
}

const DEFAULT_SIZES =
  "(min-width: 1024px) 480px, (min-width: 768px) 420px, (min-width: 640px) 50vw, 85vw";

/**
 * Cosentino Material Monolith Card (`MonolithCard`).
 *
 * Full-bleed dark architectural card with top and bottom gradient scrims,
 * Marcellus title, body description, and hover arrow transition.
 * Supports polymorphic rendering: Next.js `<Link>` when `href` is supplied,
 * or interactive `<button>` when `onClick` is supplied.
 */
export function MonolithCard({
  title,
  description,
  photo,
  href,
  onClick,
  ctaLabel = "Saber más",
  sizes = DEFAULT_SIZES,
  ariaLabel,
  className,
}: MonolithCardProps) {
  const content = (
    <>
      {/* Full-bleed background photograph */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-bone-100">
        {photo ? (
          <Photo
            photo={photo}
            sizes={sizes}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bone-200 text-xs text-ink-muted p-4 text-center">
            <span>Fotografía de archivo en proceso</span>
          </div>
        )}
      </div>

      {/* Scrim gradients: subtle top, deep bottom for contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent"
      />

      {/* Top: Title */}
      <div className="relative z-10">
        <Heading
          as="h3"
          voice="serif"
          sizeClassName="text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar"
        >
          {title}
        </Heading>
      </div>

      {/* Bottom: Description & CTA */}
      <div className="relative z-10 flex flex-col gap-5">
        {description ? (
          <Text
            size="base"
            className="leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]"
          >
            {description}
          </Text>
        ) : null}

        <div className="flex items-center gap-3 pt-1 text-white transition-colors group-hover:text-concha-nacar">
          <span className="label text-sm tracking-wider text-white transition-colors group-hover:text-concha-nacar">
            {ctaLabel}
          </span>
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-concha-nacar"
          />
        </div>
      </div>
    </>
  );

  const sharedClasses = cx(
    "group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-ink p-7 text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9",
    className
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (typeof title === "string" ? `Ver detalles de ${title}` : undefined)}
      className={cx(sharedClasses, "text-left cursor-pointer")}
    >
      {content}
    </button>
  );
}
