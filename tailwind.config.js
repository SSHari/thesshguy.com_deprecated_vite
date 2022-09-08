const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'hsl(var(--color-white))',
      primary: {
        DEFAULT: 'hsl(var(--color-primary-700))',
        50: 'hsl(var(--color-primary-50))',
        100: 'hsl(var(--color-primary-100))',
        200: 'hsl(var(--color-primary-200))',
        300: 'hsl(var(--color-primary-300))',
        400: 'hsl(var(--color-primary-400))',
        500: 'hsl(var(--color-primary-500))',
        600: 'hsl(var(--color-primary-600))',
        700: 'hsl(var(--color-primary-700))',
        800: 'hsl(var(--color-primary-800))',
        900: 'hsl(var(--color-primary-900))',
      },
      secondary: 'hsl(var(--color-secondary))',
      gray: {
        50: 'hsl(var(--color-gray-50))',
        100: 'hsl(var(--color-gray-100))',
        200: 'hsl(var(--color-gray-200))',
        300: 'hsl(var(--color-gray-300))',
        400: 'hsl(var(--color-gray-400))',
        500: 'hsl(var(--color-gray-500))',
        600: 'hsl(var(--color-gray-600))',
        700: 'hsl(var(--color-gray-700))',
        800: 'hsl(var(--color-gray-800))',
        900: 'hsl(var(--color-gray-900))',
        '/80': 'hsl(var(--color-gray-700) / .8)',
        '/90': 'hsl(var(--color-gray-700) / .9)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
