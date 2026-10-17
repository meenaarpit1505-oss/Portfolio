"use client";

import { Button } from "@/components/ui/Button";
import { budgetOptions, projectTypeOptions, timelineOptions } from "@/data/site";
import { EMAIL } from "@/lib/config";
import { tween } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const steps = ["Project type", "Budget", "Timeline", "Details"] as const;

function ChipGroup({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (next: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              data-cursor="button"
              onClick={() => onChange(option.value)}
              className={`rounded-full border px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border text-muted hover:border-border-hover hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  function canContinue() {
    if (step === 0) return Boolean(projectType);
    if (step === 1) return Boolean(budget);
    if (step === 2) return Boolean(timeline);
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) {
      if (canContinue()) setStep((value) => value + 1);
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          budget,
          projectType,
          timeline,
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Something went wrong. Please email me directly.");
        return;
      }
      setStatus("success");
      setMessage(payload.message || "Thanks — I’ll reply within 24 hours.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`Network error. Please email ${EMAIL}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-border bg-surface p-8 text-center">
        <motion.svg
          viewBox="0 0 48 48"
          className="h-12 w-12 text-accent"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tween.slow}
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <motion.path
            d="M14 25.5 21 32.5 34 16.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
        <p className="mt-4 font-display text-2xl font-semibold">Message sent</p>
        <p className="mt-2 max-w-sm text-sm text-muted" role="status">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-surface p-6 shadow-card">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-3 flex gap-2" aria-hidden="true">
          {steps.map((label, index) => (
            <span
              key={label}
              className={`h-1 flex-1 rounded-full ${index <= step ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
        <ol className="sr-only">
          {steps.map((label, index) => (
            <li key={label} aria-current={index === step ? "step" : undefined}>
              {label}
            </li>
          ))}
        </ol>
      </div>

      {step === 0 ? (
        <ChipGroup
          legend="What are you looking for?"
          name="projectType"
          value={projectType}
          options={projectTypeOptions}
          onChange={setProjectType}
        />
      ) : null}

      {step === 1 ? (
        <ChipGroup
          legend="What’s the budget range?"
          name="budget"
          value={budget}
          options={budgetOptions}
          onChange={setBudget}
        />
      ) : null}

      {step === 2 ? (
        <ChipGroup
          legend="When do you want to launch?"
          name="timeline"
          value={timeline}
          options={timelineOptions}
          onChange={setTimeline}
        />
      ) : null}

      {step === 3 ? (
        <div className="grid grid-cols-1 gap-4">
          <label className="block text-sm font-medium">
            Name
            <input
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className={`${fieldClass} mt-2`}
            />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={`${fieldClass} mt-2`}
            />
          </label>
          <label className="block text-sm font-medium">
            Message
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              className={`${fieldClass} mt-2 resize-y`}
            />
          </label>
        </div>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            data-cursor="button"
            className="text-sm text-muted hover:text-foreground"
            onClick={() => setStep((value) => value - 1)}
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <Button
          type="submit"
          disabled={status === "loading" || (step < 3 && !canContinue())}
          className="min-w-28"
        >
          {step < 3 ? "Continue" : status === "loading" ? "Sending…" : "Send message"}
        </Button>
      </div>

      {message && status === "error" ? (
        <p role="status" className="mt-4 text-sm text-red-400">
          {message}
        </p>
      ) : null}
    </form>
  );
}
