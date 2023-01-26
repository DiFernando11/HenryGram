/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  variants: {
    extend: {
      display: ["group-focus"],
    },
  },
  theme: {
    extend: {
      colors: {
        yellow: "#fcd34d",
        black: "#1e1c1d",
        gray: "#cdcdcd",
        blacker: "#171717",
        yellower: "#f59e0b",
        danger: "#CA0B00",
        white: "#f4f4f4",
        blackBody: '#363636',
        darkGrey: '#484848',
        lighterBlue:'#00aced',
        lightBlue: '#1dcaff',
        blueTw: '#0084b4',
        realBlack: '#000000',
        yellow500: 'rgb(234 179 8)',
        yellow300: 'rgb(253 224 71)',
        yellow100: 'rgb(254 249 195)',
        gray700: 'rgb(55 65 81)',
        gray900: 'rgb(17 24 39)',
      },
      gridAutoColumns: {
        "2fr": "minmax(0, 2fr)",
      },
      backgroundImage: {
        background: "url('./src/assets/fondo2.png')",
      },
      width: {
        validate: "40%",
      },
      height: {
        validate: "40%",
        about: "25vh",
        header: "26vh",
        banner: "20vh",
        aboutSection: "50vh",
      },
      spacing: {
        avatar: "-4rem",
        custom1: "35%",
        custom2: "4.2rem",
        custom3 : "49%",
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
