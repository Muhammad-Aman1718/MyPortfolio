"use client";

import Link from "next/link";
import { COPY, NAV_LINKS, SITE, UI } from "@/constants/constant";
import useNavbar from "@/hooks/useNavbar";
import { pad2 } from "@/utils/format";
import { cn, delayStyle } from "@/utils/style";
import Avatar from "@/components/ui/Avatar";
import Icon from "@/components/ui/Icon";

/**
 * Floating glass navbar. Past the hero the desktop bar folds into a compact
 * pill (avatar · name · Hire me · menu); below `lg` the links live in a
 * full-screen menu.
 */
export default function Navbar() {
  const { scrolled, compact, open, toggle, close, isActive, navRef, move } = useNavbar();

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4"
      >
        <div
          data-enter="drop"
          className={cn(
            "glass pointer-events-auto flex h-14 w-full max-w-full items-center gap-1 rounded-full pl-5 pr-2 transition-shadow duration-300 lg:w-fit",
            scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.5)]" : "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
          )}
        >
          <Link href="/" aria-label={COPY.navbar.homeLabel} className="group -ml-3 mr-auto flex items-center font-display lg:mr-6">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Avatar priority className="h-full w-full transition-transform duration-500 group-hover:scale-110" />
            </span>
            {/* Name only where the page links aren't showing: always on phones/tablets,
                and on desktop once the bar folds into the compact pill */}
            <span
              className={cn(
                "ml-3 max-w-45 overflow-hidden whitespace-nowrap text-[15px] font-bold tracking-tight opacity-100 transition-[max-width,opacity,margin] duration-500 ease-smooth",
                !compact && "lg:ml-0 lg:max-w-0 lg:opacity-0",
              )}
            >
              {SITE.name}
            </span>
          </Link>

          <nav
            ref={navRef}
            onMouseLeave={() => move()}
            inert={compact}
            aria-label="Main"
            className={cn(
              "relative hidden items-center overflow-hidden transition-[max-width,opacity] duration-500 [--ind-fallback:rgb(250_250_250/0.07)] lg:flex ease-smooth",
              compact ? "max-w-0 opacity-0" : "max-w-180 opacity-100",
            )}
          >
            <span data-indicator="" className="indicator rounded-full bg-fg/[0.07]" />
            {NAV_LINKS.map((link) => {
              const on = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={on}
                  aria-current={on ? "page" : undefined}
                  onMouseEnter={(e) => move(e.currentTarget)}
                  onFocus={(e) => move(e.currentTarget)}
                  onBlur={() => move()}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
                    on ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  {/* Active marker: the old line fades and shrinks while the new one grows in */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary transition-[opacity,transform] duration-500 ease-smooth",
                      on ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <Link href="/contact" className="btn-primary ml-3 hidden h-10! rounded-full! px-5! text-sm lg:inline-flex">
            {COPY.navbar.hire}
          </Link>
          <button
            type="button"
            aria-label={open ? COPY.navbar.closeMenu : COPY.navbar.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggle}
            className={cn("icon-button ml-2 h-10 w-10 bg-surface-hi hover:bg-surface-hover", compact || open ? "lg:flex" : "lg:hidden")}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Full-screen menu — a sibling of the header so `fixed` is relative to the viewport */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/95 px-6 pb-10 pt-24 backdrop-blur-xl"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-180 flex-col">
            {NAV_LINKS.map((link, i) => {
              const on = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-enter="rise"
                  style={delayStyle(i * UI.menuStaggerMs)}
                  onClick={close}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-4 py-3 font-display text-[32px] font-bold tracking-tight transition-colors duration-200 hover:text-primary",
                    on ? "text-primary" : "text-fg",
                  )}
                >
                  <span className="w-6 text-xs font-medium text-subtle">{pad2(i + 1)}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            data-enter="rise"
            style={delayStyle(NAV_LINKS.length * UI.menuStaggerMs)}
            onClick={close}
            className="btn-primary mx-auto mt-8 w-full max-w-180"
          >
            {COPY.navbar.hire}
          </Link>
        </div>
      )}
    </>
  );
}
