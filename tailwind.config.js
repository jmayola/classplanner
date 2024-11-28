/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInScale: 'fadeInScale 0.6s ease-out',  
        fadeOutScale: 'fadeOutScale 0.6s ease-in',  
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },  
          '100%': { opacity: 1, transform: 'scale(1)' },  
        },
        fadeOutScale: {
          '0%': { opacity: 1, transform: 'scale(1)' }, 
          '100%': { opacity: 0, transform: 'scale(0.8)' }, 
        },
      },
    },
  },
  plugins: [],
};
