/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gblue': 'linear-gradient(to bottom, #000066 0%, #990099 100%)',
      },
      backgroundColor: {
        'aliceblue': '#F0F8FF',
        'palegreen': '#acd8a3',
        'gray':'#ededed',
        // Add other colors as needed
      },
    },
  },
  plugins: [],
}