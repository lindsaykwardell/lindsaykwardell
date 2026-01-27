import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import simpleStackQuery from "simple-stack-query";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [simpleStackQuery(), react()],
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});