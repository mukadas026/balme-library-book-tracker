/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"pri": "#DCF2F1",
				"sec": "#7FC7D9",
				"ter": "#365486",
				"other": "#0F1035"
			},
			fontFamily: {
				"inter": ["Inter", "mono"]
			},
			backgroundSize: {
				"size-200": "200% 100%",
				"size-200-vert": "100% 200%"
			}
		},
	},
	plugins: [],
}
