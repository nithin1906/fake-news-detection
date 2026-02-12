/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#F5F0E8', // Page background
        'ink': '#1A1A1A',       // Primary text
        'warm-gray': '#6B6459', // Secondary text
        'editorial-red': '#8B1A1A', // Accent
        'aged-gold': '#B8A88A', // Tertiary accent
        'parchment-light': '#FAF7F0', // Card background
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Source Serif 4"', 'serif'], // Mapping body/UI to Source Serif 4 as requested "Use font-sans mapped to this"
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // Optional: subtle texture if we want, but sticking to flat color first as per "flat, solid colors only" but "parchment" implies texture. The user said "Parchment Cream (color)" but also "mimics aged newsprint". Let's stick to the color for now to be safe on "no gradients".
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'), // For the fade-in animation
  ],
}
