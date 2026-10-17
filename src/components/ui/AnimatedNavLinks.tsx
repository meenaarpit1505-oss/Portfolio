"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import { site } from "@/data/site";
import { tween } from "@/lib/motion";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function NavItem({
  href,
  label,
  active,
  onActive,
}: {
  href: string;
  label: string;
  active: boolean;
  onActive: (href: string | null) => void;
}) {
  const { hovered, reducedMotion, bind } = useHoverFocus<HTMLSpanElement>();
  const show = active || hovered;

  return (
    <span
      className="relative"
      onPointerEnter={(event) => {
        bind.onPointerEnter(event);
        onActive(href);
      }}
      onPointerLeave={() => {
        bind.onPointerLeave();
        onActive(null);
      }}
    >
      <Link
        href={href}
        data-cursor="button"
        className="relative block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground focus-visible:text-foreground"
        onFocus={(event) => {
          bind.onFocus(event);
          if (event.currentTarget.matches(":focus-visible")) onActive(href);
        }}
        onBlur={() => {
          bind.onBlur();
          onActive(null);
        }}
      >
        {label}
        {show ? (
          <motion.span
            layoutId={reducedMotion ? undefined : "nav-underline"}
            className="absolute bottom-1 left-3 right-3 h-px origin-left bg-accent"
            initial={false}
            transition={tween.base}
            aria-hidden="true"
          />
        ) : null}
      </Link>
    </span>
  );
}

export function AnimatedNavLinks() {
  const pathname = usePathname();
  const [sectionHref, setSectionHref] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    if (pathname?.startsWith("/work")) {
      setSectionHref("/#work");
      return;
    }
    if (pathname !== "/") return;

    const nodes = site.nav
      .map((item) => document.querySelector(item.href.replace("/#", "#")))
      .filter((node): node is Element => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setSectionHref(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  const activeHref = hoveredHref ?? sectionHref;

  return (
    <LayoutGroup id="primary-nav">
      <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
        {site.nav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={activeHref === item.href}
            onActive={setHoveredHref}
          />
        ))}
      </nav>
    </LayoutGroup>
  );
}
