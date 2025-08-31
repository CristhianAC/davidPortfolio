// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import robotsTxt from "astro-robots-txt";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://david-rodriguez-arrauth.pages.dev/",
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  integrations: [robotsTxt(), sitemap()]
});