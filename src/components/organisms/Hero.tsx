import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Photo } from "@/components/atoms/Photo";
import type { HeroContent } from "@/types/content";

interface HeroProps {
  hero: HeroContent;
}

/** Anything leaving the site opens in a new tab; internal routes do not. */
function isExternal(href: string): boolean {
  return href.startsWith("http");
}

/**
 * The landing hero: the photograph full bleed, the type on clean ground below it.
 *
 * WHY THE TYPE IS NOT SET ON THE PHOTOGRAPH. Two attempts were built and
 * measured against this specific image before settling here, and both failed:
 *
 *  1. White type over the image. The text region samples at 0.74-0.77 mean
 *     luminance, which is 1.31:1 against white. Reaching even the 3:1
 *     large-text floor would need a 60-77% dark scrim across the whole block --
 *     a dark hero, which the brief rules out.
 *
 *  2. Dark type over the image. Mean luminance said 13.8:1 and looked like the
 *     answer, but mean luminance is the wrong metric on a busy photograph: the
 *     palapa roofs, the dark glazing and the palm trunks sit directly behind
 *     individual glyphs, and the rendered result was less legible than the
 *     white version it replaced. Variance, not average, is what breaks type.
 *
 * With a headline this size the block occupies roughly 55% of the hero height,
 * so no partial scrim can cover it without obscuring the photograph anyway. The
 * composition changed instead: the image stays intact and unmodified at full
 * bleed, and the type sits on white where contrast is not a negotiation.
 *
 * Size is fluid rather than stepped because the headline is a word stack and a
 * word cannot wrap: measured against the shipped Montserrat 600, "y construcción"
 * sets 9.325em wide. 7vw caps at 4rem, which keeps the whole three-line stack
 * above the fold on a 1440x900 viewport alongside a 48svh photograph.
 *
 * The shell is one visual viewport tall, in `svh` and not `vh` -- `vh` measures
 * the viewport without the collapsed mobile URL bar, so a full-height hero built
 * on it overflows the area a phone actually shows. `min-h-svh` rather than a
 * fixed height: the photograph keeps its 48svh band and the block below it takes
 * the rest, so a short viewport scrolls instead of cropping the type.
 *
 * WHAT IS NOT HERE YET. The type still sits on clean ground below the photograph
 * rather than inside that photograph's clean zone. That placement needs a
 * photograph chosen by measurement -- a zone large enough for the block, with
 * the contrast recorded in the rendered composition -- and no candidate has been
 * measured yet. The shell and the block move together when one passes; until
 * then the shipped composition stands, and the shell does not pretend otherwise.
 */
export function Hero({ hero }: HeroProps) {
  return (
    <section className="flex min-h-svh flex-col bg-canvas">
      <div className="relative h-[48svh] min-h-[340px] w-full shrink-0 overflow-hidden bg-bone-100">
        <Photo photo={hero.image} sizes="100vw" priority />
      </div>

      <Container className="flex flex-1 flex-col pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="flex flex-col items-start gap-6">
          {/*
            The kicker answers "where do these people work", which is the first
            thing a visitor from outside Oaxaca needs. It deliberately does NOT
            repeat site.claim ("Empresa 100% mexicana"): that badge already sits
            in the utility bar directly above, and printing it twice in the same
            viewport spends the hero's strongest position on a duplicate.
          */}
          {hero.eyebrow ? (
            <p className="label text-brand-700">{hero.eyebrow}</p>
          ) : null}

          {/* The word stack: one line per entry, in a single h1. */}
          <h1 className="display text-[clamp(1.5rem,7vw,4rem)] text-ink">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="voice max-w-[46ch] text-lg text-ink-muted md:text-xl">
            {hero.subheadline}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Button
              href={hero.primary.href}
              external={isExternal(hero.primary.href)}
            >
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              variant="secondary"
              external={isExternal(hero.secondary.href)}
            >
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
