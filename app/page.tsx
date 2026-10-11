import Link from "next/link";
import Reveal from "@/components/reveal";
import MaskReveal from "@/components/mask-reveal";
import CountUp from "@/components/count-up";
import SectionHeader from "@/components/section-header";
import CertificatesSection from "@/components/certificates-section";
import {
  stats,
  featuredProjects,
  skillsBento,
  experience,
  posts,
  testimonials,
} from "@/lib/data";

const ArrowIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  return (
    <div id="top">
      {/* ─── Hero ─── */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-[1200px] items-center overflow-hidden px-6 pt-16 lg:px-12">
        <div className="hero-glow left-[-10%] top-[10%] h-[420px] w-[420px]" />
        <div className="hero-glow bottom-[5%] right-[0%] h-[360px] w-[360px] [animation-delay:-7s]" />
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal stagger>
              <p className="eyebrow">{"// software engineer — mobile & web"}</p>
              <h1 className="mt-5 font-[family-name:var(--font-space)] text-[40px] font-semibold leading-[1.1] md:text-[64px] lg:text-[72px]">
                <MaskReveal text="I build products" delay={0.15} />
                <br />
                <MaskReveal text="people rely on." delay={0.3} />
              </h1>
              <p className="mt-6 max-w-[50ch] text-lg text-muted">
                Eight years shipping mobile and web software that survives real
                users. Not the cheapest — the one you call when it has to work.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/projects" className="btn-primary">
                  View projects
                </Link>
                <a href="/hafiz-resume.pdf" download className="btn-secondary">
                  Download resume
                </a>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.2}>
              <div className="card flex aspect-[4/5] items-center justify-center rounded-[24px] border-accent/30 p-8">
                <span className="font-[family-name:var(--font-space)] text-[120px] font-semibold text-primary">
                  H.
                </span>
              </div>
              <p className="mt-4 flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-primary" />
                Karachi, Pakistan — available for projects
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Trust stats — bento #1 ─── */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12">
        <Reveal stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`card p-6 ${s.large ? "col-span-2 row-span-2 flex flex-col justify-center p-10" : ""}`}
            >
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className={`font-[family-name:var(--font-space)] font-semibold text-primary ${
                  s.large ? "text-[64px] md:text-[80px]" : "text-[36px] md:text-[40px]"
                }`}
              />
              <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ─── Featured projects ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader
          eyebrow="projects"
          title="Selected work"
          description="Three projects that show how I think, build, and ship."
        />
        <div className="mt-12 flex flex-col gap-12">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.name}>
              <article
                className={`card flex flex-col overflow-hidden md:flex-row ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`relative min-h-[240px] flex-[55] overflow-hidden bg-gradient-to-br ${p.tone} to-transparent`}>
                  <div className="absolute inset-6 flex items-center justify-center rounded-[12px] border border-line bg-background/60">
                    <span className="px-4 text-center font-[family-name:var(--font-space)] text-3xl font-semibold text-muted/60">
                      {p.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-[45] flex-col justify-center gap-4 p-8 md:p-10">
                  <h3 className="font-[family-name:var(--font-space)] text-2xl font-semibold">
                    {p.name}
                  </h3>
                  <p className="text-muted">{p.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                  <Link href={p.href} className="arrow-link mt-2 text-sm">
                    Read case study {ArrowIcon}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link href="/projects" className="btn-secondary">All projects</Link>
        </Reveal>
      </section>

      {/* ─── Skills snapshot — bento #2 ─── */}
      <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-12">
        <SectionHeader
          eyebrow="skills"
          title="What I work with"
          description="Tools are chosen per problem, not per fashion."
        />
        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {skillsBento.map((s) => (
            <Link key={s.name} href="/skills" className={`card p-6 ${s.span}`}>
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
              <h3 className="mt-4 font-[family-name:var(--font-space)] text-lg font-medium">
                {s.name}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-[13px] leading-relaxed text-muted">
                {s.items.join(" · ")}
              </p>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ─── Experience strip ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="experience" title="Recent roles" />
        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {experience.map((e) => (
            <div key={e.company} className="card p-6">
              <p className="font-[family-name:var(--font-jetbrains)] text-[13px] text-muted">
                {e.years}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-space)] font-medium">{e.role}</h3>
              <p className="mt-1 text-sm text-muted">{e.company}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 text-right">
          <Link href="/experience" className="arrow-link text-sm">
            Full experience {ArrowIcon}
          </Link>
        </Reveal>
      </section>

      {/* ─── Certifications ─── */}
      <CertificatesSection />

      {/* ─── Latest articles ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="writing" title="Latest articles" />
        <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.title} href="/posts" className="card flex flex-col p-6">
              <span className="pill self-start">{p.category}</span>
              <h3 className="mt-4 font-[family-name:var(--font-space)] text-lg font-medium leading-snug">
                {p.title}
              </h3>
              <p className="mt-auto pt-4 font-[family-name:var(--font-jetbrains)] text-xs text-muted">
                {p.date} · {p.readingTime} read
              </p>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-12">
        <SectionHeader eyebrow="testimonials" title="What clients say" />
        <Reveal stagger className="mt-12 columns-1 gap-6 md:columns-2 [&>*]:mb-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`card break-inside-avoid p-8 ${t.featured ? "border-accent/60" : ""}`}
            >
              <blockquote className="text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-[family-name:var(--font-space)] text-sm text-accent">
                  {t.name[0]}
                </span>
                <span className="text-[13px] text-muted">
                  <span className="block text-fg">{t.name}</span>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* ─── CTA band ─── */}
      <section className="bg-secondary/40">
        <Reveal className="mx-auto max-w-[1200px] px-6 py-24 text-center lg:px-12">
          <h2 className="font-[family-name:var(--font-space)] text-[32px] font-semibold md:text-[48px]">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-muted">
            Tell me what you&apos;re building and I&apos;ll tell you honestly whether I&apos;m the right person for it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="btn-primary">Start a conversation</Link>
            <a
              href="mailto:admin@behafiz.com"
              className="font-[family-name:var(--font-jetbrains)] text-sm text-accent hover:underline"
            >
              admin@behafiz.com
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
