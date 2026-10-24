import { Suspense } from "react";
import { CONTACT_FAQS, COPY, PAGE_META } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import { contactChannels } from "@/utils/contact";
import { enter } from "@/utils/style";
import FaqSplit from "@/components/ui/FaqSplit";
import PageHero from "@/components/ui/PageHero";
import ChannelCard from "@/components/contact/ChannelCard";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = pageMeta(PAGE_META.contact);

export default function Contact() {
  const { hero, basedIn, faq } = COPY.contact;

  return (
    <>
      <PageHero {...hero} />

      <div className="container-site grid grid-cols-1 gap-6 pb-6 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-5">
          {contactChannels().map((channel, i) => (
            <ChannelCard key={channel.label} channel={channel} index={i} />
          ))}
          <p {...enter("left", 500)} className="rounded-3xl bg-surface p-6 text-sm text-muted">
            {basedIn}
          </p>
        </div>

        <div {...enter("card", 300)} className="lg:col-span-7">
          {/* The form reads ?service= to preselect the project type */}
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      <FaqSplit header={faq} items={CONTACT_FAQS} />
    </>
  );
}
