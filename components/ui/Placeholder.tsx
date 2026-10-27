/**
 * Marks content the client still has to supply. Renders only in development,
 * so nothing placeholder-like can reach the production site.
 */
export function Placeholder({ label }: { label: string }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-coral/60 px-2.5 py-1 font-mono text-xs text-coral">
      Client to confirm: {label}
    </span>
  );
}
