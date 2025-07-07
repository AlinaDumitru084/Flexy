// Paste this code into the new tailwind.config.ts file

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // We are including our Night Mode rule here!
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      // You can add custom colors, fonts, etc. here later
    },
  },
  plugins: [require("tailwindcss-animate")],
}