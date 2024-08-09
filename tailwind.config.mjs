/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['Raleway Variable', 'sans-serif'],
				body: ['Questrial', 'sans-serif']
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
