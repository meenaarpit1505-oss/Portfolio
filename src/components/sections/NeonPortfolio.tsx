"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

const checklist = [
  "Figma Designs Finalized",
  "Copy & Messaging Drafted",
  "Domain & Hosting Access Ready",
  "Brand Guidelines Defined",
];

const projects = [
  { title: "Northstar / Launch system", type: "Framer · Strategy", accent: "from-cyan-400/30 to-transparent", size: "md:col-span-7" },
  { title: "Lumen / Editorial commerce", type: "Web design · CMS", accent: "from-pink-500/30 to-transparent", size: "md:col-span-5" },
  { title: "Fieldnotes / Creator platform", type: "Product direction", accent: "from-cyan-400/20 to-pink-500/15", size: "md:col-span-5" },
  { title: "Signal / Brand refresh", type: "Identity · Web", accent: "from-pink-500/25 to-cyan-400/10", size: "md:col-span-7" },
];

export function NeonPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));
  const [sent, setSent] = useState(false);
  const progress = checked.filter(Boolean).length * 25;
  const complete = progress === 100;

  function toggleCheck(index: number) {
    setChecked((current) => current.map((value, item) => (item === index ? !value : value)));
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#000] text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,210,255,.13),transparent_28%),radial-gradient(circle_at_10%_45%,rgba(255,0,127,.08),transparent_26%)]" />
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
        <nav className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-3 rounded-full border border-zinc-800/70 bg-black/75 px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,.3)] backdrop-blur-lg sm:px-5" aria-label="Primary navigation">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-tight"><span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-pink-500 text-[10px] text-black">AM</span><span>Arpit Meena<span className="text-cyan-300">.</span></span></a>
          <div className="hidden min-w-0 items-center gap-5 text-xs text-zinc-500 md:flex lg:gap-6">{["Work", "Services", "Process", "About", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition-all duration-300 ease-out hover:text-white">{item}</a>)}</div>
          <a href="#contact" className="hidden shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-300 md:flex">Start a project <ArrowRight className="size-3.5" /></a>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-9 place-items-center rounded-full border border-zinc-800 text-zinc-300 md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </nav>
        {menuOpen && <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl border border-zinc-800/70 bg-zinc-950/95 p-3 backdrop-blur-lg md:hidden">{["Work", "Services", "Process", "About", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white">{item}</a>)}</div>}
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <section className="flex min-h-[78vh] flex-col justify-center py-24 sm:py-32" aria-labelledby="hero-title">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-cyan-300"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_#00d2ff]" />Independent Framer developer · India / remote</p>
          <h1 id="hero-title" className="max-w-5xl text-balance text-6xl font-semibold leading-[.9] tracking-[-.08em] sm:text-8xl lg:text-[9.5rem]">Websites that make the <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-500 bg-clip-text text-transparent">upside</span> obvious.</h1>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-base leading-7 text-zinc-500 sm:text-lg">I turn sharp strategy and thoughtful design into fast, editable websites that give ambitious teams momentum.</p><div className="flex gap-3"><a href="#work" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-cyan-300">See the work <ArrowRight className="size-4" /></a><a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 ease-out hover:border-pink-500 hover:text-white">Email me <Mail className="size-4" /></a></div></div>
        </section>

        <section id="work" className="scroll-mt-24 py-16" aria-labelledby="work-title"><div className="mb-8 flex items-end justify-between"><div><p className="mb-3 text-xs uppercase tracking-[.22em] text-pink-400">Selected work / 01</p><h2 id="work-title" className="text-3xl font-semibold tracking-[-.05em] sm:text-5xl">Built for the moment<br /><span className="text-zinc-600">after launch.</span></h2></div><span className="hidden text-xs text-zinc-600 sm:block">Scroll to explore ↘</span></div><div className="grid gap-4 md:grid-cols-12">{projects.map((project, index) => <article key={project.title} className={`group relative min-h-64 overflow-hidden rounded-[1.75rem] border border-zinc-800/70 bg-zinc-950/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300/50 ${project.size}`}><div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60 transition-all duration-500 ease-out group-hover:scale-105`} /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[.18em] text-zinc-400">0{index + 1}</span><ArrowRight className="size-5 text-zinc-600 transition-all duration-300 ease-out group-hover:-rotate-45 group-hover:text-cyan-300" /></div><div><p className="mb-2 text-xs text-cyan-300">{project.type}</p><h3 className="text-2xl font-medium tracking-[-.04em] text-white sm:text-3xl">{project.title}</h3></div></div></article>)}</div></section>

        <section id="services" className="scroll-mt-24 py-16" aria-labelledby="readiness-title"><div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16"><header><p className="mb-4 text-xs uppercase tracking-[.22em] text-pink-400">Client pre-flight / 02</p><h2 id="readiness-title" className="max-w-xl text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl">Project <span className="bg-gradient-to-r from-cyan-300 to-pink-500 bg-clip-text text-transparent">Readiness Hub.</span></h2><p className="mt-6 max-w-md text-base leading-7 text-zinc-500">Four simple checks remove the drag between a confident brief and a live, high-performing launch.</p><p className="mt-6 flex items-center gap-2 text-sm text-zinc-500"><Clock3 className="size-4 text-cyan-300" />Estimated launch: <strong className="text-zinc-200">Nov 7</strong></p></header><div className="min-w-0 rounded-[2rem] border border-zinc-800/70 bg-zinc-950/75 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_28px_90px_rgba(0,0,0,.38)] backdrop-blur-lg sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-zinc-500">Launch readiness</p><p className="mt-2 text-6xl font-semibold tracking-[-.08em] text-white" aria-live="polite">{progress}%</p></div><div className={`grid size-14 place-items-center rounded-full border transition-all duration-300 ease-out ${complete ? "border-pink-400 bg-pink-500/15 text-pink-300 shadow-[0_0_38px_rgba(255,0,127,.45)]" : "border-zinc-800 text-zinc-700"}`}>{complete ? <Sparkles className="size-5" /> : <span className="text-xs">{checked.filter(Boolean).length}/4</span>}</div></div><div className="mt-7 h-2 overflow-hidden rounded-full bg-zinc-900" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Launch readiness"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-pink-500 shadow-[0_0_22px_rgba(0,210,255,.6)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} /></div><fieldset className="mt-7 flex flex-col gap-3"><legend className="sr-only">Project readiness checklist</legend>{checklist.map((item, index) => { const active = checked[index]; return <label key={item} className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ease-out ${active ? "border-cyan-300/40 bg-cyan-300/[.06]" : "border-zinc-800/70 bg-black/20 hover:border-zinc-700"}`}><input type="checkbox" checked={active} onChange={() => toggleCheck(index)} className="sr-only" /><span className={`grid size-5 shrink-0 place-items-center rounded-md border transition-all duration-300 ease-out ${active ? "border-cyan-300 bg-cyan-300 text-black shadow-[0_0_16px_rgba(0,210,255,.55)]" : "border-zinc-700"}`}>{active && <Check className="size-3.5" strokeWidth={3} />}</span><span className={`text-sm sm:text-base ${active ? "text-white" : "text-zinc-400"}`}>{item}</span><span className={`ml-auto text-[10px] uppercase tracking-[.18em] ${active ? "text-cyan-300" : "text-zinc-700"}`}>{active ? "Ready" : "Check"}</span></label>})}</fieldset><div className={`grid transition-all duration-300 ease-out ${complete ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(255,0,127,.42)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(255,0,127,.7)]">Launch Sprint Securely <ArrowRight className="size-4" /></button></div></div></div></div></section>

        <section id="process" className="scroll-mt-24 grid gap-8 py-16 lg:grid-cols-[.8fr_1.2fr]" aria-labelledby="process-title"><div><p className="mb-4 text-xs uppercase tracking-[.22em] text-cyan-300">The process / 03</p><h2 id="process-title" className="text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl">Clear steps.<br /><span className="text-zinc-600">No theatre.</span></h2></div><div className="grid gap-3">{["Discovery", "Design & direction", "Build in Framer", "Launch & support"].map((step, index) => <div key={step} className="group flex items-center gap-5 rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 transition-all duration-300 ease-out hover:border-pink-500/50"><span className="text-xs text-zinc-700">0{index + 1}</span><span className="text-lg text-zinc-300 transition-colors group-hover:text-white">{step}</span><ArrowRight className="ml-auto size-4 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-pink-400" /></div>)}</div></section>

        <section id="contact" className="scroll-mt-24 py-16" aria-labelledby="contact-title"><div className="rounded-[2rem] border border-zinc-800/70 bg-zinc-950/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-lg sm:p-10 lg:p-14"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><p className="mb-4 text-xs uppercase tracking-[.22em] text-pink-400">Have a good one?</p><h2 id="contact-title" className="text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl">Let&apos;s make it <span className="gradient-text">real.</span></h2><p className="mt-6 max-w-sm text-zinc-500">Tell me what you&apos;re building, what&apos;s stuck, and where you want to go next.</p></div>{sent ? <div className="flex items-center gap-4 rounded-2xl border border-cyan-300/30 bg-cyan-300/[.06] p-6 text-cyan-200"><CheckCircle2 className="size-6" /><p>Thanks — your note is ready for a thoughtful reply.</p></div> : <form onSubmit={submitContact} className="flex flex-col gap-4"><label className="sr-only" htmlFor="name">Your name</label><input id="name" required placeholder="Your name" className="rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 ease-out placeholder:text-zinc-700 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(0,210,255,.12)]" /><label className="sr-only" htmlFor="email">Email address</label><input id="email" required type="email" placeholder="Email address" className="rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 ease-out placeholder:text-zinc-700 focus:border-cyan-300/70 focus:shadow-[0_0_24px_rgba(0,210,255,.14)]" /><label className="sr-only" htmlFor="brief">Project brief</label><textarea id="brief" required rows={4} placeholder="A little about the project..." className="resize-none rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-all duration-300 ease-out placeholder:text-zinc-700 focus:border-cyan-300/70" /><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 ease-out hover:bg-cyan-300">Send project brief <ArrowRight className="size-4" /></button></form>}</div></div></section>
      </main>
    </div>
  );
}
