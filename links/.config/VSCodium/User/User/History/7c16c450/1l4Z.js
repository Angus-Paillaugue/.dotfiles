/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./school/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
				sans: ['Poppins'],
				mono: 'JetBrains Mono'
			},
    },
  },
  plugins: [],
}
