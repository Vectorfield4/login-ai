import type { Case } from "../cases";

export const construction3dSales: Case = {
  slug: "construction-3d-sales",
  title: "cases.construction-3d-sales.title",
  tagline: "cases.construction-3d-sales.tagline",
  description: "cases.construction-3d-sales.description",
  icon: "domain",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.construction-3d-sales.metrics.0.label",
      value: "cases.construction-3d-sales.metrics.0.value",
    },
    {
      label: "cases.construction-3d-sales.metrics.1.label",
      value: "cases.construction-3d-sales.metrics.1.value",
    },
    {
      label: "cases.construction-3d-sales.metrics.2.label",
      value: "cases.construction-3d-sales.metrics.2.value",
    },
  ],
  examples: {
    title: "cases.construction-3d-sales.examples.title",
    text: "cases.construction-3d-sales.examples.text",
    items: [
      {
        asset: "apartment-plan",
        title: "services.3d-design.examples.items.0.title",
        text: "services.3d-design.examples.items.0.text",
        alt: "services.3d-design.examples.items.0.alt",
        layout: "plan",
      },
      {
        asset: "apartment-whitebox",
        title: "services.3d-design.examples.items.1.title",
        text: "services.3d-design.examples.items.1.text",
        alt: "services.3d-design.examples.items.1.alt",
        layout: "plan",
      },
      {
        asset: "interior-living",
        title: "services.3d-design.examples.items.3.title",
        text: "services.3d-design.examples.items.3.text",
        alt: "services.3d-design.examples.items.3.alt",
        layout: "landscape",
      },
      {
        asset: "interior-childroom",
        title: "services.3d-design.examples.items.2.title",
        text: "services.3d-design.examples.items.2.text",
        alt: "services.3d-design.examples.items.2.alt",
        layout: "landscape",
      },
      {
        asset: "interior-bathroom",
        title: "services.3d-design.examples.items.4.title",
        text: "services.3d-design.examples.items.4.text",
        alt: "services.3d-design.examples.items.4.alt",
        layout: "portrait",
      },
    ],
  },
  relevants: [
    { type: "service", slug: "3d-design", noteKey: "relevants.construction-3d-sales.3d-design" },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.construction-3d-sales.customer-experience",
    },
    {
      type: "solution",
      slug: "real-estate",
      noteKey: "relevants.construction-3d-sales.real-estate",
    },
  ],
};
