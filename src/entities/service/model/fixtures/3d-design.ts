import type { Service } from "../services";

export const threeDDesign: Service = {
  slug: "3d-design",
  group: "design",
  updatedAt: "2026-10-24",
  navTitle: "services.3d-design.navTitle",
  title: "services.3d-design.title",
  tagline: "services.3d-design.tagline",
  description: "services.3d-design.description",
  icon: "domain",
  price: {
    amount: 5000,
    unit: "project",
  },
  calculator: {
    unit: "project",
    horizon: 1,
    support: false,
    fields: [
      {
        kind: "segmented",
        id: "format",
        label: "calculator.fields.3d-design.format",
        default: "whitebox",
        options: [
          {
            value: "plan",
            label: "calculator.designOptions.plan",
          },
          {
            value: "whitebox",
            label: "calculator.designOptions.whitebox",
          },
          {
            value: "browser",
            label: "calculator.designOptions.browser",
          },
        ],
      },
      {
        kind: "stepper",
        id: "layouts",
        label: "calculator.fields.3d-design.layouts",
        min: 0,
        max: 9,
        default: 0,
        infoKey: "calculator.designHints.layouts",
      },
      {
        kind: "multiselect",
        id: "renders",
        label: "calculator.fields.3d-design.renders",
        options: [
          {
            value: "two",
            label: "calculator.designOptions.twoRenders",
          },
        ],
        default: [],
        placement: "addons",
        visibleWhen: {
          field: "format",
          equals: "whitebox",
        },
      },
      {
        kind: "multiselect",
        id: "interaction",
        label: "calculator.fields.3d-design.interaction",
        options: [
          {
            value: "tour",
            label: "calculator.designOptions.tour",
          },
          {
            value: "materials",
            label: "calculator.designOptions.materials",
          },
          {
            value: "animation",
            label: "calculator.designOptions.animation",
          },
        ],
        default: [],
        placement: "addons",
        visibleWhen: {
          field: "format",
          equals: "browser",
        },
      },
    ],
    terms: [
      {
        kind: "setup",
        amount: 5000,
        weeks: {
          low: 0.2,
          high: 0.4,
        },
      },
      {
        kind: "perUnit",
        field: "layouts",
        rate: {
          low: 5000,
          high: 8000,
        },
        weeksPerUnit: {
          low: 0.2,
          high: 0.4,
        },
      },
      {
        kind: "multiplier",
        field: "format",
        factors: {
          plan: 1,
          whitebox: 5,
          browser: 24,
        },
      },
      {
        kind: "perOption",
        field: "format",
        rates: {
          plan: {
            low: 0,
            high: 3000,
          },
          whitebox: {
            low: 20000,
            high: 35000,
          },
          browser: {
            low: 115000,
            high: 187000,
          },
        },
      },
      {
        kind: "perSelection",
        field: "renders",
        rates: {
          two: {
            low: 14000,
            high: 24000,
          },
        },
        when: {
          field: "format",
          equals: "whitebox",
        },
      },
      {
        kind: "perSelection",
        field: "interaction",
        rates: {
          tour: {
            low: 40000,
            high: 70000,
          },
          materials: {
            low: 20000,
            high: 40000,
          },
          animation: {
            low: 30000,
            high: 60000,
          },
        },
        when: {
          field: "format",
          equals: "browser",
        },
      },
    ],
  },
  ctaBanner: {
    title: "services.3d-design.ctaBanner.title",
    text: "services.3d-design.ctaBanner.text",
    buttonLabel: "services.3d-design.ctaBanner.buttonLabel",
  },
  features: [
    {
      title: "services.3d-design.features.6.title",
      text: "services.3d-design.features.6.text",
    },
    {
      title: "services.3d-design.features.0.title",
      text: "services.3d-design.features.0.text",
    },
    {
      title: "services.3d-design.features.1.title",
      text: "services.3d-design.features.1.text",
    },
    {
      title: "services.3d-design.features.2.title",
      text: "services.3d-design.features.2.text",
    },
    {
      title: "services.3d-design.features.3.title",
      text: "services.3d-design.features.3.text",
    },
    {
      title: "services.3d-design.features.4.title",
      text: "services.3d-design.features.4.text",
    },
    {
      title: "services.3d-design.features.5.title",
      text: "services.3d-design.features.5.text",
    },
  ],
  processSteps: [
    {
      title: "services.3d-design.processSteps.0.title",
      text: "services.3d-design.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.3d-design.processSteps.1.title",
      text: "services.3d-design.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.3d-design.processSteps.2.title",
      text: "services.3d-design.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.3d-design.processSteps.3.title",
      text: "services.3d-design.processSteps.3.text",
      processType: "integration",
    },
    {
      title: "services.3d-design.processSteps.4.title",
      text: "services.3d-design.processSteps.4.text",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "services.3d-design.fitItems.0.title",
      text: "services.3d-design.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.3d-design.fitItems.1.title",
      text: "services.3d-design.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.3d-design.fitItems.2.title",
      text: "services.3d-design.fitItems.2.text",
      positive: false,
    },
  ],
  deliverables: [
    {
      title: "services.3d-design.deliverables.0.title",
      text: "services.3d-design.deliverables.0.text",
    },
    {
      title: "services.3d-design.deliverables.1.title",
      text: "services.3d-design.deliverables.1.text",
    },
    {
      title: "services.3d-design.deliverables.2.title",
      text: "services.3d-design.deliverables.2.text",
    },
    {
      title: "services.3d-design.deliverables.3.title",
      text: "services.3d-design.deliverables.3.text",
    },
    {
      title: "services.3d-design.deliverables.4.title",
      text: "services.3d-design.deliverables.4.text",
    },
  ],
  scope: [
    {
      title: "services.3d-design.scope.0.title",
      text: "services.3d-design.scope.0.text",
    },
    {
      title: "services.3d-design.scope.1.title",
      text: "services.3d-design.scope.1.text",
    },
    {
      title: "services.3d-design.scope.2.title",
      text: "services.3d-design.scope.2.text",
    },
    {
      title: "services.3d-design.scope.3.title",
      text: "services.3d-design.scope.3.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.3d-design.tradeoffs.0.title",
      text: "services.3d-design.tradeoffs.0.text",
    },
    {
      title: "services.3d-design.tradeoffs.1.title",
      text: "services.3d-design.tradeoffs.1.text",
    },
    {
      title: "services.3d-design.tradeoffs.2.title",
      text: "services.3d-design.tradeoffs.2.text",
    },
  ],
  faqItems: [
    {
      question: "services.3d-design.faqItems.0.question",
      answer: "services.3d-design.faqItems.0.answer",
    },
    {
      question: "services.3d-design.faqItems.1.question",
      answer: "services.3d-design.faqItems.1.answer",
    },
    {
      question: "services.3d-design.faqItems.2.question",
      answer: "services.3d-design.faqItems.2.answer",
    },
    {
      question: "services.3d-design.faqItems.3.question",
      answer: "services.3d-design.faqItems.3.answer",
    },
    {
      question: "services.3d-design.faqItems.4.question",
      answer: "services.3d-design.faqItems.4.answer",
    },
    {
      question: "services.3d-design.faqItems.5.question",
      answer: "services.3d-design.faqItems.5.answer",
    },
  ],
  techStack: [
    {
      subtitle: "services.3d-design.techStack.0.subtitle",
      description: "services.3d-design.techStack.0.description",
      technologies: [
        {
          id: "3ds-max",
          name: "3ds Max",
          glossary: "services.3d-design.techStack.0.technologies.0.glossary",
        },
        {
          id: "blender",
          name: "Blender",
          glossary: "services.3d-design.techStack.0.technologies.1.glossary",
        },
        {
          id: "threejs",
          name: "Three.js",
          glossary: "services.3d-design.techStack.0.technologies.2.glossary",
        },
        {
          id: "gsap",
          name: "GSAP",
          glossary: "services.3d-design.techStack.0.technologies.3.glossary",
        },
        {
          id: "gltf",
          name: "glTF",
          glossary: "services.3d-design.techStack.0.technologies.4.glossary",
        },
        {
          id: "corona",
          name: "Corona",
          glossary: "services.3d-design.techStack.0.technologies.5.glossary",
        },
      ],
    },
  ],
  examples: {
    title: "services.3d-design.examples.title",
    text: "services.3d-design.examples.text",
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
      {
        asset: "interior-living",
        title: "services.3d-design.examples.items.3.title",
        text: "services.3d-design.examples.items.3.text",
        alt: "services.3d-design.examples.items.3.alt",
        layout: "landscape",
      },
    ],
  },
  relevants: [
    {
      type: "service",
      slug: "ui-ux-design",
      noteKey: "relevants.3d-design.ui-ux-design",
    },
    {
      type: "service",
      slug: "corporate-websites",
      noteKey: "relevants.3d-design.corporate-websites",
    },
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.3d-design.video-generation",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.3d-design.customer-experience",
    },
    {
      type: "solution",
      slug: "real-estate",
      noteKey: "relevants.3d-design.real-estate",
    },
    {
      type: "solution",
      slug: "defect-detection",
      noteKey: "relevants.3d-design.defect-detection",
    },
    {
      type: "case",
      slug: "construction-3d-sales",
      noteKey: "relevants.3d-design.construction-3d-sales",
    },
  ],
  archvizExamples: {
    title: "services.3d-design.archvizExamples.title",
    text: "services.3d-design.archvizExamples.text",
    items: [
      {
        asset: "archviz-living",
        title: "services.3d-design.archvizExamples.items.0.title",
        text: "services.3d-design.archvizExamples.items.0.text",
        alt: "services.3d-design.archvizExamples.items.0.alt",
        layout: "wide",
      },
      {
        asset: "archviz-concept-kitchen",
        title: "services.3d-design.archvizExamples.items.1.title",
        text: "services.3d-design.archvizExamples.items.1.text",
        alt: "services.3d-design.archvizExamples.items.1.alt",
        layout: "landscape",
      },
      {
        asset: "archviz-concept-bedroom",
        title: "services.3d-design.archvizExamples.items.2.title",
        text: "services.3d-design.archvizExamples.items.2.text",
        alt: "services.3d-design.archvizExamples.items.2.alt",
        layout: "landscape",
      },
      {
        asset: "archviz-concept-bathroom",
        title: "services.3d-design.archvizExamples.items.3.title",
        text: "services.3d-design.archvizExamples.items.3.text",
        alt: "services.3d-design.archvizExamples.items.3.alt",
        layout: "landscape",
      },
      {
        asset: "archviz-concept-study",
        title: "services.3d-design.archvizExamples.items.4.title",
        text: "services.3d-design.archvizExamples.items.4.text",
        alt: "services.3d-design.archvizExamples.items.4.alt",
        layout: "landscape",
      },
      {
        asset: "archviz-concept-exterior",
        title: "services.3d-design.archvizExamples.items.5.title",
        text: "services.3d-design.archvizExamples.items.5.text",
        alt: "services.3d-design.archvizExamples.items.5.alt",
        layout: "wide",
      },
    ],
  },
};
