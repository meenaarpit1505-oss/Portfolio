"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Copy,
  LockKeyhole,
  MessageCircle,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  UnlockKeyhole,
  X,
} from "lucide-react";

const checklist = [
  "Figma Designs Finalized",
  "Copy & Messaging Drafted",
  "Domain & Hosting Access Ready",
  "Brand Guidelines Defined",
];

const stories = [
  { metric: "+340%", label: "Conversions", name: "Maya Chen", role: "Founder, Northstar", initials: "MC", review: "The new launch system made our value obvious in seconds. We went from a leaky funnel to our best-performing page ever." },
  { metric: "24 days", label: "Saved in dev", name: "Leo Martinez", role: "Creative Director, Luma", initials: "LM", review: "A rare partner who understands taste and velocity. Every handoff was clean, considered, and ready to ship." },
  { metric: "4.8x", label: "Faster iteration", name: "Sana Patel", role: "Growth, Arc Labs", initials: "SP", review: "We can now test a new campaign direction before the old process even finished a brief. That leverage is real." },
];

function Eyebrow({ children }: { children: string }) {
  return <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#00d2ff]" />{children}</p>;
}

function Surface({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-zinc-800/80 bg-zinc-950/75 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.24)] backdrop-blur-lg ${className}`}>{children}</div>;
}

export function NeonPortfolio() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [locked, setLocked] = useState(false);
  const [story, setStory] = useState(0);
  const progress = checked.filter(Boolean).length * 25;
  const nextLaunch = useMemo(() => { const date = new Date(); date.setDate(date.getDate() + 18); return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); }, []);

  const toggleCheck = (index: number) => setChecked((current) => current.map((value, item) => item === index ? !value : value));

  return (
    <div className="min-h-screen overflow-hidden bg-[#000] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_75%_8%,rgba(0,210,255,.12),transparent_28%),radial-gradient(circle_at_10%_40%,rgba(255,0,127,.09),transparent_25%)]" />
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <header className="mb-20 max-w-3xl">
          <Eyebrow>Conversion infrastructure / 2026</Eyebrow>
          <h1 className="text-balance text-5xl font-semibold leading-[.94] tracking-[-.07em] sm:text-7xl">Make the next launch feel <span className="bg-gradient-to-r from-[#00d2ff] via-cyan-200 to-[#ff007f] bg-clip-text text-transparent">inevitable.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">A focused digital partner for teams who want sharper decisions, safer launches, and a website that earns its attention.</p>
        </header>

        <section aria-labelledby="readiness-title" className="mb-28">
          <Eyebrow>01 / Pre-flight</Eyebrow>
          <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
            <div className="py-2"><h2 id="readiness-title" className="text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Project <span className="gradient-text">Readiness Hub.</span></h2><p className="mt-5 max-w-md text-zinc-500">Four simple checks remove the drag between a confident brief and a live, high-performing launch.</p><div className="mt-10 flex items-center gap-3 text-sm text-zinc-500"><Clock3 className="text-cyan-300" /> Estimated launch: <strong className="text-white">{nextLaunch}</strong></div></div>
            <Surface className="rounded-[2rem] p-5 sm:p-8">
              <div className="flex items-center justify-between gap-5"><div><p className="text-sm text-zinc-500">Launch readiness</p><p className="mt-1 text-4xl font-semibold tracking-[-.06em] text-white">{progress}%</p></div><div className={`grid size-16 place-items-center rounded-full border-4 transition-all duration-500 ease-out ${progress === 100 ? "border-pink-400 bg-pink-500/15 shadow-[0_0_35px_rgba(255,0,127,.45)]" : "border-zinc-800"}`}><Sparkles className={progress === 100 ? "text-pink-300" : "text-zinc-600"} /></div></div>
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-zinc-900"><div className="h-full rounded-full bg-gradient-to-r from-[#00d2ff] to-[#ff007f] shadow-[0_0_20px_rgba(0,210,255,.6)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} /></div>
              <fieldset className="mt-8 grid gap-3"><legend className="sr-only">Project readiness checklist</legend>{checklist.map((item, index) => <label key={item} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ease-out ${checked[index] ? "border-cyan-300/40 bg-cyan-300/5" : "border-zinc-800/70 hover:border-zinc-700"}`}><input type="checkbox" checked={checked[index]} onChange={() => toggleCheck(index)} className="size-5 accent-cyan-300" /><span className={checked[index] ? "text-white" : "text-zinc-400"}>{item}</span>{checked[index] && <Check className="ml-auto text-cyan-300" />}</label>)}</fieldset>
              <div className={`grid transition-all duration-300 ease-out ${progress === 100 ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><button className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-pink-400 hover:shadow-[0_0_28px_rgba(255,0,127,.45)]">Launch Sprint Securely <ArrowRight /></button></div></div>
            </Surface>
          </div>
        </section>

        <section aria-labelledby="assurance-title" className="mb-28"><Eyebrow>02 / Zero-risk assurance</Eyebrow><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><h2 id="assurance-title" className="text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Premium work, <span className="gradient-text">without the gamble.</span></h2><p className="max-w-xs text-sm leading-6 text-zinc-500">Clear scope, clean handoff, and a direct line when momentum matters.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Surface className="rounded-[2rem] p-7 lg:col-span-2"><div className="flex items-start justify-between"><div><p className="text-sm text-zinc-500">01 / Budget certainty</p><h3 className="mt-3 text-2xl font-medium">The Fixed Quote Promise</h3></div><button aria-label={locked ? "Unlock budget" : "Lock budget"} onClick={() => setLocked(!locked)} className={`grid size-12 place-items-center rounded-2xl border transition-all duration-300 ease-out ${locked ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-300 shadow-[0_0_25px_rgba(0,210,255,.2)]" : "border-zinc-800 text-zinc-500 hover:border-pink-400 hover:text-pink-300"}`}>{locked ? <LockKeyhole /> : <UnlockKeyhole />}</button></div><div className="mt-12 flex items-end justify-between rounded-2xl border border-zinc-800/70 bg-black/70 p-5"><div><p className="text-xs uppercase tracking-[.2em] text-zinc-600">Project investment</p><p className="mt-2 text-4xl font-semibold text-white">$4,800</p></div><span className={`text-xs ${locked ? "text-cyan-300" : "text-zinc-600"}`}>{locked ? "Quote secured" : "Tap to secure"}</span></div></Surface>
          <Surface className="rounded-[2rem] p-7"><p className="text-sm text-zinc-500">02 / Handoff vault</p><h3 className="mt-3 text-2xl font-medium">Everything, documented.</h3><div className="relative mt-8 grid aspect-video place-items-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 via-zinc-950 to-pink-500/15"><span className="absolute left-3 top-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-200"><span className="size-2 animate-pulse rounded-full bg-cyan-300" /> Recording</span><button aria-label="Play handoff preview" className="grid size-12 place-items-center rounded-full bg-white text-black transition-all duration-300 ease-out hover:scale-110 hover:bg-cyan-300"><Play className="ml-1" /></button></div></Surface>
          <Surface className="rounded-[2rem] p-7 md:col-span-2 lg:col-span-3"><div className="grid gap-7 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="text-sm text-zinc-500">03 / Direct support</p><h3 className="mt-3 text-2xl font-medium">Instant Access Channel</h3><p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">A real human in your corner, not a ticket queue.</p></div><div className="rounded-2xl border border-zinc-800/70 bg-black/60 p-4"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-pink-500 font-semibold text-black">AM</div><div><p className="text-sm font-medium">#project-launch</p><p className="flex items-center gap-2 text-xs text-zinc-500"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> Arpit is active</p></div><span className="ml-auto text-xs text-cyan-300">Replies in &lt; 2h</span></div><div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-900/80 p-3 text-sm text-zinc-400"><MessageCircle className="text-pink-400" /> Launch question answered.</div></div></div></Surface>
        </div></section>

        <section aria-labelledby="proof-title"><Eyebrow>03 / Proof of momentum</Eyebrow><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><h2 id="proof-title" className="text-4xl font-semibold tracking-[-.06em] sm:text-5xl">Results that <span className="gradient-text">travel.</span></h2><div className="flex items-center gap-2"><button aria-label="Previous story" onClick={() => setStory((story + stories.length - 1) % stories.length)} className="grid size-10 place-items-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-300 ease-out hover:border-cyan-300 hover:text-cyan-300"><RotateCcw /></button><span className="text-xs text-zinc-600">0{story + 1} / 0{stories.length}</span><button aria-label="Next story" onClick={() => setStory((story + 1) % stories.length)} className="grid size-10 place-items-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-300 ease-out hover:border-pink-400 hover:text-pink-400"><ArrowRight /></button></div></div><div className="grid gap-4 md:grid-cols-3">{stories.map((item, index) => <button key={item.metric} onClick={() => setStory(index)} className={`group min-h-72 rounded-[2rem] border p-6 text-left transition-all duration-300 ease-out ${story === index ? "border-cyan-300/50 bg-zinc-950 shadow-[0_0_45px_rgba(0,210,255,.1)]" : "border-zinc-800/70 bg-zinc-950/60 hover:-translate-y-1 hover:border-zinc-700"}`}><div className="flex items-start justify-between"><span className="text-5xl font-semibold tracking-[-.08em] text-cyan-300 [text-shadow:0_0_26px_rgba(0,210,255,.35)]">{item.metric}</span><Copy className="text-zinc-700 transition-colors group-hover:text-pink-400" /></div><p className="mt-2 text-sm text-zinc-500">{item.label}</p><div className={`grid transition-all duration-300 ease-out ${story === index ? "mt-12 grid-rows-[1fr] opacity-100" : "mt-14 grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="text-sm leading-6 text-zinc-300">“{item.review}”</p><div className="mt-5 flex items-center gap-3 border-t border-zinc-800 pt-4"><span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-pink-500 text-xs font-bold text-black">{item.initials}</span><span><strong className="block text-xs text-white">{item.name}</strong><span className="text-[11px] text-zinc-600">{item.role}</span></span></div></div></div></button>)}</div></section>
      </main>
    </div>
  );
}
