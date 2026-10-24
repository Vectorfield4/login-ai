import type { Service } from "../services";

export const uiUxDesign: Service = {
  slug: "ui-ux-design",
  group: "design",
  updatedAt: "2026-10-24",
  navTitle: "services.ui-ux-design.navTitle",
  title: "services.ui-ux-design.title",
  tagline: "services.ui-ux-design.tagline",
  description: "services.ui-ux-design.description",
  icon: "presentations",
  price: {
    amount: 60000,
    unit: "project",
  },
  calculator: {
    unit: "project",
    horizon: 1,
    support: false,
    fields: [
      {
        kind: "stepper",
        id: "screens",
        label: "calculator.fields.ui-ux-design.screens",
        min: 0,
        max: 35,
        default: 3,
        infoKey: "calculator.designHints.screens",
      },
      {
        kind: "segmented",
        id: "complexity",
        label: "calculator.fields.ui-ux-design.complexity",
        default: "standard",
        options: [
          {
            value: "standard",
            label: "calculator.designOptions.standard",
          },
          {
            value: "product",
            label: "calculator.designOptions.product",
          },
        ],
      },
      {
        kind: "toggle",
        id: "research",
        label: "calculator.fields.ui-ux-design.research",
        default: false,
        placement: "addons",
      },
      {
        kind: "toggle",
        id: "system",
        label: "calculator.fields.ui-ux-design.system",
        default: false,
        placement: "addons",
      },
    ],
    terms: [
      {
        kind: "setup",
        amount: 60000,
        weeks: {
          low: 1.75,
          high: 3.25,
        },
      },
      {
        kind: "perUnit",
        field: "screens",
        rate: {
          low: 8000,
          high: 12000,
        },
        weeksPerUnit: {
          low: 0.15,
          high: 0.25,
        },
      },
      {
        kind: "multiplier",
        field: "complexity",
        factors: {
          standard: 1,
          product: 1.5,
        },
      },
      {
        kind: "perOption",
        field: "complexity",
        rates: {
          standard: {
            low: 0,
            high: 35000,
          },
          product: {
            low: 20000,
            high: 65000,
          },
        },
      },
      {
        kind: "perOption",
        field: "research",
        rates: {
          false: 0,
          true: {
            low: 20000,
            high: 40000,
          },
        },
      },
      {
        kind: "perOption",
        field: "system",
        rates: {
          false: 0,
          true: {
            low: 30000,
            high: 60000,
          },
        },
      },
    ],
  },
  ctaBanner: {
    title: "services.ui-ux-design.ctaBanner.title",
    text: "services.ui-ux-design.ctaBanner.text",
    buttonLabel: "services.ui-ux-design.ctaBanner.buttonLabel",
  },
  features: [
    {
      title: "services.ui-ux-design.features.0.title",
      text: "services.ui-ux-design.features.0.text",
    },
    {
      title: "services.ui-ux-design.features.1.title",
      text: "services.ui-ux-design.features.1.text",
    },
    {
      title: "services.ui-ux-design.features.2.title",
      text: "services.ui-ux-design.features.2.text",
    },
    {
      title: "services.ui-ux-design.features.3.title",
      text: "services.ui-ux-design.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.ui-ux-design.processSteps.0.title",
      text: "services.ui-ux-design.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ui-ux-design.processSteps.1.title",
      text: "services.ui-ux-design.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.ui-ux-design.processSteps.2.title",
      text: "services.ui-ux-design.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ui-ux-design.processSteps.3.title",
      text: "services.ui-ux-design.processSteps.3.text",
      processType: "integration",
    },
  ],
  fitItems: [
    {
      title: "services.ui-ux-design.fitItems.0.title",
      text: "services.ui-ux-design.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ui-ux-design.fitItems.1.title",
      text: "services.ui-ux-design.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ui-ux-design.fitItems.2.title",
      text: "services.ui-ux-design.fitItems.2.text",
      positive: true,
    },
    {
      title: "services.ui-ux-design.fitItems.3.title",
      text: "services.ui-ux-design.fitItems.3.text",
      positive: false,
    },
  ],
  deliverables: [
    {
      title: "services.ui-ux-design.deliverables.0.title",
      text: "services.ui-ux-design.deliverables.0.text",
    },
    {
      title: "services.ui-ux-design.deliverables.1.title",
      text: "services.ui-ux-design.deliverables.1.text",
    },
    {
      title: "services.ui-ux-design.deliverables.2.title",
      text: "services.ui-ux-design.deliverables.2.text",
    },
  ],
  scope: [
    {
      title: "services.ui-ux-design.scope.0.title",
      text: "services.ui-ux-design.scope.0.text",
    },
    {
      title: "services.ui-ux-design.scope.1.title",
      text: "services.ui-ux-design.scope.1.text",
    },
    {
      title: "services.ui-ux-design.scope.2.title",
      text: "services.ui-ux-design.scope.2.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.ui-ux-design.tradeoffs.0.title",
      text: "services.ui-ux-design.tradeoffs.0.text",
    },
    {
      title: "services.ui-ux-design.tradeoffs.1.title",
      text: "services.ui-ux-design.tradeoffs.1.text",
    },
    {
      title: "services.ui-ux-design.tradeoffs.2.title",
      text: "services.ui-ux-design.tradeoffs.2.text",
    },
  ],
  faqItems: [
    {
      question: "services.ui-ux-design.faqItems.0.question",
      answer: "services.ui-ux-design.faqItems.0.answer",
    },
    {
      question: "services.ui-ux-design.faqItems.1.question",
      answer: "services.ui-ux-design.faqItems.1.answer",
    },
    {
      question: "services.ui-ux-design.faqItems.2.question",
      answer: "services.ui-ux-design.faqItems.2.answer",
    },
    {
      question: "services.ui-ux-design.faqItems.3.question",
      answer: "services.ui-ux-design.faqItems.3.answer",
    },
    {
      question: "services.ui-ux-design.faqItems.4.question",
      answer: "services.ui-ux-design.faqItems.4.answer",
    },
  ],
  techStack: [
    {
      subtitle: "services.ui-ux-design.techStack.0.subtitle",
      description: "services.ui-ux-design.techStack.0.description",
      technologies: [
        {
          id: "figma",
          name: "Figma",
          glossary: "services.ui-ux-design.techStack.0.technologies.0.glossary",
        },
        {
          id: "svg",
          name: "SVG",
          glossary: "services.ui-ux-design.techStack.0.technologies.1.glossary",
        },
        {
          id: "gsap",
          name: "GSAP",
          glossary: "services.ui-ux-design.techStack.0.technologies.2.glossary",
        },
      ],
    },
  ],
  examples: {
    title: "services.ui-ux-design.examples.title",
    text: "services.ui-ux-design.examples.text",
    items: [
      {
        asset: "interface-cases",
        title: "services.ui-ux-design.examples.items.0.title",
        text: "services.ui-ux-design.examples.items.0.text",
        alt: "services.ui-ux-design.examples.items.0.alt",
        layout: "wide",
      },
    ],
  },
  relevants: [
    {
      type: "service",
      slug: "3d-design",
      noteKey: "relevants.ui-ux-design.3d-design",
    },
    {
      type: "service",
      slug: "corporate-websites",
      noteKey: "relevants.ui-ux-design.corporate-websites",
    },
    {
      type: "service",
      slug: "landing-pages",
      noteKey: "relevants.ui-ux-design.landing-pages",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.ui-ux-design.software-development",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.ui-ux-design.customer-experience",
    },
  ],
};
