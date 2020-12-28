const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: colors.indigo,
      danger: colors.rose,
    },
    container: {
      center: true,
      padding: '1rem',
    },
    filter: {
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)',
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)',
    },
  },
  variants: {
    filter: ['responsive'],
    backdropFilter: ['responsive'],
    extend: {},
  },
  plugins: [require('tailwindcss-filters')],
};
