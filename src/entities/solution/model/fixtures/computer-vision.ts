import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `lines` drive the recurring period (price per line), the
 * `complexity` scales it. The CV build itself is included; MLOps is a discounted
 * add-on and the audit is a security add-on. The implementation floor
 * stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "lines",
      label: "calculator.fields.computer-vision.lines",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.computer-vision.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "mlops",
      label: "calculator.fields.computer-vision.mlops",
      default: false,
    },
    {
      kind: "toggle",
      id: "security",
      label: "calculator.fields.computer-vision.security",
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
    { kind: "setup", amount: 2500000, weeks: 8 },
    { kind: "perUnit", field: "lines", rate: 300000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "addon", field: "mlops", ref: "mlops" },
    { kind: "addon", field: "security", ref: "ai-security" },
    {
      kind: "perOption",
      field: "support",
      rates: { standard: 0, priority: 600000, dedicated: 1200000 },
    },
  ],
  included: [{ kind: "technology", slug: "computer-vision" }],
};

export const computerVision: Solution = {
  slug: "computer-vision",
  navTitle: "solutions.computer-vision.navTitle",
  title: "solutions.computer-vision.title",
  tagline: "solutions.computer-vision.tagline",
  description: "solutions.computer-vision.description",
  price: { amount: 2500000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 700000 },
    { name: "pricing.packages.implementation", amount: 2500000, from: true },
    { name: "pricing.packages.platform", amount: 6000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.computer-vision.ctaBanner.title",
    text: "solutions.computer-vision.ctaBanner.text",
    buttonLabel: "solutions.computer-vision.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.manufacturers"],
  tags: ["technologies.computerVision"],
  features: [
    {
      title: "solutions.computer-vision.features.0.title",
      text: "solutions.computer-vision.features.0.text",
    },
    {
      title: "solutions.computer-vision.features.1.title",
      text: "solutions.computer-vision.features.1.text",
    },
    {
      title: "solutions.computer-vision.features.2.title",
      text: "solutions.computer-vision.features.2.text",
    },
    {
      title: "solutions.computer-vision.features.3.title",
      text: "solutions.computer-vision.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.computer-vision.processSteps.0.title",
      text: "solutions.computer-vision.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "solutions.computer-vision.processSteps.1.title",
      text: "solutions.computer-vision.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "solutions.computer-vision.processSteps.2.title",
      text: "solutions.computer-vision.processSteps.2.text",
      processType: "testing",
    },
    {
      title: "solutions.computer-vision.processSteps.3.title",
      text: "solutions.computer-vision.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.computer-vision.fitItems.0.title",
      text: "solutions.computer-vision.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.computer-vision.fitItems.1.title",
      text: "solutions.computer-vision.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.computer-vision.fitItems.2.title",
      text: "solutions.computer-vision.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.computer-vision.fitItems.3.title",
      text: "solutions.computer-vision.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.computer-vision.proofItems.0.title",
      text: "solutions.computer-vision.proofItems.0.text",
      metricValue: "solutions.computer-vision.proofItems.0.metricValue",
      metricLabel: "solutions.computer-vision.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.computer-vision.faqItems.0.question",
      answer: "solutions.computer-vision.faqItems.0.answer",
    },
    {
      question: "solutions.computer-vision.faqItems.1.question",
      answer: "solutions.computer-vision.faqItems.1.answer",
    },
    {
      question: "solutions.computer-vision.faqItems.2.question",
      answer: "solutions.computer-vision.faqItems.2.answer",
    },
    {
      question: "solutions.computer-vision.faqItems.3.question",
      answer: "solutions.computer-vision.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.computer-vision.sections.0.title",
      items: [
        "solutions.computer-vision.sections.0.items.0",
        "solutions.computer-vision.sections.0.items.1",
        "solutions.computer-vision.sections.0.items.2",
        "solutions.computer-vision.sections.0.items.3",
        "solutions.computer-vision.sections.0.items.4",
        "solutions.computer-vision.sections.0.items.5",
      ],
    },
    {
      title: "solutions.computer-vision.sections.1.title",
      items: [
        "solutions.computer-vision.sections.1.items.0",
        "solutions.computer-vision.sections.1.items.1",
        "solutions.computer-vision.sections.1.items.2",
        "solutions.computer-vision.sections.1.items.3",
        "solutions.computer-vision.sections.1.items.4",
        "solutions.computer-vision.sections.1.items.5",
      ],
    },
    {
      title: "solutions.computer-vision.sections.2.title",
      items: [
        "solutions.computer-vision.sections.2.items.0",
        "solutions.computer-vision.sections.2.items.1",
        "solutions.computer-vision.sections.2.items.2",
        "solutions.computer-vision.sections.2.items.3",
        "solutions.computer-vision.sections.2.items.4",
        "solutions.computer-vision.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "manufacturers",
      noteKey: "relevants.computer-vision.manufacturers",
    },
    {
      type: "solution",
      slug: "medical-clinics",
      noteKey: "relevants.computer-vision.medical-clinics",
    },
    {
      type: "case",
      slug: "quality-vision-line",
      noteKey: "relevants.computer-vision.quality-vision-line",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.computer-vision.software-development",
    },
  ],
};
