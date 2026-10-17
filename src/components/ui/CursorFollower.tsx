"use client";

import { useMotionCaps } from "@/components/providers/MotionProvider";
import { cursorSpring, tween } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorMode = "default" | "view" | "button" | "hidden";

function readMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";
  if (target.closest("input, textarea, select, [contenteditable='true']")) {
    return "hidden";
  }
  const tagged = target.closest("[data-cursor]");
  const value = tagged?.getAttribute("data-cursor");
  if (value === "view" || value === "button") return value;
  return "default";
}

export function CursorFollower() {
  const { enhance } = useMotionCaps();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, cursorSpring);
  const springY = useSpring(y, cursorSpring);
  const [mode, setMode] = useState<CursorMode>("hidden");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enhance) {
      document.documentElement.removeAttribute("data-cursor-follower");
      setMode("hidden");
      return;
    }

    document.documentElement.setAttribute("data-cursor-follower", "on");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const next = readMode(event.target);
      setMode((current) => (current === next ? current : next));
    };

    const onLeave = () => setMode("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeAttribute("data-cursor-follower");
    };
  }, [enhance, x, y]);

  if (!mounted || !enhance) return null;

  const visible = mode !== "hidden";
  const scale = mode === "view" ? 1 : mode === "button" ? 8 / 72 : 12 / 72;
  const showLabel = mode === "view";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="relative h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={tween.fast}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-white bg-white/15"
          initial={false}
          animate={{ scale }}
          transition={tween.base}
        />
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-[11px] font-medium uppercase tracking-[0.14em] text-white"
          initial={false}
          animate={{ opacity: showLabel ? 1 : 0 }}
          transition={tween.fast}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
