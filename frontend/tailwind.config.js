/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biconBlue: '#3B82F6',
        biconYellow: '#FBBF24',
        biconGreen: '#10B981',
        biconPurple: '#8B5CF6',
        biconOrange: '#F97316',
      },
    },
  },
  plugins: [],
}