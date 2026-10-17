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
}

const DEFAULT_CONTACT_PHOTO: PhotoModel = {
  src: "/images/arquitectura-interiores/02-comedor-madera-integrado-isla-cocina-cuadro-arte.avif",
  alt: "Estancia y comedor de madera tropical integrados con isla de cocina en piedra de importación y muro terracota",
  width: 960,
  height: 1280,
};

/**
 * Thirdway split-screen contact section: pairs a framed real studio photograph
 * and office coordinates on the left with the interactive form on the right.
 */
export function ContactForm({
  contact,
  whatsappHref,
  photo = DEFAULT_CONTACT_PHOTO,
  id,
}: ContactFormProps) {
  return (
    <Section id={id} tone="bone" reveal="stagger">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left column: Real studio photograph + direct consultation summary */}
          <div {...revealStep(0)} className="lg:col-span-5">
            <div className="overflow-hidden">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="number-pill">(10)</span>
                <span className="label text-brand-800">ATENCIÓN DIRECTA</span>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Photo
                  photo={photo}
                  sizes="(min-width: 1024px) 40vw, 95vw"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 pt-3 text-xs text-ink-muted">
                <span>Puerto Escondido · Oaxaca Centro · Salina Cruz</span>
                <span className="number-pill">SIN COSTO</span>
              </div>

              {/* Consultation Checklist (Unboxed) */}
              <div className="mt-6 text-xs text-ink/80">
                <p className="label font-semibold text-brand-800 uppercase tracking-wider mb-2 text-[0.6875rem]">
                  Primera sesión técnica sin costo:
                </p>
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  <li>· Evaluación de predio, mecánica preliminar y orientación solar</li>
                  <li>· Estimación paramétrica de inversión y catálogo de partidas</li>
                  <li>· Ruta crítica de proyecto ejecutivo y supervisión DRO</li>
                </ul>
              </div>
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
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
