import { Icon } from "@/components/atoms/Icon";
import type { SocialLink } from "@/types/content";

interface SocialLinkItemProps {
  link: SocialLink;
}

/**
 * A social profile.
 *
 * Returns null when the href is empty: the Facebook and TikTok handles were
 * never supplied, and those entries stay in the content so the layout is
 * already correct when they arrive. A dead link is worse than no link.
 */
export function SocialLinkItem({ link }: SocialLinkItemProps) {
  if (!link.href) return null;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="block transition-opacity duration-200 hover:opacity-60"
    >
      <Icon name={link.icon} />
    </a>
  );
}
