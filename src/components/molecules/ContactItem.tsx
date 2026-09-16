import { Icon } from "@/components/atoms/Icon";
import type { IconName } from "@/components/atoms/Icon";
import type { ContactLine } from "@/types/content";

interface ContactItemProps {
  line: ContactLine;
}

/** The href scheme is what says whether a line is a call or an email. */
function iconFor(href: string): IconName | null {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "mail";
  return null;
}

export function ContactItem({ line }: ContactItemProps) {
  const icon = iconFor(line.href);

  return (
    <a
      href={line.href}
      className="flex items-start gap-3 text-ink transition-colors duration-200 hover:text-brand-700"
    >
      {icon ? <Icon name={icon} className="mt-0.5 shrink-0" /> : null}

      <span className="flex min-w-0 flex-col gap-1">
        <span className="label text-ink-muted">{line.label}</span>
        {/* break-all is what keeps the long mail address from widening the
            footer column at 375px. */}
        <span className="text-sm break-all">{line.value}</span>
      </span>
    </a>
  );
}
