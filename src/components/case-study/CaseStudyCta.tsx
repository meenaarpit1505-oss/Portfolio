import { BookCallButton } from "@/components/contact/BookCallButton";

export function CaseStudyCta() {
  return (
    <aside className="rounded-xl border border-border bg-surface p-6 text-center sm:p-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Next</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Want a site like this? Email me.
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
        Tell me about the launch. I&rsquo;ll reply within 24 hours, IST, with a clear scope and timeline.
      </p>
      <div className="mt-6 flex justify-center">
        <BookCallButton>Email me</BookCallButton>
      </div>
    </aside>
  );
}
