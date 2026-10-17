"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    /* ignore */
  }
  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 320);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const active = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    setTheme(active);
    setMounted(true);
  }, []);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = isLight ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      data-cursor="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-border-hover hover:bg-surface"
    >
      {mounted && isLight ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
