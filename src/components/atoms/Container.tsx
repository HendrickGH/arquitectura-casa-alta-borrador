import { cx } from "@/lib/cx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal rhythm for the whole site. Gutters grow with the viewport; the
 * measure is capped so long lines never run past a comfortable reading width.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
