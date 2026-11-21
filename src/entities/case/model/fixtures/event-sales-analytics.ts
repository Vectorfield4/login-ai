import type { Case } from "../cases";

export const eventSalesAnalytics: Case = {
  slug: "event-sales-analytics",
  title: "cases.event-sales-analytics.title",
  tagline: "cases.event-sales-analytics.tagline",
  description: "cases.event-sales-analytics.description",
  icon: "insights",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.event-sales-analytics.metrics.0.label",
      value: "cases.event-sales-analytics.metrics.0.value",
    },
    {
      label: "cases.event-sales-analytics.metrics.1.label",
      value: "cases.event-sales-analytics.metrics.1.value",
    },
    {
      label: "cases.event-sales-analytics.metrics.2.label",
      value: "cases.event-sales-analytics.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "ai-amocrm-integration",
      noteKey: "relevants.event-sales-analytics.ai-amocrm-integration",
    },
  ],
};
