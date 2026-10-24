import Link from "next/link";
import Reveal from "./reveal";
import { Magnetic } from "./pointer-fx";
import { ArrowIcon } from "./icons";
import { site } from "@/lib/site";

/** Closing call-to-action: a solid crimson panel that wipes open, with a magnetic button. */
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
      <Reveal
        variant="clip-up"
        className="relative overflow-hidden rounded-3xl bg-primary text-on-primary"
      >
        <div className="relative flex flex-col items-center px-6 py-14 text-center md:py-16">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-white">
            Next step
          </p>
          <h2 className="h-display mt-4 max-w-[18ch] text-[34px] font-bold md:text-[52px]">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-[46ch] text-white">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-7 font-medium text-fg transition-colors duration-200 hover:bg-surface"
              >
                Start a conversation {ArrowIcon}
              </Link>
            </Magnetic>
            {email && (
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-sm font-medium text-white"
              >
                {site.email}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
