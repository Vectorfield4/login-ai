import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; each
 * document type adds extraction and validation work, while volume and the
 * accuracy target scale the pipeline and the review loop.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "types",
      label: "calculator.fields.document-processing.types",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "segmented",
      id: "volume",
      label: "calculator.fields.document-processing.volume",
      options: [
        { value: "small", label: "calculator.options.small" },
        { value: "medium", label: "calculator.options.medium" },
        { value: "large", label: "calculator.options.large" },
      ],
      default: "small",
    },
    {
      kind: "segmented",
      id: "accuracy",
      label: "calculator.fields.document-processing.accuracy",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "high", label: "calculator.options.accuracyHigh" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "review",
      label: "calculator.fields.document-processing.review",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 800000, weeks: 4 },
    { kind: "perUnit", field: "types", rate: 150000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "volume", factors: { small: 1, medium: 1.3, large: 1.7 } },
    { kind: "multiplier", field: "accuracy", factors: { standard: 1, high: 1.4 } },
    { kind: "perOption", field: "review", rates: { false: 0, true: 150000 } },
  ],
};

export const documentProcessing: Service = {
  slug: "document-processing",
  navTitle: "services.document-processing.navTitle",
  title: "services.document-processing.title",
  tagline: "services.document-processing.tagline",
  description: "services.document-processing.description",
  price: { amount: 800000, unit: "project" },
  calculator,
  icon: "article",
  group: "engineering",
  features: [
    {
      title: "services.document-processing.features.0.title",
      text: "services.document-processing.features.0.text",
    },
    {
      title: "services.document-processing.features.1.title",
      text: "services.document-processing.features.1.text",
    },
    {
      title: "services.document-processing.features.2.title",
      text: "services.document-processing.features.2.text",
    },
    {
      title: "services.document-processing.features.3.title",
      text: "services.document-processing.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.document-processing.ctaBanner.title",
    text: "services.document-processing.ctaBanner.text",
    buttonLabel: "services.document-processing.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.document-processing.techStack.0.subtitle",
      description: "services.document-processing.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.document-processing.techStack.0.technologies.0.glossary",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary: "services.document-processing.techStack.0.technologies.1.glossary",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary: "services.document-processing.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.document-processing.techStack.0.technologies.3.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.document-processing.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.document-processing.processSteps.0.title",
      text: "services.document-processing.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.document-processing.processSteps.1.title",
      text: "services.document-processing.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.document-processing.processSteps.2.title",
      text: "services.document-processing.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.document-processing.processSteps.3.title",
      text: "services.document-processing.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.document-processing.fitItems.0.title",
      text: "services.document-processing.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.document-processing.fitItems.1.title",
      text: "services.document-processing.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.document-processing.fitItems.2.title",
      text: "services.document-processing.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.document-processing.fitItems.3.title",
      text: "services.document-processing.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.document-processing.faqItems.0.question",
      answer: "services.document-processing.faqItems.0.answer",
    },
    {
      question: "services.document-processing.faqItems.1.question",
      answer: "services.document-processing.faqItems.1.answer",
    },
    {
      question: "services.document-processing.faqItems.2.question",
      answer: "services.document-processing.faqItems.2.answer",
    },
    {
      question: "services.document-processing.faqItems.3.question",
      answer: "services.document-processing.faqItems.3.answer",
    },
  ],
  scope: [
    {
      title: "services.document-processing.scope.0.title",
      text: "services.document-processing.scope.0.text",
    },
    {
      title: "services.document-processing.scope.1.title",
      text: "services.document-processing.scope.1.text",
    },
    {
      title: "services.document-processing.scope.2.title",
      text: "services.document-processing.scope.2.text",
    },
    {
      title: "services.document-processing.scope.3.title",
      text: "services.document-processing.scope.3.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.document-processing.tradeoffs.0.title",
      text: "services.document-processing.tradeoffs.0.text",
    },
    {
      title: "services.document-processing.tradeoffs.1.title",
      text: "services.document-processing.tradeoffs.1.text",
    },
    {
      title: "services.document-processing.tradeoffs.2.title",
      text: "services.document-processing.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.document-processing.deliverables.0.title",
      text: "services.document-processing.deliverables.0.text",
    },
    {
      title: "services.document-processing.deliverables.1.title",
      text: "services.document-processing.deliverables.1.text",
    },
    {
      title: "services.document-processing.deliverables.2.title",
      text: "services.document-processing.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.document-processing.mechanism.0.title",
      text: "services.document-processing.mechanism.0.text",
    },
    {
      title: "services.document-processing.mechanism.1.title",
      text: "services.document-processing.mechanism.1.text",
    },
    {
      title: "services.document-processing.mechanism.2.title",
      text: "services.document-processing.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.document-processing.precedents.0.title",
      text: "services.document-processing.precedents.0.text",
      metricValue: "services.document-processing.precedents.0.metricValue",
      metricLabel: "services.document-processing.precedents.0.metricLabel",
    },
    {
      title: "services.document-processing.precedents.1.title",
      text: "services.document-processing.precedents.1.text",
      metricValue: "services.document-processing.precedents.1.metricValue",
      metricLabel: "services.document-processing.precedents.1.metricLabel",
    },
    {
      title: "services.document-processing.precedents.2.title",
      text: "services.document-processing.precedents.2.text",
      metricValue: "services.document-processing.precedents.2.metricValue",
      metricLabel: "services.document-processing.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-erp-integration" },
    { type: "service", slug: "ai-security-audit" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
