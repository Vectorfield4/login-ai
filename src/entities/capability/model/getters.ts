import type { Capability } from "./capability";
import { capabilities } from "./fixtures";

/** The whole capability catalog. */
export const getCapabilities = (): Capability[] => capabilities;

/** One capability by its stable slug. */
export const getCapabilityBySlug = (slug?: string): Capability | undefined =>
  capabilities.find((capability) => capability.slug === slug);

/** Label key of a capability name; the dictionary owns the copy. */
export const getCapabilityLabelKey = (slug: string): string | undefined =>
  getCapabilityBySlug(slug)?.nameKey;
