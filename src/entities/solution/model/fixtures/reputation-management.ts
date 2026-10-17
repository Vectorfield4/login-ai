import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `platforms` drive the recurring period (price per
 * platform), the `complexity` scales it. Monitoring and sentiment analytics are
 * base capabilities; SEO reputation is an add-on coefficient.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "platforms",
      label: "calculator.fields.reputation-management.platforms",
      min: 1,
      max: 15,
      default: 4,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.reputation-management.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "seo",
      label: "calculator.fields.reputation-management.seo",
      default: false,
    },
    {
      kind: "segmented",
      id: "support",
      label: "calculator.fields.support",
      options: [
        { value: "standard", label: "calculator.options.supportStandard" },
        { value: "priority", label: "calculator.options.supportPriority" },
        { value: "dedicated", label: "calculator.options.supportDedicated" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 900000, weeks: 4 },
    { kind: "perUnit", field: "platforms", rate: 100000, weeksPerUnit: 0.3 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "addon", field: "seo", ref: "seo-reputation" },
    {
      kind: "perOption",
      field: "support",
      rates: { standard: 0, priority: 300000, dedicated: 600000 },
    },
  ],
  included: [
    { kind: "capability", slug: "monitoring" },
    { kind: "technology", slug: "nlp" },
  ],
};

export const reputationManagement: Solution = {
  slug: "reputation-management",
  navTitle: "solutions.reputation-management.navTitle",
  title: "solutions.reputation-management.title",
  tagline: "solutions.reputation-management.tagline",
  description: "solutions.reputation-management.description",
  price: { amount: 900000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 300000 },
    { name: "pricing.packages.implementation", amount: 900000, from: true },
    { name: "pricing.packages.platform", amount: 2000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.reputation-management.ctaBanner.title",
    text: "solutions.reputation-management.ctaBanner.text",
    buttonLabel: "solutions.reputation-management.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.manufacturers", "audiences.adAgencies", "audiences.businessOwners"],
  tags: ["capabilities.reputation"],
  features: [
    {
      title: "solutions.reputation-management.features.0.title",
      text: "solutions.reputation-management.features.0.text",
    },
    {
      title: "solutions.reputation-management.features.1.title",
      text: "solutions.reputation-management.features.1.text",
    },
    {
      title: "solutions.reputation-management.features.2.title",
      text: "solutions.reputation-management.features.2.text",
    },
    {
      title: "solutions.reputation-management.features.3.title",
      text: "solutions.reputation-management.features.3.text",
    },
    {
      title: "solutions.reputation-management.features.4.title",
      text: "solutions.reputation-management.features.4.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.reputation-management.processSteps.0.title",
      text: "solutions.reputation-management.processSteps.0.text",
      processType: "integration",
    },
    {
      title: "solutions.reputation-management.processSteps.1.title",
      text: "solutions.reputation-management.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "solutions.reputation-management.processSteps.2.title",
      text: "solutions.reputation-management.processSteps.2.text",
      processType: "data-processing",
    },
    {
      title: "solutions.reputation-management.processSteps.3.title",
      text: "solutions.reputation-management.processSteps.3.text",
      processType: "implementation",
    },
  ],
  fitItems: [
    {
      title: "solutions.reputation-management.fitItems.0.title",
      text: "solutions.reputation-management.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.reputation-management.fitItems.1.title",
      text: "solutions.reputation-management.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.reputation-management.fitItems.2.title",
      text: "solutions.reputation-management.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.reputation-management.fitItems.3.title",
      text: "solutions.reputation-management.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.reputation-management.proofItems.0.title",
      text: "solutions.reputation-management.proofItems.0.text",
      metricValue: "solutions.reputation-management.proofItems.0.metricValue",
      metricLabel: "solutions.reputation-management.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.reputation-management.faqItems.0.question",
      answer: "solutions.reputation-management.faqItems.0.answer",
    },
    {
      question: "solutions.reputation-management.faqItems.1.question",
      answer: "solutions.reputation-management.faqItems.1.answer",
    },
    {
      question: "solutions.reputation-management.faqItems.2.question",
      answer: "solutions.reputation-management.faqItems.2.answer",
    },
    {
      question: "solutions.reputation-management.faqItems.3.question",
      answer: "solutions.reputation-management.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.reputation-management.sections.0.title",
      items: [
        "solutions.reputation-management.sections.0.items.0",
        "solutions.reputation-management.sections.0.items.1",
        "solutions.reputation-management.sections.0.items.2",
        "solutions.reputation-management.sections.0.items.3",
        "solutions.reputation-management.sections.0.items.4",
        "solutions.reputation-management.sections.0.items.5",
      ],
    },
    {
      title: "solutions.reputation-management.sections.1.title",
      items: [
        "solutions.reputation-management.sections.1.items.0",
        "solutions.reputation-management.sections.1.items.1",
        "solutions.reputation-management.sections.1.items.2",
        "solutions.reputation-management.sections.1.items.3",
        "solutions.reputation-management.sections.1.items.4",
        "solutions.reputation-management.sections.1.items.5",
      ],
    },
    {
      title: "solutions.reputation-management.sections.2.title",
      items: [
        "solutions.reputation-management.sections.2.items.0",
        "solutions.reputation-management.sections.2.items.1",
        "solutions.reputation-management.sections.2.items.2",
        "solutions.reputation-management.sections.2.items.3",
        "solutions.reputation-management.sections.2.items.4",
        "solutions.reputation-management.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "case",
      slug: "reputation-monitoring-platform",
      noteKey: "relevants.reputation-management.reputation-monitoring-platform",
    },
    {
      type: "solution",
      slug: "content-generation",
      noteKey: "relevants.reputation-management.content-generation",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.reputation-management.customer-experience",
    },
    {
      type: "case",
      slug: "marketplace-reputation",
      noteKey: "relevants.reputation-management.marketplace-reputation",
    },
    {
      type: "service",
      slug: "information-monitoring",
      noteKey: "relevants.reputation-management.information-monitoring",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.reputation-management.software-development",
    },
  ],
};
