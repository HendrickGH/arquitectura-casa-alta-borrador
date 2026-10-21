import type { Metadata } from "next";
import { InteriorsPageTemplate } from "@/components/templates/InteriorsPageTemplate";
import {
  getClosing,
  getInteriorsPage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getInteriorsPage();

export const metadata: Metadata = {
  title: `${page.hero.heading} — ${site.name}`,
  description: page.hero.subheadline,
  alternates: {
    canonical: "/arquitectura-interiores",
  },
  openGraph: {
    title: `${page.hero.heading} — ${site.name}`,
    description: page.hero.subheadline,
    url: "/arquitectura-interiores",
    siteName: site.name,
    locale: "es_MX",
    type: "website",
    images: page.hero.photo
      ? [
          {
            url: page.hero.photo.src,
            width: page.hero.photo.width,
            height: page.hero.photo.height,
            alt: page.hero.photo.alt,
          },
        ]
      : undefined,
  },
};

export default function InteriorsRoutePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Arquitectura de Interiores y Carpintería Residencial",
    "serviceType":
      "Cocinas integrales, superficies ultracompactas, piedras tecnológicas y carpintería de autor",
    "provider": {
      "@type": "GeneralContractor",
      "name": site.name,
      "legalName": site.legalName,
      "telephone": site.contact[0]?.value,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Oaxaca",
        "addressCountry": "MX",
      },
    },
    "description": page.hero.subheadline,
    "areaServed": [
      "Oaxaca de Juárez",
      "Puerto Escondido",
      "Huatulco",
      "Valles Centrales",
      "Costa de Oaxaca",
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MXN",
      "description": "Asesoría técnica y conceptual inicial 100% gratuita",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteriorsPageTemplate
        site={site}
        page={page}
        closing={getClosing()}
        whatsappHref={site.whatsapp.href}
      />
    </>
  );
}
