/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../mfe-react-home/src/**/*.{js,ts,jsx,tsx}",
    "../mfe-angular-about/src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  daisyui: {
    themes: [
      {
        execdark: {
          primary: "#2dd4bf",
          secondary: "#94a3b8",
          accent: "#2dd4bf",
          neutral: "#1e293b",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#263447",
          info: "#60a5fa",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444"
        }
      },
      {
        "exec-light": {
          primary: "#0d9488",
          secondary: "#475569",
          accent: "#0d9488",
          neutral: "#f1f5f9",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          info: "#0ea5e9",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626"
        }
      }
    ]
  },
  plugins: [require("daisyui")]
};
