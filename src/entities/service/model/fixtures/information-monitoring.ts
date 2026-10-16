import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Year-one retainer estimator: monitored `sources` drive the monthly period, the
 * number of `languages` scales it, and alerts plus reporting are one-off
 * add-ons. The monthly floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.information-monitoring.sources",
      min: 1,
      max: 50,
      default: 10,
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 1,
    },
    {
      kind: "toggle",
      id: "alerts",
      label: "calculator.fields.information-monitoring.alerts",
      default: false,
    },
    {
      kind: "toggle",
      id: "reporting",
      label: "calculator.fields.information-monitoring.reporting",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 200000, weeks: 2 },
    { kind: "perUnit", field: "sources", rate: 9000, weeksPerUnit: 0.05 },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.15, "3": 1.3, "4": 1.45, "5": 1.6 },
    },
    { kind: "perOption", field: "alerts", rates: { false: 0, true: 30000 } },
    { kind: "perOption", field: "reporting", rates: { false: 0, true: 40000 } },
  ],
};

export const informationMonitoring: Service = {
  slug: "information-monitoring",
  navTitle: "services.information-monitoring.navTitle",
  title: "services.information-monitoring.title",
  tagline: "services.information-monitoring.tagline",
  description: "services.information-monitoring.description",
  price: { amount: 90000, unit: "month" },
  calculator,
  ctaBanner: {
    title: "services.information-monitoring.ctaBanner.title",
    text: "services.information-monitoring.ctaBanner.text",
    buttonLabel: "services.information-monitoring.ctaBanner.buttonLabel",
  },
  icon: "travel-explore",
  group: "web-growth",
  features: [
    {
      title: "services.information-monitoring.features.0.title",
      text: "services.information-monitoring.features.0.text",
    },
    {
      title: "services.information-monitoring.features.1.title",
      text: "services.information-monitoring.features.1.text",
    },
    {
      title: "services.information-monitoring.features.2.title",
      text: "services.information-monitoring.features.2.text",
    },
    {
      title: "services.information-monitoring.features.3.title",
      text: "services.information-monitoring.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.information-monitoring.processSteps.0.title",
      text: "services.information-monitoring.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.information-monitoring.processSteps.1.title",
      text: "services.information-monitoring.processSteps.1.text",
      processType: "implementation",
    },
    {
      title: "services.information-monitoring.processSteps.2.title",
      text: "services.information-monitoring.processSteps.2.text",
      processType: "testing",
    },
    {
      title: "services.information-monitoring.processSteps.3.title",
      text: "services.information-monitoring.processSteps.3.text",
      processType: "data-processing",
    },
  ],
  fitItems: [
    {
      title: "services.information-monitoring.fitItems.0.title",
      text: "services.information-monitoring.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.information-monitoring.fitItems.1.title",
      text: "services.information-monitoring.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.information-monitoring.fitItems.2.title",
      text: "services.information-monitoring.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.information-monitoring.fitItems.3.title",
      text: "services.information-monitoring.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.information-monitoring.proofItems.0.title",
      text: "services.information-monitoring.proofItems.0.text",
      metricValue: "services.information-monitoring.proofItems.0.metricValue",
      metricLabel: "services.information-monitoring.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.information-monitoring.faqItems.0.question",
      answer: "services.information-monitoring.faqItems.0.answer",
    },
    {
      question: "services.information-monitoring.faqItems.1.question",
      answer: "services.information-monitoring.faqItems.1.answer",
    },
    {
      question: "services.information-monitoring.faqItems.2.question",
      answer: "services.information-monitoring.faqItems.2.answer",
    },
    {
      question: "services.information-monitoring.faqItems.3.question",
      answer: "services.information-monitoring.faqItems.3.answer",
    },
  ],
  mechanism: [
    {
      title: "services.information-monitoring.mechanism.0.title",
      text: "services.information-monitoring.mechanism.0.text",
      diagram: "collection-pipeline",
    },
    {
      title: "services.information-monitoring.mechanism.1.title",
      text: "services.information-monitoring.mechanism.1.text",
      diagram: "freshness",
    },
    {
      title: "services.information-monitoring.mechanism.2.title",
      text: "services.information-monitoring.mechanism.2.text",
      diagram: "data-schema",
    },
    {
      title: "services.information-monitoring.mechanism.3.title",
      text: "services.information-monitoring.mechanism.3.text",
      diagram: "source-failure",
    },
    {
      title: "services.information-monitoring.mechanism.4.title",
      text: "services.information-monitoring.mechanism.4.text",
      diagram: "selector-watch",
    },
    {
      title: "services.information-monitoring.mechanism.5.title",
      text: "services.information-monitoring.mechanism.5.text",
      diagram: "legal-sources",
    },
  ],
  outcomes: [
    {
      title: "services.information-monitoring.outcomes.0.title",
      value: "services.information-monitoring.outcomes.0.value",
      text: "services.information-monitoring.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.information-monitoring.outcomes.1.title",
      value: "services.information-monitoring.outcomes.1.value",
      text: "services.information-monitoring.outcomes.1.text",
      icon: "radar",
    },
    {
      title: "services.information-monitoring.outcomes.2.title",
      value: "services.information-monitoring.outcomes.2.value",
      text: "services.information-monitoring.outcomes.2.text",
      icon: "server",
    },
    {
      title: "services.information-monitoring.outcomes.3.title",
      value: "services.information-monitoring.outcomes.3.value",
      text: "services.information-monitoring.outcomes.3.text",
      icon: "support-agent",
    },
    {
      title: "services.information-monitoring.outcomes.4.title",
      value: "services.information-monitoring.outcomes.4.value",
      text: "services.information-monitoring.outcomes.4.text",
      icon: "insights",
    },
    {
      title: "services.information-monitoring.outcomes.5.title",
      value: "services.information-monitoring.outcomes.5.value",
      text: "services.information-monitoring.outcomes.5.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    {
      type: "case",
      slug: "reputation-monitoring-platform",
      noteKey: "relevants.information-monitoring.reputation-monitoring-platform",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.information-monitoring.reputation-management",
    },
    {
      type: "case",
      slug: "marketplace-reputation",
      noteKey: "relevants.information-monitoring.marketplace-reputation",
    },
  ],
};
