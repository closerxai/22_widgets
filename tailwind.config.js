/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#FF8E53',
          light: 'rgba(255, 107, 53, 0.1)',
        },
        background: '#ffffff',
        foreground: '#0f172a',
      }
    },
  },
  plugins: [],
};
