import Link from "next/link";
import Reveal from "./reveal";
import { Magnetic } from "./pointer-fx";
import { ArrowIcon } from "./icons";

/** Closing call-to-action: a contained panel that wipes open, with a magnetic primary button. */
export default function CtaPanel({
  title = "Have a project in mind?",
  description,
  email = true,
}: {
  title?: string;
  description?: string;
  email?: boolean;
}) {
  return (
    <section className="container-site section">
      <Reveal variant="clip-up" className="ring-gradient relative overflow-hidden rounded-[24px] bg-surface">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[640px] max-w-full -translate-x-1/2 rounded-full bg-primary/25 blur-[90px]"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center px-6 py-14 text-center md:py-16">
          <p className="eyebrow">{"// next step"}</p>
          <h2 className="h-display mt-4 max-w-[18ch] text-[34px] md:text-[52px]">{title}</h2>
          {description && <p className="mx-auto mt-4 max-w-[46ch] text-muted">{description}</p>}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Magnetic>
              <Link href="/contact" className="btn-primary !h-12 !px-7">
                Start a conversation {ArrowIcon}
              </Link>
            </Magnetic>
            {email && (
              <a
                href="mailto:admin@behafiz.com"
                className="link-underline font-[family-name:var(--font-jetbrains)] text-sm text-accent"
              >
                admin@behafiz.com
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
