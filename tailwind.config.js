/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#E8EAF2",
          dark: "#1B1E2B",
        },
        surface: {
          DEFAULT: "#EEF0F7",
          dark: "#22263A",
        },
        ink: {
          DEFAULT: "#2D2B55",
          dark: "#E4E6F5",
        },
        muted: {
          DEFAULT: "#8890B5",
          dark: "#6C74A0",
        },
        violet: "#6C5CE7",
        teal: "#00D2D3",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6C5CE7 0%, #00D2D3 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(108,92,231,0.12) 0%, rgba(0,210,211,0.12) 100%)",
      },
      boxShadow: {
        "neu-raised": "8px 8px 16px rgba(163, 168, 199, 0.45), -8px -8px 16px rgba(255, 255, 255, 0.9)",
        "neu-raised-sm": "4px 4px 8px rgba(163, 168, 199, 0.4), -4px -4px 8px rgba(255, 255, 255, 0.85)",
        "neu-pressed": "inset 4px 4px 8px rgba(163, 168, 199, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.9)",
        "neu-raised-dark": "8px 8px 16px rgba(10, 12, 20, 0.55), -8px -8px 16px rgba(42, 47, 68, 0.55)",
        "neu-pressed-dark": "inset 4px 4px 8px rgba(10, 12, 20, 0.6), inset -4px -4px 8px rgba(42, 47, 68, 0.5)",
      },
      borderRadius: {
        neu: "1.25rem",
      },
    },
  },
  plugins: [],
};
