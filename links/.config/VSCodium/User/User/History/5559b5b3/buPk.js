/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js,php}',
    '!./node_modules/**' // Ignore files in node_modules
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins'],
        mono: 'JetBrains Mono'
      },
      colors: {
        primary: {
          light: '#74598f'
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
