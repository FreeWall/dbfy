/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        spin: 'spin 0.8s linear infinite',
      },
      colors: {
        'dbfy-text': '#3f4b53',
        'dbfy-dark-icon': '#6a7f8b',
        'dbfy-light-icon': '#9facb4',
        'dbfy-border': '#c6d2db',
        'dbfy-input': '#f3f5f9',
        'dbfy-input-hover': '#e8eaed',
        'dbfy-sidebar': '#e8eef2',
        'dbfy-link': '#0074cc',
        'dbfy-focus': '#2a9ce8',
      },
    },
    screens: {
      md: { max: '767px' },
      sm: { max: '639px' },
      smh: { raw: '(max-height: 640px)' },
    },
  },
  plugins: [],
};
