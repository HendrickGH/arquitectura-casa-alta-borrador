"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { Text } from "@/components/atoms/Text";
import type { Project } from "@/types/content";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  whatsappHref?: string;
}

const MODAL_PHOTO_SIZES = "(min-width: 1024px) 48vw, 100vw";
const MODAL_HERO_SIZES = "(min-width: 1024px) 90vw, 100vw";

/**
 * Full-screen architectural dossier modal (Thirdway case-study sheet).
 *
 * Replaces individual `/proyectos/[slug]` routes so the site strictly respects
 * the 6-page architecture while giving every project — including all 9 verbatim
 * paragraphs of Casa Charco Seco — a rich, tactile reading and gallery view.
 */
export function ProjectCaseStudyModal({
  project,
  onClose,
  whatsappHref = "https://wa.me/529514581395",
}: ProjectCaseStudyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    if (overlayRef.current && contentRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.38, ease: "power2.out" },
      );
      gsap.fromTo(
        contentRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.06 },
      );
    }

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerElementRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const photos = project.photos.length > 0 ? project.photos : project.gallery;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-concha-nacar text-ink"
    >
      {/* Sticky Thirdway top bar */}
      <div className="sticky top-0 z-30 border-b border-ink/15 bg-concha-nacar/95 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="number-pill">
              {project.categoryLabel || "Proyecto"}
            </span>
            {project.location ? (
              <span className="number-pill">{project.location}</span>
            ) : null}
            <span className="number-pill">
              {`${String(photos.length).padStart(2, "0")} FOTOS`}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar expediente de proyecto"
            className="group label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-brand-800"
          >
            <span className="underline decoration-ink/40 underline-offset-4 group-hover:decoration-brand-800">
              Cerrar expediente
            </span>
            <span className="inline-flex h-8 w-11 items-center justify-center rounded-full border border-ink/30 bg-ink text-concha-nacar transition-transform duration-300 group-hover:scale-105">
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
                voice="display"
                sizeClassName="text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.94] tracking-[-0.02em]"
              >
                {project.title}
              </Heading>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Button href={whatsappHref} external variant="primary" size="sm" arrow>
                Cotizar un proyecto similar
              </Button>
            </div>
          </div>

          {/* Uncropped lead cover photograph */}
          <div className="mt-10 overflow-hidden">
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
          <div className="ruler-top mt-12 grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="number-pill">(01)</span>
                <span className="label text-brand-800">Memoria descriptiva</span>
              </div>

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

            <aside className="flex flex-col justify-between border-t border-ink/15 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="label text-brand-800">Ficha técnica</p>
                  <span className="number-pill">(02)</span>
                </div>
                <dl className="mt-6 divide-y divide-bone-200 border-t border-b border-bone-200">
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-xs font-medium tracking-wider text-ink-muted uppercase">
                      Ubicación
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {project.location}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-xs font-medium tracking-wider text-ink-muted uppercase">
                      Tipología
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {project.categoryLabel}
                    </dd>
                  </div>
                  {project.specs?.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <dt className="text-xs font-medium tracking-wider text-ink-muted uppercase">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-ink">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-xs font-medium tracking-wider text-ink-muted uppercase">
                      Registro fotográfico
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {`${photos.length} fotografías reales de obra`}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-ink-muted">
                  Proyecto y ejecución directa por Constructora Casa Alta en Oaxaca.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="label text-brand-800 underline underline-offset-4 hover:text-ink"
                >
                  Volver al portafolio
                </button>
              </div>
            </aside>
          </div>

          {/* Complete uncropped photo gallery */}
          <div className="ruler-top mt-14 pt-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="number-pill">(03)</span>
                <p className="label text-brand-800">
                  Registro fotográfico completo de la obra
                </p>
              </div>
              <span className="number-pill">
                {`${String(photos.length).padStart(2, "0")} IMÁGENES`}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {photos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className="group relative overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <Photo
                      photo={photo}
                      sizes={MODAL_PHOTO_SIZES}
                      priority={index < 2}
                      className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <span className="number-pill-inverse absolute top-3 left-3">
                      {`(${String(index + 1).padStart(2, "0")})`}
                    </span>
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-muted">
                    <span className="line-clamp-1">{photo.alt}</span>
                    <span className="shrink-0 font-mono text-xs uppercase">
                      {`${photo.width}×${photo.height}`}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
