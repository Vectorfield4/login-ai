import type { Service } from "../services";

export const landingPages: Service = {
  slug: "landing-pages",
  navTitle: "services.landing-pages.navTitle",
  title: "services.landing-pages.title",
  tagline: "services.landing-pages.tagline",
  description: "services.landing-pages.description",
  ctaBanner: {
    title: "services.landing-pages.ctaBanner.title",
    text: "services.landing-pages.ctaBanner.text",
    buttonLabel: "services.landing-pages.ctaBanner.buttonLabel",
  },
  icon: "rocket-launch",
  group: "web-growth",
  features: [
    {
      title: "services.landing-pages.features.0.title",
      text: "services.landing-pages.features.0.text",
    },
    {
      title: "services.landing-pages.features.1.title",
      text: "services.landing-pages.features.1.text",
    },
    {
      title: "services.landing-pages.features.2.title",
      text: "services.landing-pages.features.2.text",
    },
    {
      title: "services.landing-pages.features.3.title",
      text: "services.landing-pages.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.landing-pages.processSteps.0.title",
      text: "services.landing-pages.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.landing-pages.processSteps.1.title",
      text: "services.landing-pages.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "services.landing-pages.processSteps.2.title",
      text: "services.landing-pages.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.landing-pages.processSteps.3.title",
      text: "services.landing-pages.processSteps.3.text",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "services.landing-pages.fitItems.0.title",
      text: "services.landing-pages.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.landing-pages.fitItems.1.title",
      text: "services.landing-pages.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.landing-pages.fitItems.2.title",
      text: "services.landing-pages.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.landing-pages.fitItems.3.title",
      text: "services.landing-pages.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.landing-pages.proofItems.0.title",
      text: "services.landing-pages.proofItems.0.text",
      metricValue: "services.landing-pages.proofItems.0.metricValue",
      metricLabel: "services.landing-pages.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.landing-pages.faqItems.0.question",
      answer: "services.landing-pages.faqItems.0.answer",
    },
    {
      question: "services.landing-pages.faqItems.1.question",
      answer: "services.landing-pages.faqItems.1.answer",
    },
    {
      question: "services.landing-pages.faqItems.2.question",
      answer: "services.landing-pages.faqItems.2.answer",
    },
    {
      question: "services.landing-pages.faqItems.3.question",
      answer: "services.landing-pages.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.landing-pages.sections.0.title",
      items: [
        "services.landing-pages.sections.0.items.0",
        "services.landing-pages.sections.0.items.1",
        "services.landing-pages.sections.0.items.2",
        "services.landing-pages.sections.0.items.3",
        "services.landing-pages.sections.0.items.4",
        "services.landing-pages.sections.0.items.5",
      ],
    },
    {
      title: "services.landing-pages.sections.1.title",
      items: [
        "services.landing-pages.sections.1.items.0",
        "services.landing-pages.sections.1.items.1",
        "services.landing-pages.sections.1.items.2",
        "services.landing-pages.sections.1.items.3",
        "services.landing-pages.sections.1.items.4",
        "services.landing-pages.sections.1.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.landing-pages.software-development",
    },
    {
      type: "service",
      slug: "corporate-websites",
      noteKey: "relevants.landing-pages.corporate-websites",
    },
    {
      type: "service",
      slug: "seo-aeo",
      noteKey: "relevants.landing-pages.seo-aeo",
    },
  ],
};
