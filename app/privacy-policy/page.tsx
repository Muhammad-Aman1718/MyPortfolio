import LegalPage, { type LegalSection } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How muhammad-aman.com collects, uses and protects personal information — minimal collection, no selling of data, and your rights.",
  path: "/privacy-policy",
});

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>Information you give me.</strong> When you send a message, request a quote or hire me, you may share your
          name, email address, phone number, company, project details and, for paid work, billing information.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, the server and any analytics tools may
          record technical data such as your IP address, browser type, device and the pages you visit. This is used in
          aggregate to understand how the site is used.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How I use information",
    body: (
      <ul>
        <li>Reply to your enquiries, proposals and service requests.</li>
        <li>Deliver, invoice and support the work you hire me for.</li>
        <li>Send transactional messages such as confirmations and project updates.</li>
        <li>Understand site usage so I can improve performance, design and content.</li>
        <li>Meet legal obligations and protect my rights.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Sharing & third parties",
    body: (
      <>
        <p>I don&apos;t sell or rent personal information.</p>
        <p>
          Some trusted providers process data on my behalf — for example hosting, email, analytics and payment
          processors. They may only use it to provide their service to me. I may also disclose information when the law
          requires it, or to protect the rights, property or safety of others.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & tracking",
    body: (
      <p>
        The site may use cookies and similar technologies for core functionality, remembering preferences and analytics.
        You can block or delete cookies in your browser settings; the site will still work. Third-party analytics
        providers have their own privacy policies and opt-out options.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The site is served over HTTPS, and access to any data I hold is restricted. No method of transmission or storage
        is completely secure, so while I take reasonable care I can&apos;t guarantee absolute security.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long I keep data",
    body: (
      <p>
        Enquiries are kept only as long as needed to respond and follow up. Project and billing records are kept for as
        long as the law requires for accounting and tax purposes, then deleted.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask to access, correct or delete the personal information I hold about you, or object to how it is
          used. Email {mail} and I&apos;ll respond within 30 days.
        </p>
        <p>Depending on where you live, you may also have the right to complain to your local data-protection authority.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>I may update this policy from time to time. The date at the top of the page shows the latest revision.</p>,
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      highlight={["Policy"]}
      updated="October 22, 2026"
      summary={
        <p>
          This policy explains how <strong className="text-fg">{site.url.replace("https://", "")}</strong>, run by {site.name},
          handles personal information. In short: I only collect what&apos;s needed to answer you or do the work you ask
          for, and I never sell it.
        </p>
      }
      sections={sections}
    />
  );
}
