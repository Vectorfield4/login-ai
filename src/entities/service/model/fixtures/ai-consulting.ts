import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; the
 * process count and workshops scale the interview load, and depth adds the
 * economic model and a longer roadmap.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "systems",
      label: "calculator.fields.ai-consulting.systems",
      min: 3,
      max: 40,
      default: 12,
    },
    {
      kind: "stepper",
      id: "workshops",
      label: "calculator.fields.ai-consulting.workshops",
      min: 2,
      max: 8,
      default: 3,
    },
    {
      kind: "segmented",
      id: "depth",
      label: "calculator.fields.ai-consulting.depth",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 2 },
    { kind: "perUnit", field: "systems", rate: 20000, weeksPerUnit: 0.05 },
    { kind: "perUnit", field: "workshops", rate: 40000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "depth", factors: { standard: 1, complex: 1.4 } },
  ],
};

export const aiConsulting: Service = {
  slug: "ai-consulting",
  navTitle: "services.ai-consulting.navTitle",
  title: "services.ai-consulting.title",
  tagline: "services.ai-consulting.tagline",
  description: "services.ai-consulting.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "travel-explore",
  group: "strategy",
  features: [
    {
      title: "services.ai-consulting.features.0.title",
      text: "services.ai-consulting.features.0.text",
    },
    {
      title: "services.ai-consulting.features.1.title",
      text: "services.ai-consulting.features.1.text",
    },
    {
      title: "services.ai-consulting.features.2.title",
      text: "services.ai-consulting.features.2.text",
    },
    {
      title: "services.ai-consulting.features.3.title",
      text: "services.ai-consulting.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-consulting.ctaBanner.title",
    text: "services.ai-consulting.ctaBanner.text",
    buttonLabel: "services.ai-consulting.ctaBanner.buttonLabel",
  },
  processSteps: [
    {
      title: "services.ai-consulting.processSteps.0.title",
      text: "services.ai-consulting.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-consulting.processSteps.1.title",
      text: "services.ai-consulting.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-consulting.processSteps.2.title",
      text: "services.ai-consulting.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-consulting.processSteps.3.title",
      text: "services.ai-consulting.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-consulting.fitItems.0.title",
      text: "services.ai-consulting.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-consulting.fitItems.1.title",
      text: "services.ai-consulting.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-consulting.fitItems.2.title",
      text: "services.ai-consulting.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-consulting.fitItems.3.title",
      text: "services.ai-consulting.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-consulting.faqItems.0.question",
      answer: "services.ai-consulting.faqItems.0.answer",
    },
    {
      question: "services.ai-consulting.faqItems.1.question",
      answer: "services.ai-consulting.faqItems.1.answer",
    },
    {
      question: "services.ai-consulting.faqItems.2.question",
      answer: "services.ai-consulting.faqItems.2.answer",
    },
    {
      question: "services.ai-consulting.faqItems.3.question",
      answer: "services.ai-consulting.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-consulting.tradeoffs.0.title",
      text: "services.ai-consulting.tradeoffs.0.text",
    },
    {
      title: "services.ai-consulting.tradeoffs.1.title",
      text: "services.ai-consulting.tradeoffs.1.text",
    },
    {
      title: "services.ai-consulting.tradeoffs.2.title",
      text: "services.ai-consulting.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-consulting.deliverables.0.title",
      text: "services.ai-consulting.deliverables.0.text",
    },
    {
      title: "services.ai-consulting.deliverables.1.title",
      text: "services.ai-consulting.deliverables.1.text",
    },
    {
      title: "services.ai-consulting.deliverables.2.title",
      text: "services.ai-consulting.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-consulting.mechanism.0.title",
      text: "services.ai-consulting.mechanism.0.text",
    },
    {
      title: "services.ai-consulting.mechanism.1.title",
      text: "services.ai-consulting.mechanism.1.text",
    },
    {
      title: "services.ai-consulting.mechanism.2.title",
      text: "services.ai-consulting.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.ai-consulting.precedents.0.title",
      text: "services.ai-consulting.precedents.0.text",
      metricValue: "services.ai-consulting.precedents.0.metricValue",
      metricLabel: "services.ai-consulting.precedents.0.metricLabel",
    },
    {
      title: "services.ai-consulting.precedents.1.title",
      text: "services.ai-consulting.precedents.1.text",
      metricValue: "services.ai-consulting.precedents.1.metricValue",
      metricLabel: "services.ai-consulting.precedents.1.metricLabel",
    },
    {
      title: "services.ai-consulting.precedents.2.title",
      text: "services.ai-consulting.precedents.2.text",
      metricValue: "services.ai-consulting.precedents.2.metricValue",
      metricLabel: "services.ai-consulting.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-readiness-audit" },
    { type: "service", slug: "data-readiness-audit" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "erp-data-reconciliation" },
  ],
};
