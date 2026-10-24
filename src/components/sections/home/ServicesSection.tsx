import Link from "next/link";
import { COPY, CORE_TOOLS, SERVICES } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import TagList from "@/components/ui/TagList";
import ServicesStack from "@/components/services/ServicesStack";

/** Sticky intro and tools on the left; service cards stack on the right. */
export default function ServicesSection() {
  const { services } = COPY.home;

  return (
    <section className="container-site section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow={services.eyebrow}
              title={services.title}
              highlight={services.highlight}
              description={services.description}
              motion="fade"
            />
            <p className="eyebrow mt-10">{services.toolsLabel}</p>
            <TagList tags={CORE_TOOLS} className="mt-4 gap-2" />
            <Link href="/services" className="arrow-link mt-8 text-sm">
              {services.compare} <Icon name="arrowRight" />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ServicesStack services={SERVICES} />
        </div>
      </div>
    </section>
  );
}
