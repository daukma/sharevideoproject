/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-img': "url(./bg.png)"
      }
    },

  },
  plugins: [],
  corePlugins: {
    preflight: false // <== disable this!
  }
}