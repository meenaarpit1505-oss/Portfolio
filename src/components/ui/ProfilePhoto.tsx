"use client";

import { site } from "@/data/site";
import { PROFILE_PHOTO } from "@/lib/config";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfilePhoto({
  width,
  height,
  sizes,
  priority = false,
  className = "",
}: {
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initialsSize = width >= 160 ? "text-4xl" : "text-[10px]";

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setFailed(false);
    };
    probe.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    probe.src = PROFILE_PHOTO;
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-surface font-display font-semibold leading-none tracking-tight text-foreground ${initialsSize} ${className}`}
        style={{ width, height, maxWidth: "100%", maxHeight: "100%" }}
        role="img"
        aria-label={`${site.name}, initials ${site.monogram}`}
      >
        {site.monogram}
      </div>
    );
  }

  return (
    <Image
      src={PROFILE_PHOTO}
      alt={site.about.photoAlt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`aspect-square object-cover ${className}`}
    />
  );
}
