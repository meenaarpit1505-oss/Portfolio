"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import { logoScale, tween } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

const invertLogos = new Set(["Next.js", "Vercel", "Framer", "Framer Motion", "Notion"]);

export function ToolLogo({ name, logo }: { name: string; logo: string }) {
  const { hovered, bind } = useHoverFocus<HTMLDivElement>();
  const tooltipId = `tool-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      tabIndex={0}
      aria-label={name}
      aria-describedby={tooltipId}
      data-cursor="button"
      className="group relative flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      {...bind}
    >
      <motion.div
        className="flex h-8 w-8 shrink-0 items-center justify-center"
        initial={false}
        animate={{ scale: hovered ? logoScale : 1 }}
        transition={tween.base}
      >
        <Image
          src={logo}
          alt=""
          width={32}
          height={32}
          className={`h-8 w-8 ${invertLogos.has(name) ? "logo-invert" : "logo-muted"}`}
          data-hot={hovered ? "true" : "false"}
        />
      </motion.div>
      <span className="text-sm font-medium">{name}</span>
      <motion.span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-card"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={tween.fast}
      >
        {name}
      </motion.span>
    </div>
  );
}
