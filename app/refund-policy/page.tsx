import LegalPage, { type LegalSection } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Refund Policy",
  description: "Refund policy for services purchased from Muhammad Aman via muhammad-aman.com — when refunds apply and how to request one.",
  path: "/refund-policy",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope",
    body: <p>This policy covers paid services, deposits and fees for project work, consulting and any digital goods sold directly by {site.name}.</p>,
  },
  {
    id: "no-refunds",
    title: "Payments are final",
    body: (
      <p>
        Because work starts as soon as a payment is made, payments for bespoke services and deposits are generally
        non-refundable. By purchasing a service you accept that the sale is final, unless one of the exceptions below
        applies.
      </p>
    ),
  },
  {
    id: "exceptions",
    title: "Exceptions",
    body: (
      <ul>
        <li>Duplicate charges or clear billing errors confirmed with the payment processor.</li>
        <li>Where a refund is required by the consumer-protection law that applies to you.</li>
        <li>A material breach of a written agreement on my side.</li>
      </ul>
    ),
  },
  {
    id: "how-to-request",
    title: "How to request a refund",
    body: (
      <ul>
        <li>Email {mail} with the subject &ldquo;Refund request&rdquo;.</li>
        <li>Include your invoice or order number, or other proof of payment, and the reason for the request.</li>
        <li>I&apos;ll acknowledge it within 7 working days and may ask for more information.</li>
        <li>Approved refunds go back to the original payment method where possible; your bank sets how long that takes.</li>
      </ul>
    ),
  },
  {
    id: "fees",
    title: "Payment processing fees",
    body: <p>Payments through third-party gateways are subject to their terms. Processing fees charged by those providers may not be recoverable when a refund is issued.</p>,
  },
  {
    id: "disputes",
    title: "Disputes",
    body: <p>If something goes wrong, please contact me first so we can try to sort it out directly. This policy is governed by the laws of Pakistan; mandatory local consumer-protection laws still apply.</p>,
  },
];

export default function RefundPolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      highlight={["Policy"]}
      updated="October 22, 2026"
      summary={
        <p>
          Bespoke work starts the moment it&apos;s paid for, so payments are generally final — with clear exceptions for
          billing mistakes and anything the law requires.
        </p>
      }
      sections={sections}
    />
  );
}
