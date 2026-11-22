/** @type {import('tailwindcss').Config} */
/* eslint-disable @typescript-eslint/no-require-imports */
const defaultColors = require("tailwindcss/colors");

// Brand palette. Legacy pages used Tailwind blues/indigos and cool greys; remapping
// them here pulls every page (including ones not yet hand-restyled) onto the
// Beggin For A Bite colours: orange #F4623B, ink #241F1B, cream #FAF7F2.
const brandOrange = {
  50: "#FFF4EF", 100: "#FFE4D9", 200: "#FFC7B1", 300: "#FCA384", 400: "#F8825C",
  500: "#F4623B", 600: "#E14E27", 700: "#BB3D1D", 800: "#95321B", 900: "#792C1A", 950: "#41130A",
};
const warmNeutral = {
  50: "#FAF7F2", 100: "#F3EEE6", 200: "#E7E0D5", 300: "#D5CBBD", 400: "#ADA294",
  500: "#857A6D", 600: "#675D52", 700: "#4F4740", 800: "#2E2722", 900: "#1E1813", 950: "#0F0C0A",
};
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        fredoka: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
        caveat: ['var(--font-caveat)', 'cursive', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: brandOrange,
        indigo: brandOrange,
        sky: brandOrange,
        gray: warmNeutral,
        slate: warmNeutral,
        brand: { DEFAULT: "#F4623B", ...brandOrange },
        cream: "#FAF7F2",
        marigold: "#E3A438",
        mint: "#2bbf85",
        'k9-blue': '#241F1B',
        'k9-orange': '#F4623B',
        'k9-green': '#2bbf85',
        ink: "#241F1B",
        pine: {
          DEFAULT: "#1F3D2B",
          tint: "#EAF0EA",
        },
        paprika: "#B3552B",
        paper: "#F7F3EA",
        // Keep the brand `text-stone` token AND the full stone scale (stone-50 … stone-950)
        stone: { ...defaultColors.stone, DEFAULT: "#6B655C" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}