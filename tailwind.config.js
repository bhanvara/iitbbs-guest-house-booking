module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'custom-blue': '#2e5caf',
        'dark-custom-blue': '#10367a'
      },
      fontFamily: {
        'inter': ['Inter','sans-serif']
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