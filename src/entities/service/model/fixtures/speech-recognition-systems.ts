import type { Service } from "../services";

export const speechRecognitionSystems: Service = {
  slug: "speech-recognition-systems",
  draft: true,
  navTitle: "services.speech-recognition-systems.navTitle",
  title: "services.speech-recognition-systems.title",
  tagline: "services.speech-recognition-systems.tagline",
  description: "services.speech-recognition-systems.description",
  icon: "support-agent",
  group: "ml",
  features: [
    {
      title: "services.speech-recognition-systems.features.0.title",
      text: "services.speech-recognition-systems.features.0.text",
    },
    {
      title: "services.speech-recognition-systems.features.1.title",
      text: "services.speech-recognition-systems.features.1.text",
    },
    {
      title: "services.speech-recognition-systems.features.2.title",
      text: "services.speech-recognition-systems.features.2.text",
    },
    {
      title: "services.speech-recognition-systems.features.3.title",
      text: "services.speech-recognition-systems.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.speech-recognition-systems.ctaBanner.title",
    text: "services.speech-recognition-systems.ctaBanner.text",
    buttonLabel: "services.speech-recognition-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.speech-recognition-systems.techStack.0.subtitle",
      description: "services.speech-recognition-systems.techStack.0.description",
      technologies: [
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.speech-recognition-systems.techStack.0.technologies.3.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.speech-recognition-systems.processSteps.0.title",
      text: "services.speech-recognition-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.speech-recognition-systems.processSteps.1.title",
      text: "services.speech-recognition-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.speech-recognition-systems.processSteps.2.title",
      text: "services.speech-recognition-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.speech-recognition-systems.processSteps.3.title",
      text: "services.speech-recognition-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.speech-recognition-systems.fitItems.0.title",
      text: "services.speech-recognition-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.speech-recognition-systems.fitItems.1.title",
      text: "services.speech-recognition-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.speech-recognition-systems.fitItems.2.title",
      text: "services.speech-recognition-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.speech-recognition-systems.fitItems.3.title",
      text: "services.speech-recognition-systems.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.speech-recognition-systems.proofItems.0.title",
      text: "services.speech-recognition-systems.proofItems.0.text",
      metricValue: "services.speech-recognition-systems.proofItems.0.metricValue",
      metricLabel: "services.speech-recognition-systems.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.speech-recognition-systems.faqItems.0.question",
      answer: "services.speech-recognition-systems.faqItems.0.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.1.question",
      answer: "services.speech-recognition-systems.faqItems.1.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.2.question",
      answer: "services.speech-recognition-systems.faqItems.2.answer",
    },
    {
      question: "services.speech-recognition-systems.faqItems.3.question",
      answer: "services.speech-recognition-systems.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.speech-recognition-systems.sections.0.title",
      items: [
        "services.speech-recognition-systems.sections.0.items.0",
        "services.speech-recognition-systems.sections.0.items.1",
        "services.speech-recognition-systems.sections.0.items.2",
        "services.speech-recognition-systems.sections.0.items.3",
      ],
    },
    {
      title: "services.speech-recognition-systems.sections.1.title",
      items: [
        "services.speech-recognition-systems.sections.1.items.0",
        "services.speech-recognition-systems.sections.1.items.1",
        "services.speech-recognition-systems.sections.1.items.2",
        "services.speech-recognition-systems.sections.1.items.3",
      ],
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
