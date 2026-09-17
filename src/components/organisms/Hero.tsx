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
 * The landing hero: the photograph fills one visual viewport, the headline block
 * sits on an opaque canvas panel anchored over its lower-left corner.
 *
 * WHY THE TYPE IS NOT SET DIRECTLY ON THE PHOTOGRAPH. Two attempts were built
 * and measured against this specific image before settling here, and both
 * failed:
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
 * The chosen photograph scores 30.6 on that variance proxy against a ceiling of
 * 12, so no placement of type inside it is legible, and the client's aerial is
 * kept. The composition therefore puts the type on an opaque `bg-canvas` panel
 * that overlaps the photo instead of on the photo: the image keeps full bleed
 * and its own contrast, and the type sits on clean ground that never has to be
 * negotiated. That is a deliberate deviation from the type-in-the-clean-zone
 * hero the design specified -- choosing the panel and keeping the photo are one
 * decision, not two.
 *
 * Size is fluid rather than stepped because the headline is a word stack and a
 * line cannot wrap: measured against the shipped Montserrat 600, the widest line
 * is "civil e industrial" at ~10.06em (not the 9.325em the older comment
 * recorded for "y construcción"). The clamp is sized against the panel's inner
 * width -- narrower than the old full-width block -- so the stack stays three
 * lines from 320px up.
 *
 * The shell is one visual viewport tall, in `svh` and not `vh` -- `vh` measures
 * the viewport without the collapsed mobile URL bar, so a full-height hero built
 * on it overflows the area a phone actually shows. The shell pulls itself up by
 * the floating chrome's height so the photograph reaches under the header; the
 * panel sits clear of the fold.
 */
export function Hero({ hero }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-end bg-canvas"
      style={{ marginTop: "calc(var(--chrome-h, 5.25rem) * -1)" }}
    >
      <div className="absolute inset-0 overflow-hidden bg-bone-100">
        <Photo photo={hero.image} sizes="100vw" priority />
      </div>

      <Container className="relative z-10 pt-24 pb-10 md:pb-16">
        <div className="w-full max-w-[46rem] bg-canvas p-6 md:p-12">
          <div className="flex flex-col items-start gap-5">
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
            <h1 className="display text-[clamp(1.25rem,6.5vw,3.75rem)] text-ink">
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="voice max-w-[46ch] text-lg text-ink-muted md:text-xl">
              {hero.subheadline}
            </p>

            <div className="mt-2 flex flex-wrap gap-4">
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
        </div>
      </Container>
    </section>
  );
}
