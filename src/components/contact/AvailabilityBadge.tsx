import { site } from "@/data/site";

export function AvailabilityBadge() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="availability-ping absolute inset-0 rounded-full bg-emerald-400" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {site.availabilityWindow}
    </p>
  );
}
