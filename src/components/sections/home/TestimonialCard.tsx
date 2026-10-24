import Icon from "@/components/ui/Icon";
import Initials from "@/components/ui/Initials";
import type { TestimonialCardProps } from "@/types/types";

/** Quote card in the testimonials strip. */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <li className="flex w-72.5 flex-col justify-between gap-6 rounded-[20px] bg-surface p-6 sm:w-85">
      <div>
        <Icon name="quote" className="h-6 w-6 text-primary" />
        <blockquote className="mt-4 text-[15px] leading-relaxed text-fg">{testimonial.quote}</blockquote>
      </div>
      <p className="flex items-center gap-3 border-t border-line pt-4">
        <Initials name={testimonial.name} className="h-10 w-10 text-xs" />
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-semibold">{testimonial.name}</span>
          <span className="block truncate text-xs text-subtle">{testimonial.role}</span>
        </span>
      </p>
    </li>
  );
}
