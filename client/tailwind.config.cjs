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
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
