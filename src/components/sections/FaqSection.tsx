"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faq";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

export function FaqSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = faqs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") nextIndex = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") nextIndex = index === 0 ? last : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;

    if (nextIndex === null) return;
    event.preventDefault();
    buttonsRef.current[nextIndex]?.focus();
  }

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Questions that usually come up"
          />
        </Reveal>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    ref={(node) => {
                      buttonsRef.current[index] = node;
                    }}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    {item.question}
                    <Plus
                      className={`h-5 w-5 shrink-0 text-muted transition-transform motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
