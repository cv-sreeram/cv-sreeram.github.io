import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { copyFileSync, mkdirSync } from "fs";
import { resolve } from "path";

/**
 * Vite plugin: copies tokens.css into the public directory so it is served
 * at /tokens.css and can be fetched by Shadow DOM consumers at runtime.
 */
function copyTokensPlugin() {
  return {
    name: "copy-tokens-css",
    buildStart() {
      const src = resolve(__dirname, "src/styles/tokens.css");
      const destDir = resolve(__dirname, "public");
      mkdirSync(destDir, { recursive: true });
      copyFileSync(src, resolve(destDir, "tokens.css"));
    },
  };
}

export default defineConfig({
  plugins: [react(), vue(), svelte(), copyTokensPlugin()],
  optimizeDeps: {
    exclude: [
      "zone.js",
      "@angular/core",
      "@angular/common",
      "@angular/compiler",
      "@angular/platform-browser",
    ],
  },
  ssr: {
    noExternal: ["@my-portal/ui", "@my-portal/utils"],
  },
});
