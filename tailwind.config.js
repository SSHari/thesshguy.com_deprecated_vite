module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'hsl(var(--color-white))',
      primary: 'hsl(var(--color-primary))',
      secondary: 'hsl(var(--color-secondary))',
      gray: {
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
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
