"use client";

import { brandLogos, site } from "@/data/site";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

export function LogoMarquee() {
  const reduceMotion = useReducedMotion();
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section
      aria-label="Social proof"
      className="border-y border-border py-8"
    >
      <p className="px-4 text-center text-sm text-muted">{site.socialProofLine}</p>
      <div className="relative mt-6 overflow-hidden">
        <ul
          className={`flex w-max items-center gap-12 px-8 ${
            reduceMotion ? "" : "marquee-track"
          }`}
        >
          {loop.map((brand, index) => (
            <li key={`${brand.name}-${index}`} className="shrink-0">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={160}
                height={48}
                className="h-8 w-auto opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
