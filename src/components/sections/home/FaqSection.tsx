import { COPY, FAQS } from "@/constants/constant";
import FaqList from "@/components/ui/FaqList";
import SectionHeader from "@/components/ui/SectionHeader";
import BookingCard from "./BookingCard";

/** FAQ accordion beside the booking card. */
export default function FaqSection() {
  const { faq } = COPY.home;

  return (
    <section className="container-site section">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader eyebrow={faq.eyebrow} title={faq.title} highlight={faq.highlight} motion="fade" />
          <div className="mt-8">
            <FaqList items={FAQS} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <BookingCard />
        </div>
      </div>
    </section>
  );
}
