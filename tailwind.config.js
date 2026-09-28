/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Paleta de marca Nivo ───────────────────────────────
        // Primario: azul índigo profundo (confianza + tecnología)
        primary: {
          50: "#eef1fd",
          100: "#dbe2fb",
          200: "#bcc8f6",
          300: "#93a4ef",
          400: "#6a7ce6",
          500: "#2a4bd4", // color principal
          600: "#233fb5",
          700: "#1e3494",
          800: "#1b2a6b", // índigo noche (hover / headers)
          900: "#151f4d",
          950: "#0d1330",
        },
        // Acento: turquesa (crecimiento, éxito, CTAs)
        accent: {
          50: "#e6faf7",
          100: "#c6f2ec",
          200: "#8fe6da",
          300: "#54d5c6",
          400: "#26c2b1",
          500: "#12b5a5", // acento principal
          600: "#0c9184",
          700: "#0d746b",
          800: "#0f5c56",
          900: "#0f4b47",
        },
        // Neutros / superficies
        ink: {
          DEFAULT: "#0f1729", // texto principal
          soft: "#5b6472", // texto secundario
          faint: "#8b93a1", // texto tenue
        },
        // Modo oscuro / portal
        night: {
          950: "#070b18",
          900: "#0b1120",
          800: "#111a2e",
          700: "#1a2540",
          600: "#26324f",
          border: "#25314d",
        },
        // Estados
        warn: {
          soft: "#fef3e2",
          500: "#f5a524",
          600: "#d98a12",
        },
        danger: {
          soft: "#fdeaeb",
          500: "#e5484d",
          600: "#c93b40",
        },
        ok: {
          soft: "#e6faf7",
          500: "#12b5a5",
          600: "#0c9184",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        heading: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,41,0.04), 0 4px 16px rgba(15,23,41,0.06)",
        elevated: "0 8px 30px rgba(15,23,41,0.10)",
        glow: "0 0 0 4px rgba(42,75,212,0.12)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out both",
        spinSlow: "spinSlow 1s linear infinite",
      },
    },
  },
  plugins: [],
};
