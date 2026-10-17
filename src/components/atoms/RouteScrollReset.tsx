"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets the window scroll position to the top on every route change.
 *
 * Prevents the Next.js App Router issue where navigating between pages while
 * scrolled down causes the new page to land anchored to the bottom.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
