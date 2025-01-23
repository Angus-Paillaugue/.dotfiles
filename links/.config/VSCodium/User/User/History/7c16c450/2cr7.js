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
        'alertDanger': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
