import type { Service } from "../services";

export const aiInfraCostOptimization: Service = {
  slug: "ai-infra-cost-optimization",
  draft: true,
  navTitle: "services.ai-infra-cost-optimization.navTitle",
  title: "services.ai-infra-cost-optimization.title",
  tagline: "services.ai-infra-cost-optimization.tagline",
  description: "services.ai-infra-cost-optimization.description",
  icon: "insights",
  group: "ai-infra",
  features: [
    {
      title: "services.ai-infra-cost-optimization.features.0.title",
      text: "services.ai-infra-cost-optimization.features.0.text",
    },
    {
      title: "services.ai-infra-cost-optimization.features.1.title",
      text: "services.ai-infra-cost-optimization.features.1.text",
    },
    {
      title: "services.ai-infra-cost-optimization.features.2.title",
      text: "services.ai-infra-cost-optimization.features.2.text",
    },
    {
      title: "services.ai-infra-cost-optimization.features.3.title",
      text: "services.ai-infra-cost-optimization.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-infra-cost-optimization.ctaBanner.title",
    text: "services.ai-infra-cost-optimization.ctaBanner.text",
    buttonLabel: "services.ai-infra-cost-optimization.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-infra-cost-optimization.techStack.0.subtitle",
      description: "services.ai-infra-cost-optimization.techStack.0.description",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.ai-infra-cost-optimization.techStack.0.technologies.0.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-infra-cost-optimization.techStack.0.technologies.1.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.ai-infra-cost-optimization.techStack.0.technologies.2.glossary",
        },
        {
          id: "prometheus",
          name: "Prometheus",
          glossary: "services.ai-infra-cost-optimization.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-infra-cost-optimization.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-infra-cost-optimization.processSteps.0.title",
      text: "services.ai-infra-cost-optimization.processSteps.0.text",
      processType: "analysis",
    },
    {
      title: "services.ai-infra-cost-optimization.processSteps.1.title",
      text: "services.ai-infra-cost-optimization.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-infra-cost-optimization.processSteps.2.title",
      text: "services.ai-infra-cost-optimization.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-infra-cost-optimization.processSteps.3.title",
      text: "services.ai-infra-cost-optimization.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-infra-cost-optimization.fitItems.0.title",
      text: "services.ai-infra-cost-optimization.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-infra-cost-optimization.fitItems.1.title",
      text: "services.ai-infra-cost-optimization.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-infra-cost-optimization.fitItems.2.title",
      text: "services.ai-infra-cost-optimization.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-infra-cost-optimization.fitItems.3.title",
      text: "services.ai-infra-cost-optimization.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-infra-cost-optimization.proofItems.0.title",
      text: "services.ai-infra-cost-optimization.proofItems.0.text",
      metricValue: "services.ai-infra-cost-optimization.proofItems.0.metricValue",
      metricLabel: "services.ai-infra-cost-optimization.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-infra-cost-optimization.faqItems.0.question",
      answer: "services.ai-infra-cost-optimization.faqItems.0.answer",
    },
    {
      question: "services.ai-infra-cost-optimization.faqItems.1.question",
      answer: "services.ai-infra-cost-optimization.faqItems.1.answer",
    },
    {
      question: "services.ai-infra-cost-optimization.faqItems.2.question",
      answer: "services.ai-infra-cost-optimization.faqItems.2.answer",
    },
    {
      question: "services.ai-infra-cost-optimization.faqItems.3.question",
      answer: "services.ai-infra-cost-optimization.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.ai-infra-cost-optimization.sections.0.title",
      items: [
        "services.ai-infra-cost-optimization.sections.0.items.0",
        "services.ai-infra-cost-optimization.sections.0.items.1",
        "services.ai-infra-cost-optimization.sections.0.items.2",
        "services.ai-infra-cost-optimization.sections.0.items.3",
      ],
    },
    {
      title: "services.ai-infra-cost-optimization.sections.1.title",
      items: [
        "services.ai-infra-cost-optimization.sections.1.items.0",
        "services.ai-infra-cost-optimization.sections.1.items.1",
        "services.ai-infra-cost-optimization.sections.1.items.2",
        "services.ai-infra-cost-optimization.sections.1.items.3",
      ],
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "service", slug: "highload-backend" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
