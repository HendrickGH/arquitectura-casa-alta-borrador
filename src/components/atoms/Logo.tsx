import Image from "next/image";
import { cx } from "@/lib/cx";

interface LogoProps {
  className?: string;
}

/**
 * The monochrome lockup, trimmed and made transparent by the brand asset step.
 *
 * This is a raster for now. The line art and the wide-tracked wordmark want to
 * be an SVG; until the vector arrives, 354px wide at 2x covers the header.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand/logo-casa-alta.png"
      alt="Casa Alta"
      width={354}
      height={160}
      priority
      className={cx("h-9 w-auto md:h-11", className)}
    />
  );
}
