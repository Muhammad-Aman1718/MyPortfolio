import { COPY, UI } from "@/constants/constant";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "./TestimonialCard";
import type { TestimonialsSectionProps } from "@/types/types";

/** Client quotes in a seamless loop, kept to the content width. */
export default function TestimonialsSection({ loop }: TestimonialsSectionProps) {
  const { testimonials } = COPY.home;

  return (
    <section className="container-site section">
      <SectionHeader eyebrow={testimonials.eyebrow} title={testimonials.title} highlight={testimonials.highlight} />
      <div className="marquee mt-10 overflow-hidden" role="region" aria-label={testimonials.label}>
        {/* Twice the cards per half → a slower loop keeps the reading speed the same */}
        <div className="marquee-track" style={{ animationDuration: UI.testimonialLoop }}>
          {[false, true].map((hidden) => (
            <ul key={String(hidden)} aria-hidden={hidden || undefined} className="flex shrink-0 items-stretch gap-4 pr-4">
              {loop.map((testimonial, i) => (
                <TestimonialCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
