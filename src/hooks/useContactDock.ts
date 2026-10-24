"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UI } from "@/constants/constant";
import useScrolledPast from "./useScrolledPast";

const dockThreshold = () => window.innerHeight * UI.dockShowAtViewport;

/**
 * The floating contact dock shows once the hero has scrolled away, and steps
 * aside while the footer (which has its own contact block) is on screen and
 * on the contact page itself.
 */
export default function useContactDock(): boolean {
  const pathname = usePathname();
  const pastHero = useScrolledPast(dockThreshold);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return pastHero && !footerInView && pathname !== "/contact";
}
