"use client";

import { Button } from "@/components/ui/Button";
import { budgetOptions, projectTypeOptions, timelineOptions } from "@/data/site";
import { EMAIL, FORMSPREE_ENDPOINT, getInquiryMailto } from "@/lib/config";
import { tween } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const steps = ["Project type", "Budget", "Timeline", "Details"] as const;
const SUCCESS_MESSAGE = "Thanks! I'll reply within 24 hours.";
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

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
  const [fallbackMailto, setFallbackMailto] = useState(`mailto:${EMAIL}`);

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
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("_gotcha") ?? "").trim();
    const projectTypeLabel = optionLabel(projectTypeOptions, projectType);
    const budgetLabel = optionLabel(budgetOptions, budget);
    const timelineLabel = optionLabel(timelineOptions, timeline);
    const mailto = getInquiryMailto({
      projectType: projectTypeLabel,
      budget: budgetLabel,
      timeline: timelineLabel,
      name,
      email,
      message: details,
    });

    setFallbackMailto(mailto);
    setMessage("");

    if (honeypot) {
      setStatus("success");
      setMessage(SUCCESS_MESSAGE);
      form.reset();
      return;
    }

    if (!email || !EMAIL_PATTERN.test(email) || email.length > 120) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      if (mailto.startsWith(`mailto:${EMAIL}?`)) {
        const link = document.createElement("a");
        link.href = mailto;
        link.rel = "noopener";
        link.click();
      }
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: details,
          projectType: projectTypeLabel,
          budget: budgetLabel,
          timeline: timelineLabel,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        setMessage("Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(SUCCESS_MESSAGE);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
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
              maxLength={120}
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
        <label>
          Company website
          <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </label>
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

      {status === "error" ? (
        <p role="status" className="mt-4 text-sm text-red-400">
          {message}{" "}
          <a href={fallbackMailto} className="underline underline-offset-2 hover:text-foreground">
            Email me directly
          </a>
        </p>
      ) : null}
    </form>
  );
}
