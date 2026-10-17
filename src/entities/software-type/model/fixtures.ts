import type { SoftwareType } from "./software-type";

/**
 * Single source of truth for software types. The catalog is the target for the
 * calculator's future integration add-ons: `crm`, `erp`, `cms`, `task-tracker`
 * already back `ai-*-integration` bundles, while `mes` and `wms` split the
 * composite labels ("ERP и MES", "CRM и склад") without changing copy yet.
 */
export const softwareTypes: SoftwareType[] = [
  { slug: "erp", products: ["1С", "SAP", "Microsoft Dynamics"] },
  { slug: "crm", products: ["Битрикс24", "amoCRM", "Salesforce"] },
  { slug: "cms", products: ["Strapi", "WordPress", "Contentful"] },
  { slug: "mes", products: [] },
  { slug: "wms", products: [] },
  { slug: "task-tracker", products: ["Jira", "YouTrack", "Asana"] },
];
