import { EMAIL, SITE_URL } from "@/lib/config";

export const site = {
  name: "Arpit Meena",
  firstName: "Arpit",
  monogram: "AM",
  role: "Framer Developer",
  email: EMAIL,
  location: "India",
  timezone: "IST (UTC+5:30)",
  siteUrl: SITE_URL,
  availability: "Available for new projects",
  availabilityWindow: "Available for new projects · Nov 2026",
  socialProofLine: "Trusted by founders and agencies in 5+ countries",
  headline: "Framer developer building fast, beautiful websites that convert.",
  subhead:
    "I help startups, agencies, and creators launch polished Framer sites, from Figma to live in days, not weeks.",
  trustItems: ["Figma to Framer", "CMS", "SEO-ready", "Fast launches"],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  metadata: {
    title: "Arpit Meena — Framer Developer",
    description:
      "Framer developer building fast, conversion-focused websites for startups, agencies, and creators. Figma to a live, CMS-ready site in days — not weeks.",
    keywords: [
      "Framer developer",
      "Framer designer",
      "Figma to Framer",
      "Framer CMS",
      "landing page",
      "marketing website",
      "Arpit Meena",
    ],
  },
  about: {
    headline: "I build Framer sites that look considered and ship quickly.",
    bio: [
      "I'm a freelance web developer based in India, working remotely since 2024. I focus on Framer and modern frontend — taking Figma files (or a rough brief) and turning them into live, editable websites.",
      "I care about clean structure, fast loads, and making sure you can update the site yourself after launch. Most of my work is landing pages, marketing sites, and reusable Framer systems for startups, agencies, and independent creators.",
    ],
    photo: "/arpit.jpg",
    photoAlt: "Portrait of Arpit Meena",
    facts: [
      { label: "Based in", value: "India · IST" },
      { label: "Working since", value: "2024" },
      { label: "Focus", value: "Framer & frontend" },
    ],
  },
} as const;

export const services = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting single-page sites for launches, waitlists, and campaigns.",
    priceFrom: 1500,
    icon: "layout",
  },
  {
    id: "marketing-websites",
    title: "Full Marketing Websites",
    description: "Multi-page Framer sites with CMS, SEO, and a structure you can grow.",
    priceFrom: 4000,
    icon: "globe",
  },
  {
    id: "figma-to-framer",
    title: "Figma to Framer",
    description: "Pixel-accurate builds from your Figma file, with production-ready components.",
    priceFrom: 2000,
    icon: "figma",
  },
  {
    id: "migration",
    title: "Migration",
    description: "Move from Webflow or WordPress to Framer without losing SEO or content.",
    priceFrom: 2500,
    icon: "refresh",
  },
  {
    id: "templates",
    title: "Framer Templates & Components",
    description: "Reusable templates, navs, CMS collections, and component libraries.",
    priceFrom: 800,
    icon: "component",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    timeline: "1–3 days",
    description:
      "Goals, sitemap, references, and success metrics. We agree on scope before anything is built.",
  },
  {
    number: "02",
    title: "Design / Figma",
    timeline: "3–7 days",
    description:
      "If you already have Figma, we audit and tighten. If not, I design a focused, conversion-first layout.",
  },
  {
    number: "03",
    title: "Build in Framer",
    timeline: "5–14 days",
    description:
      "Responsive build, CMS, interactions, SEO, and components named so you can edit them later.",
  },
  {
    number: "04",
    title: "Launch & Support",
    timeline: "1–3 days + 2 weeks",
    description:
      "Domain, hosting, redirects, and a short handoff. Two weeks of launch support included.",
  },
] as const;

export const reasons = [
  {
    title: "Fast turnaround",
    description:
      "Most landing pages ship in days, not weeks. Full marketing sites typically land in 2–4 weeks.",
    icon: "zap",
  },
  {
    title: "Pixel-perfect builds",
    description:
      "I match Figma closely — spacing, type, and states — then add the motion that belongs in production.",
    icon: "target",
  },
  {
    title: "SEO and performance",
    description:
      "Clean structure, metadata, sitemap, and fast Lighthouse scores so the site can actually be found.",
    icon: "gauge",
  },
  {
    title: "Clear communication",
    description:
      "Based in India (IST, UTC+5:30). Async-friendly, with updates in writing and replies within a day.",
    icon: "message",
  },
] as const;

export const tools = [
  { name: "Framer", logo: "/logos/framer.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Framer Motion", logo: "/logos/framermotion.svg" },
  { name: "GSAP", logo: "/logos/gsap.svg" },
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "Tailwind", logo: "/logos/tailwind.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
] as const;

export const budgetOptions = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2-5k", label: "$2,000 – $5,000" },
  { value: "5-10k", label: "$5,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
] as const;

export const projectTypeOptions = [
  { value: "landing", label: "Landing page" },
  { value: "marketing", label: "Marketing website" },
  { value: "figma", label: "Figma to Framer" },
  { value: "migration", label: "Migration" },
  { value: "template", label: "Template / components" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "This month" },
  { value: "flexible", label: "Flexible" },
] as const;

export const brandLogos = [
  { name: "Northbound", logo: "/brands/northbound.svg", placeholder: true },
  { name: "Meridian", logo: "/brands/meridian.svg", placeholder: true },
  { name: "Studio Arden", logo: "/brands/studio-arden.svg", placeholder: true },
  { name: "Framekit", logo: "/brands/framekit.svg", placeholder: true },
  { name: "Lumen Co", logo: "/brands/lumen-co.svg", placeholder: true },
  { name: "Harbor Labs", logo: "/brands/harbor-labs.svg", placeholder: true },
] as const;
