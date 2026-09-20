/// <reference types="vitest/config" />

import { fileURLToPath } from "node:url";
import stylex from "@stylexjs/unplugin/vite";
import { defineConfig } from "vitest/config";

const srcRoot = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [
    stylex({
      useCSSLayers: true,
      devPersistToDisk: false,
      aliases: { "@/*": `${srcRoot}/*` },
    }),
  ],
  resolve: {
    alias: {
      "@": srcRoot,
    },
  },
  test: {
    environment: "./test/environment.ts",
    globals: true,
    setupFiles: ["./test/storage.ts", "./test/setup.ts"],
    css: true,
    pool: "forks",
  },
});
