import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        sans: ['Inter', 'sans-serif'],
        spiritual: ['Crimson Pro', 'serif'],
        lato: ['Lato', 'Inter', 'sans-serif'],
        bodoni: ['"Libre Bodoni"', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          light: "hsl(var(--terracotta-light))",
          dark: "hsl(var(--terracotta-dark))",
        },
        sage: {
          DEFAULT: "hsl(var(--sage))",
          light: "hsl(var(--sage-light))",
          dark: "hsl(var(--sage-dark))",
        },
        ochre: {
          DEFAULT: "hsl(var(--ochre))",
          light: "hsl(var(--ochre-light))",
          dark: "hsl(var(--ochre-dark))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
        charcoal: {
          DEFAULT: "hsl(var(--charcoal))",
          light: "hsl(var(--charcoal-light))",
        },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // ============================================
        // Wholelicity Brand Palette — 6-column scale
        // Each column: 50 (+90%) → 950 (-90%)
        // ============================================

        // Column 1 — Earth (#5A4C3A)
        "wl-earth": {
          DEFAULT: "#5A4C3A",
          50:  "#F1EDE9",
          100: "#E3DCD3",
          200: "#C7B9A7",
          300: "#AA967A",
          400: "#867156",
          500: "#5A4C3A",
          600: "#483D2E",
          700: "#362E23",
          800: "#241E17",
          900: "#120F0C",
          950: "#090806",
        },

        // Column 2 — Olive (#746653)
        "wl-olive": {
          DEFAULT: "#746653",
          50:  "#F2F0ED",
          100: "#E5E1DB",
          200: "#CBC2B6",
          300: "#B2A492",
          400: "#98856D",
          500: "#746653",
          600: "#5D5142",
          700: "#463D32",
          800: "#2F2921",
          900: "#171411",
          950: "#0C0A08",
        },

        // Column 3 — Stone (#8A7356)
        "wl-stone": {
          DEFAULT: "#8A7356",
          50:  "#F4F1ED",
          100: "#E9E3DC",
          200: "#D3C7B9",
          300: "#BDAB96",
          400: "#A78F72",
          500: "#8A7356",
          600: "#6E5C45",
          700: "#534534",
          800: "#372E23",
          900: "#1C1711",
          950: "#0E0B09",
        },

        // Column 4 — Sage (#C5B49B)
        "wl-sage": {
          DEFAULT: "#C5B49B",
          50:  "#F9F8F5",
          100: "#F3F0EB",
          200: "#E8E1D7",
          300: "#DCD2C3",
          400: "#D1C3AF",
          500: "#C5B49B",
          600: "#AC936E",
          700: "#866F4D",
          800: "#594A33",
          900: "#2D251A",
          950: "#16130D",
        },

        // Column 5 — Parchment (#DED1BA)
        "wl-parchment": {
          DEFAULT: "#DED1BA",
          50:  "#FCFAF8",
          100: "#F8F6F1",
          200: "#F2EDE3",
          300: "#EBE3D6",
          400: "#E4DAC8",
          500: "#DED1BA",
          600: "#C3AC83",
          700: "#A58650",
          800: "#6E5935",
          900: "#372D1B",
          950: "#1C160D",
        },

        // Column 6 — Linen (#F4EFE6)
        "wl-linen": {
          DEFAULT: "#F4EFE6",
          50:  "#FEFDFD",
          100: "#FDFCFA",
          200: "#FBF9F5",
          300: "#F8F6F0",
          400: "#F6F2EB",
          500: "#F4EFE6",
          600: "#D7C5A4",
          700: "#BA9B62",
          800: "#846A3A",
          900: "#42351D",
          950: "#211A0E",
        },

        // Highlight colors (Bible reader — functional, distinct hues)
        "hl-gold":   "#C5B49B",
        "hl-green":  "#87A96B",
        "hl-blue":   "#6B9FBF",
        "hl-purple": "#8B7BB5",
        "hl-red":    "#C47A6B",
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
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        "glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "pulse-node": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "breathe": "breathe 5s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "pulse-node": "pulse-node 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
