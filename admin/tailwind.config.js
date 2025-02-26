/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#900C3F', // Example primary color
        secondary: '#e74c3c', // Example secondary color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example sans-serif font
        serif: ['Merriweather', 'serif'], // Example serif font
      },
    },
  },
  plugins: [],
};
