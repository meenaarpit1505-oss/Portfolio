export type ProjectFilter = "all" | "landing" | "saas" | "agency" | "template";

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  numeric: number;
  prefix?: string;
  suffix?: string;
  placeholder?: boolean;
}

export interface ProjectQuote {
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  filters: Exclude<ProjectFilter, "all">[];
  featured?: boolean;
  result: string;
  tags: string[];
  cover: string;
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  previewVideo?: string;
  client: string;
  role: string;
  timeline: string;
  year: string;
  tools: string[];
  challenge: string;
  solution: string;
  built: {
    cms: string;
    interactions: string;
    components: string;
  };
  results: ProjectMetric[];
  gallery: ProjectGalleryItem[];
  quote: ProjectQuote;
  liveUrl?: string;
  liveDomain: string;
  placeholder: boolean;
  seo: {
    title: string;
    description: string;
  };
}

export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "landing", label: "Landing Page" },
  { id: "saas", label: "SaaS" },
  { id: "agency", label: "Agency" },
  { id: "template", label: "Template" },
];

export const projects: Project[] = [
  {
    slug: "northbound-saas",
    title: "Northbound",
    category: "SaaS Landing Page",
    filters: ["saas", "landing"],
    featured: true,
    result: "Launched in 12 days · 98 Lighthouse",
    tags: ["Framer", "CMS", "SEO", "Motion"],
    cover: "/work/northbound-saas/cover.svg",
    heroImage: "/work/northbound-saas/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/northbound-saas/cover.svg",
    client: "Northbound",
    role: "Framer developer",
    timeline: "2 weeks",
    year: "2026",
    tools: ["Framer", "Figma", "Framer Motion"],
    challenge:
      "A B2B analytics startup needed a launch page that explained a dense product in under 15 seconds, without looking like a generic SaaS template.",
    solution:
      "A conversion-first Framer landing page with one primary CTA, CMS-driven proof, and motion that stays out of the way of the product story.",
    built: {
      cms: "Blog and changelog collections, with SEO fields and OG images per article.",
      interactions: "Subtle scroll reveals, pricing toggle, and a sticky nav that swaps to a trial CTA.",
      components: "Hero, logo row, feature grid, pricing, FAQ accordion, and a reusable CTA banner.",
    },
    results: [
      { label: "Sign-up conversion", value: "+38%", numeric: 38, prefix: "+", suffix: "%", placeholder: true },
      { label: "Days to launch", value: "12 days", numeric: 12, suffix: " days", placeholder: true },
      { label: "Lighthouse", value: "98", numeric: 98, placeholder: true },
    ],
    gallery: [
      {
        src: "/work/northbound-saas/gallery-1.svg",
        alt: "Northbound hero and product preview",
        caption: "Hero with product UI and a single primary CTA",
      },
      {
        src: "/work/northbound-saas/gallery-2.svg",
        alt: "Northbound feature grid",
        caption: "Three-up feature grid tied to CMS items",
      },
      {
        src: "/work/northbound-saas/gallery-3.svg",
        alt: "Northbound pricing section",
        caption: "Monthly / yearly pricing with a highlighted plan",
      },
    ],
    quote: {
      name: "Maya Patel",
      role: "Head of Growth",
      company: "Northbound",
      text: "We went from a Figma file to a live Framer page in under two weeks. The structure is clean, and our team can edit copy without pinging a developer.",
    },
    liveUrl: "https://framer.com",
    liveDomain: "framer.com",
    placeholder: true,
    seo: {
      title: "Northbound — SaaS landing page",
      description:
        "Placeholder Framer case study: a conversion-focused SaaS landing page with CMS, SEO, and motion.",
    },
  },
  {
    slug: "meridian-agency",
    title: "Meridian",
    category: "Agency Website",
    filters: ["agency"],
    result: "12 leads in 30 days · 18 CMS pages",
    tags: ["Framer", "CMS", "Multi-page", "SEO"],
    cover: "/work/meridian-agency/cover.svg",
    heroImage: "/work/meridian-agency/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/meridian-agency/cover.svg",
    client: "Meridian Studio",
    role: "Framer developer",
    timeline: "3 weeks",
    year: "2026",
    tools: ["Framer", "Figma", "Notion"],
    challenge:
      "A brand agency needed a site that felt editorial, loaded fast, and let the team publish case studies without a developer.",
    solution:
      "A multi-page Framer site with named components, a case-study CMS, and a journal the team can ship from Notion-style fields.",
    built: {
      cms: "Work, team, and journal collections with filters and related-project links.",
      interactions: "Page transitions, hover lifts on project cards, and a quiet scroll progress bar.",
      components: "Case study template, team cards, services stack, and a contact form connected to Notion.",
    },
    results: [
      { label: "Qualified leads", value: "12 / mo", numeric: 12, suffix: " / mo", placeholder: true },
      { label: "Days to launch", value: "21 days", numeric: 21, suffix: " days", placeholder: true },
      { label: "SEO score", value: "100", numeric: 100, placeholder: true },
    ],
    gallery: [
      {
        src: "/work/meridian-agency/gallery-1.svg",
        alt: "Meridian homepage work grid",
        caption: "Selected work grid with category chips",
      },
      {
        src: "/work/meridian-agency/gallery-2.svg",
        alt: "Meridian case study layout",
        caption: "Case study template: challenge, build, results",
      },
      {
        src: "/work/meridian-agency/gallery-3.svg",
        alt: "Meridian journal index",
        caption: "Journal collection with CMS-driven cards",
      },
    ],
    quote: {
      name: "James Okonkwo",
      role: "Founder",
      company: "Meridian Studio",
      text: "The site looks like our work, not a template. Case studies publish from CMS, and the performance numbers are where they should be.",
    },
    liveUrl: "https://framer.com",
    liveDomain: "framer.com",
    placeholder: true,
    seo: {
      title: "Meridian — Agency website",
      description:
        "Placeholder Framer case study: a multi-page agency website with CMS-powered work and journal.",
    },
  },
  {
    slug: "studio-arden",
    title: "Studio Arden",
    category: "Personal Brand",
    filters: ["landing"],
    result: "Launched in 6 days · +22% inquiries",
    tags: ["Framer", "Personal brand", "CMS"],
    cover: "/work/studio-arden/cover.svg",
    heroImage: "/work/studio-arden/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/studio-arden/cover.svg",
    client: "Arden Lee",
    role: "Framer developer",
    timeline: "6 days",
    year: "2025",
    tools: ["Framer", "Figma"],
    challenge:
      "A photographer needed a calm personal site that put images first, with a simple way to add new series after each shoot.",
    solution:
      "A quiet personal brand site in Framer: full-bleed stills, a CMS for new series, and an inquiry path that does not fight the work.",
    built: {
      cms: "Projects and about notes. New series publish from a CMS item, no page rebuild required.",
      interactions: "Lightbox-style image reveal, slow fade-up on scroll, and a reduced-motion fallback.",
      components: "Full-bleed gallery, bio block, inquiry form, and a footer with booking link.",
    },
    results: [
      { label: "Days to launch", value: "6 days", numeric: 6, suffix: " days", placeholder: true },
      { label: "Inquiry rate", value: "+22%", numeric: 22, prefix: "+", suffix: "%", placeholder: true },
      { label: "Lighthouse", value: "99", numeric: 99, placeholder: true },
    ],
    gallery: [
      {
        src: "/work/studio-arden/gallery-1.svg",
        alt: "Studio Arden homepage",
        caption: "Quiet typography over a full-bleed still",
      },
      {
        src: "/work/studio-arden/gallery-2.svg",
        alt: "Studio Arden project gallery",
        caption: "CMS-driven series grid",
      },
      {
        src: "/work/studio-arden/gallery-3.svg",
        alt: "Studio Arden about page",
        caption: "About and inquiry layout",
      },
    ],
    quote: {
      name: "Arden Lee",
      role: "Photographer",
      company: "Studio Arden",
      text: "Quiet, fast, and easy to update after each shoot. I send the site to clients now instead of a PDF.",
    },
    liveUrl: "https://framer.com",
    liveDomain: "framer.com",
    placeholder: true,
    seo: {
      title: "Studio Arden — Personal brand site",
      description:
        "Placeholder Framer case study: a personal brand website with a CMS-powered photography series.",
    },
  },
  {
    slug: "framekit-template",
    title: "Framekit",
    category: "Framer Template",
    filters: ["template"],
    result: "18 components · 24 CMS items",
    tags: ["Framer", "Template", "Components", "CMS"],
    cover: "/work/framekit-template/cover.svg",
    heroImage: "/work/framekit-template/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/framekit-template/cover.svg",
    client: "Framekit (template)",
    role: "Template designer & developer",
    timeline: "4 weeks",
    year: "2026",
    tools: ["Framer", "Figma", "Framer Motion"],
    challenge:
      "Founders kept restyling the same marketing sections. They needed a template with named components, CMS, and documentation — not another locked design.",
    solution:
      "A Framer marketing template with named stacks, CMS collections, and light/dark variants so a founder can launch in a day.",
    built: {
      cms: "Pages, blog, changelog, and testimonials collections with example content.",
      interactions: "Optional motion presets that honor reduced-motion, plus component variants for light/dark.",
      components: "Nav, hero, logos, features, pricing, FAQ, footer, and a case study template.",
    },
    results: [
      { label: "Components", value: "18", numeric: 18, placeholder: true },
      { label: "CMS items", value: "24", numeric: 24, placeholder: true },
      { label: "Setup time", value: "< 1 day", numeric: 1, prefix: "< ", suffix: " day", placeholder: true },
    ],
    gallery: [
      {
        src: "/work/framekit-template/gallery-1.svg",
        alt: "Framekit homepage template",
        caption: "Marketing homepage assembled from named stacks",
      },
      {
        src: "/work/framekit-template/gallery-2.svg",
        alt: "Framekit component library",
        caption: "Component set with light and dark variants",
      },
      {
        src: "/work/framekit-template/gallery-3.svg",
        alt: "Framekit CMS collections",
        caption: "CMS collections for blog, work, and FAQs",
      },
    ],
    quote: {
      name: "Priya Shah",
      role: "Marketing lead",
      company: "Independently",
      text: "We swapped colors, connected CMS, and published the same day. The components are named the way a non-developer would look for them.",
    },
    liveUrl: "https://www.framer.com/marketplace/",
    liveDomain: "framer.com/marketplace",
    placeholder: true,
    seo: {
      title: "Framekit — Framer template",
      description:
        "Placeholder Framer case study: a marketing template with reusable components and CMS collections.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  const last = projects.length - 1;
  const previous = projects[index <= 0 ? last : index - 1];
  const next = projects[index >= last ? 0 : index + 1];
  return { previous, next };
}

export function filterProjects(filter: ProjectFilter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.filters.includes(filter));
}
