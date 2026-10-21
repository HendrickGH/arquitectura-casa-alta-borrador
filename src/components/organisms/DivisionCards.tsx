"use client";

import { useRef } from "react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { MonolithCard } from "@/components/molecules/MonolithCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { useCarouselScroll } from "@/lib/hooks/useCarouselScroll";
import type { DivisionCard, SectionIntro } from "@/types/content";

interface DivisionCardsProps {
  intro?: SectionIntro;
  divisions: DivisionCard[];
  tone?: "canvas" | "bone";
}

const CARD_SIZES =
  "(min-width: 1280px) 480px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 85vw";

/**
 * Architectural division showcase cards (`DivisionCards`).
 *
 * Implements a generous horizontal snap track composed of `MonolithCard` molecules
 * and `CarouselNavButtons` controls.
 */
export function DivisionCards({
  intro,
  divisions,
  tone = "canvas",
}: DivisionCardsProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useCarouselScroll(trackRef, { gap: 24, fallbackWidth: 440 });

  if (divisions.length === 0) return null;

  const navigationAction = (
    <CarouselNavButtons
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      onScrollLeft={scrollLeft}
      onScrollRight={scrollRight}
      prevLabel="Ver frente anterior"
      nextLabel="Ver frente siguiente"
    />
  );

  return (
    <Section tone={tone}>
      <Container>
        {intro ? (
          <SectionHeading
            eyebrow={intro.eyebrow}
            heading={intro.heading}
            body={intro.body}
            action={navigationAction}
            className="mb-10 md:mb-14"
          />
        ) : null}

        {/* Horizontal Snap Track */}
        <div
          ref={trackRef}
          role="region"
          aria-label="Carrusel de divisiones especializadas"
          tabIndex={0}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 focus-visible:outline-2 focus-visible:outline-brand-800"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {divisions.map((card) => (
            <MonolithCard
              key={card.href}
              href={card.href}
              title={card.title}
              description={card.description}
              photo={card.photo}
              sizes={CARD_SIZES}
              ctaLabel="Saber más"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
