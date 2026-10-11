/** Remounts per route, so each navigation gets a short fade-in instead of a hard cut. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
