/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./school/**/*.{html,js,php}", "./components/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
        mono: "JetBrains Mono",
      },
      backgroundImage: {
        'alertDanger': "url('/icons/alert.svg')",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
