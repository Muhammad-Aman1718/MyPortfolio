/** Divider between long-form sections: hairline, three quiet dots, hairline. */
export default function SectionDivider() {
  return (
    <div className="mb-12 flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="flex gap-1.5">
        {[0, 1, 2].map((n) => (
          <span key={n} className="h-1 w-1 rounded-full bg-subtle/60" />
        ))}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
