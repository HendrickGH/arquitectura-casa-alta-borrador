import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

/**
 * The landing hero: the photograph fills one visual viewport, a flat dark scrim
 * sits on top of it, and the type is set directly on that scrim -- the kicker
 * and the headline bottom-left, the description bottom-right.
 *
 * WHY THE SCRIM, AND NOT TYPE ON THE BARE PHOTOGRAPH. Two attempts at putting
 * type straight on this image were built and measured before, and both failed:
 * white type sampled 1.31:1, and dark type was *less* legible than white because
 * variance, not mean luminance, is what breaks type. The design record is
 * explicit that the photograph needs a 60-77% dark scrim across the block. The
 * scrim here is the closing CTA's flat one rather than the graded band this
 * hero used to carry: near-uniform, with a slightly stronger top stop so the
 * transparent chrome keeps its edge in the header band.
 *
 * The description is small text, not large text, so its band needs 4.5:1 where
 * the headline only needs 3:1. The bottom stop composites to roughly 5.5:1
 * against white over this image's recorded 0.74-0.77 luminance, which is why
 * both type blocks sit at the bottom instead of floating over the middle of the
 * photograph.
 *
 * NO BUTTONS. The hero's two buttons were removed with this layout: their
 * destinations are the header CTA and the closing CTA, and the photograph opens
 * the page better without a button pair on it.
 *
 * The scrim is decorative and hidden from assistive tech; the contrast it
 * produces is measured in the rendered composition, not assumed.
 *
 * The entrance is pure CSS (`hero-rise` in globals.css): it runs with or
 * without JavaScript, animates only opacity and transform, and is staggered per
 * block.
 *
 * The photograph is a plain full-bleed cover and carries no scroll choreography
 * of its own: its parallax was removed after measurement against a reference.
 * At rest it had painted the 1600x900 hero AVIF at 2016x1260 -- a 1.26x upscale
 * behind a 1.4x crop -- and then drifted at 0.32px per scroll px, while the
 * reference uses no parallax at all and only one-shot reveals.
 *
 * Size is fluid because the headline is a word stack and a line cannot wrap: the
 * widest line, "civil e industrial", measures ~10.06em in the shipped Montserrat
 * 600, so the clamp is capped to keep three lines from 320px up.
 */
export function Hero({ hero }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
      style={{ marginTop: "calc(var(--chrome-h, 5.25rem) * -1)" }}
    >
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <Photo photo={hero.image} sizes="100vw" priority />
      </div>

      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 pt-32 pb-14 md:pb-20">
        {/*
          Two columns only from `lg`. The headline is a word stack and a line
          must not wrap, so the left column needs room for "civil e industrial"
          at ~10.06em; sharing the row with the description below 1024px breaks
          that line and the sentence reads as five lines instead of three. The
          description stacks under the headline until there is room for both.
        */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            {/*
              The kicker answers "where do these people work", which is the first
              thing a visitor from outside Oaxaca needs. It deliberately does NOT
              repeat site.claim ("Empresa 100% mexicana"): that badge already sits
              in the utility bar directly above.
            */}
            {hero.eyebrow ? (
              <p className="eyebrow hero-rise hero-rise-1 text-bone-100">
                {hero.eyebrow}
              </p>
            ) : null}

            {/*
              The word stack: one line per entry, in a single h1. The spans are
              `whitespace-nowrap` for a structural reason, not a cosmetic one:
              it makes the widest line the h1's min-content, and a flex item
              never shrinks below its min-content, so sharing this row with the
              description can never break a line into two. Without it the title
              silently became five lines at 1024px, because 34ch of Marcellus is
              ~428px and the left column had to give ground.
            */}
            <h1 className="display hero-rise hero-rise-2 text-[clamp(1.5rem,4.5vw,3.5rem)] text-white">
              {hero.headline.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <p className="voice hero-rise hero-rise-3 max-w-[34ch] text-sm leading-relaxed text-white/90 lg:text-right lg:text-base">
            {hero.subheadline}
          </p>
        </div>
      </Container>
    </section>
  );
}
