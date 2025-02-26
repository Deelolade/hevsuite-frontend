/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#900C3F",
        secondary: "#FB0A0A",
        tertiary: "#FB0707",
        quatr: "#444444",
      },
      fontFamily: {
        primary: ["Lato", "sans-serif"],
        secondary: ["Playfair Display", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
