import Link from "next/link";

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

const socials = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://x.com", label: "X" },
  { href: "mailto:admin@behafiz.com", label: "Email" },
];

const legal = [
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/sitemap", label: "Sitemap" },
];

const linkCls = "link-underline text-sm text-muted hover:text-fg";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-background">
      {/* Hairline glow on the top edge */}
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px max-w-[600px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" aria-hidden="true" />
      <div className="container-site grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-[family-name:var(--font-space)] text-xl font-semibold">
            H<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-[36ch] text-sm text-muted">
            Senior software engineer building mobile &amp; web products people rely on.
          </p>
          <p className="mt-5 flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-primary" />
            Available for projects
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="mb-3 font-[family-name:var(--font-jetbrains)] text-xs text-fg/70">Pages</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`${linkCls} justify-self-start`}>
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="grid grid-cols-2 gap-6 md:col-span-4">
          <div className="flex flex-col items-start gap-2">
            <p className="mb-1 font-[family-name:var(--font-jetbrains)] text-xs text-fg/70">Elsewhere</p>
            {socials.map((s) => (
              <a key={s.label} href={s.href} className={linkCls} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="mb-1 font-[family-name:var(--font-jetbrains)] text-xs text-fg/70">Legal</p>
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Hafiz. All rights reserved.</p>
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">Built with Next.js</p>
          <a href="#top" className="group inline-flex items-center gap-1 text-xs text-muted transition-colors duration-150 hover:text-accent">
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
