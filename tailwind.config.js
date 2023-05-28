/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shiny-yellow": "#FFF500",
      },
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Inter"],
      headings: "Montserrat",
    },
  },
  plugins: [],
};
