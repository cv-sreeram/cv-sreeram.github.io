import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: [
      "zone.js",
      "@angular/core",
      "@angular/common",
      "@angular/compiler",
      "@angular/platform-browser",
    ],
  },
});
