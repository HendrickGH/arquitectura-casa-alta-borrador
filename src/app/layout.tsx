import type { Metadata, Viewport } from "next";
import { Marcellus, Montserrat } from "next/font/google";
import { getSiteConfig } from "@/lib/content";
import "./globals.css";

/**
 * The two faces the design system is built on. Montserrat carries the display
 * face and the body copy; Marcellus is a single-weight serif used for project
 * titles and pull quotes, so hierarchy in it comes from size alone.
 *
 * Both expose a CSS variable, which is what globals.css maps onto --font-sans
 * and --font-display.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const site = getSiteConfig();

/**
 * Description is assembled from the site's own facts: what the studio claims,
 * where it works. No copy is authored here -- it would live in src/content.
 */
const description = `${site.claim}. ${site.tagline}. ${site.coverage}.`;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  (process.env.URL ? process.env.URL : undefined) ||
  "https://arquitecturacasaalta.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — ${site.tagline}`,
  description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description,
    url: "/",
    siteName: site.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
    images: ["/og-image.jpg"],
  },
};

/** Matches the brand strip at the top of the page, for the mobile browser chrome. */
export const viewport: Viewport = {
  themeColor: "#0e2d78",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${marcellus.variable}`}>
      <body>{children}</body>
    </html>
  );
}
