import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0b3b88",
        ink: "#0f172a",
        muted: "#5f6b84",
        surface: "#f5f7fb",
        line: "#dbe3f0",
        emerald: "#14b86a"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.10)",
        card: "0 24px 64px rgba(11, 59, 136, 0.10)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(11,59,136,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,59,136,0.06) 1px, transparent 1px)"
      },
      animation: {
        float: "float 8s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
