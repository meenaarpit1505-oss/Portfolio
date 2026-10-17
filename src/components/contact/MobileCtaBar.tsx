"use client";

import { BookCallButton } from "@/components/contact/BookCallButton";
import { tween } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileCtaBar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
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

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : "100%" }}
      transition={reduceMotion ? { duration: 0 } : tween.slow}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-3 pt-3 backdrop-blur-md md:hidden ${
        visible ? "" : "pointer-events-none"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
      {...(!visible ? { inert: true } : {})}
    >
      <BookCallButton className="w-full">Email me</BookCallButton>
    </motion.div>
  );
}
