/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: fileURLToPath(new URL("./src/prerender.tsx", import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@emotion/cache": fileURLToPath(
        new URL("./node_modules/@emotion/cache/dist/emotion-cache.esm.js", import.meta.url),
      ),
      "@emotion/use-insertion-effect-with-fallbacks": fileURLToPath(
        new URL(
          "./node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js",
          import.meta.url,
        ),
      ),
    },
  },
  test: {
    environment: "./test/environment.ts",
    globals: true,
    setupFiles: ["./test/storage.ts", "./test/setup.ts"],
    css: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
