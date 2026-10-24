import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `journeys` drive the recurring period (price per journey),
 * the `complexity` scales it, and the CX capabilities are added to the common
 * basket as add-on coefficients: CRM integration and monitoring. Recommendations
 * and feedback analytics are base capabilities. The implementation floor stays as
 * `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "journeys",
      label: "calculator.fields.customer-experience.journeys",
      min: 1,
      max: 10,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.customer-experience.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    { kind: "toggle", id: "integration", label: "calculator.fields.integration", default: false },
    {
      kind: "toggle",
      id: "monitoring",
      label: "calculator.fields.customer-experience.monitoring",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 6 },
    { kind: "perUnit", field: "journeys", rate: 200000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "addon", field: "integration", ref: "crm" },
    { kind: "addon", field: "monitoring", ref: "monitoring" },
  ],
  included: [
    { kind: "technology", slug: "llm" },
    { kind: "capability", slug: "recommendations" },
    { kind: "technology", slug: "nlp" },
  ],
};

export const customerExperience: Solution = {
  slug: "customer-experience",
  navTitle: "solutions.customer-experience.navTitle",
  title: "solutions.customer-experience.title",
  tagline: "solutions.customer-experience.tagline",
  description: "solutions.customer-experience.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 400000 },
    { name: "pricing.packages.implementation", amount: 1200000, from: true },
    { name: "pricing.packages.platform", amount: 3000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.customer-experience.ctaBanner.title",
    text: "solutions.customer-experience.ctaBanner.text",
    buttonLabel: "solutions.customer-experience.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.clinics", "audiences.businessOwners"],
  tags: ["technologies.llm"],
  features: [
    {
      title: "solutions.customer-experience.features.0.title",
      text: "solutions.customer-experience.features.0.text",
    },
    {
      title: "solutions.customer-experience.features.1.title",
      text: "solutions.customer-experience.features.1.text",
    },
    {
      title: "solutions.customer-experience.features.2.title",
      text: "solutions.customer-experience.features.2.text",
    },
    {
      title: "solutions.customer-experience.features.3.title",
      text: "solutions.customer-experience.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.customer-experience.processSteps.0.title",
      text: "solutions.customer-experience.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.customer-experience.processSteps.1.title",
      text: "solutions.customer-experience.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "solutions.customer-experience.processSteps.2.title",
      text: "solutions.customer-experience.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "solutions.customer-experience.processSteps.3.title",
      text: "solutions.customer-experience.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.customer-experience.fitItems.0.title",
      text: "solutions.customer-experience.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.customer-experience.fitItems.1.title",
      text: "solutions.customer-experience.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.customer-experience.fitItems.2.title",
      text: "solutions.customer-experience.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.customer-experience.fitItems.3.title",
      text: "solutions.customer-experience.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.customer-experience.proofItems.0.title",
      text: "solutions.customer-experience.proofItems.0.text",
      metricValue: "solutions.customer-experience.proofItems.0.metricValue",
      metricLabel: "solutions.customer-experience.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.customer-experience.faqItems.0.question",
      answer: "solutions.customer-experience.faqItems.0.answer",
    },
    {
      question: "solutions.customer-experience.faqItems.1.question",
      answer: "solutions.customer-experience.faqItems.1.answer",
    },
    {
      question: "solutions.customer-experience.faqItems.2.question",
      answer: "solutions.customer-experience.faqItems.2.answer",
    },
    {
      question: "solutions.customer-experience.faqItems.3.question",
      answer: "solutions.customer-experience.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.customer-experience.sections.0.title",
      items: [
        "solutions.customer-experience.sections.0.items.0",
        "solutions.customer-experience.sections.0.items.1",
        "solutions.customer-experience.sections.0.items.2",
        "solutions.customer-experience.sections.0.items.3",
        "solutions.customer-experience.sections.0.items.4",
        "solutions.customer-experience.sections.0.items.5",
      ],
    },
    {
      title: "solutions.customer-experience.sections.1.title",
      items: [
        "solutions.customer-experience.sections.1.items.0",
        "solutions.customer-experience.sections.1.items.1",
        "solutions.customer-experience.sections.1.items.2",
        "solutions.customer-experience.sections.1.items.3",
        "solutions.customer-experience.sections.1.items.4",
        "solutions.customer-experience.sections.1.items.5",
      ],
    },
    {
      title: "solutions.customer-experience.sections.2.title",
      items: [
        "solutions.customer-experience.sections.2.items.0",
        "solutions.customer-experience.sections.2.items.1",
        "solutions.customer-experience.sections.2.items.2",
        "solutions.customer-experience.sections.2.items.3",
        "solutions.customer-experience.sections.2.items.4",
        "solutions.customer-experience.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.customer-experience.agentic-systems",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.customer-experience.reputation-management",
    },
    {
      type: "case",
      slug: "retail-support-bot",
      noteKey: "relevants.customer-experience.retail-support-bot",
    },
    {
      type: "service",
      slug: "corporate-websites",
      noteKey: "relevants.customer-experience.corporate-websites",
    },
    {
      type: "service",
      slug: "landing-pages",
      noteKey: "relevants.customer-experience.landing-pages",
    },
    {
      type: "service",
      slug: "ui-ux-design",
      noteKey: "relevants.customer-experience.ui-ux-design",
    },
    {
      type: "service",
      slug: "3d-design",
      noteKey: "relevants.customer-experience.3d-design",
    },
  ],
};
