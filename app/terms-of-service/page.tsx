import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that govern use of muhammad-aman.com and services provided by Muhammad Aman — scope, payments, ownership, liability and governing law.",
  path: "/terms-of-service",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <p>
        By using this website or hiring me for a service, you agree to these
        terms. If you don&apos;t agree, please don&apos;t use the site.
      </p>
    ),
  },
  {
    id: "services",
    title: "Services & quotes",
    body: (
      <p>
        I provide software development, consulting and related services. The
        scope, deliverables, timeline and price of each engagement are set out
        in a separate written quote or agreement, which takes precedence over
        these terms where they differ.
      </p>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Payments are due as stated on the relevant invoice or quote, by the
        methods listed there (for example bank transfer or card payment through
        a third-party gateway). Please provide accurate billing details and
        raise any billing question promptly.
      </p>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <p>
        Refunds are handled under the{" "}
        <Link href="/refund-policy">Refund Policy</Link>. In short, payments for
        bespoke work are generally non-refundable, except for billing errors or
        where the law requires otherwise.
      </p>
    ),
  },
  {
    id: "ownership",
    title: "Ownership & your content",
    body: (
      <>
        <p>
          Unless an agreement says otherwise, ownership of the code and
          deliverables built for you transfers to you once the project is paid
          in full. I keep the right to reuse general know-how, tools and code
          that aren&apos;t specific to your project.
        </p>
        <p>
          You&apos;re responsible for the content you provide. You allow me to
          use it to deliver the service and, with your permission, to show the
          work in my portfolio.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent the law allows, I&apos;m not liable for indirect,
        incidental or consequential damages arising from use of the site or
        services. My total liability for direct damages is limited to the fees
        you paid for the service concerned.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        I may suspend or end access to the site for a breach of these terms or
        for any other lawful reason, with notice where the law requires.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law & disputes",
    body: (
      <p>
        These terms are governed by the laws of Pakistan. Both sides agree to
        try to resolve any dispute through good-faith discussion first.
        Mandatory consumer-protection laws where you live still apply.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        I may update these terms; changes take effect when posted here.
        Continuing to use the site after a change means you accept it.
        Questions: {mail}.
      </p>
    ),
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      highlight={["Service"]}
      updated="October 22, 2026"
      summary={
        <p>
          These terms cover your use of{" "}
          <strong className="text-fg">
            {site.url.replace("https://", "")}
          </strong>{" "}
          and any services provided by {site.name}. Project specifics always
          live in a separate quote or agreement.
        </p>
      }
      sections={sections}
    />
  );
}
