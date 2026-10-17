"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "results", label: "Results" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "before-after", label: "Before / after" },
  { id: "gallery", label: "Gallery" },
  { id: "quote", label: "Quote" },
] as const;

export function CaseStudyToc() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 hidden lg:block"
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">On this page</p>
      <ol className="mt-4 space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block border-l-2 py-1 pl-3 text-sm transition-colors ${
                active === section.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
