import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ContactFormFields } from "@/components/organisms/ContactFormFields";
import { revealStep } from "@/lib/reveal";
import type { ContactFormContent } from "@/types/content";

interface ContactFormProps {
  contact: ContactFormContent;
  /** WhatsApp target, resolved by the seam and passed through untouched. */
  whatsappHref: string;
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

/**
 * The landing's contact section: a heading and a working form.
 *
 * It replaced the old closing block, whose copy now sits over the full-bleed
 * photograph above. The section is a server component; only the fields cross
 * into a client boundary, so the heading and the section shell stay in the
 * server HTML.
 */
export function ContactForm({ contact, whatsappHref, id }: ContactFormProps) {
  return (
    <Section id={id} tone="bone" reveal="stagger">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            body={contact.body}
            align="center"
          />

          <div {...revealStep(0)} className="mt-12">
            <ContactFormFields contact={contact} whatsappHref={whatsappHref} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
