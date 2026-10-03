import type { Service } from "../services";

export const recommendationSystems: Service = {
  slug: "recommendation-systems",
  draft: true,
  navTitle: "services.recommendation-systems.navTitle",
  title: "services.recommendation-systems.title",
  tagline: "services.recommendation-systems.tagline",
  description: "services.recommendation-systems.description",
  icon: "rate-review",
  group: "ml",
  features: [
    {
      title: "services.recommendation-systems.features.0.title",
      text: "services.recommendation-systems.features.0.text",
    },
    {
      title: "services.recommendation-systems.features.1.title",
      text: "services.recommendation-systems.features.1.text",
    },
    {
      title: "services.recommendation-systems.features.2.title",
      text: "services.recommendation-systems.features.2.text",
    },
    {
      title: "services.recommendation-systems.features.3.title",
      text: "services.recommendation-systems.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.recommendation-systems.ctaBanner.title",
    text: "services.recommendation-systems.ctaBanner.text",
    buttonLabel: "services.recommendation-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.recommendation-systems.techStack.0.subtitle",
      description: "services.recommendation-systems.techStack.0.description",
      technologies: [
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.recommendation-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.recommendation-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.recommendation-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.recommendation-systems.techStack.0.technologies.3.glossary",
        },
        {
          id: "grafana",
          name: "Grafana",
          glossary: "services.recommendation-systems.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.recommendation-systems.processSteps.0.title",
      text: "services.recommendation-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.recommendation-systems.processSteps.1.title",
      text: "services.recommendation-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.recommendation-systems.processSteps.2.title",
      text: "services.recommendation-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.recommendation-systems.processSteps.3.title",
      text: "services.recommendation-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.recommendation-systems.fitItems.0.title",
      text: "services.recommendation-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.recommendation-systems.fitItems.1.title",
      text: "services.recommendation-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.recommendation-systems.fitItems.2.title",
      text: "services.recommendation-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.recommendation-systems.fitItems.3.title",
      text: "services.recommendation-systems.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.recommendation-systems.proofItems.0.title",
      text: "services.recommendation-systems.proofItems.0.text",
      metricValue: "services.recommendation-systems.proofItems.0.metricValue",
      metricLabel: "services.recommendation-systems.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.recommendation-systems.faqItems.0.question",
      answer: "services.recommendation-systems.faqItems.0.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.1.question",
      answer: "services.recommendation-systems.faqItems.1.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.2.question",
      answer: "services.recommendation-systems.faqItems.2.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.3.question",
      answer: "services.recommendation-systems.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.recommendation-systems.sections.0.title",
      items: [
        "services.recommendation-systems.sections.0.items.0",
        "services.recommendation-systems.sections.0.items.1",
        "services.recommendation-systems.sections.0.items.2",
        "services.recommendation-systems.sections.0.items.3",
      ],
    },
    {
      title: "services.recommendation-systems.sections.1.title",
      items: [
        "services.recommendation-systems.sections.1.items.0",
        "services.recommendation-systems.sections.1.items.1",
        "services.recommendation-systems.sections.1.items.2",
        "services.recommendation-systems.sections.1.items.3",
      ],
    },
  ],
  relevants: [
    { type: "service", slug: "software-development" },
    { type: "solution", slug: "app-development-systems" },
    { type: "case", slug: "agency-content-pipeline" },
  ],
};
