/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          bg: '#0c111d',
          surface: '#151d2e',
          card: '#1b2438',
          border: '#28354d',
          primary: '#38bdf8',
          accent: '#818cf8',
          purple: '#a855f7',
          pink: '#ec4899',
          success: '#10b981',
          warning: '#f59e0b',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.3)',
        'glow-accent': '0 0 20px -3px rgba(129, 140, 248, 0.25)',
      }
    },
  },
  plugins: [],
};
