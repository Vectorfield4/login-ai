import type { AddonPricing } from "@/shared/types/calculator";

/**
 * A business capability or client contour. Unlike a technology, it is not a
 * model, library or modality: `sovereign-models` is a private LLM contour,
 * `monitoring` is a service shape, `localization` is a workflow.
 *
 * A capability is a discrete ability or add-on scope, not the packaged
 * full-cycle service. `seo-reputation` is the reputation-SEO add-on; the
 * full-cycle offering is the `seo-aeo` service. The same split applies to
 * `content` / `content-generation` and `localization` / `content-localization`.
 */
export interface Capability {
  /** Stable catalog key: filters, included blocks and add-on references. */
  slug: string;
  /** i18n key under the `capabilities.*` namespace. */
  nameKey: string;
  /** Coefficients for the calculator when this capability is an add-on. */
  pricing?: AddonPricing;
}
