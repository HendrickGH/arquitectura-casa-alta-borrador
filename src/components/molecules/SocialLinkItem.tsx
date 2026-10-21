import { Icon } from "@/components/atoms/Icon";
import { cx } from "@/lib/cx";
import type { SocialLink } from "@/types/content";

interface SocialLinkItemProps {
  link: SocialLink;
  className?: string;
}

/**
 * A social profile.
 *
 * Returns null when the href is empty: the Facebook and TikTok handles were
 * never supplied, and those entries stay in the content so the layout is
 * already correct when they arrive. A dead link is worse than no link.
 */
export function SocialLinkItem({ link, className }: SocialLinkItemProps) {
  if (!link.href) return null;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cx(
        "inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-opacity duration-200 hover:opacity-60",
        className,
      )}
    >
      <Icon name={link.icon} />
    </a>
  );
}
