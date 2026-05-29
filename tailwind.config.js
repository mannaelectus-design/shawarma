/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
      },
      colors: {
        orange: '#FF6B35',
        cream: '#F5E6D3',
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
}
