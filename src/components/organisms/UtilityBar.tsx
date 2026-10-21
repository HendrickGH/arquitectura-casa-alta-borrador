import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import type { ContactLine, SocialLink } from "@/types/content";

interface UtilityBarProps {
  /** The trust badge, e.g. "Empresa 100% mexicana". */
  claim: string;
  /** Phone lines from the site's contact list. */
  phones: ContactLine[];
  social: SocialLink[];
}

/**
 * The contact strip above the navigation: the claim on the left, the phones and
 * the social profiles on the right.
 *
 * It carries no surface of its own. It is the top row of the floating chrome,
 * so over the hero it renders in light type directly on the photograph and
 * every element below it inherits through `chrome-fg` -- which is what lets the
 * hero own the very top edge of the page instead of starting under a solid
 * strip. The phone numbers are dropped below `sm`: at 375px the claim and the
 * numbers cannot share a line without one of them being clipped.
 */
export function UtilityBar({ claim, phones, social }: UtilityBarProps) {
  return (
    <div className="chrome-fg chrome-utility">
      <Container className="flex items-center justify-between gap-4 py-2">
        <p className="label opacity-90">{claim}</p>

        <div className="flex shrink-0 items-center gap-6">
          <div className="hidden items-center gap-4 sm:flex">
            {phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
              >
                <Icon name="phone" className="h-3.5 w-3.5" />
                <span className="label tabular-nums">{phone.value}</span>
              </a>
            ))}
          </div>

          <ul className="flex items-center gap-5">
            {social.map((link) => (
              <li key={link.label}>
                <SocialLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
