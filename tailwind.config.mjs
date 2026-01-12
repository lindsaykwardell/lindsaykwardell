/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Philosopher', 'sans-serif'], //['Raleway Variable', 'sans-serif'],
        body: ['Baloo Bhaina 2 Variable', 'system-ui'], //['Questrial', 'sans-serif'],
      },
      colors: {
        charcoal: '#27241a',
        lightcharcoal: '#4c4636',
        tan: '#a79c89',
        lighttan: '#e3cdc7',
        offwhite: '#f5f5f5',
        peach: '#e69563',
        lightpeach: '#f6af97',
        orange: '#cf492b',
        blue: '#7e9b9d',
        lightblue: '#c9d2d3',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
