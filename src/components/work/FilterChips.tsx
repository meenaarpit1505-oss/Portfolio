"use client";

import { projectFilters, type ProjectFilter } from "@/data/projects";
import { tween } from "@/lib/motion";
import { motion } from "framer-motion";

export function FilterChips({
  value,
  onChange,
}: {
  value: ProjectFilter;
  onChange: (next: ProjectFilter) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter projects by type"
      className="flex flex-wrap gap-2"
    >
      {projectFilters.map((chip) => {
        const selected = value === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            role="radio"
            aria-checked={selected}
            data-cursor="button"
            onClick={() => onChange(chip.id)}
            className={`relative rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              selected
                ? "border-accent text-on-accent"
                : "border-border text-muted hover:border-border-hover hover:text-foreground"
            }`}
          >
            {selected ? (
              <motion.span
                layoutId="work-filter"
                className="absolute inset-0 rounded-full bg-accent"
                transition={tween.base}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative z-10">{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
}
