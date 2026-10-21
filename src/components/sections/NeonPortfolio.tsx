"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Mail,
  Moon,
  Rocket,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const projects = [
  { number: "01", title: "Northstar / Launch system", tags: "Framer · Strategy", color: "cyan", description: "A launch system for a team ready to turn a sharper point of view into momentum." },
  { number: "02", title: "Lumen / Editorial commerce", tags: "Web design · CMS", color: "pink", description: "A calm, editorial commerce experience that makes a growing catalog easier to browse." },
  { number: "03", title: "Fieldnotes / Creator platform", tags: "Product direction", color: "blue", description: "A focused platform narrative and onboarding path built around creator momentum." },
  { number: "04", title: "Signal / Brand refresh", tags: "Identity · Web", color: "magenta", description: "A confident identity refresh translated into an expressive marketing site." },
] as const;

const checks = ["Figma Designs Finalized", "Copy & Messaging Drafted", "Domain & Hosting Access Ready", "Brand Guidelines Defined"];
const process = [
  ["01", "Discovery", "We align the brief, audience, and success criteria before any pixels move."],
  ["02", "Design & direction", "We shape the visual direction into a clear, conversion-led system."],
  ["03", "Build in Framer", "We build a fast, editable Framer experience with thoughtful responsive states."],
  ["04", "Launch & support", "We QA the launch, hand over the system, and stay close for what comes next."],
] as const;

function SectionLabel({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "pink" }) {
  return <p className={`eyebrow ${tone === "pink" ? "text-pink" : "text-cyan"}`}>{children}</p>;
}

function ProjectModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink px-4 py-5 sm:px-8 sm:py-8" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <button onClick={onClose} className="button-ghost fixed left-4 top-5 z-10 sm:left-8 sm:top-8"><X className="size-4" /> Back to home</button>
      <div className="mx-auto max-w-6xl pt-20 sm:pt-24">
        <header className="glass-panel relative overflow-hidden p-6 sm:p-12">
          <div className={`ambient ambient-${project.color}`} />
          <div className="relative"><SectionLabel tone={project.color === "pink" || project.color === "magenta" ? "pink" : "cyan"}>{project.number} / {project.tags}</SectionLabel><h1 className="display-title mt-5 max-w-4xl">{project.title}</h1><p className="body-copy mt-7 max-w-xl">{project.description} A considered digital system designed to make the next stage of growth feel clear, fast, and unmistakably yours.</p></div>
        </header>
        <div className="grid gap-4 py-5 sm:grid-cols-2"><article className="glass-panel p-6 sm:p-8"><SectionLabel tone="pink">The challenge</SectionLabel><h2 className="mt-5 text-2xl leading-tight">Make the story easier to understand and the next action easier to take.</h2></article><article className="glass-panel p-6 sm:p-8"><SectionLabel>The solution</SectionLabel><h2 className="mt-5 text-2xl leading-tight">A modular Framer system with clarity built into every interaction.</h2></article></div>
        <div className="mockup-frame min-h-[360px] p-5 sm:min-h-[520px] sm:p-10"><div className="mockup-window"><div className="flex items-center justify-between border-b border-line p-4"><span className="flex gap-1.5"><i className="size-2 rounded-full bg-pink" /><i className="size-2 rounded-full bg-cyan" /></span><span className="mono text-muted">LIVE PREVIEW / 01</span></div><div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-8"><div className="skeleton-card h-36 sm:col-span-2 sm:h-64" /><div className="skeleton-card h-36 sm:h-64" /><div className="skeleton-card h-24" /><div className="skeleton-card h-24 sm:col-span-2" /></div></div></div>
        <footer className="glass-panel mt-5 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><SectionLabel tone="pink">Next up</SectionLabel><h2 className="mt-3 text-2xl">Want a project like this?</h2></div><button onClick={onClose} className="button-primary">Build yours in days <ArrowRight className="size-4" /></button></footer>
      </div>
    </div>
  );
}

export function NeonPortfolio() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [activeStep, setActiveStep] = useState(0);
  const [sent, setSent] = useState(false);
  const progress = checked.filter(Boolean).length * 25;

  const jumpTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  if (activeProject) return <ProjectModal project={activeProject} onClose={() => { setActiveProject(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;

  return (
    <div className={`app-frame ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <div className="ambient ambient-cyan fixed right-[-10rem] top-[-12rem]" aria-hidden="true" />
      <div className="ambient ambient-pink fixed bottom-[-18rem] left-[-12rem]" aria-hidden="true" />
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-8 lg:px-12"><nav className="dock mx-auto max-w-7xl" aria-label="Primary navigation"><button className="brand" onClick={() => jumpTo("top")}><span className="brand-mark">AM</span><span>Arpit Meena<span className="text-cyan">.</span></span></button><div className="hidden items-center gap-6 md:flex">{[["Work", "work"], ["Services", "services"], ["Process", "process"], ["Contact", "contact"]].map(([label, id]) => <button key={id} onClick={() => jumpTo(id)} className="nav-link">{label}</button>)}</div><div className="flex items-center gap-2"><button className="icon-button" onClick={() => setIsDarkMode((value) => !value)} aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}>{isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}</button><button className="button-primary hidden sm:inline-flex" onClick={() => jumpTo("contact")}>Start a project <ArrowRight className="size-3.5" /></button><button className="icon-button md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X className="size-4" /> : <ChevronDown className="size-4" />}</button></div></nav>{menuOpen && <div className="mobile-menu md:hidden">{[["Work", "work"], ["Services", "services"], ["Process", "process"], ["Contact", "contact"]].map(([label, id]) => <button key={id} onClick={() => jumpTo(id)}>{label}<ArrowRight className="size-4" /></button>)}</div>}</header>
      <main id="top" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-8 lg:px-12">
        <section id="about" className="hero-section" aria-labelledby="hero-title"><SectionLabel>Independent Framer developer · India / remote</SectionLabel><h1 id="hero-title" className="hero-title">High-performance <span>Framer websites</span> built to scale your business.</h1><div className="hero-foot"><p className="body-copy max-w-md">I turn sharp strategy and thoughtful design into fast, editable websites that give ambitious teams momentum.</p><div className="flex flex-wrap gap-3"><button className="button-primary" onClick={() => jumpTo("work")}>See the work <ArrowDownRight className="size-4" /></button><button className="button-ghost" onClick={() => jumpTo("contact")}>Email me <Mail className="size-4" /></button></div></div></section>
        <section id="work" className="section-block" aria-labelledby="work-title"><div className="section-heading"><div><SectionLabel tone="pink">Selected work / 01</SectionLabel><h2 id="work-title" className="section-title">Built for the moment<br /><em>after launch.</em></h2></div><span className="mono text-muted">04 CASE STUDIES</span></div><div className="project-grid">{projects.map((project) => <button key={project.number} className={`project-card ${project.color}`} onClick={() => { setActiveProject(project); window.scrollTo({ top: 0, behavior: "smooth" }); }}><div className="card-top"><span className="number-chip">{project.number}</span><ArrowUpRight className="size-5" /></div><div><SectionLabel>{project.tags}</SectionLabel><h3>{project.title}</h3><p>{project.description}</p></div></button>)}</div></section>
        <section id="services" className="section-block" aria-labelledby="readiness-title"><div className="readiness-layout"><div><SectionLabel tone="pink">Client pre-flight / 02</SectionLabel><h2 id="readiness-title" className="section-title">Project <span className="gradient-text">Readiness Hub.</span></h2><p className="body-copy mt-6 max-w-md">Four simple checks remove the drag between a confident brief and a live, high-performing launch.</p><p className="meta-line"><Clock3 className="size-4 text-cyan" /> Estimated launch: <strong>Nov 7</strong></p></div><div className="glass-panel readiness-card"><div className="flex items-start justify-between"><div><span className="label">Launch readiness</span><div className="readiness-number" aria-live="polite">{progress}%</div></div><div className={`readiness-orb ${progress === 100 ? "complete" : ""}`}><span>{checked.filter(Boolean).length}/4</span></div></div><div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Launch readiness"><div className="progress-fill" style={{ width: `${progress}%` }} /></div><div className="check-list">{checks.map((item, index) => <label key={item} className={`check-row ${checked[index] ? "checked" : ""}`}><input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span className="check-icon">{checked[index] && <Check className="size-3" />}</span><span>{item}</span></label>)}</div>{progress === 100 && <div className="ready-state"><Sparkles className="size-4" /> Ready to launch sprint.</div>}<button className={`button-primary mt-6 w-full justify-center ${progress === 100 ? "pulse-pink" : ""}`} onClick={() => jumpTo("contact")}><Rocket className="size-4" /> Launch sprint securely</button></div></div></section>
        <section id="process" className="section-block process-layout" aria-labelledby="process-title"><div><SectionLabel>The process / 03</SectionLabel><h2 id="process-title" className="section-title">Clear steps.<br /><em>No theatre.</em></h2></div><div className="process-list">{process.map(([number, title, detail], index) => <div key={number} className={`process-item ${activeStep === index ? "active" : ""}`}><button onClick={() => setActiveStep(index)} aria-expanded={activeStep === index}><span className="process-number">{number}</span><span>{title}</span><ArrowRight className={`size-4 transition-transform duration-300 ${activeStep === index ? "rotate-90" : ""}`} /></button>{activeStep === index && <p>{detail}</p>}</div>)}</div></section>
        <section id="contact" className="section-block" aria-labelledby="contact-title"><div className="glass-panel contact-panel"><div><SectionLabel tone="pink">Have a good one?</SectionLabel><h2 id="contact-title" className="section-title">Let&apos;s make it <span className="gradient-text">real.</span></h2><p className="body-copy mt-6 max-w-sm">Tell me what you&apos;re building, what&apos;s stuck, and where you want to go next.</p></div>{sent ? <div className="success-box"><Check className="size-5" /> Thanks — your note is ready for a thoughtful reply.</div> : <form className="contact-form" onSubmit={submit}><label><span>Your name</span><input required name="name" placeholder="Your name" /></label><label><span>Email address</span><input required name="email" type="email" placeholder="you@company.com" /></label><label><span>Project brief</span><textarea required name="brief" rows={5} placeholder="A little about the project..." /></label><button className="button-primary justify-center" type="submit">Send project brief <ArrowRight className="size-4" /></button></form>}</div></section>
      </main>
      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 border-t border-line px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>AM / Independent Framer developer</span><span>Built for momentum.</span></footer>
    </div>
  );
}

function ArrowUpRight(props: React.ComponentProps<typeof ArrowRight>) { return <ArrowRight {...props} className={`${props.className ?? ""} rotate-[-45deg]`} />; }
