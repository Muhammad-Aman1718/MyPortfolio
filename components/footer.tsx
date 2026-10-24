import Link from "next/link";
import RotatingWord from "./rotating-word";
import { ArrowUpRight } from "./icons";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
  { href: "/contact", label: "Contact" },
];

const elsewhere = [
  ...site.socials,
  { label: "WhatsApp", href: site.whatsapp.href },
];

const linkCls = "link-underline text-sm text-muted hover:text-fg";

/** Closing statement with a rotating crimson verb, contact, links — and the name, poster-sized. */
export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-background pt-20 md:pt-28 pb-4"
    >
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <h2 className="h-display text-[44px] font-bold sm:text-[60px] md:col-span-8 lg:text-[76px]">
            Let&apos;s <RotatingWord words={["design", "build", "ship"]} />
            <br />
            an app people rely on.
          </h2>

          <div className="flex flex-col gap-6 md:col-span-4">
            <div>
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-2 inline-block break-all text-lg font-medium md:text-xl"
              >
                {site.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">
                Book a call
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl bg-surface p-7 sm:grid-cols-3 md:p-9">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow">Pages</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`${linkCls} justify-self-start`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">Elsewhere</p>
            {elsewhere.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`${linkCls} inline-flex items-center gap-1`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
            <p className="mt-2 text-sm text-subtle">
              {site.location.city}, {site.location.country}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow mb-1">Legal</p>
            {site.legal.map((l) =>
              // The XML sitemap is a file, not a page — skip the client router
              l.href.endsWith(".xml") ? (
                <a key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1 text-xs text-subtle transition-colors duration-150 hover:text-fg"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
