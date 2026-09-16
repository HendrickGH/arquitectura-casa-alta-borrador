import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { SocialLinkItem } from "@/components/molecules/SocialLinkItem";
import type { ContactLine, SocialLink } from "@/types/content";

interface UtilityBarProps {
  /** The trust badge, e.g. "Empresa 100% mexicana". */
  claim: string;
  /** Primary phone line; the first entry of the site's contact list. */
  phone: ContactLine;
  social: SocialLink[];
}

/**
 * The thin strip above the header: the claim on the left, the phone and the
 * social profiles on the right.
 *
 * This is the topmost element on the page and the only solid brand fill above
 * the fold apart from the primary CTA, so it reads as chrome rather than as a
 * section. The phone number is dropped below `sm`: at 375px the claim and the
 * number cannot share a line without one of them being clipped.
 */
export function UtilityBar({ claim, phone, social }: UtilityBarProps) {
  return (
    <div className="bg-brand-800 text-white">
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <p className="label truncate">{claim}</p>

        <div className="flex shrink-0 items-center gap-5">
          <a
            href={phone.href}
            className="hidden items-center gap-2 transition-colors duration-200 hover:text-brand-100 sm:flex"
          >
            <Icon name="phone" />
            <span className="label">{phone.value}</span>
          </a>

          <ul className="flex items-center gap-4">
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
