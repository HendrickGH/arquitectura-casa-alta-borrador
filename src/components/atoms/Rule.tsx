import { cx } from "@/lib/cx";

interface RuleProps {
  className?: string;
}

/**
 * A hairline. Structural, not decorative: it separates entries in the services
 * index, the stats band and the footer's legal row.
 */
export function Rule({ className }: RuleProps) {
  return <hr className={cx("border-0 border-t border-bone-200", className)} />;
}
