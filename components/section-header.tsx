import Reveal from "./reveal";

/** Spec §3.3 — mono eyebrow, H2, optional one-line description. */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="eyebrow">{`// ${eyebrow}`}</p>
      <h2 className="mt-3 font-[family-name:var(--font-space)] text-[28px] font-semibold leading-[1.15] md:text-[32px]">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-[60ch] text-muted">{description}</p>}
    </Reveal>
  );
}
