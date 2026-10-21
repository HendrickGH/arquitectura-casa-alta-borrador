"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/organisms/ContactModal";
import type { ContactFormContent } from "@/types/content";

interface ContactModalContextValue {
  openContactModal: () => void;
  closeContactModal: () => void;
  isContactModalOpen: boolean;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

/**
 * Accesses the global consultation modal controller.
 * Returns `null` when rendered on a route that explicitly suppresses the modal (such as `/contacto`).
 */
export function useContactModal(): ContactModalContextValue | null {
  return useContext(ContactModalContext);
}

export interface ContactModalProviderProps {
  contact: ContactFormContent;
  whatsappHref: string;
  children: React.ReactNode;
}

/**
 * Shared provider mounting the consultation modal across architectural views.
 */
export function ContactModalProvider({
  contact,
  whatsappHref,
  children,
}: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<ContactModalContextValue>(
    () => ({
      openContactModal: () => setIsOpen(true),
      closeContactModal: () => setIsOpen(false),
      isContactModalOpen: isOpen,
    }),
    [isOpen],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contact={contact}
        whatsappHref={whatsappHref}
      />
    </ContactModalContext.Provider>
  );
}
