/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#900C3F", // Example primary color
        secondary: "#e74c3c", // Example secondary color
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
