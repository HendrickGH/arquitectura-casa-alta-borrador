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
 * The landing hero: the photograph fills one visual viewport, a graded dark
 * overlay sits on top of it, and the type is set directly on that overlay.
 *
 * WHY THE OVERLAY, AND NOT TYPE ON THE BARE PHOTOGRAPH. Two attempts at putting
 * type straight on this image were built and measured before, and both failed:
 * white type sampled 1.31:1, and dark type was *less* legible than white because
 * variance, not mean luminance, is what breaks type. The overlay is the fix
 * that keeps the photograph: it is graded rather than flat -- heavier at the top
 * for the floating chrome, heaviest at the bottom where the headline sits -- so
 * the type gets a measured ground while the middle of the image stays the
 * subject. The composition is the client's: dark overlay, type on the image, no
 * boxed panel.
 *
 * The overlay is decorative and hidden from assistive tech; the contrast it
 * produces is measured in the rendered composition, not assumed.
 *
 * The entrance is pure CSS (`hero-rise` in globals.css): it runs with or
 * without JavaScript, animates only opacity and transform, is staggered per
 * line, and is neutralised under `prefers-reduced-motion`.
 *
 * Size is fluid because the headline is a word stack and a line cannot wrap: the
 * widest line, "civil e industrial", measures ~10.06em in the shipped Montserrat
 * 600, so the clamp is capped to keep three lines from 320px up.
 */
export function Hero({ hero }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-end bg-ink"
      style={{ marginTop: "calc(var(--chrome-h, 5.25rem) * -1)" }}
    >
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <Photo photo={hero.image} sizes="100vw" priority />
      </div>

      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 pt-32 pb-14 md:pb-20">
        <div className="flex max-w-[54rem] flex-col items-start gap-5">
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

          {/* The word stack: one line per entry, in a single h1. */}
          <h1 className="display hero-rise hero-rise-2 text-[clamp(1.5rem,5.5vw,4.25rem)] text-white">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="voice hero-rise hero-rise-3 max-w-[46ch] text-lg text-white/90 md:text-xl">
            {hero.subheadline}
          </p>

          <div className="hero-rise hero-rise-4 mt-2 flex flex-wrap gap-4">
            <Button
              href={hero.primary.href}
              variant="inverse"
              external={isExternal(hero.primary.href)}
            >
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              variant="outline"
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
