import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import simpleStackQuery from "simple-stack-query";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentLayer: true,
    contentIntellisense: true
  },
  integrations: [tailwind(), simpleStackQuery(), react()],
  output: 'server',
  adapter: netlify()
});