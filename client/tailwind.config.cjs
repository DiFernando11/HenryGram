/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				yellow: 'rgb(255, 255, 1)',
				black: '#363636',
				white: '#fafbfd',
				gray: '#cdcdcd',
				blacker: '#171717',
				yellower: '#ebeb02',
				danger: '#CA0B00',
			},
			backgroundImage: {
				background: "url('./src/assets/fondo2.png')",
			},
		},
	},
	plugins: [],
};
