/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#F5F0E8',
        'ink': '#1A1A1A',
        'warm-gray': '#6B6459',
        'editorial-red': '#8B1A1A',
        'aged-gold': '#B8A88A',
        'parchment-light': '#FAF7F0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Serif 4"', 'serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'banner-reveal': {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' },
        },
        'underline-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'quill-write': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'stamp-in': {
          '0%': { opacity: '0', transform: 'scale(2) rotate(-15deg)' },
          '70%': { opacity: '1', transform: 'scale(0.95) rotate(2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.7s ease-out 0.15s forwards',
        'fade-up-delay-2': 'fade-up 0.7s ease-out 0.3s forwards',
        'fade-up-delay-3': 'fade-up 0.7s ease-out 0.45s forwards',
        'fade-up-delay-4': 'fade-up 0.7s ease-out 0.6s forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-slow': 'fade-in 1.2s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'banner-reveal': 'banner-reveal 0.8s ease-out forwards',
        'underline-grow': 'underline-grow 0.6s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'ticker-scroll': 'ticker-scroll 30s linear infinite',
        'quill-write': 'quill-write 1.5s ease-out forwards',
        'stamp-in': 'stamp-in 0.6s ease-out forwards',
        'count-up': 'count-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
