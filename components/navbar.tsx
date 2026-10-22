"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIndicator } from "@/lib/use-indicator";
import { site } from "@/lib/site";

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
  // Past the hero the desktop bar folds into a compact pill: logo · Hire me · menu
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { ref: navRef, move } = useIndicator<HTMLElement>(pathname);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setCompact(window.scrollY > 160);
    };
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

  // Overlay: lock scroll, Escape to close (link stagger is pure CSS via data-enter, so it can't stick hidden)
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

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4"
      >
        <div
          data-enter="drop"
          className={`glass pointer-events-auto flex h-14 w-full max-w-full items-center gap-1 rounded-full pl-5 pr-2 transition-shadow duration-300 lg:w-fit ${
            scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.5)]" : "shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group mr-auto flex items-baseline gap-2 font-[family-name:var(--font-space)] text-xl font-bold tracking-tight lg:mr-3"
          >
            <span aria-hidden="true">
              MA<span className="inline-block text-primary transition-transform duration-300 group-hover:scale-150">.</span>
            </span>
            <span className="whitespace-nowrap text-[15px] font-semibold tracking-normal">{site.name}</span>
          </Link>

          <nav
            ref={navRef}
            onMouseLeave={() => move()}
            inert={compact}
            className={`relative hidden items-center overflow-hidden transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [--ind-fallback:rgb(250_250_250/0.07)] lg:flex ${
              compact ? "max-w-0 opacity-0" : "max-w-[720px] opacity-100"
            }`}
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
            className={`ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-hi transition-colors duration-150 hover:bg-[#363636] ${
              compact || open ? "lg:flex" : "lg:hidden"
            }`}
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
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 px-6 pb-10 pt-24 backdrop-blur-xl"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-[720px] flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                data-enter="rise"
                style={{ "--d": i * 40 } as React.CSSProperties}
                onClick={() => setOpen(false)}
                aria-current={active(l.href) ? "page" : undefined}
                className={`flex items-baseline gap-4 py-3 font-[family-name:var(--font-space)] text-[32px] font-bold tracking-tight transition-colors duration-200 hover:text-primary ${
                  active(l.href) ? "text-primary" : "text-fg"
                }`}
              >
                <span className="w-6 text-xs font-medium text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            data-enter="rise"
            style={{ "--d": links.length * 40 } as React.CSSProperties}
            onClick={() => setOpen(false)}
            className="btn-primary mx-auto mt-8 w-full max-w-[720px]"
          >
            Hire me
          </Link>
        </div>
      )}
    </>
  );
}
