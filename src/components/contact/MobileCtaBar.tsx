"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/data/site";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");

    const update = () => {
      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < 80
        : window.scrollY > 360;
      const contactInView = contact
        ? contact.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      setVisible(pastHero && !contactInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-md md:hidden">
      <MagneticButton href={site.calendlyUrl} external className="w-full">
        Book a call
      </MagneticButton>
    </div>
  );
}
