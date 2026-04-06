/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0C',
        cardMain: 'rgba(255, 255, 255, 0.03)',
        cardOverlay: 'rgba(255, 255, 255, 0.05)',
        borderDark: 'rgba(255, 255, 255, 0.08)',
        primary: '#E63946', // Neon Red
        secondary: '#FFFFFF', // White
        success: '#E63946', // Use red for success as well
        warning: '#FFB800',
        danger: '#FF0055', // Keep pink for danger
      },
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(230, 57, 70, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(230, 57, 70, 0.6), 0 0 10px rgba(230, 57, 70, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
