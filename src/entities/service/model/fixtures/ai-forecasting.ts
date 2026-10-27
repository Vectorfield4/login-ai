import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; history, SKUs and horizon scale the model, while accuracy targets scale the work.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "segmented",
      id: "history",
      label: "calculator.fields.ai-forecasting.history",
      options: [
        { value: "1y", label: "calculator.options.history1y" },
        { value: "3y", label: "calculator.options.history3y" },
        { value: "5y", label: "calculator.options.history5y" },
      ],
      default: "3y",
    },
    {
      kind: "stepper",
      id: "skus",
      label: "calculator.fields.ai-forecasting.skus",
      min: 10,
      max: 10000,
      default: 500,
    },
    {
      kind: "segmented",
      id: "horizon",
      label: "calculator.fields.ai-forecasting.horizon",
      options: [
        { value: "1m", label: "calculator.options.horizon1m" },
        { value: "3m", label: "calculator.options.horizon3m" },
        { value: "12m", label: "calculator.options.horizon12m" },
      ],
      default: "3m",
    },
    {
      kind: "segmented",
      id: "accuracy",
      label: "calculator.fields.ai-forecasting.accuracy",
      options: [
        { value: "baseline", label: "calculator.options.accuracyBaseline" },
        { value: "high", label: "calculator.options.accuracyHigh" },
      ],
      default: "baseline",
    },
  ],
  terms: [
    { kind: "setup", amount: 700000, weeks: 4 },
    { kind: "multiplier", field: "history", factors: { "1y": 1, "3y": 1.2, "5y": 1.4 } },
    { kind: "perUnit", field: "skus", rate: 100, weeksPerUnit: 0.001 },
    { kind: "multiplier", field: "horizon", factors: { "1m": 1, "3m": 1.2, "12m": 1.5 } },
    { kind: "multiplier", field: "accuracy", factors: { baseline: 1, high: 1.4 } },
  ],
};

export const aiForecasting: Service = {
  slug: "ai-forecasting",
  navTitle: "services.ai-forecasting.navTitle",
  title: "services.ai-forecasting.title",
  tagline: "services.ai-forecasting.tagline",
  description: "services.ai-forecasting.description",
  price: { amount: 700000, unit: "project" },
  calculator,
  icon: "insights",
  group: "ml",
  features: [
    {
      title: "services.ai-forecasting.features.0.title",
      text: "services.ai-forecasting.features.0.text",
    },
    {
      title: "services.ai-forecasting.features.1.title",
      text: "services.ai-forecasting.features.1.text",
    },
    {
      title: "services.ai-forecasting.features.2.title",
      text: "services.ai-forecasting.features.2.text",
    },
    {
      title: "services.ai-forecasting.features.3.title",
      text: "services.ai-forecasting.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-forecasting.ctaBanner.title",
    text: "services.ai-forecasting.ctaBanner.text",
    buttonLabel: "services.ai-forecasting.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-forecasting.techStack.0.subtitle",
      description: "services.ai-forecasting.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-forecasting.techStack.0.technologies.0.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.ai-forecasting.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-forecasting.techStack.0.technologies.2.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.ai-forecasting.techStack.0.technologies.3.glossary",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary: "services.ai-forecasting.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-forecasting.processSteps.0.title",
      text: "services.ai-forecasting.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-forecasting.processSteps.1.title",
      text: "services.ai-forecasting.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-forecasting.processSteps.2.title",
      text: "services.ai-forecasting.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-forecasting.processSteps.3.title",
      text: "services.ai-forecasting.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-forecasting.fitItems.0.title",
      text: "services.ai-forecasting.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-forecasting.fitItems.1.title",
      text: "services.ai-forecasting.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-forecasting.fitItems.2.title",
      text: "services.ai-forecasting.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-forecasting.fitItems.3.title",
      text: "services.ai-forecasting.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-forecasting.faqItems.0.question",
      answer: "services.ai-forecasting.faqItems.0.answer",
    },
    {
      question: "services.ai-forecasting.faqItems.1.question",
      answer: "services.ai-forecasting.faqItems.1.answer",
    },
    {
      question: "services.ai-forecasting.faqItems.2.question",
      answer: "services.ai-forecasting.faqItems.2.answer",
    },
    {
      question: "services.ai-forecasting.faqItems.3.question",
      answer: "services.ai-forecasting.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-forecasting.tradeoffs.0.title",
      text: "services.ai-forecasting.tradeoffs.0.text",
    },
    {
      title: "services.ai-forecasting.tradeoffs.1.title",
      text: "services.ai-forecasting.tradeoffs.1.text",
    },
    {
      title: "services.ai-forecasting.tradeoffs.2.title",
      text: "services.ai-forecasting.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-forecasting.deliverables.0.title",
      text: "services.ai-forecasting.deliverables.0.text",
    },
    {
      title: "services.ai-forecasting.deliverables.1.title",
      text: "services.ai-forecasting.deliverables.1.text",
    },
    {
      title: "services.ai-forecasting.deliverables.2.title",
      text: "services.ai-forecasting.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-forecasting.mechanism.0.title",
      text: "services.ai-forecasting.mechanism.0.text",
      diagram: "demand-loop",
    },
    {
      title: "services.ai-forecasting.mechanism.1.title",
      text: "services.ai-forecasting.mechanism.1.text",
    },
    {
      title: "services.ai-forecasting.mechanism.2.title",
      text: "services.ai-forecasting.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.ai-forecasting.precedents.0.title",
      text: "services.ai-forecasting.precedents.0.text",
      metricValue: "services.ai-forecasting.precedents.0.metricValue",
      metricLabel: "services.ai-forecasting.precedents.0.metricLabel",
    },
    {
      title: "services.ai-forecasting.precedents.1.title",
      text: "services.ai-forecasting.precedents.1.text",
      metricValue: "services.ai-forecasting.precedents.1.metricValue",
      metricLabel: "services.ai-forecasting.precedents.1.metricLabel",
    },
    {
      title: "services.ai-forecasting.precedents.2.title",
      text: "services.ai-forecasting.precedents.2.text",
      metricValue: "services.ai-forecasting.precedents.2.metricValue",
      metricLabel: "services.ai-forecasting.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "predictive-analytics-systems" },
    { type: "solution", slug: "manufacturers" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
