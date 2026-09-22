import Link from "next/link";
import type { NavLink } from "@/types/content";

interface NavItemProps {
  link: NavLink;
}

/** One entry in the header or footer navigation. */
export function NavItem({ link }: NavItemProps) {
  return (
    <Link
      href={link.href}
      className="label chrome-fg text-ink transition-colors duration-200 hover:text-brand-700"
    >
      {link.label}
    </Link>
  );
}
