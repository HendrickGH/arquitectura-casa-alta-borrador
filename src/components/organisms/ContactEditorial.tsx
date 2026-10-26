"use client";

import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { useContactModal } from "@/components/organisms/ContactModalContext";
import type { ContactLine, SocialLink } from "@/types/content";

interface ContactEditorialProps {
  phones: ContactLine[];
  social: SocialLink[];
  id?: string;
}

export function ContactEditorial({
  phones,
  social,
  id = "contacto",
}: ContactEditorialProps) {
  const contactModal = useContactModal();

  return (
    <section id={id} className="bg-canvas py-20 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-12 border-t border-bone-300 pt-16 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="label mb-3 text-ink-muted">Contacto</p>
            <Heading
              voice="serif"
              as="h2"
              sizeClassName="text-3xl md:text-5xl text-ink"
            >
              Conversemos sobre tu próximo proyecto.
            </Heading>
            <p className="mt-4 text-xs tracking-wider uppercase text-ink-muted">
              Cobertura Nacional · Sedes en Puerto Escondido y Salina Cruz
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="font-serif text-lg text-ink underline decoration-bone-300 underline-offset-4 transition-colors hover:text-brand-900 hover:decoration-brand-900 md:text-xl"
                >
                  {phone.value}
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              {social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <Button
              onClick={() => contactModal?.openContactModal()}
              variant="primary"
              size="md"
            >
              Escríbanos →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
