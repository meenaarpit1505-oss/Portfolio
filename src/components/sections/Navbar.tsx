"use client";

import { AnimatedNavLinks } from "@/components/ui/AnimatedNavLinks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site } from "@/data/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md text-foreground"
            aria-label={`${site.name} home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-sm font-semibold">
              {site.monogram}
            </span>
            <span className="hidden text-sm font-semibold sm:block">{site.name}</span>
          </Link>

          <AnimatedNavLinks />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <MagneticButton href={site.calendlyUrl} external>
                Book a call
              </MagneticButton>
            </div>
            <button
              type="button"
              data-cursor="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <Container>
              <nav aria-label="Mobile" className="flex flex-col gap-1 py-4">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <MagneticButton href={site.calendlyUrl} external className="mt-2 w-full">
                  Book a call
                </MagneticButton>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
