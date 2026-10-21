import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ContactFormFields } from "@/components/organisms/ContactFormFields";
import { revealStep } from "@/lib/reveal";
import type { ContactFormContent, Photo as PhotoModel } from "@/types/content";

interface ContactFormProps {
  contact: ContactFormContent;
  /** WhatsApp target, resolved by the seam and passed through untouched. */
  whatsappHref: string;
  /** Optional real studio photograph paired with the contact form. */
  photo?: PhotoModel;
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  tone?: "canvas" | "bone";
  idPrefix?: string;
  /** Whether to show the sidebar with studio photo and checklist. Defaults to true. */
  showSidebar?: boolean;
}

/**
 * Split-screen contact section: pairs a framed studio photograph and
 * consultation checklist on the left with the interactive form on the right.
 * When `showSidebar={false}`, renders the form centered in max-w-3xl.
 */
export function ContactForm({
  contact,
  whatsappHref,
  photo,
  id,
  tone = "canvas",
  idPrefix = "contact",
  showSidebar = true,
}: ContactFormProps) {
  const hasSidebar = showSidebar && Boolean(photo);

  return (
    <Section id={id} tone={tone} reveal="stagger">
      <Container>
        {hasSidebar ? (
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left column: Real studio photograph + direct consultation summary */}
            <div {...revealStep(0)} className="lg:col-span-5">
              <div className="overflow-hidden">
                {contact.directAttentionLabel || contact.freeCostLabel ? (
                  <div className="mb-3 flex items-center justify-between gap-2">
                    {contact.directAttentionLabel ? (
                      <span className="label text-brand-800">
                        {contact.directAttentionLabel}
                      </span>
                    ) : null}
                    {contact.freeCostLabel ? (
                      <span className="label text-ink-muted">
                        {contact.freeCostLabel}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                {photo ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                    <Photo
                      photo={photo}
                      sizes="(min-width: 1024px) 40vw, 95vw"
                    />
                  </div>
                ) : null}
                {contact.coverageLabel ? (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 text-xs text-ink-muted">
                    <span>{contact.coverageLabel}</span>
                  </div>
                ) : null}

                {/* Consultation Checklist with 0px square bullets */}
                {contact.consultationChecklist &&
                contact.consultationChecklist.length > 0 ? (
                  <div className="mt-6 text-xs text-ink/85">
                    {contact.consultationTitle ? (
                      <p className="label mb-2.5 text-brand-800">
                        {contact.consultationTitle}
                      </p>
                    ) : null}
                    <ul className="space-y-2 text-xs text-ink-muted">
                      {contact.consultationChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right column: Section heading + ContactFormFields */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={contact.eyebrow}
                heading={contact.heading}
                body={contact.body}
              />

              <div {...revealStep(1)} className="mt-10">
                <ContactFormFields
                  contact={contact}
                  whatsappHref={whatsappHref}
                  idPrefix={idPrefix}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow={contact.eyebrow}
              heading={contact.heading}
              body={contact.body}
            />

            <div {...revealStep(1)} className="mt-10">
              <ContactFormFields
                contact={contact}
                whatsappHref={whatsappHref}
                idPrefix={idPrefix}
              />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
