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
  metrics?: string;
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
  results?: ProjectMetric[];
  gallery: ProjectGalleryItem[];
  quote?: ProjectQuote;
  liveUrl?: string;
  liveDomain?: string;
  concept?: boolean;
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
    result: "SaaS landing page · CMS · SEO setup",
    tags: ["Framer", "CMS", "SEO", "Motion"],
    cover: "/work/northbound-saas/cover.svg",
    heroImage: "/work/northbound-saas/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/northbound-saas/cover.svg",
    client: "Northbound",
    role: "Framer developer",
    timeline: "Concept build",
    year: "2026",
    tools: ["Framer", "Figma", "Framer Motion"],
    challenge:
      "A B2B analytics product needs a launch page that explains a dense product in under 15 seconds, without looking like a generic SaaS template.",
    solution:
      "A conversion-first Framer landing page with one primary CTA, CMS-driven sections, and motion that stays out of the way of the product story.",
    built: {
      cms: "Blog and changelog collections, with SEO fields and OG images per article.",
      interactions: "Subtle scroll reveals, pricing toggle, and a sticky nav that swaps to a trial CTA.",
      components: "Hero, logo row, feature grid, pricing, FAQ accordion, and a reusable CTA banner.",
    },
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
    concept: true,
    seo: {
      title: "Northbound — SaaS landing page",
      description:
        "Concept Framer build: a conversion-focused SaaS landing page with CMS, SEO, and motion.",
    },
  },
  {
    slug: "meridian-agency",
    title: "Meridian",
    category: "Agency Website",
    filters: ["agency"],
    result: "Multi-page agency site · CMS · SEO setup",
    tags: ["Framer", "CMS", "Multi-page", "SEO"],
    cover: "/work/meridian-agency/cover.svg",
    heroImage: "/work/meridian-agency/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/meridian-agency/cover.svg",
    client: "Meridian Studio",
    role: "Framer developer",
    timeline: "Concept build",
    year: "2026",
    tools: ["Framer", "Figma", "Notion"],
    challenge:
      "A brand studio needs a site that feels editorial, loads fast, and lets the team publish case studies without a developer.",
    solution:
      "A multi-page Framer site with named components, a case-study CMS, and a journal the team can ship from structured fields.",
    built: {
      cms: "Work, team, and journal collections with filters and related-project links.",
      interactions: "Page transitions, hover lifts on project cards, and a quiet scroll progress bar.",
      components: "Case study template, team cards, services stack, and a contact form.",
    },
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
    concept: true,
    seo: {
      title: "Meridian — Agency website",
      description:
        "Concept Framer build: a multi-page agency website with CMS-powered work and journal.",
    },
  },
  {
    slug: "studio-arden",
    title: "Studio Arden",
    category: "Personal Brand",
    filters: ["landing"],
    result: "Personal brand site · CMS · gallery",
    tags: ["Framer", "Personal brand", "CMS"],
    cover: "/work/studio-arden/cover.svg",
    heroImage: "/work/studio-arden/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/studio-arden/cover.svg",
    client: "Studio Arden",
    role: "Framer developer",
    timeline: "Concept build",
    year: "2025",
    tools: ["Framer", "Figma"],
    challenge:
      "A photographer needs a calm personal site that puts images first, with a simple way to add new series after each shoot.",
    solution:
      "A quiet personal brand site in Framer: full-bleed stills, a CMS for new series, and an inquiry path that does not fight the work.",
    built: {
      cms: "Projects and about notes. New series publish from a CMS item, no page rebuild required.",
      interactions: "Lightbox-style image reveal, slow fade-up on scroll, and a reduced-motion fallback.",
      components: "Full-bleed gallery, bio block, inquiry form, and a footer with booking link.",
    },
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
    concept: true,
    seo: {
      title: "Studio Arden — Personal brand site",
      description:
        "Concept Framer build: a personal brand website with a CMS-powered photography series.",
    },
  },
  {
    slug: "framekit-template",
    title: "Framekit",
    category: "Framer Template",
    filters: ["template"],
    result: "Framer template · named components · CMS collections",
    tags: ["Framer", "Template", "Components", "CMS"],
    cover: "/work/framekit-template/cover.svg",
    heroImage: "/work/framekit-template/cover.svg",
    beforeImage: "/work/_shared/before.svg",
    afterImage: "/work/framekit-template/cover.svg",
    client: "Framekit",
    role: "Template designer & developer",
    timeline: "Concept build",
    year: "2026",
    tools: ["Framer", "Figma", "Framer Motion"],
    challenge:
      "Founders keep restyling the same marketing sections. They need a template with named components, CMS, and documentation — not another locked design.",
    solution:
      "A Framer marketing template with named stacks, CMS collections, and light/dark variants so a founder can launch in a day.",
    built: {
      cms: "Pages, blog, changelog, and testimonials collections with example content.",
      interactions: "Optional motion presets that honor reduced-motion, plus component variants for light/dark.",
      components: "Nav, hero, logos, features, pricing, FAQ, footer, and a case study template.",
    },
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
    concept: true,
    seo: {
      title: "Framekit — Framer template",
      description:
        "Concept Framer build: a marketing template with reusable components and CMS collections.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function isLiveHttpsUrl(liveUrl?: string): liveUrl is string {
  const trimmed = liveUrl?.trim() ?? "";
  if (!trimmed) return false;
  try {
    return new URL(trimmed).protocol === "https:";
  } catch {
    return false;
  }
}

export function getLiveHttpsUrl(liveUrl?: string): string | null {
  const trimmed = liveUrl?.trim() ?? "";
  return isLiveHttpsUrl(trimmed) ? trimmed : null;
}

export function getLiveDomain(project: Project): string | null {
  const liveUrl = getLiveHttpsUrl(project.liveUrl);
  if (!liveUrl) return null;
  const fromField = project.liveDomain?.trim();
  if (fromField) return fromField;
  try {
    return new URL(liveUrl).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
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
