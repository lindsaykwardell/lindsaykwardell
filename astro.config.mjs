import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentLayer: true,
    contentIntellisense: true,
  },
  integrations: [tailwind()],
  output: 'server',
  adapter: netlify(),
})
