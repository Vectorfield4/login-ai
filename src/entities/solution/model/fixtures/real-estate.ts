import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `objects` (properties in the sales funnel) and
 * `channels` (sales channels the funnel runs on) drive the recurring period
 * (price per one and the other), the `complexity` scales it. 3D visualisation
 * and AI sales agents are base scope; the default estimate (setup plus three
 * objects and two channels) lands on the implementation floor.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "objects",
      label: "calculator.fields.real-estate.objects",
      min: 1,
      max: 30,
      default: 3,
    },
    {
      kind: "stepper",
      id: "channels",
      label: "calculator.fields.real-estate.channels",
      min: 1,
      max: 6,
      default: 2,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.real-estate.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 810000, weeks: 8 },
    { kind: "perUnit", field: "objects", rate: 90000, weeksPerUnit: 0.3 },
    { kind: "perUnit", field: "channels", rate: 60000, weeksPerUnit: 0.2 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
  ],
};

export const realEstate: Solution = {
  slug: "real-estate",
  updatedAt: "2026-10-24",
  navTitle: "solutions.real-estate.navTitle",
  title: "solutions.real-estate.title",
  tagline: "solutions.real-estate.tagline",
  description: "solutions.real-estate.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 400000 },
    { name: "pricing.packages.implementation", amount: 1200000, from: true },
    { name: "pricing.packages.platform", amount: 3000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.real-estate.ctaBanner.title",
    text: "solutions.real-estate.ctaBanner.text",
    buttonLabel: "solutions.real-estate.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.businessOwners"],
  tags: ["technologies.agentic", "technologies.computerVision"],
  features: [
    {
      title: "solutions.real-estate.features.0.title",
      text: "solutions.real-estate.features.0.text",
    },
    {
      title: "solutions.real-estate.features.1.title",
      text: "solutions.real-estate.features.1.text",
    },
    {
      title: "solutions.real-estate.features.2.title",
      text: "solutions.real-estate.features.2.text",
    },
    {
      title: "solutions.real-estate.features.3.title",
      text: "solutions.real-estate.features.3.text",
    },
  ],
  deliverables: [
    {
      title: "solutions.real-estate.deliverables.0.title",
      text: "solutions.real-estate.deliverables.0.text",
    },
    {
      title: "solutions.real-estate.deliverables.1.title",
      text: "solutions.real-estate.deliverables.1.text",
    },
    {
      title: "solutions.real-estate.deliverables.2.title",
      text: "solutions.real-estate.deliverables.2.text",
    },
    {
      title: "solutions.real-estate.deliverables.3.title",
      text: "solutions.real-estate.deliverables.3.text",
    },
  ],
  niches: ["audiences.businessOwners"],
  processSteps: [
    {
      title: "solutions.real-estate.processSteps.0.title",
      text: "solutions.real-estate.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.real-estate.processSteps.1.title",
      text: "solutions.real-estate.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "solutions.real-estate.processSteps.2.title",
      text: "solutions.real-estate.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "solutions.real-estate.processSteps.3.title",
      text: "solutions.real-estate.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.real-estate.fitItems.0.title",
      text: "solutions.real-estate.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.real-estate.fitItems.1.title",
      text: "solutions.real-estate.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.real-estate.fitItems.2.title",
      text: "solutions.real-estate.fitItems.2.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "solutions.real-estate.precedents.0.title",
      text: "solutions.real-estate.precedents.0.text",
      metricValue: "solutions.real-estate.precedents.0.metricValue",
      metricLabel: "solutions.real-estate.precedents.0.metricLabel",
    },
    {
      title: "solutions.real-estate.precedents.1.title",
      text: "solutions.real-estate.precedents.1.text",
      metricValue: "solutions.real-estate.precedents.1.metricValue",
      metricLabel: "solutions.real-estate.precedents.1.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.real-estate.faqItems.0.question",
      answer: "solutions.real-estate.faqItems.0.answer",
    },
    {
      question: "solutions.real-estate.faqItems.1.question",
      answer: "solutions.real-estate.faqItems.1.answer",
    },
    {
      question: "solutions.real-estate.faqItems.2.question",
      answer: "solutions.real-estate.faqItems.2.answer",
    },
    {
      question: "solutions.real-estate.faqItems.3.question",
      answer: "solutions.real-estate.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.real-estate.sections.0.title",
      items: [
        "solutions.real-estate.sections.0.items.0",
        "solutions.real-estate.sections.0.items.1",
        "solutions.real-estate.sections.0.items.2",
        "solutions.real-estate.sections.0.items.3",
        "solutions.real-estate.sections.0.items.4",
      ],
    },
    {
      title: "solutions.real-estate.sections.1.title",
      items: [
        "solutions.real-estate.sections.1.items.0",
        "solutions.real-estate.sections.1.items.1",
        "solutions.real-estate.sections.1.items.2",
        "solutions.real-estate.sections.1.items.3",
        "solutions.real-estate.sections.1.items.4",
      ],
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "3d-design",
      noteKey: "relevants.real-estate.3d-design",
    },
    {
      type: "service",
      slug: "ai-sales-agents",
      noteKey: "relevants.real-estate.ai-sales-agents",
    },
    {
      type: "service",
      slug: "document-processing",
      noteKey: "relevants.real-estate.document-processing",
    },
    {
      type: "service",
      slug: "ai-forecasting",
      noteKey: "relevants.real-estate.ai-forecasting",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.real-estate.customer-experience",
    },
    {
      type: "case",
      slug: "construction-3d-sales",
      noteKey: "relevants.real-estate.construction-3d-sales",
    },
    {
      type: "case",
      slug: "cv-acceptance-control",
      noteKey: "relevants.real-estate.cv-acceptance-control",
    },
  ],
};
