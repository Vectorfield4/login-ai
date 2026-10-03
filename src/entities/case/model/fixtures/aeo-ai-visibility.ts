import type { Case } from "../cases";

export const aeoAiVisibility: Case = {
  slug: "aeo-ai-visibility",
  title: "cases.aeo-ai-visibility.title",
  tagline: "cases.aeo-ai-visibility.tagline",
  description: "cases.aeo-ai-visibility.description",
  icon: "insights",
  industryKey: "audiences.adAgencies",
  metrics: [
    {
      label: "cases.aeo-ai-visibility.metrics.0.label",
      value: "cases.aeo-ai-visibility.metrics.0.value",
    },
    {
      label: "cases.aeo-ai-visibility.metrics.1.label",
      value: "cases.aeo-ai-visibility.metrics.1.value",
    },
    {
      label: "cases.aeo-ai-visibility.metrics.2.label",
      value: "cases.aeo-ai-visibility.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "seo-aeo",
      noteKey: "relevants.aeo-ai-visibility.seo-aeo",
    },
    {
      type: "solution",
      slug: "content-generation",
      noteKey: "relevants.aeo-ai-visibility.content-generation",
    },
  ],
};
