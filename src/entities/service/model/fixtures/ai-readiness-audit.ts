import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; data
 * sources and interviews scale the evidence review, and the scorecard adds a
 * board-ready maturity summary.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.ai-readiness-audit.sources",
      min: 1,
      max: 15,
      default: 4,
    },
    {
      kind: "stepper",
      id: "interviews",
      label: "calculator.fields.ai-readiness-audit.interviews",
      min: 3,
      max: 20,
      default: 8,
    },
    {
      kind: "toggle",
      id: "scorecard",
      label: "calculator.fields.ai-readiness-audit.scorecard",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 300000, weeks: 2 },
    { kind: "perUnit", field: "sources", rate: 35000, weeksPerUnit: 0.15 },
    { kind: "perUnit", field: "interviews", rate: 15000, weeksPerUnit: 0.1 },
    { kind: "perOption", field: "scorecard", rates: { false: 0, true: 80000 } },
  ],
};

export const aiReadinessAudit: Service = {
  slug: "ai-readiness-audit",
  navTitle: "services.ai-readiness-audit.navTitle",
  title: "services.ai-readiness-audit.title",
  tagline: "services.ai-readiness-audit.tagline",
  description: "services.ai-readiness-audit.description",
  price: { amount: 300000, unit: "project" },
  calculator,
  icon: "fact-check",
  group: "strategy",
  features: [
    {
      title: "services.ai-readiness-audit.features.0.title",
      text: "services.ai-readiness-audit.features.0.text",
    },
    {
      title: "services.ai-readiness-audit.features.1.title",
      text: "services.ai-readiness-audit.features.1.text",
    },
    {
      title: "services.ai-readiness-audit.features.2.title",
      text: "services.ai-readiness-audit.features.2.text",
    },
    {
      title: "services.ai-readiness-audit.features.3.title",
      text: "services.ai-readiness-audit.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-readiness-audit.ctaBanner.title",
    text: "services.ai-readiness-audit.ctaBanner.text",
    buttonLabel: "services.ai-readiness-audit.ctaBanner.buttonLabel",
  },
  processSteps: [
    {
      title: "services.ai-readiness-audit.processSteps.0.title",
      text: "services.ai-readiness-audit.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-readiness-audit.processSteps.1.title",
      text: "services.ai-readiness-audit.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-readiness-audit.processSteps.2.title",
      text: "services.ai-readiness-audit.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-readiness-audit.processSteps.3.title",
      text: "services.ai-readiness-audit.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-readiness-audit.fitItems.0.title",
      text: "services.ai-readiness-audit.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-readiness-audit.fitItems.1.title",
      text: "services.ai-readiness-audit.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-readiness-audit.fitItems.2.title",
      text: "services.ai-readiness-audit.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-readiness-audit.fitItems.3.title",
      text: "services.ai-readiness-audit.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.ai-readiness-audit.proofItems.0.title",
      text: "services.ai-readiness-audit.proofItems.0.text",
      metricValue: "services.ai-readiness-audit.proofItems.0.metricValue",
      metricLabel: "services.ai-readiness-audit.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-readiness-audit.faqItems.0.question",
      answer: "services.ai-readiness-audit.faqItems.0.answer",
    },
    {
      question: "services.ai-readiness-audit.faqItems.1.question",
      answer: "services.ai-readiness-audit.faqItems.1.answer",
    },
    {
      question: "services.ai-readiness-audit.faqItems.2.question",
      answer: "services.ai-readiness-audit.faqItems.2.answer",
    },
    {
      question: "services.ai-readiness-audit.faqItems.3.question",
      answer: "services.ai-readiness-audit.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-readiness-audit.tradeoffs.0.title",
      text: "services.ai-readiness-audit.tradeoffs.0.text",
    },
    {
      title: "services.ai-readiness-audit.tradeoffs.1.title",
      text: "services.ai-readiness-audit.tradeoffs.1.text",
    },
    {
      title: "services.ai-readiness-audit.tradeoffs.2.title",
      text: "services.ai-readiness-audit.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-readiness-audit.deliverables.0.title",
      text: "services.ai-readiness-audit.deliverables.0.text",
    },
    {
      title: "services.ai-readiness-audit.deliverables.1.title",
      text: "services.ai-readiness-audit.deliverables.1.text",
    },
    {
      title: "services.ai-readiness-audit.deliverables.2.title",
      text: "services.ai-readiness-audit.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-readiness-audit.mechanism.0.title",
      text: "services.ai-readiness-audit.mechanism.0.text",
    },
    {
      title: "services.ai-readiness-audit.mechanism.1.title",
      text: "services.ai-readiness-audit.mechanism.1.text",
    },
    {
      title: "services.ai-readiness-audit.mechanism.2.title",
      text: "services.ai-readiness-audit.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-readiness-audit.outcomes.0.title",
      value: "services.ai-readiness-audit.outcomes.0.value",
      text: "services.ai-readiness-audit.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.ai-readiness-audit.outcomes.1.title",
      value: "services.ai-readiness-audit.outcomes.1.value",
      text: "services.ai-readiness-audit.outcomes.1.text",
      icon: "rate-review",
    },
    {
      title: "services.ai-readiness-audit.outcomes.2.title",
      value: "services.ai-readiness-audit.outcomes.2.value",
      text: "services.ai-readiness-audit.outcomes.2.text",
      icon: "rocket-launch",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-consulting" },
    { type: "service", slug: "data-readiness-audit" },
    { type: "service", slug: "ai-security-audit" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
