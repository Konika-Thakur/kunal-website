import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0b0a09", 2: "#141210", 3: "#1d1a17" },
        bone: { DEFAULT: "#efe9df", 2: "#e4dccd", dim: "#a59d90" },
        gold: { DEFAULT: "#c8a46a", 2: "#e2c48e" },
        // wedding
        ivory: { DEFAULT: "#f7f1e8", 2: "#efe5d6" },
        maroon: { DEFAULT: "#6e1c26", 2: "#4a1219" },
        // property
        stone: { DEFAULT: "#f3f1ec", 2: "#e7e3da", 3: "#d6d0c4" },
        slate: { DEFAULT: "#1f2a2e" },
        sage: { DEFAULT: "#7d8b74" },
        // corporate
        navy: { DEFAULT: "#0c1424", 2: "#121d33", 3: "#1b2a47" },
        electric: { DEFAULT: "#5b8cff" },
        // films
        ember: { DEFAULT: "#ff5a36" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        arch: ["var(--font-arch)", "var(--font-sans)", "sans-serif"],
        tech: ["var(--font-tech)", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: { mega: "0.35em" },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        "marquee-y": { to: { transform: "translateY(-50%)" } },
        kenburns: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.12)" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        kenburns: "kenburns 18s ease-out both",
        "up-slow": "marquee-y 50s linear infinite",
        "up-fast": "marquee-y 36s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
