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
        'alertDanger': `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1hbGVydCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjgiIHkyPSIxMiIvPjxsaW5lIHgxPSIxMiIgeDI9IjEyLjAxIiB5MT0iMTYiIHkyPSIxNiIvPjwvc3ZnPg==");`,
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
