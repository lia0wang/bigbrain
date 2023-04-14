/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'nav-blue': '#1876d1',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite'
      },
    },
  },
  plugins: [],
}
