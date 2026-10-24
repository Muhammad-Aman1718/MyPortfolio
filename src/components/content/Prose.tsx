import Reveal from "@/components/ui/Reveal";
import SectionDivider from "@/components/ui/SectionDivider";
import ProseBlock from "./ProseBlock";
import type { ProseProps } from "@/types/types";

/** Renders content sections; each heading rises in as it scrolls into view. */
export default function Prose({ sections, numbered = false }: ProseProps) {
  return (
    <div className="flex flex-col gap-12">
      {sections.map((section, i) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          {i > 0 && <SectionDivider />}
          <Reveal variant="fade-up" start="top 90%">
            <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight md:text-[28px]">
              {numbered && <span className="font-mono text-sm text-accent">{i + 1}</span>}
              {section.title}
            </h2>
          </Reveal>
          <div className="mt-5 flex flex-col gap-5 text-[17px]">
            {section.blocks.map((block, j) => (
              <ProseBlock key={j} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
