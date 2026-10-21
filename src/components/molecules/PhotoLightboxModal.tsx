"use client";

import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel } from "@/types/content";

export interface PhotoLightboxModalProps {
  photo: PhotoModel | null;
  onClose: () => void;
  ariaLabel?: string;
}

/**
 * Full-screen Architectural Photo Lightbox Modal (`PhotoLightboxModal`).
 *
 * Displays high-resolution photography on a blurred dark backdrop (`bg-ink/95`),
 * with 0px square close trigger and backdrop click-to-dismiss.
 */
export function PhotoLightboxModal({
  photo,
  onClose,
  ariaLabel,
}: PhotoLightboxModalProps) {
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || photo.alt}
      className="fixed inset-0 z-60 flex items-center justify-center bg-ink/95 p-4 md:p-8 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar vista ampliada"
        className="absolute top-4 right-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center bg-ink text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
      >
        <Icon name="close" className="h-4 w-4" />
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Photo
          photo={photo}
          sizes="90vw"
          priority
          fit="contain"
          className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
        />
      </div>
    </div>
  );
}
