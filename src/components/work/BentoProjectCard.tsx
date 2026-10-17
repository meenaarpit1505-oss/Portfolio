"use client";

import { ProjectMedia } from "@/components/work/ProjectMedia";
import { useHoverFocus } from "@/hooks/useHoverFocus";
import { cardLift, imageZoom, tween } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";
import Link from "next/link";

export function BentoProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  const { hovered, bind } = useHoverFocus<HTMLElement>();

  return (
    <motion.article
      layout
      className={`h-full ${featured ? "md:col-span-2" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: hovered ? cardLift : 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={tween.slow}
      onPointerEnter={bind.onPointerEnter}
      onPointerLeave={bind.onPointerLeave}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onFocus={bind.onFocus}
        onBlur={bind.onBlur}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-accent"
          style={{ opacity: hovered ? 0.55 : 0 }}
        />
        <div
          className={`relative overflow-hidden bg-surface-hover ${
            featured ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[16/10]"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: hovered ? imageZoom : 1 }}
            transition={tween.slow}
          >
            <ProjectMedia
              src={project.cover}
              alt={`${project.title} cover`}
              videoSrc={project.previewVideo}
              priority={priority}
              sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 560px"}
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
        <div className={`relative z-10 flex flex-1 flex-col gap-3 ${featured ? "p-6 sm:p-8" : "p-5"}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              {project.category}
            </p>
            {project.placeholder ? (
              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                Placeholder
              </span>
            ) : null}
          </div>
          <h3
            className={`font-display font-semibold tracking-tight ${
              featured ? "text-3xl" : "text-2xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="text-sm text-muted">{project.result}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-1">
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
    </motion.article>
  );
}
