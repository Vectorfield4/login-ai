import type { Capability } from "./capability";

/**
 * Cross-cutting capabilities. Technologies (LLM, CV, video inference) live in
 * `entities/technology`; this catalog holds the client-facing contours and
 * practices built on top of them.
 */
export const capabilities: Capability[] = [
  { slug: "content", nameKey: "capabilities.content" },
  { slug: "reputation", nameKey: "capabilities.reputation" },
  {
    slug: "monitoring",
    nameKey: "capabilities.monitoring",
    pricing: { setupFactor: 0.1, recurringFactor: 0.05 },
  },
  {
    slug: "recommendations",
    nameKey: "capabilities.recommendations",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
  {
    slug: "seo-reputation",
    nameKey: "capabilities.seoReputation",
    pricing: { setupFactor: 0.1, recurringFactor: 0.05 },
  },
  {
    slug: "presentations",
    nameKey: "capabilities.presentations",
    pricing: { setupFactor: 0.1, recurringFactor: 0.05 },
  },
  {
    slug: "localization",
    nameKey: "capabilities.localization",
    pricing: { setupFactor: 0.1, recurringFactor: 0.05 },
  },
  { slug: "mlops", nameKey: "capabilities.mlops", pricing: { setupFactor: 0.15 } },
  { slug: "ai-security", nameKey: "capabilities.aiSecurity", pricing: { setupFactor: 0.2 } },
  {
    slug: "sovereign-models",
    nameKey: "capabilities.sovereignModels",
    pricing: { setupFactor: 0.3 },
  },
];
