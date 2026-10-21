import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface UseModalDialogOptions {
  isOpen: boolean;
  onClose: () => void;
  overlayRef?: React.RefObject<HTMLElement | null>;
  dialogRef?: React.RefObject<HTMLElement | null>;
  closeButtonRef?: React.RefObject<HTMLElement | null>;
  /** Element that scopes the Tab focus trap. Defaults to `dialogRef`, then `overlayRef`. */
  trapRef?: React.RefObject<HTMLElement | null>;
  /**
   * Intercepts Escape before the modal closes. Return `true` when the key was
   * consumed (e.g. a nested lightbox closed) so `onClose` is not called.
   */
  onEscape?: () => boolean;
  /** Entrance animation preset: centered dialog or full-screen dossier. */
  animation?: "dialog" | "dossier" | "none";
}

/**
 * Custom hook managing modal accessibility, scroll lock, focus restoration,
 * keyboard trapping, and entrance animation.
 */
export function useModalDialog({
  isOpen,
  onClose,
  overlayRef,
  dialogRef,
  closeButtonRef,
  trapRef,
  onEscape,
  animation = "dialog",
}: UseModalDialogOptions) {
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement as HTMLElement | null;

    const timer = window.setTimeout(() => {
      closeButtonRef?.current?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onEscapeRef.current?.()) return;
        onClose();
        return;
      }
      const container =
        trapRef?.current || dialogRef?.current || overlayRef?.current;
      if (e.key === "Tab" && container) {
        const focusable = container.querySelectorAll<HTMLElement>(
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (animation !== "none" && !reducedMotion) {
      const dossier = animation === "dossier";
      if (overlayRef?.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: dossier ? 0.38 : 0.28, ease: "power2.out" },
        );
      }
      if (dialogRef?.current) {
        gsap.fromTo(
          dialogRef.current,
          dossier
            ? { y: 36, opacity: 0 }
            : { y: 24, opacity: 0, scale: 0.98 },
          dossier
            ? { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.06 }
            : { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power3.out", delay: 0.04 },
        );
      }
    }

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerElementRef.current?.focus();
    };
  }, [isOpen, onClose, overlayRef, dialogRef, closeButtonRef, trapRef, animation]);

  return { triggerElementRef };
}
