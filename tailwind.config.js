/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Display', 'Noto Sans Bengali', 'sans-serif'],
        serif: ['Noto Sans Display', 'Noto Sans Bengali', 'serif']
      }
    }
  },
  plugins: []
}
