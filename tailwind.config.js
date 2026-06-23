/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brutal: {
          canvas: "#000000",
          surface: "#1a1a1a",
          border: "#2e2e2e",
          crimson: "#dc2626",
          textMuted: "#a1a1aa"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
