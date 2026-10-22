"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const EMAIL = site.email;

/**
 * Floating "Speak to me" pill: appears once the hero has scrolled away and
 * steps aside when the footer (which has its own contact block) comes in.
 */
export default function ContactDock() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerIn, setFooterIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.getElementById("site-footer");
    const io = footer ? new IntersectionObserver(([e]) => setFooterIn(e.isIntersecting)) : null;
    if (footer) io?.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const shown = pastHero && !footerIn && pathname !== "/contact";

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="glass flex items-center gap-1.5 rounded-full p-1.5 pl-5 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
        <span className="mr-2 text-sm font-medium">Speak to me</span>
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hi text-fg transition-colors duration-200 hover:bg-[#363636]"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
        <Link href="/contact" className="btn-primary !h-10 !px-4 text-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          Book a call
        </Link>
      </div>
    </div>
  );
}
