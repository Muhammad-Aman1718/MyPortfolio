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

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-3 lg:px-12">
        <div>
          <p className="font-[family-name:var(--font-space)] text-xl font-semibold">
            H<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-[36ch] text-sm text-muted">
            Senior software engineer building mobile &amp; web products people rely on.
          </p>
          <div className="mt-5 flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-muted transition-colors duration-150 hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-2">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <Link href="/refund-policy" className="text-sm text-muted transition-colors duration-150 hover:text-accent">Refund Policy</Link>
          <Link href="/terms" className="text-sm text-muted transition-colors duration-150 hover:text-accent">Terms of Service</Link>
          <Link href="/privacy" className="text-sm text-muted transition-colors duration-150 hover:text-accent">Privacy Policy</Link>
          <Link href="/sitemap" className="text-sm text-muted transition-colors duration-150 hover:text-accent">Sitemap</Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-5 lg:px-12">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Hafiz. All rights reserved.</p>
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-muted">Built with Next.js</p>
          <a href="#top" className="text-xs text-muted transition-colors duration-150 hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
