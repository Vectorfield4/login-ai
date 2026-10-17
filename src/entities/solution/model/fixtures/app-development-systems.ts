import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator for an AI development factory: `pipelines` (repository /
 * flow integrations) drive the recurring period, the `complexity` scales it,
 * MLOps is part of the base; the audit and sovereign model hosting are add-on
 * coefficients.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "pipelines",
      label: "calculator.fields.app-development-systems.pipelines",
      min: 1,
      max: 20,
      default: 5,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.app-development-systems.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "security",
      label: "calculator.fields.app-development-systems.security",
      default: false,
    },
    {
      kind: "toggle",
      id: "sovereign",
      label: "calculator.fields.app-development-systems.sovereign",
      default: false,
    },
    { kind: "toggle", id: "support", label: "calculator.fields.support", default: false },
  ],
  terms: [
    { kind: "setup", amount: 2500000, weeks: 6 },
    { kind: "perUnit", field: "pipelines", rate: 120000, weeksPerUnit: 0.3 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "addon", field: "security", ref: "ai-security" },
    { kind: "addon", field: "sovereign", ref: "sovereign-models" },
    { kind: "perOption", field: "support", rates: { false: 0, true: 600000 } },
  ],
  included: [
    { kind: "technology", slug: "agentic" },
    { kind: "capability", slug: "mlops" },
  ],
};

export const appDevelopmentSystems: Solution = {
  slug: "app-development-systems",
  navTitle: "solutions.app-development-systems.navTitle",
  title: "solutions.app-development-systems.title",
  tagline: "solutions.app-development-systems.tagline",
  description: "solutions.app-development-systems.description",
  price: { amount: 2500000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 700000 },
    { name: "pricing.packages.implementation", amount: 2500000, from: true },
    { name: "pricing.packages.platform", amount: 6000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.app-development-systems.ctaBanner.title",
    text: "solutions.app-development-systems.ctaBanner.text",
    buttonLabel: "solutions.app-development-systems.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.businessOwners"],
  tags: ["technologies.agentic"],
  features: [
    {
      title: "solutions.app-development-systems.features.0.title",
      text: "solutions.app-development-systems.features.0.text",
    },
    {
      title: "solutions.app-development-systems.features.1.title",
      text: "solutions.app-development-systems.features.1.text",
    },
    {
      title: "solutions.app-development-systems.features.2.title",
      text: "solutions.app-development-systems.features.2.text",
    },
    {
      title: "solutions.app-development-systems.features.3.title",
      text: "solutions.app-development-systems.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.app-development-systems.processSteps.0.title",
      text: "solutions.app-development-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.app-development-systems.processSteps.1.title",
      text: "solutions.app-development-systems.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "solutions.app-development-systems.processSteps.2.title",
      text: "solutions.app-development-systems.processSteps.2.text",
      processType: "architecture",
    },
    {
      title: "solutions.app-development-systems.processSteps.3.title",
      text: "solutions.app-development-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.app-development-systems.fitItems.0.title",
      text: "solutions.app-development-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.app-development-systems.fitItems.1.title",
      text: "solutions.app-development-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.app-development-systems.fitItems.2.title",
      text: "solutions.app-development-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.app-development-systems.fitItems.3.title",
      text: "solutions.app-development-systems.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.app-development-systems.proofItems.0.title",
      text: "solutions.app-development-systems.proofItems.0.text",
      metricValue: "solutions.app-development-systems.proofItems.0.metricValue",
      metricLabel: "solutions.app-development-systems.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.app-development-systems.faqItems.0.question",
      answer: "solutions.app-development-systems.faqItems.0.answer",
    },
    {
      question: "solutions.app-development-systems.faqItems.1.question",
      answer: "solutions.app-development-systems.faqItems.1.answer",
    },
    {
      question: "solutions.app-development-systems.faqItems.2.question",
      answer: "solutions.app-development-systems.faqItems.2.answer",
    },
    {
      question: "solutions.app-development-systems.faqItems.3.question",
      answer: "solutions.app-development-systems.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.app-development-systems.sections.0.title",
      items: [
        "solutions.app-development-systems.sections.0.items.0",
        "solutions.app-development-systems.sections.0.items.1",
        "solutions.app-development-systems.sections.0.items.2",
        "solutions.app-development-systems.sections.0.items.3",
        "solutions.app-development-systems.sections.0.items.4",
        "solutions.app-development-systems.sections.0.items.5",
      ],
    },
    {
      title: "solutions.app-development-systems.sections.1.title",
      items: [
        "solutions.app-development-systems.sections.1.items.0",
        "solutions.app-development-systems.sections.1.items.1",
        "solutions.app-development-systems.sections.1.items.2",
        "solutions.app-development-systems.sections.1.items.3",
        "solutions.app-development-systems.sections.1.items.4",
        "solutions.app-development-systems.sections.1.items.5",
      ],
    },
    {
      title: "solutions.app-development-systems.sections.2.title",
      items: [
        "solutions.app-development-systems.sections.2.items.0",
        "solutions.app-development-systems.sections.2.items.1",
        "solutions.app-development-systems.sections.2.items.2",
        "solutions.app-development-systems.sections.2.items.3",
        "solutions.app-development-systems.sections.2.items.4",
        "solutions.app-development-systems.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.app-development-systems.agentic-systems",
    },
    {
      type: "case",
      slug: "reputation-monitoring-platform",
      noteKey: "relevants.app-development-systems.reputation-monitoring-platform",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.app-development-systems.software-development",
    },
  ],
};
