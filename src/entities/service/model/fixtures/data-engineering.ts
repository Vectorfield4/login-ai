import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while sources, volume and pipelines add build time; a warehouse is a one-off add-on.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.data-engineering.sources",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "stepper",
      id: "volume",
      label: "calculator.fields.data-engineering.volume",
      min: 1,
      max: 100,
      default: 5,
    },
    {
      kind: "stepper",
      id: "pipelines",
      label: "calculator.fields.data-engineering.pipelines",
      min: 1,
      max: 20,
      default: 2,
    },
    {
      kind: "toggle",
      id: "warehouse",
      label: "calculator.fields.data-engineering.warehouse",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 1200000, weeks: 4 },
    { kind: "perUnit", field: "sources", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "volume", rate: 50000, weeksPerUnit: 0.2 },
    { kind: "perUnit", field: "pipelines", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "warehouse", rates: { false: 0, true: 300000 } },
  ],
};

export const dataEngineering: Service = {
  slug: "data-engineering",
  navTitle: "services.data-engineering.navTitle",
  title: "services.data-engineering.title",
  tagline: "services.data-engineering.tagline",
  description: "services.data-engineering.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  icon: "server",
  group: "data",
  features: [
    {
      title: "services.data-engineering.features.0.title",
      text: "services.data-engineering.features.0.text",
    },
    {
      title: "services.data-engineering.features.1.title",
      text: "services.data-engineering.features.1.text",
    },
    {
      title: "services.data-engineering.features.2.title",
      text: "services.data-engineering.features.2.text",
    },
    {
      title: "services.data-engineering.features.3.title",
      text: "services.data-engineering.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.data-engineering.ctaBanner.title",
    text: "services.data-engineering.ctaBanner.text",
    buttonLabel: "services.data-engineering.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.data-engineering.techStack.0.subtitle",
      description: "services.data-engineering.techStack.0.description",
      technologies: [
        {
          id: "airflow",
          name: "Airflow",
          glossary: "services.data-engineering.techStack.0.technologies.0.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.data-engineering.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.data-engineering.techStack.0.technologies.2.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.data-engineering.techStack.0.technologies.3.glossary",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary: "services.data-engineering.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.data-engineering.processSteps.0.title",
      text: "services.data-engineering.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.data-engineering.processSteps.1.title",
      text: "services.data-engineering.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.data-engineering.processSteps.2.title",
      text: "services.data-engineering.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.data-engineering.processSteps.3.title",
      text: "services.data-engineering.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.data-engineering.fitItems.0.title",
      text: "services.data-engineering.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.data-engineering.fitItems.1.title",
      text: "services.data-engineering.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.data-engineering.fitItems.2.title",
      text: "services.data-engineering.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.data-engineering.fitItems.3.title",
      text: "services.data-engineering.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.data-engineering.faqItems.0.question",
      answer: "services.data-engineering.faqItems.0.answer",
    },
    {
      question: "services.data-engineering.faqItems.1.question",
      answer: "services.data-engineering.faqItems.1.answer",
    },
    {
      question: "services.data-engineering.faqItems.2.question",
      answer: "services.data-engineering.faqItems.2.answer",
    },
    {
      question: "services.data-engineering.faqItems.3.question",
      answer: "services.data-engineering.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.data-engineering.tradeoffs.0.title",
      text: "services.data-engineering.tradeoffs.0.text",
    },
    {
      title: "services.data-engineering.tradeoffs.1.title",
      text: "services.data-engineering.tradeoffs.1.text",
    },
    {
      title: "services.data-engineering.tradeoffs.2.title",
      text: "services.data-engineering.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.data-engineering.deliverables.0.title",
      text: "services.data-engineering.deliverables.0.text",
    },
    {
      title: "services.data-engineering.deliverables.1.title",
      text: "services.data-engineering.deliverables.1.text",
    },
    {
      title: "services.data-engineering.deliverables.2.title",
      text: "services.data-engineering.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.data-engineering.mechanism.0.title",
      text: "services.data-engineering.mechanism.0.text",
    },
    {
      title: "services.data-engineering.mechanism.1.title",
      text: "services.data-engineering.mechanism.1.text",
    },
    {
      title: "services.data-engineering.mechanism.2.title",
      text: "services.data-engineering.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.data-engineering.precedents.0.title",
      text: "services.data-engineering.precedents.0.text",
      metricValue: "services.data-engineering.precedents.0.metricValue",
      metricLabel: "services.data-engineering.precedents.0.metricLabel",
    },
    {
      title: "services.data-engineering.precedents.1.title",
      text: "services.data-engineering.precedents.1.text",
      metricValue: "services.data-engineering.precedents.1.metricValue",
      metricLabel: "services.data-engineering.precedents.1.metricLabel",
    },
    {
      title: "services.data-engineering.precedents.2.title",
      text: "services.data-engineering.precedents.2.text",
      metricValue: "services.data-engineering.precedents.2.metricValue",
      metricLabel: "services.data-engineering.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "mlops-platforms" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
