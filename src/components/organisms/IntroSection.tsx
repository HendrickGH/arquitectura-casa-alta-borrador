"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { revealStep } from "@/lib/reveal";
import type { SectionIntro } from "@/types/content";

interface IntroSectionProps {
  intro: SectionIntro;
  tone?: "canvas" | "bone";
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
}

const PHOTO_SIZES = "(min-width: 1024px) 44vw, 100vw";
const SECONDARY_SIZES = "(min-width: 1024px) 24vw, 60vw";

/**
 * Thirdway asymmetric editorial introduction (`Quiénes somos`), pairing the
 * studio narrative with a dual-photograph architectural composition:
 * 1. The full-color aerial photograph of the Punta Zicatela coastal ensemble.
 * 2. The on-site coastal structural supervision photograph (`credibilidad`),
 *    gently scrubbed on scroll via GSAP ScrollTrigger.
 */
export function IntroSection({
  intro,
  tone = "canvas",
  id,
}: IntroSectionProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    const secondary = secondaryRef.current;
    if (!scope || !secondary) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          secondary,
          { y: 26 },
          {
            y: -22,
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }, scope);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const paragraphs =
    intro.paragraphs && intro.paragraphs.length > 0
      ? [intro.body, ...intro.paragraphs]
      : intro.body
        ? [intro.body]
        : [];

  return (
    <Section
      id={id}
      tone={tone}
      reveal="stagger"
      className="!pt-14 !pb-16 md:!pt-20 md:!pb-24"
    >
      <Container>
        <div
          ref={scopeRef}
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left column: Thirdway monumental statement */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            {intro.eyebrow ? (
              <div {...revealStep(0)} className="flex items-center gap-2.5">
                <span className="number-pill">(01)</span>
                <p className="eyebrow">{intro.eyebrow}</p>
              </div>
            ) : null}

            <div {...revealStep(1)}>
              <Heading
                as="h2"
                voice="serif"
                sizeClassName="text-[clamp(2rem,3.6vw,3.35rem)] leading-[1.08]"
              >
                {intro.heading}
              </Heading>
            </div>

            <div {...revealStep(2)} className="mt-1 flex flex-col gap-4">
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={paragraph}
                  size={index === 0 ? "lede" : undefined}
                  className={index === 0 ? "text-ink" : "text-ink-muted"}
                >
                  {paragraph}
                </Text>
              ))}
            </div>

            <div
              {...revealStep(3)}
              className="ruler-top mt-3 flex flex-wrap items-center justify-between gap-4 pt-5"
            >
              <Button href="/nosotros" variant="secondary" size="sm" arrow>
                Conocer la firma y trayectoria
              </Button>
              <span className="number-pill">DESDE 2016 · OAXACA</span>
            </div>
          </div>

          {/* Right column: Dual studio photograph spread (Aerial + Supervision) */}
          {intro.photo ? (
            <div
              {...revealStep(2)}
              className="relative flex flex-col gap-5 lg:col-span-6"
            >
              <figure className="overflow-hidden">
                <div className="relative overflow-hidden">
                  <Photo
                    photo={intro.photo}
                    sizes={PHOTO_SIZES}
                    className="block h-auto w-full object-contain"
                  />
                </div>
                {intro.photoCaption ? (
                  <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-ink-muted">
                    <span>{intro.photoCaption}</span>
                  </figcaption>
                ) : null}
              </figure>

              {intro.secondaryPhoto ? (
                <figure
                  ref={secondaryRef}
                  className="ml-auto w-full max-w-[22rem] overflow-hidden sm:w-3/4 lg:-mt-14 lg:mr-4"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Photo
                      photo={intro.secondaryPhoto}
                      sizes={SECONDARY_SIZES}
                    />
                  </div>
                  {intro.secondaryPhotoCaption ? (
                    <figcaption className="mt-2.5 flex items-center justify-between gap-2 text-[0.72rem] text-ink-muted">
                      <span>{intro.secondaryPhotoCaption}</span>
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
