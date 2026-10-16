import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `lines` drive the recurring period (price per line), the
 * `complexity` scales it, and production capabilities join the common basket as
 * bundles priced from their own entity: vision inspection, ERP and CRM.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "lines",
      label: "calculator.fields.manufacturers.lines",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.manufacturers.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "vision",
      label: "calculator.fields.manufacturers.vision",
      default: false,
    },
    { kind: "toggle", id: "erp", label: "calculator.fields.manufacturers.erp", default: false },
    { kind: "toggle", id: "crm", label: "calculator.fields.manufacturers.crm", default: false },
    { kind: "toggle", id: "support", label: "calculator.fields.support", default: false },
  ],
  terms: [
    { kind: "setup", amount: 1800000, weeks: 6 },
    { kind: "perUnit", field: "lines", rate: 250000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "bundle", ref: "computer-vision-systems", when: { field: "vision", equals: "true" } },
    { kind: "bundle", ref: "ai-erp-integration", when: { field: "erp", equals: "true" } },
    { kind: "bundle", ref: "ai-crm-integration", when: { field: "crm", equals: "true" } },
    { kind: "perOption", field: "support", rates: { false: 0, true: 500000 } },
  ],
};

export const manufacturers: Solution = {
  slug: "manufacturers",
  navTitle: "solutions.manufacturers.navTitle",
  title: "solutions.manufacturers.title",
  tagline: "solutions.manufacturers.tagline",
  description: "solutions.manufacturers.description",
  price: { amount: 1800000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 500000 },
    { name: "pricing.packages.implementation", amount: 1800000, from: true },
    { name: "pricing.packages.platform", amount: 4000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.manufacturers.ctaBanner.title",
    text: "solutions.manufacturers.ctaBanner.text",
    buttonLabel: "solutions.manufacturers.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.manufacturers"],
  tags: ["technologies.computerVision", "technologies.agentic"],
  features: [
    {
      title: "solutions.manufacturers.features.0.title",
      text: "solutions.manufacturers.features.0.text",
    },
    {
      title: "solutions.manufacturers.features.1.title",
      text: "solutions.manufacturers.features.1.text",
    },
    {
      title: "solutions.manufacturers.features.2.title",
      text: "solutions.manufacturers.features.2.text",
    },
    {
      title: "solutions.manufacturers.features.3.title",
      text: "solutions.manufacturers.features.3.text",
    },
    {
      title: "solutions.manufacturers.features.4.title",
      text: "solutions.manufacturers.features.4.text",
    },
    {
      title: "solutions.manufacturers.features.5.title",
      text: "solutions.manufacturers.features.5.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.manufacturers.processSteps.0.title",
      text: "solutions.manufacturers.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.manufacturers.processSteps.1.title",
      text: "solutions.manufacturers.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "solutions.manufacturers.processSteps.2.title",
      text: "solutions.manufacturers.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "solutions.manufacturers.processSteps.3.title",
      text: "solutions.manufacturers.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.manufacturers.fitItems.0.title",
      text: "solutions.manufacturers.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.manufacturers.fitItems.1.title",
      text: "solutions.manufacturers.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.manufacturers.fitItems.2.title",
      text: "solutions.manufacturers.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.manufacturers.fitItems.3.title",
      text: "solutions.manufacturers.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.manufacturers.proofItems.0.title",
      text: "solutions.manufacturers.proofItems.0.text",
      metricValue: "solutions.manufacturers.proofItems.0.metricValue",
      metricLabel: "solutions.manufacturers.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.manufacturers.faqItems.0.question",
      answer: "solutions.manufacturers.faqItems.0.answer",
    },
    {
      question: "solutions.manufacturers.faqItems.1.question",
      answer: "solutions.manufacturers.faqItems.1.answer",
    },
    {
      question: "solutions.manufacturers.faqItems.2.question",
      answer: "solutions.manufacturers.faqItems.2.answer",
    },
    {
      question: "solutions.manufacturers.faqItems.3.question",
      answer: "solutions.manufacturers.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.manufacturers.sections.0.title",
      items: [
        "solutions.manufacturers.sections.0.items.0",
        "solutions.manufacturers.sections.0.items.1",
        "solutions.manufacturers.sections.0.items.2",
        "solutions.manufacturers.sections.0.items.3",
        "solutions.manufacturers.sections.0.items.4",
        "solutions.manufacturers.sections.0.items.5",
      ],
    },
    {
      title: "solutions.manufacturers.sections.1.title",
      items: [
        "solutions.manufacturers.sections.1.items.0",
        "solutions.manufacturers.sections.1.items.1",
        "solutions.manufacturers.sections.1.items.2",
        "solutions.manufacturers.sections.1.items.3",
        "solutions.manufacturers.sections.1.items.4",
        "solutions.manufacturers.sections.1.items.5",
      ],
    },
    {
      title: "solutions.manufacturers.sections.2.title",
      items: [
        "solutions.manufacturers.sections.2.items.0",
        "solutions.manufacturers.sections.2.items.1",
        "solutions.manufacturers.sections.2.items.2",
        "solutions.manufacturers.sections.2.items.3",
        "solutions.manufacturers.sections.2.items.4",
        "solutions.manufacturers.sections.2.items.5",
      ],
    },
    {
      title: "solutions.manufacturers.sections.3.title",
      items: [
        "solutions.manufacturers.sections.3.items.0",
        "solutions.manufacturers.sections.3.items.1",
        "solutions.manufacturers.sections.3.items.2",
        "solutions.manufacturers.sections.3.items.3",
        "solutions.manufacturers.sections.3.items.4",
        "solutions.manufacturers.sections.3.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "computer-vision",
      noteKey: "relevants.manufacturers.computer-vision",
    },
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.manufacturers.agentic-systems",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.manufacturers.reputation-management",
    },
    {
      type: "case",
      slug: "quality-vision-line",
      noteKey: "relevants.manufacturers.quality-vision-line",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.manufacturers.software-development",
    },
  ],
};
