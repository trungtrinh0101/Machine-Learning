module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'menu-background-color': '#F0F9F8',
        'green-color': '#00BE70',
        'title-text-color': '#35476A',
        'sub-title-color': '#CBCCD1'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}