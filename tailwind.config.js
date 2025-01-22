/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A446E",
        secondary: "#9C8DC1",
        tertiary: "#4b968b",
      },
    },
  },
  plugins: [],
}