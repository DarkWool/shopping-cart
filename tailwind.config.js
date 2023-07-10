/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shiny-yellow": "#FFF500",
      },
      backgroundImage: ({ theme }) => ({
        "store-banner": "url('/src/assets/images/mw2-hd.jpg')",
        "stars-gradient": `linear-gradient(90deg, ${theme(
          "colors.amber.400"
        )} var(--percent), ${theme("colors.gray.200")} var(--percent));`,
      }),
      animation: {
        "opacity-pulse": "opacity-pulse .8s ease-in-out infinite alternate-reverse",
        marquee: "marquee 10s linear infinite backwards",
      },
      keyframes: {
        "opacity-pulse": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
      ],
      headings: "Montserrat",
    },
  },
  plugins: [],
};
