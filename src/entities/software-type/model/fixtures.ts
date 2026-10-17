import type { SoftwareType } from "./software-type";

/**
 * Single source of truth for software types. The catalog is the target for the
 * calculator's integration add-ons. `pricing` is a coefficient of the base
 * estimate, so the client pays the integration delta, not a second stack.
 */
export const softwareTypes: SoftwareType[] = [
  {
    slug: "erp",
    products: ["1С", "SAP", "Microsoft Dynamics"],
    pricing: { setupFactor: 0.5, recurringFactor: 0.2 },
  },
  {
    slug: "crm",
    products: ["Битрикс24", "amoCRM", "Salesforce"],
    pricing: { setupFactor: 0.35, recurringFactor: 0.15 },
  },
  {
    slug: "cms",
    products: ["Strapi", "WordPress", "Contentful"],
    pricing: { setupFactor: 0.25, recurringFactor: 0.1 },
  },
  { slug: "mes", products: [], pricing: { setupFactor: 0.3, recurringFactor: 0.15 } },
  { slug: "wms", products: [], pricing: { setupFactor: 0.3, recurringFactor: 0.15 } },
  {
    slug: "task-tracker",
    products: ["Jira", "YouTrack", "Asana"],
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
];
