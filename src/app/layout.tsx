import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description,
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
