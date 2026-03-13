import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        green: {
          primary: "#22c55e",
          bright: "#4ade80",
          dim: "#16a34a",
          glow: "#86efac",
        },
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "word-appear": "word-appear 0.8s ease-out forwards",
        "underline-grow": "underline-grow 1.5s ease-out forwards",
        "count-up": "count-up 2s ease-out forwards",
        "slide-in-left": "slide-in-left 0.45s ease-out forwards",
        "slide-in-right": "slide-in-right 0.45s ease-out forwards",
        "fade-in-up": "fade-in-up 0.45s ease-out forwards",
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.2)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
            boxShadow: "0 0 16px rgba(34, 197, 94, 0.4)"
          },
        },
        "word-appear": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.8)", filter: "blur(10px)" },
          "50%": { opacity: "0.8", transform: "translateY(10px) scale(0.95)", filter: "blur(2px)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
        },
        "underline-grow": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-250px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "shimmer": {
          "0%, 100%": {
            opacity: "0.5"
          },
          "50%": {
            opacity: "1"
          },
        },
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(34,197,94,0.15), rgba(0,0,0,0))",
      },
    },
  },
  plugins: [],
};

export default config;
