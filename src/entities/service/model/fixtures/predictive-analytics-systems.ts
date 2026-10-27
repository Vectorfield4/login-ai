import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: `models` drive the recurring period (price per model),
 * the `complexity` scales it, and online scoring plus support are one-off
 * add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "models",
      label: "calculator.fields.predictive-analytics-systems.models",
      min: 1,
      max: 15,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.predictive-analytics-systems.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "realtime",
      label: "calculator.fields.predictive-analytics-systems.realtime",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 2000000, weeks: 4 },
    { kind: "perUnit", field: "models", rate: 120000, weeksPerUnit: 0.3 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "perOption", field: "realtime", rates: { false: 0, true: 500000 } },
  ],
};

export const predictiveAnalyticsSystems: Service = {
  slug: "predictive-analytics-systems",
  navTitle: "services.predictive-analytics-systems.navTitle",
  title: "services.predictive-analytics-systems.title",
  tagline: "services.predictive-analytics-systems.tagline",
  description: "services.predictive-analytics-systems.description",
  price: { amount: 2000000, unit: "project" },
  calculator,
  icon: "insights",
  group: "ml",
  features: [
    {
      title: "services.predictive-analytics-systems.features.0.title",
      text: "services.predictive-analytics-systems.features.0.text",
    },
    {
      title: "services.predictive-analytics-systems.features.1.title",
      text: "services.predictive-analytics-systems.features.1.text",
    },
    {
      title: "services.predictive-analytics-systems.features.2.title",
      text: "services.predictive-analytics-systems.features.2.text",
    },
    {
      title: "services.predictive-analytics-systems.features.3.title",
      text: "services.predictive-analytics-systems.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.predictive-analytics-systems.ctaBanner.title",
    text: "services.predictive-analytics-systems.ctaBanner.text",
    buttonLabel: "services.predictive-analytics-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.predictive-analytics-systems.techStack.0.subtitle",
      description: "services.predictive-analytics-systems.techStack.0.description",
      technologies: [
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.predictive-analytics-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary: "services.predictive-analytics-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.predictive-analytics-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "scikit-learn",
          name: "scikit-learn",
          glossary: "services.predictive-analytics-systems.techStack.0.technologies.3.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.predictive-analytics-systems.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.predictive-analytics-systems.processSteps.0.title",
      text: "services.predictive-analytics-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.predictive-analytics-systems.processSteps.1.title",
      text: "services.predictive-analytics-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.predictive-analytics-systems.processSteps.2.title",
      text: "services.predictive-analytics-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.predictive-analytics-systems.processSteps.3.title",
      text: "services.predictive-analytics-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.predictive-analytics-systems.fitItems.0.title",
      text: "services.predictive-analytics-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.predictive-analytics-systems.fitItems.1.title",
      text: "services.predictive-analytics-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.predictive-analytics-systems.fitItems.2.title",
      text: "services.predictive-analytics-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.predictive-analytics-systems.fitItems.3.title",
      text: "services.predictive-analytics-systems.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.predictive-analytics-systems.precedents.0.title",
      text: "services.predictive-analytics-systems.precedents.0.text",
      metricValue: "services.predictive-analytics-systems.precedents.0.metricValue",
      metricLabel: "services.predictive-analytics-systems.precedents.0.metricLabel",
    },
    {
      title: "services.predictive-analytics-systems.precedents.1.title",
      text: "services.predictive-analytics-systems.precedents.1.text",
      metricValue: "services.predictive-analytics-systems.precedents.1.metricValue",
      metricLabel: "services.predictive-analytics-systems.precedents.1.metricLabel",
    },
    {
      title: "services.predictive-analytics-systems.precedents.2.title",
      text: "services.predictive-analytics-systems.precedents.2.text",
      metricValue: "services.predictive-analytics-systems.precedents.2.metricValue",
      metricLabel: "services.predictive-analytics-systems.precedents.2.metricLabel",
    },
    {
      title: "services.predictive-analytics-systems.precedents.3.title",
      text: "services.predictive-analytics-systems.precedents.3.text",
      metricValue: "services.predictive-analytics-systems.precedents.3.metricValue",
      metricLabel: "services.predictive-analytics-systems.precedents.3.metricLabel",
    },
    {
      title: "services.predictive-analytics-systems.precedents.4.title",
      text: "services.predictive-analytics-systems.precedents.4.text",
      metricValue: "services.predictive-analytics-systems.precedents.4.metricValue",
      metricLabel: "services.predictive-analytics-systems.precedents.4.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.predictive-analytics-systems.faqItems.0.question",
      answer: "services.predictive-analytics-systems.faqItems.0.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.1.question",
      answer: "services.predictive-analytics-systems.faqItems.1.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.2.question",
      answer: "services.predictive-analytics-systems.faqItems.2.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.3.question",
      answer: "services.predictive-analytics-systems.faqItems.3.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.4.question",
      answer: "services.predictive-analytics-systems.faqItems.4.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.5.question",
      answer: "services.predictive-analytics-systems.faqItems.5.answer",
    },
    {
      question: "services.predictive-analytics-systems.faqItems.6.question",
      answer: "services.predictive-analytics-systems.faqItems.6.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.predictive-analytics-systems.tradeoffs.0.title",
      text: "services.predictive-analytics-systems.tradeoffs.0.text",
    },
    {
      title: "services.predictive-analytics-systems.tradeoffs.1.title",
      text: "services.predictive-analytics-systems.tradeoffs.1.text",
    },
    {
      title: "services.predictive-analytics-systems.tradeoffs.2.title",
      text: "services.predictive-analytics-systems.tradeoffs.2.text",
    },
    {
      title: "services.predictive-analytics-systems.tradeoffs.3.title",
      text: "services.predictive-analytics-systems.tradeoffs.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.predictive-analytics-systems.mechanism.0.title",
      text: "services.predictive-analytics-systems.mechanism.0.text",
      diagram: "forecast-loop",
    },
    {
      title: "services.predictive-analytics-systems.mechanism.1.title",
      text: "services.predictive-analytics-systems.mechanism.1.text",
      diagram: "features",
    },
    {
      title: "services.predictive-analytics-systems.mechanism.2.title",
      text: "services.predictive-analytics-systems.mechanism.2.text",
      diagram: "train-validate",
    },
    {
      title: "services.predictive-analytics-systems.mechanism.3.title",
      text: "services.predictive-analytics-systems.mechanism.3.text",
      diagram: "drift-retrain",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-infrastructure" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "reputation-monitoring-platform" },
  ],
};
