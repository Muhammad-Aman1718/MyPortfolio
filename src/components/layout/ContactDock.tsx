"use client";

import Link from "next/link";
import { COPY, SITE } from "@/constants/constant";
import useContactDock from "@/hooks/useContactDock";
import { cn } from "@/utils/style";
import Icon from "@/components/ui/Icon";

/** Floating "Speak to me" pill with email and booking shortcuts. */
export default function ContactDock() {
  const shown = useContactDock();

  return (
    <div
      inert={!shown}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-[opacity,transform] duration-500 ease-smooth sm:bottom-6",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="glass flex items-center gap-1.5 rounded-full p-1.5 pl-5 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
        <span className="mr-2 text-sm font-medium">{COPY.dock.label}</span>
        <a
          href={`mailto:${SITE.email}`}
          aria-label={`Email ${SITE.email}`}
          className="icon-button h-10 w-10 bg-surface-hi text-fg hover:bg-surface-hover"
        >
          <Icon name="mail" className="h-4.5 w-4.5" />
        </a>
        <Link href="/contact" className="btn-primary h-10! px-4! text-sm">
          <Icon name="calendar" />
          {COPY.dock.cta}
        </Link>
      </div>
    </div>
  );
}
