export function ConceptBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex rounded-full border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted ${className}`}
    >
      Concept build
    </span>
  );
}
