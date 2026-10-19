"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { DivisionCard, SectionIntro } from "@/types/content";

interface DivisionCardsProps {
  intro?: SectionIntro;
  divisions: DivisionCard[];
  tone?: "canvas" | "bone";
}

const CARD_SIZES =
  "(min-width: 1280px) 480px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 85vw";

/**
 * Architectural division showcase cards inspired by Cosentino's
 * material monolith cards (Dekton, Silestone, Éclos).
 *
 * Implements a generous horizontal snap track so images have expansive
 * width and height without being constrained to a single viewport box.
 */
export function DivisionCards({
  intro,
  divisions,
  tone = "canvas",
}: DivisionCardsProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollButtons();

    const handleScroll = () => updateScrollButtons();
    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [divisions]);

  const handleScroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 440;
    const scrollAmount = cardWidth + 24; // card width + gap-6

    track.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (divisions.length === 0) return null;

  const navigationAction = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleScroll("left")}
        disabled={!canScrollLeft}
        aria-label="Ver frente anterior"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bone-200 bg-canvas text-ink transition-colors hover:border-ink hover:bg-bone-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrow-left" className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => handleScroll("right")}
        disabled={!canScrollRight}
        aria-label="Ver frente siguiente"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bone-200 bg-canvas text-ink transition-colors hover:border-ink hover:bg-bone-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Icon name="arrow-right" className="h-4 w-4" />
      </button>
    </div>
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
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex h-[580px] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden border border-white/10 bg-ink p-7 text-white transition-colors duration-300 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] lg:p-9"
            >
              {/* Full-bleed background photograph */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-bone-100">
                <Photo
                  photo={card.photo}
                  sizes={CARD_SIZES}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Scrim gradients: subtle top, deep bottom for contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent"
              />

              {/* Top: Division Title */}
              <div className="relative z-10">
                <Heading
                  as="h3"
                  voice="serif"
                  sizeClassName="text-2xl md:text-3xl lg:text-[2rem] text-white font-normal leading-[1.14] drop-shadow-sm transition-colors group-hover:text-concha-nacar"
                >
                  {card.title}
                </Heading>
              </div>

              {/* Bottom: Description & "Saber más" CTA */}
              <div className="relative z-10 flex flex-col gap-5">
                <Text
                  size="base"
                  className="leading-relaxed text-white/90 drop-shadow-sm font-normal max-w-[42ch]"
                >
                  {card.description}
                </Text>

                <div className="flex items-center gap-3 pt-1 text-white transition-colors group-hover:text-concha-nacar">
                  <span className="label text-sm tracking-wider text-white transition-colors group-hover:text-concha-nacar">
                    Saber más
                  </span>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-concha-nacar"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
