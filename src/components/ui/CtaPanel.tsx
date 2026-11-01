import Link from "next/link";
import { BOOKING_URL, COPY, SITE } from "@/constants/constant";
import Icon from "./Icon";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import type { CtaPanelProps } from "@/types/types";

/** Closing call-to-action: a solid primary panel that wipes open, with a magnetic button. */
export default function CtaPanel({ title = COPY.cta.title, description, email = true, booking = false }: CtaPanelProps) {
  return (
    <section className="container-site section">
      <Reveal variant="clip-up" className="relative overflow-hidden rounded-3xl bg-primary text-on-primary">
        <div className="relative flex flex-col items-center px-6 py-14 text-center md:py-16">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em]">{COPY.cta.eyebrow}</p>
          <h2 className="h-display mt-4 max-w-[18ch] text-[34px] font-bold md:text-[52px]">{title}</h2>
          {description && <p className="mx-auto mt-4 max-w-[46ch]">{description}</p>}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Magnetic>
              <Link href="/contact" className="btn-inverse">
                {COPY.cta.button} <Icon name="arrowRight" />
              </Link>
            </Magnetic>
            {booking && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-medium"
              >
                <Icon name="calendar" /> {COPY.cta.booking}
              </a>
            )}
            {email && (
              <a href={`mailto:${SITE.email}`} className="link-underline text-sm font-medium">
                {SITE.email}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
