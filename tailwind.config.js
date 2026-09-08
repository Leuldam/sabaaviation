/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "theme-background": "#C1C2C7",
        surface: "#D9D9D9",
        "card-theme": "#E9E8E8",
        "accent-blue": "#91A5BA",
        "accent-blue-light": "#AAB8C6",
        "accent-gold": "#C8B06A",
        "deep-green": "#141414",
        midnight: "#0A0A0A",
        "dark-navy": "#121212",
        "navy-light": "#1C1C1C",
        "warm-gold": "#C8B06A",
        "light-gold": "#DBC485",
        gold: "#C8B06A",
        ivory: "#F7F5EF",
        "soft-cream": "#EEECE4",
        text: "#333333",
        muted: "#8E8E8E",
        borders: "#2A2A2A",
        "card-bg": "#141414",
        "card-border": "#222222",
      },
      fontFamily: {
        sans: ["var(--font-helvetica)", "var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        helvetica: ["var(--font-helvetica)", "Helvetica Neue", "Arial", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "marquee": "marquee 45s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
