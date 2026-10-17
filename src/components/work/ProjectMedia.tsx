"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ProjectMedia({
  src,
  alt,
  videoSrc,
  priority = false,
  sizes,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  videoSrc?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !videoSrc) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [videoSrc]);

  if (!videoSrc) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`h-full w-full ${className}`}
      poster={src}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
