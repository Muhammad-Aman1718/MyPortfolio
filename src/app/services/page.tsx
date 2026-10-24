import { COPY, FAQS, PAGE_META, SERVICES } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import { serviceList } from "@/lib/structuredData";
import CtaPanel from "@/components/ui/CtaPanel";
import FaqSplit from "@/components/ui/FaqSplit";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProcessSection from "@/components/services/ProcessSection";
import ServiceCard from "@/components/services/ServiceCard";

export const metadata = pageMeta(PAGE_META.services);

export default function Services() {
  const { hero, faq } = COPY.services;

  return (
    <>
      <JsonLd data={serviceList()} />

      <PageHero {...hero} />

      <div className="container-site pb-6">
        <Reveal variant="fade-up" stagger each={0.08} start="top 95%" className="grid gap-4 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </Reveal>
      </div>

      <ProcessSection />

      <FaqSplit header={faq} items={FAQS} />

      <CtaPanel email={false} />
    </>
  );
}
