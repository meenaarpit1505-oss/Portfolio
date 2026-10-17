"use client";

import { useHoverFocus } from "@/hooks/useHoverFocus";
import { arrowNudge, magneticOffset, magneticSpring, tween } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, type PointerEvent, type ReactNode } from "react";

const MotionLink = motion.create(Link);

const variants = {
  primary: "bg-accent text-on-accent",
  secondary: "border border-border bg-transparent text-foreground",
} as const;

const shared =
  "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-lg px-5 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function MagneticButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
}) {
  const { hovered, enhance, bind } = useHoverFocus<HTMLAnchorElement>();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, magneticSpring);
  const springY = useSpring(y, magneticSpring);
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const fillClass =
    variant === "primary" ? "bg-accent-strong" : "bg-accent";
  const labelClass =
    variant === "secondary" && hovered ? "text-on-accent" : "";

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      bind.onPointerEnter(event);
      if (!enhance) return;
      const node = event.currentTarget;
      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const nextX = (offsetX / (rect.width / 2)) * magneticOffset;
      const nextY = (offsetY / (rect.height / 2)) * magneticOffset;
      x.set(Math.max(-magneticOffset, Math.min(magneticOffset, nextX)));
      y.set(Math.max(-magneticOffset, Math.min(magneticOffset, nextY)));
    },
    [bind, enhance, x, y],
  );

  const onPointerLeave = useCallback(() => {
    bind.onPointerLeave();
    reset();
  }, [bind, reset]);

  const classNames = `${shared} ${variants[variant]} ${className}`;
  const content = (
    <>
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 origin-left ${fillClass}`}
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={tween.base}
        style={{ originX: 0, originY: 0.5 }}
      />
      <span className={`relative z-10 inline-flex items-center gap-2 ${labelClass}`}>
        {children}
        <motion.span
          aria-hidden="true"
          className="inline-flex"
          initial={false}
          animate={{ x: hovered ? arrowNudge : 0 }}
          transition={tween.fast}
        >
          <Arrow className="h-4 w-4" />
        </motion.span>
      </span>
    </>
  );

  const motionStyle = enhance ? { x: springX, y: springY } : undefined;
  const pointerProps = {
    ...bind,
    onPointerMove,
    onPointerLeave,
    onBlur: () => {
      bind.onBlur();
      reset();
    },
  };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="button"
        className={classNames}
        style={motionStyle}
        {...pointerProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} data-cursor="button" className={classNames} style={motionStyle} {...pointerProps}>
      {content}
    </MotionLink>
  );
}
