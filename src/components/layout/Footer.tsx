import Link from "next/link";
import { COPY, LEGAL_LINKS, NAV_LINKS, SITE } from "@/constants/constant";
import { elsewhereLinks } from "@/utils/contact";
import Icon from "@/components/ui/Icon";
import RotatingWord from "@/components/ui/RotatingWord";

/** Closing statement with a rotating crimson verb, contact details and site links. */
export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-background pb-4 pt-20 md:pt-28"
    >
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <h2 className="h-display text-[44px] font-bold sm:text-[60px] md:col-span-8 lg:text-[76px]">
            {COPY.footer.lead} <RotatingWord words={COPY.footer.words} />
            <br />
            {COPY.footer.tail}
          </h2>

          <div className="flex flex-col gap-6 md:col-span-4">
            <div>
              <p className="eyebrow">{COPY.footer.emailLabel}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline mt-2 inline-block break-all text-lg font-medium md:text-xl"
              >
                {SITE.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">
                {COPY.footer.cta}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl bg-surface p-7 sm:grid-cols-3 md:p-9">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow">{COPY.footer.pages}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline footer-link justify-self-start"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">{COPY.footer.elsewhere}</p>
            {elsewhereLinks().map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="link-underline footer-link inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}{" "}
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            ))}
            <p className="mt-2 text-sm text-subtle">
              {SITE.location.city}, {SITE.location.country}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">{COPY.footer.legal}</p>
            {LEGAL_LINKS.map((link) =>
              // The XML sitemap is a file, not a page — skip the client router
              link.href.endsWith(".xml") ? (
                <a key={link.href} href={link.href} className="link-underline footer-link">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="link-underline footer-link">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {SITE.name}. {COPY.footer.rights}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1 text-xs text-subtle transition-colors duration-150 hover:text-fg"
          >
            {COPY.footer.backToTop}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
