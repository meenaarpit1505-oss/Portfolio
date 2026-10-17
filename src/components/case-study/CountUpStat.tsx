"use client";

import type { ProjectMetric } from "@/data/projects";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUpStat({ metric }: { metric: ProjectMetric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? metric.numeric : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(metric.numeric);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(metric.numeric * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, metric.numeric, reduceMotion]);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-surface p-5">
      <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {metric.prefix ?? ""}
        {value}
        {metric.suffix ?? ""}
      </p>
      <p className="mt-1 text-sm text-muted">{metric.label}</p>
      {metric.placeholder ? (
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">Placeholder</p>
      ) : null}
    </div>
  );
}
