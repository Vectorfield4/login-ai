import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: recommendation `surfaces` drive the recurring period
 * (price per surface), the `complexity` scales it, and real-time serving plus
 * support are one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "surfaces",
      label: "calculator.fields.recommendation-systems.surfaces",
      min: 1,
      max: 15,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.recommendation-systems.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "realtime",
      label: "calculator.fields.recommendation-systems.realtime",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 2000000, weeks: 4 },
    { kind: "perUnit", field: "surfaces", rate: 150000, weeksPerUnit: 0.3 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "perOption", field: "realtime", rates: { false: 0, true: 500000 } },
  ],
};

export const recommendationSystems: Service = {
  slug: "recommendation-systems",
  navTitle: "services.recommendation-systems.navTitle",
  title: "services.recommendation-systems.title",
  tagline: "services.recommendation-systems.tagline",
  description: "services.recommendation-systems.description",
  price: { amount: 2000000, unit: "project" },
  calculator,
  icon: "rate-review",
  group: "ml",
  features: [
    {
      title: "services.recommendation-systems.features.0.title",
      text: "services.recommendation-systems.features.0.text",
    },
    {
      title: "services.recommendation-systems.features.1.title",
      text: "services.recommendation-systems.features.1.text",
    },
    {
      title: "services.recommendation-systems.features.2.title",
      text: "services.recommendation-systems.features.2.text",
    },
    {
      title: "services.recommendation-systems.features.3.title",
      text: "services.recommendation-systems.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.recommendation-systems.ctaBanner.title",
    text: "services.recommendation-systems.ctaBanner.text",
    buttonLabel: "services.recommendation-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.recommendation-systems.techStack.0.subtitle",
      description: "services.recommendation-systems.techStack.0.description",
      technologies: [
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.recommendation-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.recommendation-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.recommendation-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.recommendation-systems.techStack.0.technologies.3.glossary",
        },
        {
          id: "grafana",
          name: "Grafana",
          glossary: "services.recommendation-systems.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  sections: [
    {
      title: "services.recommendation-systems.sections.0.title",
      items: [
        "services.recommendation-systems.sections.0.items.0",
        "services.recommendation-systems.sections.0.items.1",
        "services.recommendation-systems.sections.0.items.2",
        "services.recommendation-systems.sections.0.items.3",
      ],
    },
    {
      title: "services.recommendation-systems.sections.1.title",
      items: [
        "services.recommendation-systems.sections.1.items.0",
        "services.recommendation-systems.sections.1.items.1",
        "services.recommendation-systems.sections.1.items.2",
        "services.recommendation-systems.sections.1.items.3",
      ],
    },
  ],
  processSteps: [
    {
      title: "services.recommendation-systems.processSteps.0.title",
      text: "services.recommendation-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.recommendation-systems.processSteps.1.title",
      text: "services.recommendation-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.recommendation-systems.processSteps.2.title",
      text: "services.recommendation-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.recommendation-systems.processSteps.3.title",
      text: "services.recommendation-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.recommendation-systems.fitItems.0.title",
      text: "services.recommendation-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.recommendation-systems.fitItems.1.title",
      text: "services.recommendation-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.recommendation-systems.fitItems.2.title",
      text: "services.recommendation-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.recommendation-systems.fitItems.3.title",
      text: "services.recommendation-systems.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.recommendation-systems.precedents.0.title",
      text: "services.recommendation-systems.precedents.0.text",
      metricValue: "services.recommendation-systems.precedents.0.metricValue",
      metricLabel: "services.recommendation-systems.precedents.0.metricLabel",
    },
    {
      title: "services.recommendation-systems.precedents.1.title",
      text: "services.recommendation-systems.precedents.1.text",
      metricValue: "services.recommendation-systems.precedents.1.metricValue",
      metricLabel: "services.recommendation-systems.precedents.1.metricLabel",
    },
    {
      title: "services.recommendation-systems.precedents.2.title",
      text: "services.recommendation-systems.precedents.2.text",
      metricValue: "services.recommendation-systems.precedents.2.metricValue",
      metricLabel: "services.recommendation-systems.precedents.2.metricLabel",
    },
    {
      title: "services.recommendation-systems.precedents.3.title",
      text: "services.recommendation-systems.precedents.3.text",
      metricValue: "services.recommendation-systems.precedents.3.metricValue",
      metricLabel: "services.recommendation-systems.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.recommendation-systems.faqItems.0.question",
      answer: "services.recommendation-systems.faqItems.0.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.1.question",
      answer: "services.recommendation-systems.faqItems.1.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.2.question",
      answer: "services.recommendation-systems.faqItems.2.answer",
    },
    {
      question: "services.recommendation-systems.faqItems.3.question",
      answer: "services.recommendation-systems.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.recommendation-systems.tradeoffs.0.title",
      text: "services.recommendation-systems.tradeoffs.0.text",
    },
    {
      title: "services.recommendation-systems.tradeoffs.1.title",
      text: "services.recommendation-systems.tradeoffs.1.text",
    },
    {
      title: "services.recommendation-systems.tradeoffs.2.title",
      text: "services.recommendation-systems.tradeoffs.2.text",
    },
    {
      title: "services.recommendation-systems.tradeoffs.3.title",
      text: "services.recommendation-systems.tradeoffs.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.recommendation-systems.mechanism.0.title",
      text: "services.recommendation-systems.mechanism.0.text",
      diagram: "rank-loop",
    },
    {
      title: "services.recommendation-systems.mechanism.1.title",
      text: "services.recommendation-systems.mechanism.1.text",
    },
    {
      title: "services.recommendation-systems.mechanism.2.title",
      text: "services.recommendation-systems.mechanism.2.text",
    },
    {
      title: "services.recommendation-systems.mechanism.3.title",
      text: "services.recommendation-systems.mechanism.3.text",
    },
  ],
  relevants: [
    { type: "service", slug: "software-development" },
    { type: "solution", slug: "app-development-systems" },
    { type: "case", slug: "agency-content-pipeline" },
  ],
};
