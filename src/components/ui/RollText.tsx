"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import { rollIn, rollOut, tween } from "@/lib/motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function RollText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <motion.span className="inline-block" variants={rollOut} transition={tween.roll}>
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 inline-flex items-center justify-center"
        variants={rollIn}
        transition={tween.roll}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HoverLink({
  href,
  children,
  className = "",
  external = false,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const { hovered, reducedMotion, bind } = useHoverFocus<HTMLAnchorElement>();

  return (
    <motion.a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-cursor="button"
      initial="rest"
      animate={reducedMotion ? "rest" : hovered ? "hover" : "rest"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...bind}
    >
      {children}
    </motion.a>
  );
}
