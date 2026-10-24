import Initials from "@/components/ui/Initials";
import Reveal from "@/components/ui/Reveal";
import type { QuoteFigureProps } from "@/types/types";

/** One big client quote between sections. */
export default function FeaturedQuote({ testimonial }: QuoteFigureProps) {
  return (
    <section className="container-site section">
      <Reveal variant="blur" className="mx-auto max-w-230 text-center">
        <figure>
          <blockquote className="h-display text-[24px] font-bold sm:text-[30px] md:text-[40px]">
            <span className="text-primary">&ldquo;</span>
            {testimonial.quote}
            <span className="text-primary">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-8 inline-flex items-center gap-3">
            <Initials name={testimonial.name} className="h-11 w-11 text-sm" />
            <span className="text-left text-sm text-subtle">
              <span className="block font-medium text-fg">{testimonial.name}</span>
              {testimonial.role}
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
