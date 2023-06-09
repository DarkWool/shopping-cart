/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shiny-yellow": "#FFF500",
      },
      backgroundImage: ({ theme }) => ({
        "store-banner": "url('./src/assets/images/mw2-hd.jpg')",
        "stars-gradient": `linear-gradient(90deg, ${theme(
          "colors.amber.400"
        )} var(--percent), ${theme("colors.gray.200")} var(--percent));`,
      }),
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
