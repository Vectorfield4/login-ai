/**
 * Vitest stub for Astro's virtual `astro:assets` module. Only the optimized
 * cover path imports it; the manifest tests resolve `getServiceImage` and
 * `getServiceDiagram`, so `getImage` never runs. Keeps the module importable
 * outside an Astro build.
 */
export async function getImage(): Promise<{ src: string }> {
  return { src: "/_astro/stub.webp" };
}
