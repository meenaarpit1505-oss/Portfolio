"use client";

import { BrowserFrame } from "@/components/work/BrowserFrame";
import { VisitLiveButton } from "@/components/work/VisitLiveButton";
import { tween } from "@/lib/motion";
import type { Project } from "@/data/projects";
import { motion } from "framer-motion";
import Link from "next/link";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      className="md:col-span-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={tween.slow}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-card sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                {project.category}
              </p>
              {project.placeholder ? (
                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
                  Placeholder
                </span>
              ) : null}
            </div>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              <Link
                href={`/work/${project.slug}`}
                className="rounded-md hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted">{project.result}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
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
          {project.liveUrl ? <VisitLiveButton href={project.liveUrl} /> : null}
        </div>
        <Link href={`/work/${project.slug}`} data-cursor="view" aria-label={`${project.title} case study`}>
          <BrowserFrame project={project} priority />
        </Link>
      </div>
    </motion.article>
  );
}
