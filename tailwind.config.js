/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#D1FAE5',
          teal: '#0D9488',
        },
        gold: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.3)',
        },
        // Design System tokens
        light: {
          bgPrimary: '#FAFAF9',
          bgSecondary: '#F5F5F4',
          bgCard: '#FFFFFF',
          textPrimary: '#1C1917',
          textSecondary: '#78716C',
          textMuted: '#A8A29E',
          border: '#E7E5E4',
          borderLight: '#F5F5F4',
        },
        dark: {
          bgPrimary: '#0C0A09',
          bgSecondary: '#1C1917',
          bgCard: '#292524',
          textPrimary: '#FAFAF9',
          textSecondary: '#A8A29E',
          textMuted: '#78716C',
          border: '#44403C',
          borderLight: '#292524',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 25px -5px rgba(5, 150, 105, 0.1), 0 10px 10px -5px rgba(5, 150, 105, 0.04)',
        'premium-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #059669 0%, #0D9488 50%, #0891B2 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      }
    },
  },
  plugins: [],
}
