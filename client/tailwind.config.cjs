/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "rgb(255, 255, 1)",
        black: "#1e1c1d",
        white: "#fafbfd",
        gray: "#cdcdcd",
        blacker: "#171717",
        yellower: "#ebeb02",
        danger: "#CA0B00",
        white: "#f4f4f4"
      },
      backgroundImage: {
        background: "url('./src/assets/fondo2.png')",
      },
	    width: {
		    validate: '40%',
	    },
	  	height: {
			  validate: '40%',
		  },
    },
  },
  plugins: [require("flowbite/plugin")],
};
