/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#584fe8"
      },
      fontFamily: {
        abel: ['Abel', 'sans-serif'],
        onest: ['Onest', 'sans-serif']
      },
      keyframes: {
        loadBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loadBar: 'loadBar 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}