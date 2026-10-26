import type { SiteConfig } from "@/types/content";

/**
 * Company-wide facts. Everything here came from the client brief or from the
 * assets themselves -- nothing is invented, and fields that could not be
 * confirmed are left empty with a note rather than guessed.
 */

/** Primary WhatsApp target, derived from the first contact line. */
export const whatsappHref = "https://wa.me/529514581395";

export const site = {
  name: "Casa Alta",
  legalName: "Constructora Casa Alta",
  /** Taken from the logo lockup itself, which already wordmarks it. */
  tagline: "Arquitectura que perdura",
  claim: "Empresa 100% mexicana",
  foundedYear: 2016,
  coverage: "Proyectos en todo tipo de climas y terrenos",

  // The principal behind the studio, named on the landing's manifesto. Supplied
  // by the client; held here rather than in home.ts because it is a company fact,
  // not a section's copy.
  architect: {
    name: "Felipe Humberto Hernández Bejarano",
    role: "Arquitecto",
  },

  // Every one of these resolves. Proyectos is a real route now; the rest still
  // point at the landing's section anchors rather than at routes that would
  // 404. They become routes (/servicios, ...) when those pages ship; the `/#x`
  // form already works from any page.
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Servicios", href: "/servicios" },
    { label: "Interiores", href: "/arquitectura-interiores" },
    { label: "Sustentable", href: "/construccion-sustentable" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],

  cta: { label: "Cotizar proyecto", href: "/contacto" },

  // The persistent floating button every page carries. It replaced the hero's
  // own WhatsApp CTA; the label is its accessible name.
  whatsapp: { label: "Escríbanos por WhatsApp", href: whatsappHref },

  // The first entry is the number every WhatsApp CTA points at.
  contact: [
    {
      label: "Puerto Escondido",
      value: "951 458 1395",
      href: "tel:+529514581395",
    },
    {
      label: "Salina Cruz",
      value: "951 165 0678",
      href: "tel:+529511650678",
    },
    {
      label: "Correo",
      value: "constructoracasaalta@outlook.com",
      href: "mailto:constructoracasaalta@outlook.com",
    },
  ],

  offices: [
    { city: "Puerto Escondido", region: "Oaxaca" },
    { city: "Salina Cruz", region: "Oaxaca" },
  ],

  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/arquitecturacasaalta/",
      icon: "instagram",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/arquitecturacasaalta",
      icon: "facebook",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@arquitecturacasaalta",
      icon: "tiktok",
    },
    { label: "WhatsApp", href: whatsappHref, icon: "whatsapp" },
  ],

  footerPhoto: {
    src: "/images/arquitectura-que-perdura/07-fachada-interior-alberca-palapas-vegetacion-costera.avif",
    alt: "Vista del patio y alberca flanqueados por volúmenes en acabado tierra y cubiertas de palma en la costa de Oaxaca",
    width: 829,
    height: 1280,
  },
} satisfies SiteConfig;
