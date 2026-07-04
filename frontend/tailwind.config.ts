import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#07111f",
          800: "#0f1a2d",
          700: "#1a2740"
        },
        sage: {
          50: "#f4fbf6",
          100: "#def4e4",
          600: "#2f8f57",
          700: "#237246"
        },
        alert: {
          red: "#dc2626",
          yellow: "#d97706"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(7, 17, 31, 0.10)",
        insetGlow: "inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        dashboard: "radial-gradient(circle at top left, rgba(47,143,87,0.16), transparent 28%), linear-gradient(180deg, #f6f9fc 0%, #eef4f8 100%)",
        tenant: "radial-gradient(circle at top, rgba(47,143,87,0.18), transparent 38%), linear-gradient(180deg, #f8fafc 0%, #eef4f7 100%)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.45s ease-out both",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;