// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://yourdomain.com", // Update with your actual domain
  integrations: [tailwind(), sitemap()],
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssMinify: "esbuild", // Changed from lightningcss to esbuild for better Docker compatibility
    },
  },
});
