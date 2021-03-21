module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
    content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Moderat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
