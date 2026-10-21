"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useIndicator } from "@/lib/use-indicator";
import { prefersReducedMotion } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { ref: navRef, move } = useIndicator<HTMLElement>(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Overlay: lock scroll, Escape to close, staggered link reveal
  useEffect(() => {
    if (!open) return;
    const items = overlayRef.current?.querySelectorAll("[data-menu-item]");
    const tween =
      items && !prefersReducedMotion()
        ? gsap.fromTo(items, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 })
        : null;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      tween?.kill();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4"
      >
        <div
          data-enter="drop"
          className={`glass pointer-events-auto flex h-14 w-full max-w-full items-center gap-1 rounded-full border pl-5 pr-2 transition-[box-shadow,border-color] duration-300 lg:w-fit ${
            scrolled
              ? "border-line shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              : "border-line/70 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          }`}
        >
          <Link
            href="/"
            aria-label="Hafiz — home"
            className="group mr-auto font-[family-name:var(--font-space)] text-xl font-semibold tracking-tight lg:mr-3"
          >
            H<span className="inline-block text-primary transition-transform duration-300 group-hover:scale-150">.</span>
          </Link>

          <nav
            ref={navRef}
            onMouseLeave={() => move()}
            className="relative hidden items-center [--ind-fallback:rgb(250_250_250/0.07)] lg:flex"
            aria-label="Main"
          >
            <span data-indicator="" className="indicator rounded-full bg-fg/[0.07]" />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={active(l.href)}
                aria-current={active(l.href) ? "page" : undefined}
                onMouseEnter={(e) => move(e.currentTarget)}
                onFocus={(e) => move(e.currentTarget)}
                onBlur={() => move()}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  active(l.href) ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {l.label}
                {active(l.href) && (
                  <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="btn-primary ml-3 hidden !h-10 !rounded-full !px-5 text-sm lg:inline-flex">
            Hire me
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-150 hover:border-accent/60 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path
                d={open ? "M6 6l12 12" : "M4 8h16"}
                className="transition-all duration-300"
              />
              <path
                d={open ? "M18 6L6 18" : "M4 16h16"}
                className="transition-all duration-300"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu — a sibling of the header so `fixed` is relative to the viewport */}
      {open && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                data-menu-item
                onClick={() => setOpen(false)}
                aria-current={active(l.href) ? "page" : undefined}
                className={`flex items-baseline gap-4 border-b border-line/60 py-3 font-[family-name:var(--font-space)] text-[28px] font-medium tracking-tight ${
                  active(l.href) ? "text-accent" : "text-fg"
                }`}
              >
                <span className="w-6 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" data-menu-item onClick={() => setOpen(false)} className="btn-primary mt-8 self-start">
            Hire me
          </Link>
        </div>
      )}
    </>
  );
}
