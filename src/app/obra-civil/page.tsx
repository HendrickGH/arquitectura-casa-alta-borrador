import type { Metadata } from "next";
import { CivilWorksPageTemplate } from "@/components/templates/CivilWorksPageTemplate";
import {
  getCivilWorksClosing,
  getCivilWorksPage,
  getSiteConfig,
} from "@/lib/content";

const site = getSiteConfig();
const page = getCivilWorksPage();
const closing = getCivilWorksClosing();

export const metadata: Metadata = {
  title: `${page.hero.heading} — ${site.name}`,
  description: page.hero.subheadline,
  alternates: {
    canonical: "/obra-civil",
  },
  openGraph: {
    title: `${page.hero.heading} — ${site.name}`,
    description: page.hero.subheadline,
    url: "/obra-civil",
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

export default function CivilWorksRoutePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ingeniería y Obra Civil Pesada",
    "serviceType":
      "Puentes vehiculares, montaje de elementos prefabricados, naves industriales y cimentaciones profundas",
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
      "México",
      "Oaxaca",
      "Puerto Escondido",
      "Salina Cruz",
      "Istmo de Tehuantepec",
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "MXN",
      "description": "Asesoría técnica y revisión de proyecto ejecutivo de obra civil",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CivilWorksPageTemplate
        site={site}
        page={page}
        closing={closing}
        whatsappHref={site.whatsapp.href}
      />
    </>
  );
}
