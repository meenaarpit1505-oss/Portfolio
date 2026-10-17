"use client";

import { ConceptBadge } from "@/components/ui/ConceptBadge";
import { useHoverFocus } from "@/hooks/useHoverFocus";
import { cardLift, imageZoom, tween } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function WorkCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const { hovered, bind } = useHoverFocus<HTMLElement>();

  return (
    <motion.div
      className="h-full"
      initial={false}
      animate={{ y: hovered ? cardLift : 0 }}
      transition={tween.slow}
      onPointerEnter={bind.onPointerEnter}
      onPointerLeave={bind.onPointerLeave}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="group relative block h-full rounded-xl border border-border bg-surface shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onFocus={bind.onFocus}
        onBlur={bind.onBlur}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-accent transition-opacity duration-200 ease-out"
          style={{ opacity: hovered ? 0.55 : 0 }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-xl shadow-lift transition-opacity duration-200 ease-out"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-surface-hover">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: hovered ? imageZoom : 1 }}
            transition={tween.slow}
          >
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
          <motion.p
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-6 pb-4 pt-10 text-sm font-medium text-white"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={tween.base}
          >
            View case study →
          </motion.p>
        </div>

        <div className="relative z-10 flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              {project.category}
            </p>
            {project.concept ? <ConceptBadge /> : null}
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted">{project.result}</p>
          {project.metrics ? <p className="text-sm text-muted">{project.metrics}</p> : null}
          <ul className="mt-1 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}
