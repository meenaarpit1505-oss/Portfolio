import { create } from "zustand";

export type SectionId =
  | "hero"
  | "transition"
  | "about"
  | "what-i-do"
  | "career"
  | "work"
  | "tech-stack"
  | "contact";

export interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export interface CursorState {
  hovered: boolean;
  cursorText: string | null;
  variant: "default" | "hover" | "card" | "drag" | "hidden";
}

export interface ScrollState {
  scrollY: number;
  scrollProgress: number; // 0 to 1 overall
  activeSection: SectionId;
  activeSectionIndex: number;
  sectionProgress: Record<SectionId, number>; // 0 to 1 for each section
  mouse: MouseState;
  cursor: CursorState;
  isLoaded: boolean;
  loadingProgress: number;
  reducedMotion: boolean;

  // Actions
  setScroll: (scrollY: number, scrollProgress: number) => void;
  setSectionProgress: (section: SectionId, progress: number) => void;
  setActiveSection: (section: SectionId, index: number) => void;
  setMouse: (targetX: number, targetY: number) => void;
  updateMouseLerp: (x: number, y: number) => void;
  setCursor: (cursor: Partial<CursorState>) => void;
  setLoadingProgress: (progress: number) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  scrollToSection: (id: string) => void;
}

export const SECTIONS: SectionId[] = [
  "hero",
  "transition",
  "about",
  "what-i-do",
  "career",
  "work",
  "tech-stack",
  "contact",
];

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  scrollProgress: 0,
  activeSection: "hero",
  activeSectionIndex: 0,
  sectionProgress: {
    hero: 1,
    transition: 0,
    about: 0,
    "what-i-do": 0,
    career: 0,
    work: 0,
    "tech-stack": 0,
    contact: 0,
  },
  mouse: {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  },
  cursor: {
    hovered: false,
    cursorText: null,
    variant: "default",
  },
  isLoaded: false,
  loadingProgress: 0,
  reducedMotion: false,

  setScroll: (scrollY, scrollProgress) =>
    set({
      scrollY,
      scrollProgress: Math.min(Math.max(scrollProgress, 0), 1),
    }),

  setSectionProgress: (section, progress) =>
    set((state) => ({
      sectionProgress: {
        ...state.sectionProgress,
        [section]: Math.min(Math.max(progress, 0), 1),
      },
    })),

  setActiveSection: (section, index) =>
    set({
      activeSection: section,
      activeSectionIndex: index,
    }),

  setMouse: (targetX, targetY) =>
    set((state) => ({
      mouse: {
        ...state.mouse,
        targetX,
        targetY,
      },
    })),

  updateMouseLerp: (x, y) =>
    set((state) => ({
      mouse: {
        ...state.mouse,
        x,
        y,
      },
    })),

  setCursor: (cursor) =>
    set((state) => ({
      cursor: {
        ...state.cursor,
        ...cursor,
      },
    })),

  setLoadingProgress: (loadingProgress) =>
    set({ loadingProgress: Math.min(Math.max(loadingProgress, 0), 100) }),

  setIsLoaded: (isLoaded) => set({ isLoaded }),

  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  scrollToSection: (id: string) => {
    if (typeof window === "undefined") return;
    const targetId = id.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(el, { duration: 1.2 });
    }
    el.scrollIntoView({ behavior: "smooth" });
  },
}));
