/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";

/**
 * The live Jev integration contour. It is intentionally separate from
 * `vitest.config.ts`: it hits the network and burns tokens, so it never runs in
 * `npm run test`. Invoke it with `npm run test:integration`.
 */
export default defineConfig({
  test: {
    include: ["test/integration/**/*.test.ts"],
    pool: "forks",
    testTimeout: 900_000,
  },
});
