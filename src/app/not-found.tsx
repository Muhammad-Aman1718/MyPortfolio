import type { Metadata } from "next";
import Link from "next/link";
import { COPY, NOT_FOUND_ROUTES } from "@/constants/constant";
import { enter } from "@/utils/style";
import Icon from "@/components/ui/Icon";
import RouteCardLink from "@/components/sections/notFound/RouteCardLink";

export const metadata: Metadata = { title: COPY.notFound.metaTitle };

/** 404 — poster-sized numerals (the 0 in crimson), one clear way home, and the likely destinations. */
export default function NotFound() {
  const { notFound } = COPY;

  return (
    <div className="container-site page-top flex min-h-[100svh] flex-col pb-10">
      <p {...enter("rise")} className="eyebrow">
        {notFound.eyebrow}
      </p>

      <div className="flex flex-1 flex-col justify-center py-8">
        <p
          aria-hidden="true"
          className="h-mega -ml-[0.05em] select-none text-[42vw] leading-[0.78] md:text-[min(30vw,22rem)]"
        >
          <span {...enter("blur", 100)} className="inline-block">
            4
          </span>
          <span {...enter("blur", 220)} className="inline-block text-primary">
            0
          </span>
          <span {...enter("blur", 340)} className="inline-block">
            4
          </span>
        </p>
        <h1 {...enter("rise", 450)} className="h-display mt-8 max-w-[18ch] text-[36px] font-bold md:text-[52px]">
          {notFound.titleLead} <em>{notFound.titleAccent}</em>
        </h1>
        <p {...enter("rise", 550)} className="mt-4 max-w-[48ch] text-lg text-muted">
          {notFound.text}
        </p>
        <div {...enter("pop", 650)} className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            {notFound.home} <Icon name="arrowRight" />
          </Link>
          <Link href="/contact" className="btn-secondary">
            {notFound.report}
          </Link>
        </div>
      </div>

      <nav aria-label={notFound.popular} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {NOT_FOUND_ROUTES.map((route, i) => (
          <RouteCardLink key={route.href} route={route} delay={750 + i * 70} />
        ))}
      </nav>
    </div>
  );
}
