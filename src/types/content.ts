/**
 * View models returned by src/lib/content.
 *
 * Components consume only these shapes and never import from src/content
 * directly. That indirection is the Payload CMS seam: swapping the content
 * source means rewriting src/lib/content/index.ts and nothing else.
 *
 * Naming convention: `*Content` is what an editor authors in src/content;
 * the plain name is what a component receives. Today they are nearly identical,
 * but they are allowed to diverge without touching components.
 */

/** A renderable photo. `alt` is authored copy, never the filename. */
export interface Photo {
  /** Absolute web path, e.g. "/images/02-el-bicho/01-....avif". */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* ---------- site-wide ---------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactLine {
  label: string;
  /** Display form, e.g. "951 458 1395". */
  value: string;
  /** Link target, e.g. "tel:+529514581395" or "mailto:...". */
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the icon set in components/atoms/Icon. */
  icon: "facebook" | "instagram" | "tiktok";
}

export interface Office {
  city: string;
  region: string;
}

export interface SiteConfig {
  name: string;
  /** Registered company name, used in the footer's legal row. */
  legalName: string;
  tagline: string;
  /** The trust badge shown above the header. */
  claim: string;
  foundedYear: number;
  /** Human list of the areas served, for the contact block. */
  coverage: string;
  nav: NavLink[];
  /**
   * The header's primary call to action. Held separately from `nav` on purpose:
   * it is a distinct concern that merely happens to point at the same
   * destination, and deriving it from a nav entry by matching an href string
   * broke silently the moment the nav switched to anchors.
   */
  cta: CallToAction;
  /** Primary phone first; the first entry is the WhatsApp target. */
  contact: ContactLine[];
  offices: Office[];
  social: SocialLink[];
}

/* ---------- services ---------- */

export interface Service {
  slug: string;
  title: string;
  summary: string;
  /** Concrete deliverables listed under the title. */
  items: string[];
}

export interface ServiceGroup {
  slug: string;
  title: string;
  intro: string;
  services: Service[];
}

/* ---------- projects ---------- */

export type ProjectCategory =
  | "habitacional"
  | "multifamiliar"
  | "comercial"
  | "industrial"
  | "obra-civil"
  | "espacios-publicos"
  | "interiorismo";

export interface Project {
  /** Clean public slug, with the pipeline's numeric prefix stripped. */
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  /** Empty string when not yet confirmed. Never guessed. */
  year: string;
  summary: string;
  story: string;
  outcome: string;
  cover: Photo;
  /**
   * Best landscape photo, for slots that render full width. Falls back to
   * `cover` when the project has no landscape shot.
   */
  wideCover: Photo;
  photos: Photo[];
  photoCount: number;
}

/* ---------- landing ---------- */

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  /** 1-based. The process genuinely is a sequence, so numbering carries meaning. */
  order: number;
  title: string;
  description: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface Testimonial {
  /** Named for the project, not the client, as requested. */
  projectName: string;
  quote: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface HeroContent {
  /** Short kicker above the headline. Not the company claim -- see Hero.tsx. */
  eyebrow: string;
  /** Rendered as a stack, one line per entry. */
  headline: string[];
  subheadline: string;
  image: Photo;
  primary: CallToAction;
  secondary: CallToAction;
}

export interface SectionIntro {
  /** Optional short kicker above the heading. */
  eyebrow: string;
  heading: string;
  body: string;
}

export interface HomePage {
  hero: HeroContent;
  stats: Stat[];
  intro: SectionIntro;
  services: SectionIntro;
  projects: SectionIntro;
  process: SectionIntro;
  differentiators: { intro: SectionIntro; items: Differentiator[] };
  testimonials: { intro: SectionIntro; items: Testimonial[] };
  closing: {
    heading: string;
    body: string;
    cta: CallToAction;
  };
}
