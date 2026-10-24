import { ABOUT_BEYOND, COPY } from "@/constants/constant";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

/** What I do outside client work. */
export default function BeyondSection() {
  const { beyond } = COPY.about;

  return (
    <section className="container-site section">
      <SectionHeader eyebrow={beyond.eyebrow} title={beyond.title} highlight={beyond.highlight} motion="blur" />
      <Reveal variant="scale" stagger className="mt-10 grid gap-3 sm:grid-cols-2">
        {ABOUT_BEYOND.map((card) => (
          <div key={card.title} className="card spotlight flex gap-5 p-6 md:p-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-hi text-fg">
              <Icon path={card.icon} className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span>
              <span className="block font-display text-lg font-bold">{card.title}</span>
              <span className="mt-1 block leading-relaxed text-muted">{card.text}</span>
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
