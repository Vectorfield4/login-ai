/**
 * Deterministic composition picker for every image kind.
 *
 * A record may pin `visual_config.composition`, but nobody should hand-map
 * dozens of slugs. When the field is absent, the slug itself picks a key from
 * the shared dictionary, so two runs on the same slug produce the same scene
 * and a batch of new pages spreads across the whole set without a lookup table.
 *
 * There is no entity-kind branch or legacy centered fallback: every prompt goes
 * through the same composition pool.
 *
 * Keep in lockstep with `test/image-prompts/helpers.ts`.
 */
import { VISUAL_COMPOSITIONS } from "./ui-primitives.mjs";

/** FNV-1a, 32-bit: stable across runs and platforms for ASCII slugs. */
function stableHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** The composition key a slug maps to in the shared set. */
export function compositionKeyFor(slug) {
  const keys = Object.keys(VISUAL_COMPOSITIONS);
  return keys[stableHash(slug) % keys.length];
}

/**
 * The composition object for a record: an explicit `override` wins when it is a
 * valid key, otherwise the slug decides.
 */
export function compositionFor(slug, override) {
  if (override && VISUAL_COMPOSITIONS[override]) return VISUAL_COMPOSITIONS[override];
  return VISUAL_COMPOSITIONS[compositionKeyFor(slug)];
}
