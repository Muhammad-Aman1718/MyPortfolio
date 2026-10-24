"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UI } from "@/constants/constant";
import useIndicator from "./useIndicator";
import useScrolledPast from "./useScrolledPast";

/**
 * Navbar state: shadow once scrolled, the compact pill past the hero, the
 * full-screen menu (scroll-locked, Escape to close, closes on navigation) and
 * the sliding hover indicator behind the links.
 */
export default function useNavbar() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(UI.navScrolledAt);
  const compact = useScrolledPast(UI.navCompactAt);
  const [open, setOpen] = useState(false);
  const { ref: navRef, move } = useIndicator<HTMLElement>(pathname);

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return {
    scrolled,
    compact,
    open,
    toggle: () => setOpen((o) => !o),
    close: () => setOpen(false),
    isActive,
    navRef,
    move,
  };
}
