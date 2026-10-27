import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-program estimator: the team stepper sets the operating core, the portfolio
 * stepper drives the scenario backlog, and training plus first-launch support are
 * one-off add-ons. The program floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "program",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "team",
      label: "calculator.fields.ai-center-of-excellence.team",
      min: 2,
      max: 20,
      default: 5,
    },
    {
      kind: "stepper",
      id: "portfolio",
      label: "calculator.fields.ai-center-of-excellence.portfolio",
      min: 1,
      max: 20,
      default: 5,
    },
    {
      kind: "toggle",
      id: "training",
      label: "calculator.fields.ai-center-of-excellence.training",
      default: false,
    },
    {
      kind: "toggle",
      id: "support",
      label: "calculator.fields.ai-center-of-excellence.support",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 2000000, weeks: 12 },
    { kind: "perOption", field: "training", rates: { false: 0, true: 150000 } },
    { kind: "perOption", field: "support", rates: { false: 0, true: 200000 } },
  ],
};

export const aiCenterOfExcellence: Service = {
  slug: "ai-center-of-excellence",
  navTitle: "services.ai-center-of-excellence.navTitle",
  title: "services.ai-center-of-excellence.title",
  tagline: "services.ai-center-of-excellence.tagline",
  description: "services.ai-center-of-excellence.description",
  price: { amount: 2000000, unit: "program" },
  calculator,
  icon: "domain",
  group: "strategy",
  features: [
    {
      title: "services.ai-center-of-excellence.features.0.title",
      text: "services.ai-center-of-excellence.features.0.text",
    },
    {
      title: "services.ai-center-of-excellence.features.1.title",
      text: "services.ai-center-of-excellence.features.1.text",
    },
    {
      title: "services.ai-center-of-excellence.features.2.title",
      text: "services.ai-center-of-excellence.features.2.text",
    },
    {
      title: "services.ai-center-of-excellence.features.3.title",
      text: "services.ai-center-of-excellence.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-center-of-excellence.ctaBanner.title",
    text: "services.ai-center-of-excellence.ctaBanner.text",
    buttonLabel: "services.ai-center-of-excellence.ctaBanner.buttonLabel",
  },
  processSteps: [
    {
      title: "services.ai-center-of-excellence.processSteps.0.title",
      text: "services.ai-center-of-excellence.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-center-of-excellence.processSteps.1.title",
      text: "services.ai-center-of-excellence.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-center-of-excellence.processSteps.2.title",
      text: "services.ai-center-of-excellence.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-center-of-excellence.processSteps.3.title",
      text: "services.ai-center-of-excellence.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-center-of-excellence.fitItems.0.title",
      text: "services.ai-center-of-excellence.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-center-of-excellence.fitItems.1.title",
      text: "services.ai-center-of-excellence.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-center-of-excellence.fitItems.2.title",
      text: "services.ai-center-of-excellence.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-center-of-excellence.fitItems.3.title",
      text: "services.ai-center-of-excellence.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-center-of-excellence.faqItems.0.question",
      answer: "services.ai-center-of-excellence.faqItems.0.answer",
    },
    {
      question: "services.ai-center-of-excellence.faqItems.1.question",
      answer: "services.ai-center-of-excellence.faqItems.1.answer",
    },
    {
      question: "services.ai-center-of-excellence.faqItems.2.question",
      answer: "services.ai-center-of-excellence.faqItems.2.answer",
    },
    {
      question: "services.ai-center-of-excellence.faqItems.3.question",
      answer: "services.ai-center-of-excellence.faqItems.3.answer",
    },
    {
      question: "services.ai-center-of-excellence.faqItems.4.question",
      answer: "services.ai-center-of-excellence.faqItems.4.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-center-of-excellence.tradeoffs.0.title",
      text: "services.ai-center-of-excellence.tradeoffs.0.text",
    },
    {
      title: "services.ai-center-of-excellence.tradeoffs.1.title",
      text: "services.ai-center-of-excellence.tradeoffs.1.text",
    },
    {
      title: "services.ai-center-of-excellence.tradeoffs.2.title",
      text: "services.ai-center-of-excellence.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-center-of-excellence.deliverables.0.title",
      text: "services.ai-center-of-excellence.deliverables.0.text",
    },
    {
      title: "services.ai-center-of-excellence.deliverables.1.title",
      text: "services.ai-center-of-excellence.deliverables.1.text",
    },
    {
      title: "services.ai-center-of-excellence.deliverables.2.title",
      text: "services.ai-center-of-excellence.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-center-of-excellence.mechanism.0.title",
      text: "services.ai-center-of-excellence.mechanism.0.text",
    },
    {
      title: "services.ai-center-of-excellence.mechanism.1.title",
      text: "services.ai-center-of-excellence.mechanism.1.text",
    },
    {
      title: "services.ai-center-of-excellence.mechanism.2.title",
      text: "services.ai-center-of-excellence.mechanism.2.text",
    },
  ],
  precedents: [
    {
      title: "services.ai-center-of-excellence.precedents.0.title",
      text: "services.ai-center-of-excellence.precedents.0.text",
      metricValue: "services.ai-center-of-excellence.precedents.0.metricValue",
      metricLabel: "services.ai-center-of-excellence.precedents.0.metricLabel",
    },
    {
      title: "services.ai-center-of-excellence.precedents.1.title",
      text: "services.ai-center-of-excellence.precedents.1.text",
      metricValue: "services.ai-center-of-excellence.precedents.1.metricValue",
      metricLabel: "services.ai-center-of-excellence.precedents.1.metricLabel",
    },
    {
      title: "services.ai-center-of-excellence.precedents.2.title",
      text: "services.ai-center-of-excellence.precedents.2.text",
      metricValue: "services.ai-center-of-excellence.precedents.2.metricValue",
      metricLabel: "services.ai-center-of-excellence.precedents.2.metricLabel",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-governance-compliance" },
    { type: "service", slug: "ai-consulting" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
