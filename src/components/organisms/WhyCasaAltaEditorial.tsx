import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { cx } from "@/lib/cx";
import { revealStep } from "@/lib/reveal";
import type { Differentiator, SectionIntro } from "@/types/content";

export interface WhyCasaAltaEditorialProps {
  intro: SectionIntro;
  items: Differentiator[];
  tone?: "canvas" | "bone";
  id?: string;
}

const DIFFERENTIATOR_PHOTO_SIZES =
  "(min-width: 1280px) 620px, (min-width: 1024px) 48vw, calc(100vw - 48px)";

interface DifferentiatorPhotoProps {
  item: Differentiator;
  className?: string;
}

function DifferentiatorPhoto({
  item,
  className,
}: DifferentiatorPhotoProps) {
  if (!item.photo) return null;

  return (
    <figure className={cx("overflow-hidden bg-bone-200", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Photo
          photo={item.photo}
          sizes={DIFFERENTIATOR_PHOTO_SIZES}
          fit="cover"
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>
    </figure>
  );
}

interface DifferentiatorCardProps {
  item: Differentiator;
  index: number;
  className?: string;
}

function DifferentiatorCard({
  item,
  index,
  className,
}: DifferentiatorCardProps) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <article className={cx("flex flex-col", className)}>
      <div className="flex items-center justify-between gap-4 pb-2">
        <span className="font-sans text-2xl font-semibold text-brand-800 tabular-nums xl:text-3xl">
          {ordinal}
        </span>
        {item.tag ? (
          <span className="label text-brand-800">{item.tag}</span>
        ) : null}
      </div>

      <Heading
        as="h3"
        voice="serif"
        sizeClassName="mt-2.5 text-2xl text-ink leading-snug xl:mt-3 xl:text-3xl"
      >
        {item.title}
      </Heading>

      <Text
        size="base"
        className="mt-2.5 max-w-[48ch] text-xs/relaxed text-ink-muted sm:text-sm/relaxed xl:mt-3.5 xl:text-base/relaxed"
      >
        {item.description}
      </Text>

      {item.points && item.points.length > 0 ? (
        <ul className="mt-4 space-y-2 text-xs text-ink/85 xl:mt-6 xl:space-y-2.5 xl:text-sm">
          {item.points.map((pt, ptIdx) => (
            <li
              key={`${ptIdx}-${pt.slice(0, 20)}`}
              className="flex items-start gap-3"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-800"
              />
              <span className="leading-snug">{pt}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

/**
 * Editorial paired monograph layout with uniform vertical overlap (~80px at lg, ~100px at xl) for "Por qué Casa Alta".
 *
 * Architecture:
 * - Top Section Header:
 *   - Eyebrow (.eyebrow), Heading (Marcellus 400), and Lede descriptive text (Text size="lede", max-w-[62ch])
 *     positioned cleanly at the top of the section with a subtle bottom divider hairline (border-b border-bone-200),
 *     completely outside the zigzag grid.
 * - Desktop (>= lg):
 *   - Alternating paired 12-column CSS Grid across 4 distinct rows:
 *     - Row 1: Foto 01 (Left, col 1-6) <---> Tarjeta 01 (Right, col 7-12, vertically centered opposite Foto 01)
 *     - Row 2: Tarjeta 02 (Left, col 1-6, vertically centered, lg:-mt-20 xl:-mt-[100px]) <---> Foto 02 (Right, col 7-12, lg:-mt-20 xl:-mt-[100px] taking 80px/100px of Row 1)
 *     - Row 3: Foto 03 (Left, col 1-6, lg:-mt-20 xl:-mt-[100px] taking 80px/100px of Row 2) <---> Tarjeta 03 (Right, col 7-12, vertically centered, lg:-mt-20 xl:-mt-[100px])
 *     - Row 4: Tarjeta 04 (Left, col 1-6, vertically centered, lg:-mt-20 xl:-mt-[100px]) <---> Foto 04 (Right, col 7-12, lg:-mt-20 xl:-mt-[100px] taking 80px/100px of Row 3)
 *   - Each card is centered vertically in direct dialogue with its opposing photo partner (0px center differential).
 *   - Applying the negative margin cadence uniformly to both cards and photos guarantees identical vertical clearance:
 *     GAP = H_photo - 2 * Overlap > Height(Card), with 0px collision and perfectly harmonic gap rhythm.
 * - Mobile (< lg):
 *   - Clean vertical flow in natural DOM order:
 *     Section Header -> Punto 01 (Foto + Card) -> Punto 02 (Foto + Card) -> Punto 03 (Foto + Card) -> Punto 04 (Foto + Card).
 * - Architectural contracts:
 *   - Strict 0px geometry (no rounded corners).
 *   - Photography in vertical aspect-[4/5] frames on calm bone ground with zero scrims or text overlays.
 *   - Tabular numbers in Montserrat 600, serif headings in Marcellus 400,
 *     square 0px technical bullets (w-1.5 h-1.5 bg-brand-800).
 */
export function WhyCasaAltaEditorial({
  intro,
  items,
  tone = "bone",
  id = "por-que-casa-alta",
}: WhyCasaAltaEditorialProps) {
  if (items.length === 0) return null;

  const item01 = items[0];
  const item02 = items[1];
  const item03 = items[2];
  const item04 = items[3];

  return (
    <Section id={id} tone={tone} density="default" reveal="stagger">
      <Container>
        {/* Section Heading outside the zigzag */}
        <SectionHeading
          eyebrow={intro.eyebrow}
          heading={intro.heading}
          body={intro.body ?? intro.paragraphs?.[0]}
          className="mb-16 border-b border-bone-200 pb-8 md:mb-20"
        />

        {/* 12-Column Paired Alternating Grid with ~100px Overlap */}
        <div className="grid grid-cols-1 gap-y-6 md:gap-y-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 lg:gap-y-0">
          {/* PUNTO 01: Foto 01 (Row 1 Left on Desktop) */}
          {item01 ? (
            <div
              {...revealStep(1)}
              className="lg:col-span-6 lg:col-start-1 lg:row-start-1"
            >
              <DifferentiatorPhoto item={item01} />
            </div>
          ) : null}

          {/* PUNTO 01: Tarjeta 01 (Row 1 Right on Desktop, vertically centered opposite Foto 01) */}
          {item01 ? (
            <div
              {...revealStep(2)}
              className="mb-12 flex flex-col justify-center md:mb-16 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mb-0 lg:self-center"
            >
              <DifferentiatorCard item={item01} index={0} />
            </div>
          ) : null}

          {/* PUNTO 02: Foto 02 (Row 2 Right on Desktop, offset overlapping Row 1) */}
          {item02 ? (
            <div
              {...revealStep(3)}
              className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorPhoto item={item02} />
            </div>
          ) : null}

          {/* PUNTO 02: Tarjeta 02 (Row 2 Left on Desktop, vertically centered opposite Foto 02) */}
          {item02 ? (
            <div
              {...revealStep(4)}
              className="mb-12 flex flex-col justify-center md:mb-16 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:mb-0 lg:self-center lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorCard item={item02} index={1} />
            </div>
          ) : null}

          {/* PUNTO 03: Foto 03 (Row 3 Left on Desktop, offset overlapping Row 2) */}
          {item03 ? (
            <div
              {...revealStep(5)}
              className="lg:col-span-6 lg:col-start-1 lg:row-start-3 lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorPhoto item={item03} />
            </div>
          ) : null}

          {/* PUNTO 03: Tarjeta 03 (Row 3 Right on Desktop, vertically centered opposite Foto 03) */}
          {item03 ? (
            <div
              {...revealStep(6)}
              className="mb-12 flex flex-col justify-center md:mb-16 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mb-0 lg:self-center lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorCard item={item03} index={2} />
            </div>
          ) : null}

          {/* PUNTO 04: Foto 04 (Row 4 Right on Desktop, offset overlapping Row 3) */}
          {item04 ? (
            <div
              {...revealStep(7)}
              className="lg:col-span-6 lg:col-start-7 lg:row-start-4 lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorPhoto item={item04} />
            </div>
          ) : null}

          {/* PUNTO 04: Tarjeta 04 (Row 4 Left on Desktop, vertically centered opposite Foto 04) */}
          {item04 ? (
            <div
              {...revealStep(8)}
              className="flex flex-col justify-center lg:col-span-6 lg:col-start-1 lg:row-start-4 lg:mb-0 lg:self-center lg:-mt-20 xl:-mt-[100px]"
            >
              <DifferentiatorCard item={item04} index={3} />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
