export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectSEO {
  title: string;
  description: string;
  ogImage: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  type: "client" | "concept";
  year: string;
  client?: string; // Real client name when type is "client"
  role: string;
  brief: string;
  approach: string;
  result: string;
  tags: string[];
  image: string;
  heroImage: string;
  gallery: ProjectGalleryItem[];
  deliverable: string;
  focusLabel: string;
  statusLabel: string;
  targetLabel?: string;
  seo: ProjectSEO;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface CareerItem {
  year: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface OfficeLocation {
  city: string;
  timezone: string;
  status: string;
}

export interface TechItem {
  name: string;
  category: "Frontend" | "3D & Creative" | "Backend" | "Tools & Infra";
  color: string;
  accent: string;
  level: number; // 1-100
  radius?: number;
  logo?: string;
  initials?: string;
}

export interface PortfolioContent {
  metadata: {
    siteUrl: string;
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  personal: {
    // TODO: Replace with your own personal details
    name: string;
    firstName: string;
    lastName: string;
    monogram: string;
    role: string;
    roleShort: string;
    subtitle: string;
    headline: string;
    location: string;
    coordinates: string;
    availability: string;
    availabilityShort: string;
    bio: {
      headline: string;
      lead: string;
      paragraphs: string[];
      traits: string[];
    };
    stats: { label: string; value: string; suffix?: string }[];
  };
  transition: {
    badge: string;
    hudLabel: string;
    headline: string;
    statement: string;
  };
  socials: {
    // TODO: Replace with your own social URLs and direct email
    github: string;
    linkedin: string;
    x: string;
    email: string;
  };
  services: {
    title: string;
    subtitle: string;
    develop: {
      title: string;
      category: string;
      description: string;
      points: string[];
      tech: string[];
    };
    design: {
      title: string;
      category: string;
      description: string;
      points: string[];
      tech: string[];
    };
  };
  career: {
    title: string;
    subtitle: string;
    items: CareerItem[];
  };
  projects: ProjectItem[];
  techStack: TechItem[];
  contact: {
    heading: string;
    subheading: string;
    email: string;
    directNote: string;
    locations: OfficeLocation[];
  };
}

export const content: PortfolioContent = {
  metadata: {
    // TODO: Set your production domain URL (e.g. https://your-portfolio.com)
    siteUrl: "https://your-portfolio-domain.com",
    // TODO: Set your portfolio page title and SEO description
    title: "Arpit Meena — Creative Web Developer (React, Next.js, Three.js)",
    description:
      "Personal 3D portfolio featuring real-time WebGL, liquid chrome shaders, physics playgrounds, and kinetic editorial design.",
    keywords: [
      "Creative Developer",
      "WebGL",
      "Three.js",
      "React Three Fiber",
      "GLSL Shaders",
      "Next.js 15",
      "Rapier Physics",
    ],
    ogTitle: "Arpit Meena — Creative Web Developer (React, Next.js, Three.js)",
    ogDescription:
      "Personal 3D portfolio featuring real-time WebGL, liquid chrome shaders, physics playgrounds, and kinetic editorial design.",
    twitterTitle: "Arpit Meena — Creative Web Developer",
    twitterDescription: "Real-time 3D, custom GLSL shaders, and tactile physics.",
  },

  personal: {
    // TODO: Enter your full name
    name: "ARPIT MEENA",
    // TODO: Enter your first name
    firstName: "ARPIT",
    // TODO: Enter your last name
    lastName: "MEENA",
    // TODO: Enter your 2-letter monogram / initials for the header badge
    monogram: "AM",
    // TODO: Enter your professional title / role
    role: "Creative Web Developer (React, Next.js, Three.js)",
    // TODO: Enter your short role descriptor for navigation
    roleShort: "CREATIVE WEB DEVELOPER",
    // TODO: Enter your hero subtitle / mission statement
    subtitle: "Merging real-time WebGL/3D, physics, and editorial aesthetics",
    headline: "HI, I'M ARPIT MEENA",
    // Primary working location
    location: "INDIA (IST, UTC+5:30)",
    // Latitude & longitude coordinates
    coordinates: "28.6139\u00B0 N, 77.2090\u00B0 E",
    // TODO: Enter your availability status for upcoming quarters
    availability: "OPEN FOR SELECT COLLABORATIONS // Q2-Q3 2026",
    // TODO: Enter your short availability label for the header indicator pill
    availabilityShort: "AVAILABLE Q2-Q3",
    bio: {
      // TODO: Enter your main about section heading
      headline: "CRAFTING DIGITAL EXPERIENCES AT THE EDGE OF GRAPHICS",
      // TODO: Enter your introductory lead sentence
      lead: "I craft cinematic digital experiences that blend high-performance real-time graphics with obsessive typography and tactile physics.",
      // TODO: Enter your bio paragraphs
      paragraphs: [
        "With a decade bridging software engineering and creative direction, I build bespoke interactive web products, real-time 3D environments, and memorable brand moments.",
        "My work focuses on the sweet spot between mathematical precision and emotional resonance—using custom GLSL shaders, procedural systems, and physics simulations to bring stories to life at 60fps.",
      ],
      // TODO: Enter your core disciplines / traits
      traits: [
        "Creative Technologist",
        "Shader & WebGL Specialist",
        "Full-Stack TypeScript",
        "Interactive Art Director",
      ],
    },
    // TODO: Update with your real experience statistics
    stats: [
      { label: "Primary Focus", value: "3D", suffix: " Web" },
      { label: "Interactive Case Studies", value: "6", suffix: "" },
      { label: "Interactive 3D Demos", value: "12", suffix: "+" },
      { label: "Target Performance", value: "60", suffix: "fps" },
    ],
  },

  transition: {
    // TODO: Customize transition section badge and HUD label
    badge: "02 // TRANSITION",
    hudLabel: "GPU PARTICLE SCENE",
    // TODO: Customize transition headline and core philosophy statement
    headline: "BRIDGING CODE & AESTHETICS",
    statement: "Crafting real-time WebGL experiences where procedural shaders meet kinetic typography.",
  },

  socials: {
    // TODO: Replace with your GitHub URL
    github: "https://github.com",
    // TODO: Replace with your LinkedIn URL
    linkedin: "https://linkedin.com",
    // TODO: Replace with your X (Twitter) URL
    x: "https://x.com",
    // TODO: Replace with your public contact email
    email: "arpit.meena.dev@example.com",
  },

  services: {
    title: "WHAT I DO",
    subtitle: "A dual practice spanning architecture and aesthetics.",
    develop: {
      title: "DEVELOP",
      category: "CREATIVE ENGINEERING",
      description:
        "Building bulletproof interactive systems that run fluidly across mobile, desktop, and spatial displays.",
      points: [
        "Real-Time 3D & WebGL / WebGPU pipeline development",
        "Custom GLSL / WGSL shaders for fluids, glass, chrome & volumetric light",
        "Rigid-body and soft-body interactive physics simulations (Rapier / Cannon)",
        "Micro-frontend architecture with Next.js 15, App Router & TypeScript",
        "GPU instancing & frame-budget optimization targeting persistent 60fps",
      ],
      tech: ["Three.js", "R3F", "GLSL", "Next.js", "Rapier", "WebGPU", "Zustand"],
    },
    design: {
      title: "DESIGN",
      category: "ART DIRECTION & SYSTEMS",
      description:
        "Orchestrating typography, spatial layout, and motion choreography into tactile digital landscapes.",
      points: [
        "Kinetic editorial layouts with massive serif typography & HUD micro-details",
        "3D world building, avatar styling, camera choreography & lighting art direction",
        "Physics-driven micro-interactions and organic liquid motion systems",
        "Design systems engineered directly in code with Tailwind CSS and tokens",
        "Interactive prototypes for visionary brands and luxury studios",
      ],
      tech: ["Blender", "Figma", "Cinema 4D", "Spline", "Motion Systems", "GSAP"],
    },
  },

  career: {
    title: "CAREER TIMELINE",
    subtitle: "A chronological track record in creative web engineering.",
    items: [
      {
        year: "2024 — PRESENT",
        period: "Ongoing",
        role: "Freelance Web Developer — Now",
        company: "Self-Employed",
        location: "India (Remote)",
        description:
          "Designing and developing high-performance modern web applications, interactive 3D WebGL experiences, and custom user interfaces with Next.js and Three.js.",
        highlights: [
          "Building production-ready responsive applications with Next.js, TypeScript, and Tailwind CSS",
          "Developing real-time interactive 3D WebGL scenes using React Three Fiber and Three.js",
          "Implementing accessible animations and smooth scroll choreographies with GSAP and Lenis",
        ],
        skills: ["Next.js", "React", "TypeScript", "Three.js", "Tailwind CSS"],
      },
      // TODO: Entry 2 - Add your previous role or company experience
      {
        year: "2023 — 2024",
        period: "1 Year",
        role: "Frontend Developer // TODO: Your Previous Role",
        company: "TODO: Company / Studio Name",
        location: "TODO: Location / Remote",
        description:
          "TODO: Summarize your responsibilities, team collaboration, and key technologies used during this position.",
        highlights: [
          "TODO: Highlight a key feature, refactor, or product milestone delivered",
          "TODO: Highlight a performance improvement or technical architecture achievement",
          "TODO: Highlight any client or cross-functional team delivery impact",
        ],
        skills: ["React", "TypeScript", "CSS / Tailwind", "REST APIs", "Git"],
      },
      // TODO: Entry 3 - Add your earlier role or freelance projects
      {
        year: "2022 — 2023",
        period: "1 Year",
        role: "Web Developer // TODO: Your Earlier Role",
        company: "TODO: Company / Agency Name",
        location: "TODO: Location / Remote",
        description:
          "TODO: Describe your work building responsive web interfaces, component libraries, and client deliverables.",
        highlights: [
          "TODO: Key milestone or client website launched",
          "TODO: Interactive component or motion design implementation",
        ],
        skills: ["JavaScript", "HTML5/CSS3", "React", "UI/UX", "Responsive Design"],
      },
      // TODO: Entry 4 - Add your foundational role, internship, or education milestone
      {
        year: "2021 — 2022",
        period: "1 Year",
        role: "Junior Web Developer / Intern // TODO: Your Initial Role",
        company: "TODO: Company / Institute Name",
        location: "TODO: Location / Remote",
        description:
          "TODO: Detail your foundational work in frontend development, modern JavaScript frameworks, and design implementation.",
        highlights: [
          "TODO: Foundational projects or learning achievements",
          "TODO: Collaborative web projects or tooling setup",
        ],
        skills: ["JavaScript", "HTML5", "CSS3", "Git", "Web Standards"],
      },
    ],
  },

  // TODO: Replace these placeholder projects with your real client and personal projects (update titles, slugs, client names, briefs, results, metrics, and hero images in public/work/<slug>/hero.webp)
  projects: [
    {
      id: "01",
      number: "01",
      slug: "kroma-creative-studio",
      title: "Kroma Creative Studio",
      tagline: "Generative brand platform and real-time audio-visual web experience",
      category: "CREATIVE DEV / WEBGL",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2026",
      // TODO: Replace with real client name if commissioned
      client: "Kroma Media Lab",
      role: "Creative Developer & Technical Artist",
      brief:
        "An experimental brand showcase featuring real-time metallic reflections, simplex noise vertex displacement, and audio-reactive surface turbulence.",
      approach:
        "Engineered custom GLSL vertex and fragment shaders with analytical normal reconstruction, environment reflection mapping, and dynamic light refraction.",
      result:
        "Created an interactive real-time platform running directly in the browser with responsive cursor turbulence and procedural chrome luster.",
      tags: ["Three.js", "GLSL Shaders", "Audio API", "Postprocessing", "Next.js"],
      image: "/work/kroma-creative-studio/hero.webp",
      heroImage: "/work/kroma-creative-studio/hero.webp",
      gallery: [
        {
          src: "/work/kroma-creative-studio/gallery-1.webp",
          alt: "Kroma Shader Viewport",
          caption: "Real-time Simplex noise vertex displacement with normal reconstruction",
        },
        {
          src: "/work/kroma-creative-studio/gallery-2.webp",
          alt: "Fluid Metallic Specularity",
          caption: "High-dynamic-range reflection mapping across fluid mesh curvature",
        },
        {
          src: "/work/kroma-creative-studio/gallery-3.webp",
          alt: "Audio-Reactive Waveform Testing",
          caption: "Web Audio API frequency analysis driving harmonic ripple oscillations",
        },
      ],
      deliverable: "Interactive WebGL Platform",
      focusLabel: "GLSL SHADERS & DISPLACEMENT",
      statusLabel: "PRODUCTION RELEASE",
      targetLabel: "60 FPS WEBGL",
      seo: {
        title: "Kroma Creative Studio — Interactive Web Experience",
        description:
          "Generative brand platform and real-time audio-visual web experience by Arpit Meena.",
        ogImage: "/work/kroma-creative-studio/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available (e.g. frame rate, draw calls)
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
    {
      id: "02",
      number: "02",
      slug: "lumina-lighting-systems",
      title: "Lumina Lighting Systems",
      tagline: "Interactive 3D architectural showroom & luminaire configurator",
      category: "E-COMMERCE / REAL-TIME 3D",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2025",
      // TODO: Replace with real client name if commissioned
      client: "Lumina Lighting Design",
      role: "Lead 3D Architect",
      brief:
        "A spatial product showroom allowing architects to configure and inspect luminaires in interactive 3D rooms with realistic photometric lighting.",
      approach:
        "Constructed using React Three Fiber, Rapier physics, custom PBR glass refraction materials, and glTF meshopt geometry compression.",
      result:
        "Delivered a lightweight web-based 3D configurator with smooth orbit controls and real-time shadow casting.",
      tags: ["React Three Fiber", "PBR Shaders", "Rapier Physics", "Zustand", "Tailwind"],
      image: "/work/lumina-lighting-systems/hero.webp",
      heroImage: "/work/lumina-lighting-systems/hero.webp",
      gallery: [
        {
          src: "/work/lumina-lighting-systems/gallery-1.webp",
          alt: "Showroom Overview",
          caption: "Real-time 3D architectural environment with luminaire configurator",
        },
        {
          src: "/work/lumina-lighting-systems/gallery-2.webp",
          alt: "PBR Glass Refraction",
          caption: "Physical glass material rendering with transmission and surface roughness",
        },
        {
          src: "/work/lumina-lighting-systems/gallery-3.webp",
          alt: "Inspection Camera View",
          caption: "Touch-optimized orbit and focus inspection interface",
        },
      ],
      deliverable: "3D Configurator Platform",
      focusLabel: "R3F & PBR MATERIALS",
      statusLabel: "PRODUCTION SHIP",
      targetLabel: "DESKTOP & MOBILE 3D",
      seo: {
        title: "Lumina Lighting Systems — 3D Showroom Configurator",
        description:
          "Interactive 3D architectural luminaire configurator built with React Three Fiber and PBR shaders.",
        ogImage: "/work/lumina-lighting-systems/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
    {
      id: "03",
      number: "03",
      slug: "chronos-data-observatory",
      title: "Chronos Data Observatory",
      tagline: "High-density volumetric data visualization & real-time GPU analytics",
      category: "DATA VISUALIZATION / GPU COMPUTE",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2025",
      // TODO: Replace with real client name if commissioned
      client: "Chronos Global Intelligence",
      role: "Lead Creative Technologist",
      brief:
        "A computational graphics platform visualizing high-dimensional data streams through an interactive 3D particle singularity that clusters dynamically.",
      approach:
        "Engineered GPGPU simulation updating particle positions and velocities in texture buffers with additive bloom and camera fly-through choreography.",
      result:
        "Produced a fluid volumetric data observatory supporting smooth orbit and cluster analytics directly in WebGL.",
      tags: ["GPGPU", "WebGPU", "Particles", "Three.js", "GSAP ScrollTrigger"],
      image: "/work/chronos-data-observatory/hero.webp",
      heroImage: "/work/chronos-data-observatory/hero.webp",
      gallery: [
        {
          src: "/work/chronos-data-observatory/gallery-1.webp",
          alt: "Particle Singularity",
          caption: "High-density particle core with additive luminance bloom",
        },
        {
          src: "/work/chronos-data-observatory/gallery-2.webp",
          alt: "Curl Noise Field",
          caption: "Curl noise vector fields driving dynamic particle velocities",
        },
        {
          src: "/work/chronos-data-observatory/gallery-3.webp",
          alt: "Camera Fly-Through",
          caption: "Catmull-Rom spline camera trajectory through particle constellation",
        },
      ],
      deliverable: "GPU Compute Data Platform",
      focusLabel: "GPGPU & COMPUTE SHADERS",
      statusLabel: "TECHNICAL RELEASE",
      targetLabel: "HIGH-DENSITY COMPUTE",
      seo: {
        title: "Chronos Data Observatory — High-Density 3D Visualization",
        description:
          "Volumetric 3D data visualization and GPGPU compute platform built with Three.js.",
        ogImage: "/work/chronos-data-observatory/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
    {
      id: "04",
      number: "04",
      slug: "atelier-horlogerie",
      title: "Atelier Haute Horlogerie",
      tagline: "Editorial digital lookbook with pinned horizontal translation & micro-motion",
      category: "EDITORIAL / HORIZONTAL SHOWCASE",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2024",
      // TODO: Replace with real client name if commissioned
      client: "Atelier Horlogerie Geneva",
      role: "Lead Frontend Engineer & Art Director",
      brief:
        "A bespoke digital showcase for luxury timepieces with pinned horizontal scroll translation, mouse-tilt 3D cards, and editorial typography.",
      approach:
        "Built horizontal pinning using Lenis smooth scroll and GSAP ScrollTrigger, paired with multi-layer CSS 3D transforms and backdrop filters.",
      result:
        "Created a luxury editorial experience featuring fluid scroll choreography, typography hierarchy, and responsive card parallax.",
      tags: ["GSAP ScrollTrigger", "Lenis Smooth Scroll", "Next.js", "CSS 3D", "Tailwind CSS"],
      image: "/work/atelier-horlogerie/hero.webp",
      heroImage: "/work/atelier-horlogerie/hero.webp",
      gallery: [
        {
          src: "/work/atelier-horlogerie/gallery-1.webp",
          alt: "Horizontal Pinned Vault",
          caption: "Sticky fullscreen container translating cards horizontally on scroll",
        },
        {
          src: "/work/atelier-horlogerie/gallery-2.webp",
          alt: "Editorial Typography Layout",
          caption: "Massive serif headings paired with technical HUD micro-details",
        },
        {
          src: "/work/atelier-horlogerie/gallery-3.webp",
          alt: "Interactive 3D Card Hover",
          caption: "Pointer-driven CSS 3D matrix transform on card interaction",
        },
      ],
      deliverable: "Interactive Editorial Showcase",
      focusLabel: "HORIZONTAL PINNING & GSAP",
      statusLabel: "PRODUCTION RELEASE",
      targetLabel: "FLUID SCROLL UX",
      seo: {
        title: "Atelier Haute Horlogerie — Interactive Digital Lookbook",
        description:
          "Luxury timepiece lookbook featuring pinned horizontal scroll translation and GSAP ScrollTrigger.",
        ogImage: "/work/atelier-horlogerie/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
    {
      id: "05",
      number: "05",
      slug: "pulse-interactive-pavilion",
      title: "Pulse Interactive Pavilion",
      tagline: "Tactile interactive exhibition space with dynamic rigid-body physics",
      category: "SPATIAL WEB / RAPIER PHYSICS",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2024",
      // TODO: Replace with real client name if commissioned
      client: "Pulse Media Arts Festival",
      role: "Interactive Developer & Technical Artist",
      brief:
        "An interactive digital pavilion where architectural elements drop with physical mass and scatter when nudged by visitor cursor impulses.",
      approach:
        "Utilized @react-three/rapier with instanced dynamic rigid-bodies, continuous collision detection, and raycast mouse kinematic impulse force fields.",
      result:
        "Delivered a tactile browser-based interactive pavilion running real-time rigid body dynamics at 60 frames per second.",
      tags: ["@react-three/rapier", "Physics", "Raycasting", "Instancing", "Three.js"],
      image: "/work/pulse-interactive-pavilion/hero.webp",
      heroImage: "/work/pulse-interactive-pavilion/hero.webp",
      gallery: [
        {
          src: "/work/pulse-interactive-pavilion/gallery-1.webp",
          alt: "Physics Arena",
          caption: "Dynamic rigid bodies colliding within bounding viewport limits",
        },
        {
          src: "/work/pulse-interactive-pavilion/gallery-2.webp",
          alt: "Cursor Repulsion Field",
          caption: "Raycast cursor impulses scattering nearby physical geometries",
        },
        {
          src: "/work/pulse-interactive-pavilion/gallery-3.webp",
          alt: "Continuous Collision Dynamics",
          caption: "Rapier engine maintaining collision precision under rapid pointer swipes",
        },
      ],
      deliverable: "Interactive 3D Physics Pavilion",
      focusLabel: "RAPIER & RIGID BODIES",
      statusLabel: "PRODUCTION INSTALLATION",
      targetLabel: "TACTILE 3D PHYSICS",
      seo: {
        title: "Pulse Interactive Pavilion — Interactive 3D Physics Experience",
        description:
          "Tactile rigid-body physics pavilion featuring @react-three/rapier and pointer raycasting.",
        ogImage: "/work/pulse-interactive-pavilion/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
    {
      id: "06",
      number: "06",
      slug: "nomad-digital-narrative",
      title: "Nomad Digital Narrative",
      tagline: "Interactive 3D storytelling journey with camera-linked choreography",
      category: "NARRATIVE / 3D CHARACTER",
      // TODO: Replace concept project with real work (set type: "client" and specify real client)
      type: "concept",
      year: "2023",
      // TODO: Replace with real client name if commissioned
      client: "Nomad Interactive Studios",
      role: "3D Director & WebGL Engineer",
      brief:
        "A cinematic narrative experience following a stylized 3D character exploring futuristic environments as the audience navigates the story.",
      approach:
        "Blender character rigging with animation blending, scroll-scrubbed camera paths via CatmullRomCurve3, and dynamic lighting triggers.",
      result:
        "Delivered a scroll-choreographed narrative experience demonstrating seamless animation blending and dynamic camera transitions.",
      tags: ["Blender", "Character Animation", "Three.js", "Curve Animation", "GLTF"],
      image: "/work/nomad-digital-narrative/hero.webp",
      heroImage: "/work/nomad-digital-narrative/hero.webp",
      gallery: [
        {
          src: "/work/nomad-digital-narrative/gallery-1.webp",
          alt: "Character Rigging",
          caption: "Stylized rigged character mesh with articulated kinematic joints",
        },
        {
          src: "/work/nomad-digital-narrative/gallery-2.webp",
          alt: "Workstation Desk Environment",
          caption: "Cybernetic desk mount and typing lighting choreography",
        },
        {
          src: "/work/nomad-digital-narrative/gallery-3.webp",
          alt: "Scroll Camera Paths",
          caption: "Catmull-Rom spline curves translating camera smoothly between chapters",
        },
      ],
      deliverable: "3D Character Experience",
      focusLabel: "3D RIGGING & CAMERA PATHS",
      statusLabel: "PRODUCTION RELEASE",
      targetLabel: "SCROLL-LINKED CAMERA",
      seo: {
        title: "Nomad Digital Narrative — Interactive 3D Story Experience",
        description:
          "Scroll-choreographed 3D character experience with Blender rigging and Three.js camera paths.",
        ogImage: "/work/nomad-digital-narrative/hero.webp",
      },
      // TODO: Add real measured benchmark metrics if available
      metrics: undefined,
      // TODO: Add your live deployment URL or leave undefined
      liveUrl: undefined,
      // TODO: Replace with your actual repository URL
      githubUrl: "https://github.com",
    },
  ],

  techStack: [
    { name: "TypeScript", category: "Frontend", color: "#3178C6", accent: "#60A5FA", level: 98, radius: 0.9, logo: "/logos/typescript.svg", initials: "TS" },
    { name: "Three.js", category: "3D & Creative", color: "#000000", accent: "#F43F5E", level: 96, radius: 1.0, logo: "/logos/threejs.svg", initials: "3JS" },
    { name: "React Three Fiber", category: "3D & Creative", color: "#61DAFB", accent: "#38BDF8", level: 95, radius: 0.95, logo: "/logos/react-three-fiber.svg", initials: "R3F" },
    { name: "GLSL / Shaders", category: "3D & Creative", color: "#8B5CF6", accent: "#C084FC", level: 92, radius: 0.9, logo: "/logos/glsl.svg", initials: "GLSL" },
    { name: "Next.js 15", category: "Frontend", color: "#000000", accent: "#E4E4E7", level: 96, radius: 1.0, logo: "/logos/nextjs.svg", initials: "N15" },
    { name: "React 19", category: "Frontend", color: "#61DAFB", accent: "#38BDF8", level: 96, radius: 0.95, logo: "/logos/react.svg", initials: "R19" },
    { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", accent: "#67E8F9", level: 98, radius: 0.9, logo: "/logos/tailwind.svg", initials: "TW" },
    { name: "GSAP / ScrollTrigger", category: "3D & Creative", color: "#88CE02", accent: "#A3E635", level: 94, radius: 0.95, logo: "/logos/gsap.svg", initials: "GSAP" },
    { name: "Rapier Physics", category: "3D & Creative", color: "#EC4899", accent: "#F472B6", level: 90, radius: 0.85, logo: "/logos/rapier.svg", initials: "RP" },
    { name: "Lenis Scroll", category: "Frontend", color: "#A855F7", accent: "#C084FC", level: 92, radius: 0.85, logo: "/logos/lenis.svg", initials: "LENIS" },
    { name: "Zustand", category: "Frontend", color: "#EAB308", accent: "#FDE047", level: 94, radius: 0.85, logo: "/logos/zustand.svg", initials: "ZU" },
    { name: "Blender 3D", category: "3D & Creative", color: "#EA7600", accent: "#FB923C", level: 88, radius: 0.9, logo: "/logos/blender.svg", initials: "BL" },
    { name: "Node.js", category: "Backend", color: "#339933", accent: "#4ADE80", level: 90, radius: 0.9, logo: "/logos/nodejs.svg", initials: "NODE" },
    { name: "PostgreSQL", category: "Backend", color: "#4169E1", accent: "#60A5FA", level: 86, radius: 0.85, logo: "/logos/postgresql.svg", initials: "PG" },
    { name: "WebGPU", category: "3D & Creative", color: "#FF4500", accent: "#FB923C", level: 82, radius: 0.85, logo: "/logos/webgpu.svg", initials: "GPU" },
    { name: "Postprocessing", category: "3D & Creative", color: "#D946EF", accent: "#E879F9", level: 91, radius: 0.85, logo: "/logos/postprocessing.svg", initials: "FX" },
    { name: "Docker", category: "Tools & Infra", color: "#2496ED", accent: "#38BDF8", level: 85, radius: 0.8, logo: "/logos/docker.svg", initials: "DOC" },
    { name: "Git / GitHub", category: "Tools & Infra", color: "#F05032", accent: "#FB7185", level: 95, radius: 0.9, logo: "/logos/git.svg", initials: "GIT" },
    { name: "Figma", category: "Tools & Infra", color: "#F24E1E", accent: "#FB923C", level: 92, radius: 0.85, logo: "/logos/figma.svg", initials: "FIG" },
    { name: "Vercel", category: "Tools & Infra", color: "#000000", accent: "#E4E4E7", level: 94, radius: 0.85, logo: "/logos/vercel.svg", initials: "VC" },
    { name: "GraphQL", category: "Backend", color: "#E10098", accent: "#F472B6", level: 85, radius: 0.8, logo: "/logos/graphql.svg", initials: "GQL" },
    { name: "WebGL 2.0", category: "3D & Creative", color: "#990000", accent: "#F87171", level: 93, radius: 0.9, logo: "/logos/webgl.svg", initials: "GL2" },
    { name: "Turbopack / Vite", category: "Tools & Infra", color: "#646CFF", accent: "#818CF8", level: 89, radius: 0.8, logo: "/logos/turbopack.svg", initials: "VITE" },
    { name: "Prisma ORM", category: "Backend", color: "#2D3748", accent: "#94A3B8", level: 88, radius: 0.8, logo: "/logos/prisma.svg", initials: "PRIS" },
    { name: "CSS Shaders / Houdini", category: "Frontend", color: "#8B5CF6", accent: "#C084FC", level: 86, radius: 0.8, logo: "/logos/css.svg", initials: "CSS" },
    { name: "Web Audio API", category: "Frontend", color: "#10B981", accent: "#34D399", level: 84, radius: 0.8, logo: "/logos/webaudio.svg", initials: "AUD" },
    { name: "glTF / Draco / KTX2", category: "3D & Creative", color: "#3B82F6", accent: "#93C5FD", level: 90, radius: 0.85, logo: "/logos/gltf.svg", initials: "GLTF" },
    { name: "Framer Motion", category: "Frontend", color: "#0055FF", accent: "#38BDF8", level: 92, radius: 0.85, logo: "/logos/framermotion.svg", initials: "FM" },
    { name: "REST APIs", category: "Backend", color: "#059669", accent: "#34D399", level: 94, radius: 0.85, logo: "/logos/rest.svg", initials: "REST" },
    { name: "Jest / Vitest", category: "Tools & Infra", color: "#C21325", accent: "#F87171", level: 87, radius: 0.8, logo: "/logos/jest.svg", initials: "TEST" },
  ],

  contact: {
    heading: "LET'S BUILD SOMETHING EXTRAORDINARY",
    subheading:
      "Available for visionary commissions, agency collaborations, and high-impact digital experiences.",
    // TODO: Replace with your real contact email
    email: "arpit.meena.dev@example.com",
    directNote: "Expected reply within 24 hours. Based in India (IST, UTC+5:30).",
    // Working locations and timezones
    locations: [
      {
        city: "INDIA",
        timezone: "IST (UTC+5:30)",
        status: "ACTIVE // Q2-Q3",
      },
    ],
  },
};
