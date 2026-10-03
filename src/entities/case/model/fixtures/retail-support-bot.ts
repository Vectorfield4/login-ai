import type { Case } from "../cases";

export const retailSupportBot: Case = {
  slug: "retail-support-bot",
  title: "cases.retail-support-bot.title",
  tagline: "cases.retail-support-bot.tagline",
  description: "cases.retail-support-bot.description",
  icon: "support-agent",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.retail-support-bot.metrics.0.label",
      value: "cases.retail-support-bot.metrics.0.value",
    },
    {
      label: "cases.retail-support-bot.metrics.1.label",
      value: "cases.retail-support-bot.metrics.1.value",
    },
    {
      label: "cases.retail-support-bot.metrics.2.label",
      value: "cases.retail-support-bot.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.retail-support-bot.agentic-systems",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.retail-support-bot.customer-experience",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.retail-support-bot.software-development",
    },
  ],
};
