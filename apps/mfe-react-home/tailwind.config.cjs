/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        primary: "var(--primary)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--text-muted)"
      }
    }
  },
  plugins: []
};
