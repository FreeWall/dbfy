/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    colors: {
      'dbfy-text': '#3f4b53',
      'dbfy-dark-icon': '#6a7f8b',
      'dbfy-light-icon': '#9facb4',
      'dbfy-border': '#c6d2db',
      'dbfy-input': '#f3f5f9',
      'dbfy-sidebar': '#e8eef2',
    },
  },
  plugins: [],
};
