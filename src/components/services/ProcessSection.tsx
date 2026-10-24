import { COPY, SERVICE_STEPS } from "@/constants/constant";
import { pad2 } from "@/utils/format";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/** The four steps every project runs through. */
export default function ProcessSection() {
  const { process } = COPY.services;

  return (
    <section className="container-site section">
      <SectionHeader eyebrow={process.eyebrow} title={process.title} highlight={process.highlight} motion="fade" />
      <Reveal as="ol" variant="scale" stagger each={0.08} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_STEPS.map((step, i) => (
          <li key={step.title} className="flex min-h-50 flex-col justify-between rounded-3xl bg-surface p-6">
            <span className="font-display text-5xl font-bold leading-none tracking-tight text-primary">{pad2(i + 1)}</span>
            <span>
              <span className="block font-display text-xl font-bold">{step.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{step.text}</span>
            </span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
