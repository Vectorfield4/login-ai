/// <reference types="vitest/config" />

import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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
  ssr: {
    noExternal: true,
  },
});