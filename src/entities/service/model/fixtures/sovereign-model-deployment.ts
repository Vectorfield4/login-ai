import type { Service } from "../services";

export const sovereignModelDeployment: Service = {
  slug: "sovereign-model-deployment",
  draft: true,
  navTitle: "services.sovereign-model-deployment.navTitle",
  title: "services.sovereign-model-deployment.title",
  tagline: "services.sovereign-model-deployment.tagline",
  description: "services.sovereign-model-deployment.description",
  icon: "server",
  group: "ai-infra",
  features: [
    {
      title: "services.sovereign-model-deployment.features.0.title",
      text: "services.sovereign-model-deployment.features.0.text",
    },
    {
      title: "services.sovereign-model-deployment.features.1.title",
      text: "services.sovereign-model-deployment.features.1.text",
    },
    {
      title: "services.sovereign-model-deployment.features.2.title",
      text: "services.sovereign-model-deployment.features.2.text",
    },
    {
      title: "services.sovereign-model-deployment.features.3.title",
      text: "services.sovereign-model-deployment.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.sovereign-model-deployment.ctaBanner.title",
    text: "services.sovereign-model-deployment.ctaBanner.text",
    buttonLabel: "services.sovereign-model-deployment.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.sovereign-model-deployment.techStack.0.subtitle",
      description: "services.sovereign-model-deployment.techStack.0.description",
      technologies: [
        {
          id: "qwen",
          name: "Qwen",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.0.glossary",
        },
        {
          id: "llama",
          name: "Llama",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.1.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.2.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.sovereign-model-deployment.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.sovereign-model-deployment.processSteps.0.title",
      text: "services.sovereign-model-deployment.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.1.title",
      text: "services.sovereign-model-deployment.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.2.title",
      text: "services.sovereign-model-deployment.processSteps.2.text",
      processType: "deployment",
    },
    {
      title: "services.sovereign-model-deployment.processSteps.3.title",
      text: "services.sovereign-model-deployment.processSteps.3.text",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "services.sovereign-model-deployment.fitItems.0.title",
      text: "services.sovereign-model-deployment.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.1.title",
      text: "services.sovereign-model-deployment.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.2.title",
      text: "services.sovereign-model-deployment.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.sovereign-model-deployment.fitItems.3.title",
      text: "services.sovereign-model-deployment.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.sovereign-model-deployment.proofItems.0.title",
      text: "services.sovereign-model-deployment.proofItems.0.text",
      metricValue: "services.sovereign-model-deployment.proofItems.0.metricValue",
      metricLabel: "services.sovereign-model-deployment.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.sovereign-model-deployment.faqItems.0.question",
      answer: "services.sovereign-model-deployment.faqItems.0.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.1.question",
      answer: "services.sovereign-model-deployment.faqItems.1.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.2.question",
      answer: "services.sovereign-model-deployment.faqItems.2.answer",
    },
    {
      question: "services.sovereign-model-deployment.faqItems.3.question",
      answer: "services.sovereign-model-deployment.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.sovereign-model-deployment.sections.0.title",
      items: [
        "services.sovereign-model-deployment.sections.0.items.0",
        "services.sovereign-model-deployment.sections.0.items.1",
        "services.sovereign-model-deployment.sections.0.items.2",
        "services.sovereign-model-deployment.sections.0.items.3",
      ],
    },
    {
      title: "services.sovereign-model-deployment.sections.1.title",
      items: [
        "services.sovereign-model-deployment.sections.1.items.0",
        "services.sovereign-model-deployment.sections.1.items.1",
        "services.sovereign-model-deployment.sections.1.items.2",
        "services.sovereign-model-deployment.sections.1.items.3",
      ],
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
