/**
 * Stylised product mock-up per project type — stands in for screenshots and
 * gives each card a real visual instead of its name in a box. Pure markup.
 */

const bars = [38, 62, 45, 80, 56, 92, 70, 84];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-surface-hi/60 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-fg/15" />
      <span className="h-2 w-2 rounded-full bg-fg/15" />
      <span className="h-2 w-2 rounded-full bg-primary/70" />
      <span className="ml-3 truncate rounded-full bg-fg/[0.06] px-3 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] text-muted">
        {label}
      </span>
    </div>
  );
}

function Phone({ name }: { name: string }) {
  return (
    <div className="flex aspect-[9/18] h-[82%] flex-col overflow-hidden rounded-[26px] bg-background p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-fg/15" />
      <div className="rounded-[14px] bg-primary p-3">
        <p className="font-[family-name:var(--font-space)] text-[11px] font-semibold leading-tight text-fg">{name}</p>
        <div className="mt-2 h-1 w-2/3 rounded-full bg-fg/30" />
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-[10px] bg-fg/[0.04] p-2">
            <span className={`h-5 w-5 shrink-0 rounded-md ${i === 0 ? "bg-primary" : "bg-fg/10"}`} />
            <span className="flex flex-1 flex-col gap-1">
              <span className="h-1 w-4/5 rounded-full bg-fg/20" />
              <span className="h-1 w-1/2 rounded-full bg-fg/10" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around pt-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-fg/20"}`} />
        ))}
      </div>
    </div>
  );
}

function Browser({ name }: { name: string }) {
  return (
    <div className="flex h-[78%] w-[86%] flex-col overflow-hidden rounded-[12px] bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <Chrome label={`${slug(name)}.app`} />
      <div className="flex flex-1 gap-3 p-3">
        <div className="hidden w-1/5 flex-col gap-1.5 sm:flex">
          <span className="h-1.5 w-3/4 rounded-full bg-primary" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1.5 rounded-full bg-fg/10" style={{ width: `${90 - i * 12}%` }} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-fg/[0.05] p-2">
                <span className="block h-1 w-1/2 rounded-full bg-fg/15" />
                <span className={`mt-1.5 block h-2 w-3/4 rounded-full ${i === 0 ? "bg-primary" : "bg-fg/25"}`} />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-md bg-fg/[0.03] p-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px] bg-fg/20 last:bg-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Terminal({ name }: { name: string }) {
  const lines = [
    { t: `$ ${slug(name)} --health`, c: "text-fg/80" },
    { t: "✓ api      200  12ms", c: "text-fg" },
    { t: "✓ db       ok   pool 18/40", c: "text-fg/60" },
    { t: "✓ queue    ok   0 lag", c: "text-fg/60" },
    { t: "→ 2,000,000 req/day", c: "text-fg/80" },
  ];
  return (
    <div className="flex h-[74%] w-[84%] flex-col overflow-hidden rounded-[12px] bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <Chrome label="zsh — prod" />
      <div className="flex flex-1 flex-col gap-1.5 p-4 font-[family-name:var(--font-jetbrains)] text-[11px] leading-tight">
        {lines.map((l) => (
          <p key={l.t} className={`truncate ${l.c}`}>{l.t}</p>
        ))}
        <span className="mt-1 h-3 w-1.5 animate-pulse bg-primary" />
      </div>
    </div>
  );
}

export default function ProjectPreview({
  name,
  type,
  className = "relative",
}: {
  name: string;
  type: string;
  /** Unused since the flat theme — previews sit on plain surface grey */
  tone?: string;
  /** Positioning/sizing is the caller's (e.g. "absolute inset-0" or "relative h-full") */
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-surface ${className}`}
    >
      <div
        aria-hidden="true"
        className="relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
      >
        {type === "Mobile" ? <Phone name={name} /> : type === "Backend" ? <Terminal name={name} /> : <Browser name={name} />}
      </div>
    </div>
  );
}
