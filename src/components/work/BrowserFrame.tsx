"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import type { Project } from "@/data/projects";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";

export function BrowserFrame({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const { hovered, bind, enhance } = useHoverFocus<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { amount: 0.45, once: false });
  const frames = useMemo(
    () => [project.heroImage, ...project.gallery.slice(0, 2).map((item) => item.src)],
    [project],
  );
  const shouldScroll = Boolean((hovered || inView) && enhance && !reduceMotion);

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-card"
      {...bind}
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd93d]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6bcb77]" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-md border border-border bg-background px-3 py-1 text-xs text-muted">
          {project.liveDomain}
        </p>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-hover">
        <motion.div
          className="absolute inset-x-0 top-0"
          initial={false}
          animate={{ y: shouldScroll ? "-66.666%" : "0%" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: hovered ? 6 : 14, ease: "linear" }
          }
        >
          {frames.map((src, index) => (
            <div key={`${src}-${index}`} className="relative aspect-[16/10] w-full">
              <Image
                src={src}
                alt={index === 0 ? `${project.title} page preview` : `${project.title} section preview ${index + 1}`}
                fill
                sizes="(max-width: 1200px) 100vw, 960px"
                className="object-cover"
                priority={priority && index === 0}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
