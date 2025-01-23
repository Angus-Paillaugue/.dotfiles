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
        'alertDanger': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='curentColor' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' %3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' x2='12' y1='8' y2='12'/%3E%3Cline x1='12' x2='12.01' y1='16' y2='16'/%3E%3C/svg%3E");`,
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
