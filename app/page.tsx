"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, BrainCircuit, CircleDot, Code2, Command, Layers3, Menu, MoveUpRight, Send, Sparkles, X } from "lucide-react"

const projects = [
  { number: "01", title: "Northstar / AI OS", type: "Product design · 2024", className: "project-tall", accent: "pink" },
  { number: "02", title: "Kinetic / Finance", type: "Web experience · 2023", className: "project-wide", accent: "blue" },
  { number: "03", title: "Aura / Wellness", type: "Design system · 2023", className: "project-square", accent: "violet" },
]

const services = [
  { icon: Sparkles, number: "01", title: "Interaction design", body: "I choreograph interfaces that feel intuitive, alive, and unmistakably human." },
  { icon: Command, number: "02", title: "No-code architecture", body: "Flexible Framer systems engineered for scale, speed, and complete creative control." },
  { icon: CircleDot, number: "03", title: "WebGL & motion", body: "Cinematic depth and tactile motion that turn every scroll into a moment." },
  { icon: Layers3, number: "04", title: "Design systems", body: "A single source of truth that makes your product sharper at every touchpoint." },
]

const timeline = [
  { year: "2024 — NOW", role: "Lead UI/UX Designer", company: "Independent · New York / Worldwide", body: "Partnering with ambitious founders and teams to make their next idea feel inevitable." },
  { year: "2021 — 2024", role: "Senior Product Designer", company: "Northstar Labs", body: "Led product design across zero-to-one launches, growing a design practice from the ground up." },
  { year: "2018 — 2021", role: "Interaction Designer", company: "Studio Parallel", body: "Built expressive digital identities and award-winning web experiences for culture-shifting brands." },
]

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY })
    const over = () => setHovered(true)
    const out = () => setHovered(false)
    window.addEventListener("mousemove", move)
    const interactive = document.querySelectorAll("a, button, input, textarea")
    interactive.forEach((element) => { element.addEventListener("mouseenter", over); element.addEventListener("mouseleave", out) })
    return () => { window.removeEventListener("mousemove", move); interactive.forEach((element) => { element.removeEventListener("mouseenter", over); element.removeEventListener("mouseleave", out) }) }
  })
  return <><div className={`cursor-ring ${hovered ? "cursor-ring-active" : ""}`} style={{ left: position.x, top: position.y }} /><div className="cursor-dot" style={{ left: position.x, top: position.y }} /></>
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18 }); const springY = useSpring(y, { stiffness: 260, damping: 18 })
  return <motion.a href="#contact" ref={ref} style={{ x: springX, y: springY }} onMouseMove={(event) => { const rect = ref.current?.getBoundingClientRect(); if (!rect) return; x.set((event.clientX - rect.left - rect.width / 2) * 0.16); y.set((event.clientY - rect.top - rect.height / 2) * 0.16) }} onMouseLeave={() => { x.set(0); y.set(0) }} className="magnetic-button">{children}<ArrowUpRight size={17} /></motion.a>
}

function ProjectCard({ project, index }: { project: typeof projects[number], index: number }) {
  return <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * .12, duration: .7 }} className={`project-card ${project.className} ${project.accent}`}>
    <div className="project-art"><div className="art-grid" /><div className="art-orb" /><div className="art-panel"><span>RENDER / 04</span><span>60 FPS</span></div><div className="art-lines" /></div>
    <div className="project-meta"><span className="project-number">{project.number}</span><div><h3>{project.title}</h3><p>{project.type}</p></div><ArrowUpRight className="project-arrow" size={22} /></div>
  </motion.article>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const timelineScale = useTransform(scrollYProgress, [0.35, .85], [0, 1])
  return <main>
    <Cursor />
    <div className="ambient ambient-pink" /><div className="ambient ambient-blue" />
    <nav className="nav"><a className="brand" href="#top">AP<span>·</span></a><div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}><a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div><button className="menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><a className="availability" href="#contact"><span /> Available for select projects</a></nav>
    <section className="hero" id="top"><div className="hero-kicker"><span className="eyebrow-line" /> Framer expert & lead UI/UX designer <span>© 2024—25</span></div><h1><span className="line"><span>Designing</span></span><span className="line gradient-text"><span>what&apos;s next.</span></span></h1><div className="hero-bottom"><p>Digital experiences with a pulse.<br />Built for people, shaped by curiosity.</p><MagneticButton>Let&apos;s talk</MagneticButton><div className="scroll-cue"><span>Scroll to explore</span><div className="scroll-line" /></div></div></section>
    <section className="marquee"><div className="marquee-track">STRATEGY <i>✳</i> MOTION <i>✳</i> EXPERIENCE <i>✳</i> FRAMER <i>✳</i> STRATEGY <i>✳</i> MOTION <i>✳</i> EXPERIENCE <i>✳</i></div></section>
    <section className="section work-section" id="work"><div className="section-heading"><p className="eyebrow">01 — Selected work</p><h2>Selected <em>signals.</em></h2><p className="heading-note">A few things I&apos;ve helped bring to life.<br />Always in motion, never out of focus.</p></div><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div></section>
    <section className="section about-section" id="about"><div className="section-heading"><p className="eyebrow">02 — Expertise</p><h2>More than<br /><em>pixels.</em></h2></div><div className="services-grid">{services.map(({ icon: Icon, ...service }) => <motion.div whileHover={{ y: -8 }} className="service-card" key={service.number}><div className="service-top"><Icon /><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.body}</p><ArrowUpRight className="service-arrow" /></motion.div>)}</div></section>
    <section className="section timeline-section"><div className="section-heading"><p className="eyebrow">03 — The path</p><h2>Built through<br /><em>experience.</em></h2></div><div className="timeline"><div className="timeline-axis"><div className="timeline-fill" style={{ transform: `scaleY(${timelineScale})` }} /></div>{timeline.map((item, index) => <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="timeline-item" key={item.year}><div className="timeline-dot" /><p className="eyebrow">{item.year}</p><h3>{item.role}</h3><p className="company">{item.company}</p><p className="timeline-body">{item.body}</p></motion.div>)}</div></section>
    <section className="contact-section" id="contact"><div><p className="eyebrow">04 — Start a conversation</p><h2>Have a good<br /><span>feeling?</span></h2><p className="contact-copy">Let&apos;s make something that makes people stop and look twice.</p></div><form className="contact-form" onSubmit={(e) => e.preventDefault()}><label>Name<input placeholder="Your name" required /></label><label>Email<input type="email" placeholder="you@company.com" required /></label><label>Tell me about it<textarea placeholder="A few words about your project..." rows={2} /></label><button type="submit">Send inquiry <Send size={17} /></button></form></section>
    <footer><a className="brand" href="#top">AP<span>·</span></a><p>Designed with intent. Built with curiosity.</p><div><a href="#top">Back to top <MoveUpRight size={14} /></a></div></footer>
  </main>
}
