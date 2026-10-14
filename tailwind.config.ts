import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          DEFAULT: "#0d0d0f",
          secondary: "#141419",
          tertiary: "#1d1d24",
        },
        foreground: "#F5F5F5",
        muted: "#A1A1AA",
        "muted-dark": "#52525B",
        accent: {
          purple: "#8B5CF6",
          pink: "#EC4899",
          cyan: "#06B6D4",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(139, 92, 246, 0.3)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
        hud: "0.3em",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
        "accent-glow": "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)",
        "dark-radial": "radial-gradient(circle at 50% 50%, #0d0d12 0%, #050505 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
