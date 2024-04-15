module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'custom-blue': '#2e5caf',
        'dark-custom-blue': '#10367a',
        'custom-gray': '#f6f8fa'
      },
      fontFamily: {
        'inter': ['Inter','sans-serif']
      },
      transitionProperty: {
        'height': 'max-height',
      }

    },
  },
  variants: {
    extend: {
      backgroundColor: ['focus'],
      border: ['focus'],
      ring: ['focus']
    },
  },
  plugins: [],
}