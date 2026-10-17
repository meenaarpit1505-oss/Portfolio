"use client";

import { BentoProjectCard } from "@/components/work/BentoProjectCard";
import { FeaturedProjectCard } from "@/components/work/FeaturedProjectCard";
import { FilterChips } from "@/components/work/FilterChips";
import { filterProjects, type ProjectFilter } from "@/data/projects";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";

export function BentoWorkGrid() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const items = useMemo(() => filterProjects(filter), [filter]);
  const featured = items.find((item) => item.featured) ?? items[0];
  const rest = items.filter((item) => item.slug !== featured?.slug);
  const showFeatured = Boolean(featured && (filter === "all" || items.length > 2));

  return (
    <div>
      <FilterChips value={filter} onChange={setFilter} />
      <LayoutGroup>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {showFeatured && featured ? (
              <FeaturedProjectCard key={`featured-${featured.slug}`} project={featured} />
            ) : null}
            {(showFeatured ? rest : items).map((project, index) => (
              <BentoProjectCard
                key={project.slug}
                project={project}
                priority={!showFeatured && index < 2}
              />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
      {items.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No projects in this category yet.</p>
      ) : null}
    </div>
  );
}
