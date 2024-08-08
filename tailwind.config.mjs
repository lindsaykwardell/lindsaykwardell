/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['Questrial', 'sans-serif'],
				body: ['Barlow', 'sans-serif']
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
