"use client";

import { EMAIL } from "@/lib/config";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {EMAIL}
      </a>
      <button
        type="button"
        data-cursor="button"
        onClick={() => void copy()}
        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted hover:border-border-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Copied!" : "Copy email"}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </p>
    </div>
  );
}
