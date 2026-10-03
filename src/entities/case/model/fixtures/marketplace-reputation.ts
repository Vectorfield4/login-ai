import type { Case } from "../cases";

export const marketplaceReputation: Case = {
  slug: "marketplace-reputation",
  title: "cases.marketplace-reputation.title",
  tagline: "cases.marketplace-reputation.tagline",
  description: "cases.marketplace-reputation.description",
  icon: "rate-review",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.marketplace-reputation.metrics.0.label",
      value: "cases.marketplace-reputation.metrics.0.value",
    },
    {
      label: "cases.marketplace-reputation.metrics.1.label",
      value: "cases.marketplace-reputation.metrics.1.value",
    },
    {
      label: "cases.marketplace-reputation.metrics.2.label",
      value: "cases.marketplace-reputation.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.marketplace-reputation.reputation-management",
    },
    {
      type: "service",
      slug: "information-monitoring",
      noteKey: "relevants.marketplace-reputation.information-monitoring",
    },
    {
      type: "case",
      slug: "reputation-monitoring-platform",
      noteKey: "relevants.marketplace-reputation.reputation-monitoring-platform",
    },
  ],
};
