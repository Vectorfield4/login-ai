import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while modules, users and documents add build and test time.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "modules",
      label: "calculator.fields.ai-1c-integration.modules",
      min: 1,
      max: 12,
      default: 4,
    },
    {
      kind: "stepper",
      id: "users",
      label: "calculator.fields.ai-1c-integration.users",
      min: 10,
      max: 2000,
      default: 100,
    },
    {
      kind: "stepper",
      id: "documents",
      label: "calculator.fields.ai-1c-integration.documents",
      min: 100,
      max: 10000,
      default: 500,
    },
  ],
  terms: [
    { kind: "setup", amount: 1200000, weeks: 4 },
    { kind: "perUnit", field: "modules", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "users", rate: 1000, weeksPerUnit: 0.002 },
    { kind: "perUnit", field: "documents", rate: 100, weeksPerUnit: 0.0002 },
  ],
};

export const ai1cIntegration: Service = {
  slug: "ai-1c-integration",
  navTitle: "services.ai-1c-integration.navTitle",
  title: "services.ai-1c-integration.title",
  tagline: "services.ai-1c-integration.tagline",
  description: "services.ai-1c-integration.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  icon: "server",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-1c-integration.features.0.title",
      text: "services.ai-1c-integration.features.0.text",
    },
    {
      title: "services.ai-1c-integration.features.1.title",
      text: "services.ai-1c-integration.features.1.text",
    },
    {
      title: "services.ai-1c-integration.features.2.title",
      text: "services.ai-1c-integration.features.2.text",
    },
    {
      title: "services.ai-1c-integration.features.3.title",
      text: "services.ai-1c-integration.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-1c-integration.ctaBanner.title",
    text: "services.ai-1c-integration.ctaBanner.text",
    buttonLabel: "services.ai-1c-integration.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-1c-integration.techStack.0.subtitle",
      description: "services.ai-1c-integration.techStack.0.description",
      technologies: [
        {
          id: "1c",
          name: "1С",
          glossary: "services.ai-1c-integration.techStack.0.technologies.0.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-1c-integration.techStack.0.technologies.1.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-1c-integration.techStack.0.technologies.2.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-1c-integration.techStack.0.technologies.3.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.ai-1c-integration.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-1c-integration.processSteps.0.title",
      text: "services.ai-1c-integration.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-1c-integration.processSteps.1.title",
      text: "services.ai-1c-integration.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-1c-integration.processSteps.2.title",
      text: "services.ai-1c-integration.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-1c-integration.processSteps.3.title",
      text: "services.ai-1c-integration.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-1c-integration.fitItems.0.title",
      text: "services.ai-1c-integration.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-1c-integration.fitItems.1.title",
      text: "services.ai-1c-integration.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-1c-integration.fitItems.2.title",
      text: "services.ai-1c-integration.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-1c-integration.fitItems.3.title",
      text: "services.ai-1c-integration.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-1c-integration.precedents.0.title",
      text: "services.ai-1c-integration.precedents.0.text",
      metricValue: "services.ai-1c-integration.precedents.0.metricValue",
      metricLabel: "services.ai-1c-integration.precedents.0.metricLabel",
    },
    {
      title: "services.ai-1c-integration.precedents.1.title",
      text: "services.ai-1c-integration.precedents.1.text",
      metricValue: "services.ai-1c-integration.precedents.1.metricValue",
      metricLabel: "services.ai-1c-integration.precedents.1.metricLabel",
    },
    {
      title: "services.ai-1c-integration.precedents.2.title",
      text: "services.ai-1c-integration.precedents.2.text",
      metricValue: "services.ai-1c-integration.precedents.2.metricValue",
      metricLabel: "services.ai-1c-integration.precedents.2.metricLabel",
    },
    {
      title: "services.ai-1c-integration.precedents.3.title",
      text: "services.ai-1c-integration.precedents.3.text",
      metricValue: "services.ai-1c-integration.precedents.3.metricValue",
      metricLabel: "services.ai-1c-integration.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-1c-integration.faqItems.0.question",
      answer: "services.ai-1c-integration.faqItems.0.answer",
    },
    {
      question: "services.ai-1c-integration.faqItems.1.question",
      answer: "services.ai-1c-integration.faqItems.1.answer",
    },
    {
      question: "services.ai-1c-integration.faqItems.2.question",
      answer: "services.ai-1c-integration.faqItems.2.answer",
    },
    {
      question: "services.ai-1c-integration.faqItems.3.question",
      answer: "services.ai-1c-integration.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-1c-integration.tradeoffs.0.title",
      text: "services.ai-1c-integration.tradeoffs.0.text",
    },
    {
      title: "services.ai-1c-integration.tradeoffs.1.title",
      text: "services.ai-1c-integration.tradeoffs.1.text",
    },
    {
      title: "services.ai-1c-integration.tradeoffs.2.title",
      text: "services.ai-1c-integration.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-1c-integration.deliverables.0.title",
      text: "services.ai-1c-integration.deliverables.0.text",
    },
    {
      title: "services.ai-1c-integration.deliverables.1.title",
      text: "services.ai-1c-integration.deliverables.1.text",
    },
    {
      title: "services.ai-1c-integration.deliverables.2.title",
      text: "services.ai-1c-integration.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-1c-integration.mechanism.0.title",
      text: "services.ai-1c-integration.mechanism.0.text",
    },
    {
      title: "services.ai-1c-integration.mechanism.1.title",
      text: "services.ai-1c-integration.mechanism.1.text",
    },
    {
      title: "services.ai-1c-integration.mechanism.2.title",
      text: "services.ai-1c-integration.mechanism.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-erp-integration" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
