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
    // screens: {
    //   xl: { max: "1279px" },
    //   // => @media (max-width: 1279px) { ... }

    //   lg: { max: "1023px" },
    //   // => @media (max-width: 1023px) { ... }

    //   md: { max: "767px" },
    //   // => @media (max-width: 767px) { ... }

    //   sm: { max: "639px" },
    //   // => @media (max-width: 639px) { ... }
    // },
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
