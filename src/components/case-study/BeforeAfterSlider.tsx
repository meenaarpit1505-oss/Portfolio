"use client";

import Image from "next/image";
import { useId, useState } from "react";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative aspect-[16/10] select-none">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 1200px) 100vw, 960px"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 960px"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-accent"
          style={{ left: `${position}%` }}
        />
        <span className="absolute left-3 top-3 z-10 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[11px] text-muted">
          Before · Placeholder
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[11px] text-muted">
          After · Placeholder
        </span>
      </div>
      <label className="block border-t border-border px-4 py-3 text-sm text-muted" htmlFor={sliderId}>
        Compare before and after
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="mt-2 w-full accent-[var(--color-accent)]"
          aria-valuetext={`${position}% of the after image is visible`}
        />
      </label>
    </div>
  );
}
