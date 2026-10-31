import Image from "next/image";
import { cx } from "@/lib/cx";

interface LogoProps {
  className?: string;
  size?: "default" | "header";
}

/**
 * The monochrome lockup, trimmed and made transparent by the brand asset step.
 *
 * This is a raster for now. The line art and the wide-tracked wordmark want to
 * be an SVG; until the vector arrives, 354px wide at 2x covers the header.
 */
export function Logo({ className, size = "default" }: LogoProps) {
  const sizeClasses =
    size === "header"
      ? "h-10 sm:h-12 md:h-14 lg:h-16"
      : "h-8 md:h-9";

  return (
    <Image
      src="/brand/logo-casa-alta.png"
      alt="Casa Alta"
      width={354}
      height={160}
      priority
      className={cx("chrome-fg chrome-logo w-auto", sizeClasses, className)}
    />
  );
}
