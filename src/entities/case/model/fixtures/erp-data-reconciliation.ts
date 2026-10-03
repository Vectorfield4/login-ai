import type { Case } from "../cases";

export const erpDataReconciliation: Case = {
  slug: "erp-data-reconciliation",
  title: "cases.erp-data-reconciliation.title",
  tagline: "cases.erp-data-reconciliation.tagline",
  description: "cases.erp-data-reconciliation.description",
  icon: "domain",
  industryKey: "audiences.manufacturers",
  metrics: [
    {
      label: "cases.erp-data-reconciliation.metrics.0.label",
      value: "cases.erp-data-reconciliation.metrics.0.value",
    },
    {
      label: "cases.erp-data-reconciliation.metrics.1.label",
      value: "cases.erp-data-reconciliation.metrics.1.value",
    },
    {
      label: "cases.erp-data-reconciliation.metrics.2.label",
      value: "cases.erp-data-reconciliation.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "ai-erp-integration",
      noteKey: "relevants.erp-data-reconciliation.ai-erp-integration",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.erp-data-reconciliation.software-development",
    },
    {
      type: "solution",
      slug: "manufacturers",
      noteKey: "relevants.erp-data-reconciliation.manufacturers",
    },
  ],
};
