import { Suspense } from "react";
import SectionHeader from "@/components/section-header";
import PageHero from "@/components/page-hero";
import FaqList from "@/components/faq-list";
import { ContactForm } from "@/components/contact-parts";
import { ArrowUpRight } from "@/components/icons";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact Muhammad Aman about a web or mobile project — email contact@muhammad-aman.com or message on WhatsApp. Replies within 24 hours.",
  path: "/contact",
});

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const contactFaqs = [
  {
    q: "How long until I hear back?",
    a: "Usually within 24 hours on working days. For anything time-sensitive, WhatsApp is the fastest way to reach me.",
  },
  {
    q: "I haven't heard back yet — what should I do?",
    a: `Check your spam folder first, then send a short follow-up to ${site.email} or a WhatsApp message. Messages occasionally get lost; a nudge is always welcome.`,
  },
  {
    q: "What should I include in my message?",
    a: "What you're building, who it's for, your timeline, and anything already in place (designs, an existing codebase, an API). A rough budget range helps me suggest the right scope.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: `Yes. I'm based in ${site.location.city} (${site.location.timezone}) and work with clients remotely, overlapping with European and Middle-East hours.`,
  },
];

export default function Contact() {
  const channels = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "Replies within 24h",
    },
    {
      label: "WhatsApp",
      value: site.whatsapp.display,
      href: site.whatsapp.href,
      note: "Fastest for quick questions",
      external: true,
    },
    ...site.socials.map((s) => ({
      label: s.label,
      value: s.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href: s.href,
      note:
        s.label === "LinkedIn" ? "Career & updates" : "Code & side projects",
      external: true,
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project."
        highlight={["your", "project."]}
        description="Tell me what you're building — the honest version, including the messy parts. That's usually where the interesting work is."
      />

      <div className="container-site grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-5">
          {channels.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-enter="left"
              style={d(150 + i * 90)}
              className={`group flex items-center justify-between gap-4 rounded-3xl p-6 transition-colors duration-200 ${
                i === 0
                  ? "bg-primary text-on-primary hover:bg-(--primary-hover)"
                  : "bg-surface hover:bg-surface-hi"
              }`}
            >
              <span className="min-w-0">
                <span
                  className={`block text-sm ${i === 0 ? "text-white" : "text-subtle"}`}
                >
                  {c.label}
                </span>
                <span className="mt-1 block truncate font-(family-name:--font-space) text-xl font-bold">
                  {c.value}
                </span>
                <span
                  className={`mt-1 block text-sm ${i === 0 ? "text-white" : "text-muted"}`}
                >
                  {c.note}
                </span>
              </span>
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
                  i === 0 ? "bg-black/20" : "bg-surface-hi"
                }`}
              >
                <ArrowUpRight />
              </span>
            </a>
          ))}
          <p
            data-enter="left"
            style={d(500)}
            className="rounded-3xl bg-surface p-6 text-sm text-muted"
          >
            Based in {site.location.city}, {site.location.country} (
            {site.location.timezone}) — working with clients remotely.
          </p>
        </div>

        <div data-enter="card" style={d(300)} className="lg:col-span-7">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      <section className="container-site section">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="FAQ"
                title="Common questions."
                highlight={["questions."]}
                motion="fade"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList items={contactFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
