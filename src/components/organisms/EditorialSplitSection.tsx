import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";
import type { Photo as PhotoModel } from "@/types/content";

export interface EditorialSplitSectionProps {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  photo?: PhotoModel | null;
  photoCaption?: string;
  /**
   * - `monograph`: 6/6 split, tall portrait frame on large screens (`/nosotros`).
   * - `compact`: 7/5 split, shallow landscape frame with caption (`/servicios`).
   */
  variant?: "monograph" | "compact";
  tone?: "canvas" | "bone";
  id?: string;
}

const VARIANTS = {
  monograph: {
    density: "default" as const,
    grid: "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16",
    textColumn: "flex flex-col gap-6 lg:col-span-6",
    photoColumn: "lg:col-span-6",
    headingSize: "text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.12]",
    headingMax: "max-w-[22ch]",
    paragraphs: "flex flex-col gap-4",
    paragraphMax: "max-w-[48ch] ",
    figure: "overflow-hidden bg-bone-100",
    frame:
      "relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/5]",
    photoClass:
      "h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]",
    photoSizes: "(min-width: 1024px) 46vw, 100vw",
    fit: "cover" as const,
  },
  compact: {
    density: "compact" as const,
    grid: "grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12",
    textColumn: "flex flex-col gap-4 lg:col-span-7",
    photoColumn: "lg:col-span-5",
    headingSize: undefined,
    headingMax: "max-w-[24ch]",
    paragraphs: "mt-2 flex flex-col gap-4",
    paragraphMax: "",
    figure: "overflow-hidden",
    frame: "relative aspect-[4/3] w-full overflow-hidden bg-bone-200",
    photoClass: undefined,
    photoSizes: "(min-width: 1024px) 40vw, 95vw",
    fit: undefined,
  },
};

/**
 * Two-column editorial story block: narrative text beside a framed photograph.
 *
 * Replaces the identical JSX previously inlined in the About and Services
 * templates; the two `variant`s reproduce each page's original geometry.
 */
export function EditorialSplitSection({
  eyebrow,
  heading,
  paragraphs,
  photo,
  photoCaption,
  variant = "monograph",
  tone = "canvas",
  id,
}: EditorialSplitSectionProps) {
  const v = VARIANTS[variant];

  return (
    <Section id={id} tone={tone} density={v.density} reveal="stagger">
      <Container>
        <div className={v.grid}>
          <div className={v.textColumn}>
            {eyebrow ? (
              <div {...revealStep(0)}>
                <p className="eyebrow">{eyebrow}</p>
              </div>
            ) : null}

            <div {...revealStep(1)}>
              <Heading
                as="h2"
                voice="serif"
                sizeClassName={v.headingSize}
                className={v.headingMax}
              >
                {heading}
              </Heading>
            </div>

            <div {...revealStep(2)} className={v.paragraphs}>
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={paragraph}
                  size={index === 0 ? "lede" : undefined}
                  className={
                    index === 0
                      ? `${v.paragraphMax}text-ink`
                      : `${v.paragraphMax}text-ink-muted`
                  }
                >
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>

          {photo ? (
            <div {...revealStep(2)} className={v.photoColumn}>
              <figure className={v.figure}>
                <div className={v.frame}>
                  <Photo
                    photo={photo}
                    sizes={v.photoSizes}
                    fit={v.fit}
                    className={v.photoClass}
                  />
                </div>
                {photoCaption ? (
                  <figcaption className="mt-3 text-xs text-ink-muted">
                    {photoCaption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
