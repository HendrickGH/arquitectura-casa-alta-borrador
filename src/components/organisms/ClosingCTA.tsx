"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import { useContactModal } from "@/components/organisms/ContactModalContext";
import { revealAttrs, revealStep } from "@/lib/reveal";
import type { CallToAction, Photo as PhotoModel } from "@/types/content";

export interface ClosingCTAProps {
  closing: {
    eyebrow?: string;
    heading: string;
    body: string;
    cta: CallToAction;
    photo?: PhotoModel;
  };
  /**
   * Optional override photograph.
   * Defaults to `closing.photo` (flagship Punta Zicatela 1500×2000px).
   */
  photo?: PhotoModel | null;
  /** Anchor target, so the header nav can link straight to this section. */
  id?: string;
  /**
   * Whether this stage is rendered on the landing page,
   * linking the secondary action smoothly to `#contacto` instead of `/contacto`.
   */
  isLanding?: boolean;
}

/**
 * Unified monumental closing stage (150vh) with continuous GSAP parallax scrub.
 *
 * The upper section provides contemplative architectural photographic immersion,
 * while the bottom third houses the editorial call to action protected by an
 * architectural dark gradient scrim (WCAG AAA compliant).
 */
export function ClosingCTA({
  closing,
  photo,
  id,
  isLanding = false,
}: ClosingCTAProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contactModal = useContactModal();

  const activePhoto = photo ?? closing.photo;
  const external = closing.cta.href.startsWith("http");
  const secondaryHref = isLanding ? "#contacto" : "/contacto";

  useEffect(() => {
    const container = containerRef.current;
    const target = imageWrapperRef.current;
    if (!container || !target) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("./gsap-scenes")
      .then(({ createParallaxStage }) => {
        if (cancelled) return;
        revert = createParallaxStage({ container, target });
      })
      .catch(() => {
        // Fallback gracefully without throwing: image remains visible statically.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  if (!activePhoto) return null;

  return (
    <section
      id={id}
      ref={containerRef}
      {...revealAttrs("stagger")}
      className="relative flex min-h-[140vh] w-full flex-col justify-end overflow-hidden bg-ink md:min-h-[150vh]"
    >
      {/* Parallax background wrapper: oversized height ensures clean vertical travel */}
      <div
        ref={imageWrapperRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-[15%] left-0 right-0 h-[130%] w-full select-none will-change-transform"
      >
        <Photo photo={activePhoto} sizes="100vw" fit="cover" />
      </div>

      {/* Architectural bottom gradient scrim for legible editorial contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[75vh] max-h-[820px] bg-gradient-to-t from-ink via-ink/75 to-transparent"
      />

      {/* Bottom-anchored monumental editorial CTA */}
      <Container className="relative z-10 w-full pb-16 pt-24 md:pb-24 lg:pb-32">
        <div {...revealStep(0)} className="max-w-[48rem]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4">
            <p className="eyebrow !text-white/85">
              {closing.eyebrow || "Primera reunión sin costo"}
            </p>
            <span className="label text-white/70">
              Zoom o presencial en Oaxaca
            </span>
          </div>

          <Heading
            voice="serif"
            sizeClassName="text-[2.25rem] leading-[1.08] text-white sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] max-w-[18ch]"
          >
            {closing.heading}
          </Heading>

          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            {closing.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6">
            <Button
              href={closing.cta.href}
              variant="primary"
              size="md"
              external={external}
              arrow
            >
              {closing.cta.label}
            </Button>

            <Button
              href={contactModal ? undefined : secondaryHref}
              onClick={
                contactModal
                  ? () => {
                      contactModal.openContactModal();
                    }
                  : undefined
              }
              variant="outline"
              size="md"
              arrow
            >
              Iniciar consulta
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
