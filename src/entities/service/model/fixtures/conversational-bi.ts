import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; sources and users scale the build, while the semantic layer and access control are add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.conversational-bi.sources",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "stepper",
      id: "users",
      label: "calculator.fields.conversational-bi.users",
      min: 10,
      max: 500,
      default: 50,
    },
    {
      kind: "toggle",
      id: "semanticLayer",
      label: "calculator.fields.conversational-bi.semanticLayer",
      default: false,
    },
    {
      kind: "toggle",
      id: "access",
      label: "calculator.fields.conversational-bi.access",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 900000, weeks: 4 },
    { kind: "perUnit", field: "sources", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "users", rate: 1000, weeksPerUnit: 0.01 },
    { kind: "perOption", field: "semanticLayer", rates: { false: 0, true: 150000 } },
    { kind: "perOption", field: "access", rates: { false: 0, true: 100000 } },
  ],
};

export const conversationalBi: Service = {
  slug: "conversational-bi",
  navTitle: "services.conversational-bi.navTitle",
  title: "services.conversational-bi.title",
  tagline: "services.conversational-bi.tagline",
  description: "services.conversational-bi.description",
  price: { amount: 900000, unit: "project" },
  calculator,
  icon: "insights",
  group: "data",
  features: [
    {
      title: "services.conversational-bi.features.0.title",
      text: "services.conversational-bi.features.0.text",
    },
    {
      title: "services.conversational-bi.features.1.title",
      text: "services.conversational-bi.features.1.text",
    },
    {
      title: "services.conversational-bi.features.2.title",
      text: "services.conversational-bi.features.2.text",
    },
    {
      title: "services.conversational-bi.features.3.title",
      text: "services.conversational-bi.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.conversational-bi.ctaBanner.title",
    text: "services.conversational-bi.ctaBanner.text",
    buttonLabel: "services.conversational-bi.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.conversational-bi.techStack.0.subtitle",
      description: "services.conversational-bi.techStack.0.description",
      technologies: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.conversational-bi.techStack.0.technologies.0.glossary",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary: "services.conversational-bi.techStack.0.technologies.1.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.conversational-bi.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.conversational-bi.techStack.0.technologies.3.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.conversational-bi.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.conversational-bi.processSteps.0.title",
      text: "services.conversational-bi.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.conversational-bi.processSteps.1.title",
      text: "services.conversational-bi.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.conversational-bi.processSteps.2.title",
      text: "services.conversational-bi.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.conversational-bi.processSteps.3.title",
      text: "services.conversational-bi.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.conversational-bi.fitItems.0.title",
      text: "services.conversational-bi.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.conversational-bi.fitItems.1.title",
      text: "services.conversational-bi.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.conversational-bi.fitItems.2.title",
      text: "services.conversational-bi.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.conversational-bi.fitItems.3.title",
      text: "services.conversational-bi.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.conversational-bi.faqItems.0.question",
      answer: "services.conversational-bi.faqItems.0.answer",
    },
    {
      question: "services.conversational-bi.faqItems.1.question",
      answer: "services.conversational-bi.faqItems.1.answer",
    },
    {
      question: "services.conversational-bi.faqItems.2.question",
      answer: "services.conversational-bi.faqItems.2.answer",
    },
    {
      question: "services.conversational-bi.faqItems.3.question",
      answer: "services.conversational-bi.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.conversational-bi.tradeoffs.0.title",
      text: "services.conversational-bi.tradeoffs.0.text",
    },
    {
      title: "services.conversational-bi.tradeoffs.1.title",
      text: "services.conversational-bi.tradeoffs.1.text",
    },
    {
      title: "services.conversational-bi.tradeoffs.2.title",
      text: "services.conversational-bi.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.conversational-bi.deliverables.0.title",
      text: "services.conversational-bi.deliverables.0.text",
    },
    {
      title: "services.conversational-bi.deliverables.1.title",
      text: "services.conversational-bi.deliverables.1.text",
    },
    {
      title: "services.conversational-bi.deliverables.2.title",
      text: "services.conversational-bi.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.conversational-bi.mechanism.0.title",
      text: "services.conversational-bi.mechanism.0.text",
    },
    {
      title: "services.conversational-bi.mechanism.1.title",
      text: "services.conversational-bi.mechanism.1.text",
    },
    {
      title: "services.conversational-bi.mechanism.2.title",
      text: "services.conversational-bi.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.conversational-bi.precedents.0.title",
      text: "services.conversational-bi.precedents.0.text",
      metricValue: "services.conversational-bi.precedents.0.metricValue",
      metricLabel: "services.conversational-bi.precedents.0.metricLabel",
    },
    {
      title: "services.conversational-bi.precedents.1.title",
      text: "services.conversational-bi.precedents.1.text",
      metricValue: "services.conversational-bi.precedents.1.metricValue",
      metricLabel: "services.conversational-bi.precedents.1.metricLabel",
    },
    {
      title: "services.conversational-bi.precedents.2.title",
      text: "services.conversational-bi.precedents.2.text",
      metricValue: "services.conversational-bi.precedents.2.metricValue",
      metricLabel: "services.conversational-bi.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "predictive-analytics-systems" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
