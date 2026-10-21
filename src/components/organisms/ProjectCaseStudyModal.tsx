"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import { CarouselNavButtons } from "@/components/molecules/CarouselNavButtons";
import { PhotoLightboxModal } from "@/components/molecules/PhotoLightboxModal";
import { cx } from "@/lib/cx";
import { useCarouselScroll } from "@/lib/hooks/useCarouselScroll";
import { useModalDialog } from "@/lib/hooks/useModalDialog";
import type { Photo as PhotoModel, Project } from "@/types/content";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  whatsappHref?: string;
}

const MODAL_PHOTO_SIZES =
  "(min-width: 1024px) 540px, (min-width: 640px) 440px, 340px";
const MODAL_HERO_SIZES = "(min-width: 1024px) 90vw, 100vw";

/**
 * Full-screen architectural dossier modal.
 *
 * Replaces individual `/proyectos/[slug]` routes so the site strictly respects
 * the 6-page architecture while giving every project a rich reading and gallery view.
 */
export function ProjectCaseStudyModal({
  project,
  onClose,
  whatsappHref = "https://wa.me/529514581395",
}: ProjectCaseStudyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoModel | null>(null);
  const activePhotoRef = useRef<PhotoModel | null>(null);

  useEffect(() => {
    activePhotoRef.current = activePhoto;
  }, [activePhoto]);

  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const {
    canScrollLeft: canScrollGalleryLeft,
    canScrollRight: canScrollGalleryRight,
    scrollLeft: scrollGalleryLeft,
    scrollRight: scrollGalleryRight,
  } = useCarouselScroll(galleryTrackRef, { fallbackWidth: 340, gap: 16 });

  useModalDialog({
    isOpen: Boolean(project),
    onClose,
    overlayRef,
    dialogRef: contentRef,
    trapRef: overlayRef,
    closeButtonRef,
    animation: "dossier",
    onEscape: () => {
      if (!activePhotoRef.current) return false;
      setActivePhoto(null);
      return true;
    },
  });

  if (!project) return null;

  const photos = project.photos.length > 0 ? project.photos : project.gallery;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas text-ink"
    >
      {/* Sticky 0px top bar */}
      <div className="sticky top-0 z-30 bg-canvas/95 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="label text-brand-800">
              {project.categoryLabel || "Proyecto"}
            </span>
            {project.location ? (
              <span className="label text-ink-muted">{project.location}</span>
            ) : null}
            <span className="label text-ink-muted tabular-nums">
              {`${String(photos.length).padStart(2, "0")} fotos`}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar expediente de proyecto"
            className="group label inline-flex min-h-[44px] cursor-pointer items-center gap-3 text-ink transition-colors hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-800"
          >
            <span className="underline decoration-ink/40 underline-offset-4 group-hover:decoration-brand-800 max-sm:hidden">
              Cerrar expediente
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center bg-ink text-canvas transition-colors duration-200 group-hover:bg-brand-800">
              <Icon name="close" className="h-4 w-4" />
            </span>
          </button>
        </Container>
      </div>

      <div ref={contentRef}>
        <Container className="py-12 md:py-16 lg:py-20">
          {/* Editorial header */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-3">
                {`${project.categoryLabel} · ${project.location}`}
              </p>
              <Heading
                as="h2"
                voice="serif"
                sizeClassName="text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.04]"
              >
                {project.title}
              </Heading>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Button
                href={whatsappHref}
                external
                variant="primary"
                size="sm"
                arrow
              >
                Cotizar un proyecto similar
              </Button>
            </div>
          </div>

          {/* Uncropped lead cover photograph */}
          <div className="mt-10 overflow-hidden bg-bone-100">
            <div className="relative mx-auto overflow-hidden">
              <Photo
                photo={project.wideCover ?? project.cover}
                sizes={MODAL_HERO_SIZES}
                priority
                className="max-h-[78svh] w-full object-contain"
              />
            </div>
          </div>

          {/* Narrative + Technical Specifications */}
          <div className="mt-12 grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="label text-brand-800">Memoria descriptiva</span>

              {project.paragraphs && project.paragraphs.length > 0 ? (
                <div className="mt-5 flex flex-col gap-4">
                  {project.paragraphs.map((paragraph, idx) => (
                    <Text
                      key={paragraph}
                      size={idx === 0 ? "lede" : undefined}
                      className={idx === 0 ? "text-ink" : "text-ink-muted"}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-4">
                  {project.summary ? (
                    <Text size="lede" className="text-ink">
                      {project.summary}
                    </Text>
                  ) : null}
                  {project.story ? (
                    <Text className="text-ink-muted">{project.story}</Text>
                  ) : null}
                  {project.outcome ? (
                    <Text className="text-ink-muted">{project.outcome}</Text>
                  ) : null}
                </div>
              )}
            </div>

            <aside className="flex flex-col justify-between pt-8 lg:col-span-5 lg:pt-0 lg:pl-10">
              <div>
                <p className="label text-brand-800">Ficha técnica</p>
                <dl className="mt-6">
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="label text-ink-muted">Ubicación</dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {project.location}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="label text-ink-muted">Tipología</dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {project.categoryLabel}
                    </dd>
                  </div>
                  {project.specs?.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <dt className="label text-ink-muted">{spec.label}</dt>
                      <dd className="text-right text-sm font-medium text-ink tabular-nums">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="label text-ink-muted">
                      Registro fotográfico
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink tabular-nums">
                      {`${photos.length} fotografías reales de obra`}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-ink-muted">
                  Proyecto y ejecución directa por Constructora Casa Alta en
                  Oaxaca.
                </p>
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Volver al portafolio
                </Button>
              </div>
            </aside>
          </div>

          {/* Complete photo gallery: horizontal scroll multi-row mosaic */}
          <div className="mt-14 pt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="label text-brand-800">
                  Registro fotográfico completo de la obra
                </p>
                <span className="label text-ink-muted tabular-nums">
                  {`${String(photos.length).padStart(2, "0")} imágenes`}
                </span>
              </div>

              {/* Navigation arrow buttons for horizontal scroll */}
              <CarouselNavButtons
                canScrollLeft={canScrollGalleryLeft}
                canScrollRight={canScrollGalleryRight}
                onScrollLeft={scrollGalleryLeft}
                onScrollRight={scrollGalleryRight}
                prevLabel="Desplazar galería a la izquierda"
                nextLabel="Desplazar galería a la derecha"
              />
            </div>

            <div
              ref={galleryTrackRef}
              role="region"
              aria-label={`Galería completa de ${project.title}`}
              tabIndex={0}
              className={cx(
                "grid grid-flow-col gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 focus-visible:outline-2 focus-visible:outline-brand-800",
                photos.length >= 8
                  ? "grid-rows-[repeat(3,300px)] sm:grid-rows-[repeat(3,380px)] lg:grid-rows-[repeat(3,460px)] auto-cols-[300px] sm:auto-cols-[380px] lg:auto-cols-[460px]"
                  : "grid-rows-[repeat(2,340px)] sm:grid-rows-[repeat(2,440px)] lg:grid-rows-[repeat(2,540px)] auto-cols-[340px] sm:auto-cols-[440px] lg:auto-cols-[540px]",
              )}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  aria-label={`Ver fotografía de ${project.title}`}
                  className="group relative h-full w-full shrink-0 snap-start cursor-pointer overflow-hidden bg-bone-100 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand-800 focus-visible:outline-offset-2"
                >
                  <Photo
                    photo={photo}
                    sizes={MODAL_PHOTO_SIZES}
                    priority={index < 6}
                    fit="cover"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightboxModal
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
      />
    </div>
  );
}
