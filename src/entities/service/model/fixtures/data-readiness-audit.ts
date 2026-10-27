import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; sources and data volume scale the review, while PII and the scorecard are add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.data-readiness-audit.sources",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "segmented",
      id: "volume",
      label: "calculator.fields.data-readiness-audit.volume",
      options: [
        { value: "small", label: "calculator.options.small" },
        { value: "medium", label: "calculator.options.medium" },
        { value: "large", label: "calculator.options.large" },
      ],
      default: "small",
    },
    {
      kind: "toggle",
      id: "pii",
      label: "calculator.fields.data-readiness-audit.pii",
      default: false,
    },
    {
      kind: "toggle",
      id: "scorecard",
      label: "calculator.fields.data-readiness-audit.scorecard",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 2 },
    { kind: "perUnit", field: "sources", rate: 50000, weeksPerUnit: 0.25 },
    { kind: "multiplier", field: "volume", factors: { small: 1, medium: 1.2, large: 1.5 } },
    { kind: "perOption", field: "pii", rates: { false: 0, true: 100000 } },
    { kind: "perOption", field: "scorecard", rates: { false: 0, true: 50000 } },
  ],
};

export const dataReadinessAudit: Service = {
  slug: "data-readiness-audit",
  navTitle: "services.data-readiness-audit.navTitle",
  title: "services.data-readiness-audit.title",
  tagline: "services.data-readiness-audit.tagline",
  description: "services.data-readiness-audit.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "radar",
  group: "data",
  features: [
    {
      title: "services.data-readiness-audit.features.0.title",
      text: "services.data-readiness-audit.features.0.text",
    },
    {
      title: "services.data-readiness-audit.features.1.title",
      text: "services.data-readiness-audit.features.1.text",
    },
    {
      title: "services.data-readiness-audit.features.2.title",
      text: "services.data-readiness-audit.features.2.text",
    },
    {
      title: "services.data-readiness-audit.features.3.title",
      text: "services.data-readiness-audit.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.data-readiness-audit.ctaBanner.title",
    text: "services.data-readiness-audit.ctaBanner.text",
    buttonLabel: "services.data-readiness-audit.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.data-readiness-audit.techStack.0.subtitle",
      description: "services.data-readiness-audit.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.data-readiness-audit.techStack.0.technologies.0.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.data-readiness-audit.techStack.0.technologies.1.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.data-readiness-audit.techStack.0.technologies.2.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.data-readiness-audit.techStack.0.technologies.3.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.data-readiness-audit.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.data-readiness-audit.processSteps.0.title",
      text: "services.data-readiness-audit.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.data-readiness-audit.processSteps.1.title",
      text: "services.data-readiness-audit.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.data-readiness-audit.processSteps.2.title",
      text: "services.data-readiness-audit.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.data-readiness-audit.processSteps.3.title",
      text: "services.data-readiness-audit.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.data-readiness-audit.fitItems.0.title",
      text: "services.data-readiness-audit.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.data-readiness-audit.fitItems.1.title",
      text: "services.data-readiness-audit.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.data-readiness-audit.fitItems.2.title",
      text: "services.data-readiness-audit.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.data-readiness-audit.fitItems.3.title",
      text: "services.data-readiness-audit.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.data-readiness-audit.precedents.0.title",
      text: "services.data-readiness-audit.precedents.0.text",
      metricValue: "services.data-readiness-audit.precedents.0.metricValue",
      metricLabel: "services.data-readiness-audit.precedents.0.metricLabel",
    },
    {
      title: "services.data-readiness-audit.precedents.1.title",
      text: "services.data-readiness-audit.precedents.1.text",
      metricValue: "services.data-readiness-audit.precedents.1.metricValue",
      metricLabel: "services.data-readiness-audit.precedents.1.metricLabel",
    },
    {
      title: "services.data-readiness-audit.precedents.2.title",
      text: "services.data-readiness-audit.precedents.2.text",
      metricValue: "services.data-readiness-audit.precedents.2.metricValue",
      metricLabel: "services.data-readiness-audit.precedents.2.metricLabel",
    },
    {
      title: "services.data-readiness-audit.precedents.3.title",
      text: "services.data-readiness-audit.precedents.3.text",
      metricValue: "services.data-readiness-audit.precedents.3.metricValue",
      metricLabel: "services.data-readiness-audit.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.data-readiness-audit.faqItems.0.question",
      answer: "services.data-readiness-audit.faqItems.0.answer",
    },
    {
      question: "services.data-readiness-audit.faqItems.1.question",
      answer: "services.data-readiness-audit.faqItems.1.answer",
    },
    {
      question: "services.data-readiness-audit.faqItems.2.question",
      answer: "services.data-readiness-audit.faqItems.2.answer",
    },
    {
      question: "services.data-readiness-audit.faqItems.3.question",
      answer: "services.data-readiness-audit.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.data-readiness-audit.tradeoffs.0.title",
      text: "services.data-readiness-audit.tradeoffs.0.text",
    },
    {
      title: "services.data-readiness-audit.tradeoffs.1.title",
      text: "services.data-readiness-audit.tradeoffs.1.text",
    },
    {
      title: "services.data-readiness-audit.tradeoffs.2.title",
      text: "services.data-readiness-audit.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.data-readiness-audit.deliverables.0.title",
      text: "services.data-readiness-audit.deliverables.0.text",
    },
    {
      title: "services.data-readiness-audit.deliverables.1.title",
      text: "services.data-readiness-audit.deliverables.1.text",
    },
    {
      title: "services.data-readiness-audit.deliverables.2.title",
      text: "services.data-readiness-audit.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.data-readiness-audit.mechanism.0.title",
      text: "services.data-readiness-audit.mechanism.0.text",
    },
    {
      title: "services.data-readiness-audit.mechanism.1.title",
      text: "services.data-readiness-audit.mechanism.1.text",
    },
    {
      title: "services.data-readiness-audit.mechanism.2.title",
      text: "services.data-readiness-audit.mechanism.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-erp-integration" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
