import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          50: "#f8f7f5",
          100: "#efece6",
          200: "#dcd6c8",
          300: "#bdb19b",
          400: "#9c8d72",
          500: "#7e6f56",
          600: "#5f5340",
          700: "#403930",
          800: "#252220",
          900: "#16140f",
          950: "#0c0a08",
        },
        accent: {
          DEFAULT: "#e85d2f",
          50: "#fef4ed",
          100: "#fde5d5",
          200: "#fac6a8",
          300: "#f69f72",
          400: "#f17a45",
          500: "#e85d2f",
          600: "#cf3f15",
          700: "#a92f15",
          800: "#7d2818",
          900: "#532014",
        },
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "aurora": "aurora 18s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1) rotate(0deg)" },
          "33%": { transform: "translate(8%, -6%) scale(1.1) rotate(15deg)" },
          "66%": { transform: "translate(-6%, 8%) scale(0.95) rotate(-10deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "soft": "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        "elevated":
          "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -4px rgba(0,0,0,0.08), 0 24px 48px -8px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
