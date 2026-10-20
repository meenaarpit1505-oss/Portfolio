"use client";

import { useState } from "react";
import { ArrowRight, Check, Clock3, LockKeyhole, Sparkles } from "lucide-react";

const checklist = [
  "Figma Designs Finalized",
  "Copy & Messaging Drafted",
  "Domain & Hosting Access Ready",
  "Brand Guidelines Defined",
];

export function NeonPortfolio() {
  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));
  const progress = checked.filter(Boolean).length * 25;
  const complete = progress === 100;

  function toggleCheck(index: number) {
    setChecked((current) => current.map((value, item) => (item === index ? !value : value)));
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#000000] px-5 py-16 text-zinc-100 sm:px-8 sm:py-24 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(0,210,255,.13),transparent_30%),radial-gradient(circle_at_14%_70%,rgba(255,0,127,.10),transparent_28%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-60" />

      <section aria-labelledby="readiness-title" className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
          <span className="size-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_16px_#00d2ff]" />
          Client pre-flight / 01
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <header>
            <div className="mb-5 flex items-center gap-2 text-sm text-zinc-500">
              <Clock3 className="size-4 text-cyan-300" aria-hidden="true" />
              <span>Estimated launch:</span>
              <strong className="font-medium text-zinc-200">Nov 7</strong>
            </div>
            <h1 id="readiness-title" className="max-w-xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-7xl">
              Project <span className="bg-gradient-to-r from-[#00d2ff] via-cyan-100 to-[#ff007f] bg-clip-text text-transparent">Readiness Hub.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-zinc-500 sm:text-lg">
              Four simple checks remove the drag between a confident brief and a live, high-performing launch.
            </p>
          </header>

          <div className="rounded-[2rem] border border-zinc-800/80 bg-zinc-950/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_28px_90px_rgba(0,0,0,.38)] backdrop-blur-lg sm:p-8">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-zinc-500">Launch readiness</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-6xl font-semibold tracking-[-0.08em] text-white transition-all duration-300 ease-out" aria-live="polite">{progress}%</span>
                  <span className="text-sm text-zinc-600">complete</span>
                </div>
              </div>
              <div className={`grid size-16 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out ${complete ? "border-pink-400 bg-pink-500/15 text-pink-300 shadow-[0_0_38px_rgba(255,0,127,.45)]" : "border-zinc-800 bg-black/40 text-zinc-600"}`}>
                {complete ? <Sparkles className="size-6" aria-hidden="true" /> : <LockKeyhole className="size-5" aria-hidden="true" />}
              </div>
            </div>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-zinc-900" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Launch readiness">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00d2ff] to-[#ff007f] shadow-[0_0_22px_rgba(0,210,255,.65)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <fieldset className="mt-8 flex flex-col gap-3">
              <legend className="sr-only">Project readiness checklist</legend>
              {checklist.map((item, index) => {
                const active = checked[index];
                return (
                  <label key={item} className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ease-out ${active ? "border-cyan-300/40 bg-cyan-300/[0.06] shadow-[inset_0_0_24px_rgba(0,210,255,.04)]" : "border-zinc-800/70 bg-black/20 hover:-translate-y-0.5 hover:border-zinc-700"}`}>
                    <input type="checkbox" checked={active} onChange={() => toggleCheck(index)} className="sr-only" />
                    <span aria-hidden="true" className={`grid size-5 shrink-0 place-items-center rounded-md border transition-all duration-300 ease-out ${active ? "border-cyan-300 bg-[#00d2ff] text-black shadow-[0_0_16px_rgba(0,210,255,.55)]" : "border-zinc-700 bg-zinc-950 group-hover:border-cyan-300/60"}`}>
                      {active && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    <span className={`text-sm transition-colors duration-300 ease-out sm:text-base ${active ? "text-white" : "text-zinc-400"}`}>{item}</span>
                    <span className={`ml-auto text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ease-out ${active ? "text-cyan-300 opacity-100" : "text-zinc-700 opacity-0 group-hover:opacity-100"}`}>{active ? "Ready" : "Check"}</span>
                  </label>
                );
              })}
            </fieldset>

            <div className={`grid transition-all duration-300 ease-out ${complete ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff007f] to-[#ff3b9d] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(255,0,127,.42)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(255,0,127,.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300">
                  Launch Sprint Securely <ArrowRight className="size-4" aria-hidden="true" />
                </button>
                <p className="mt-3 text-center text-xs text-zinc-600">All systems green. Your launch window is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
