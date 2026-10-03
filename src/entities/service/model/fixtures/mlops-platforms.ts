import type { Service } from "../services";

export const mlopsPlatforms: Service = {
  slug: "mlops-platforms",
  draft: true,
  navTitle: "services.mlops-platforms.navTitle",
  title: "services.mlops-platforms.title",
  tagline: "services.mlops-platforms.tagline",
  description: "services.mlops-platforms.description",
  icon: "server",
  group: "ml",
  features: [
    {
      title: "services.mlops-platforms.features.0.title",
      text: "services.mlops-platforms.features.0.text",
    },
    {
      title: "services.mlops-platforms.features.1.title",
      text: "services.mlops-platforms.features.1.text",
    },
    {
      title: "services.mlops-platforms.features.2.title",
      text: "services.mlops-platforms.features.2.text",
    },
    {
      title: "services.mlops-platforms.features.3.title",
      text: "services.mlops-platforms.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.mlops-platforms.ctaBanner.title",
    text: "services.mlops-platforms.ctaBanner.text",
    buttonLabel: "services.mlops-platforms.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.mlops-platforms.techStack.0.subtitle",
      description: "services.mlops-platforms.techStack.0.description",
      technologies: [
        {
          id: "airflow",
          name: "Airflow",
          glossary: "services.mlops-platforms.techStack.0.technologies.0.glossary",
        },
        {
          id: "mlflow",
          name: "MLflow",
          glossary: "services.mlops-platforms.techStack.0.technologies.1.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.mlops-platforms.techStack.0.technologies.2.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.mlops-platforms.techStack.0.technologies.3.glossary",
        },
        {
          id: "prometheus",
          name: "Prometheus",
          glossary: "services.mlops-platforms.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.mlops-platforms.processSteps.0.title",
      text: "services.mlops-platforms.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.mlops-platforms.processSteps.1.title",
      text: "services.mlops-platforms.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.mlops-platforms.processSteps.2.title",
      text: "services.mlops-platforms.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.mlops-platforms.processSteps.3.title",
      text: "services.mlops-platforms.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.mlops-platforms.fitItems.0.title",
      text: "services.mlops-platforms.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.mlops-platforms.fitItems.1.title",
      text: "services.mlops-platforms.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.mlops-platforms.fitItems.2.title",
      text: "services.mlops-platforms.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.mlops-platforms.fitItems.3.title",
      text: "services.mlops-platforms.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.mlops-platforms.proofItems.0.title",
      text: "services.mlops-platforms.proofItems.0.text",
      metricValue: "services.mlops-platforms.proofItems.0.metricValue",
      metricLabel: "services.mlops-platforms.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.mlops-platforms.faqItems.0.question",
      answer: "services.mlops-platforms.faqItems.0.answer",
    },
    {
      question: "services.mlops-platforms.faqItems.1.question",
      answer: "services.mlops-platforms.faqItems.1.answer",
    },
    {
      question: "services.mlops-platforms.faqItems.2.question",
      answer: "services.mlops-platforms.faqItems.2.answer",
    },
    {
      question: "services.mlops-platforms.faqItems.3.question",
      answer: "services.mlops-platforms.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "services.mlops-platforms.sections.0.title",
      items: [
        "services.mlops-platforms.sections.0.items.0",
        "services.mlops-platforms.sections.0.items.1",
        "services.mlops-platforms.sections.0.items.2",
        "services.mlops-platforms.sections.0.items.3",
      ],
    },
    {
      title: "services.mlops-platforms.sections.1.title",
      items: [
        "services.mlops-platforms.sections.1.items.0",
        "services.mlops-platforms.sections.1.items.1",
        "services.mlops-platforms.sections.1.items.2",
        "services.mlops-platforms.sections.1.items.3",
      ],
    },
  ],
  relevants: [
    { type: "service", slug: "highload-backend" },
    { type: "service", slug: "software-development" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
