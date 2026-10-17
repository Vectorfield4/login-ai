import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `modules` drive the recurring period (price per module),
 * the `complexity` scales it, and medical capabilities join the common basket as
 * add-on coefficients: document recognition (CV), speech recognition, MIS
 * integration and security. The implementation floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "modules",
      label: "calculator.fields.medical-clinics.modules",
      min: 1,
      max: 10,
      default: 3,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.medical-clinics.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "documents",
      label: "calculator.fields.medical-clinics.documents",
      default: false,
    },
    {
      kind: "toggle",
      id: "speech",
      label: "calculator.fields.medical-clinics.speech",
      default: false,
    },
    {
      kind: "toggle",
      id: "integration",
      label: "calculator.fields.medical-clinics.integration",
      default: false,
    },
    {
      kind: "toggle",
      id: "security",
      label: "calculator.fields.medical-clinics.security",
      default: false,
    },
    { kind: "toggle", id: "support", label: "calculator.fields.support", default: false },
  ],
  terms: [
    { kind: "setup", amount: 1300000, weeks: 6 },
    { kind: "perUnit", field: "modules", rate: 150000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "addon", field: "documents", ref: "computer-vision" },
    { kind: "addon", field: "speech", ref: "speech-recognition" },
    { kind: "addon", field: "integration", ref: "crm" },
    { kind: "addon", field: "security", ref: "ai-security" },
    { kind: "perOption", field: "support", rates: { false: 0, true: 400000 } },
  ],
  included: [{ kind: "technology", slug: "llm" }],
};

export const medicalClinics: Solution = {
  slug: "medical-clinics",
  navTitle: "solutions.medical-clinics.navTitle",
  title: "solutions.medical-clinics.title",
  tagline: "solutions.medical-clinics.tagline",
  description: "solutions.medical-clinics.description",
  price: { amount: 1300000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 450000 },
    { name: "pricing.packages.implementation", amount: 1300000, from: true },
    { name: "pricing.packages.platform", amount: 3000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.medical-clinics.ctaBanner.title",
    text: "solutions.medical-clinics.ctaBanner.text",
    buttonLabel: "solutions.medical-clinics.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.clinics"],
  tags: ["technologies.llm", "technologies.computerVision"],
  features: [
    {
      title: "solutions.medical-clinics.features.0.title",
      text: "solutions.medical-clinics.features.0.text",
    },
    {
      title: "solutions.medical-clinics.features.1.title",
      text: "solutions.medical-clinics.features.1.text",
    },
    {
      title: "solutions.medical-clinics.features.2.title",
      text: "solutions.medical-clinics.features.2.text",
    },
    {
      title: "solutions.medical-clinics.features.3.title",
      text: "solutions.medical-clinics.features.3.text",
    },
    {
      title: "solutions.medical-clinics.features.4.title",
      text: "solutions.medical-clinics.features.4.text",
    },
    {
      title: "solutions.medical-clinics.features.5.title",
      text: "solutions.medical-clinics.features.5.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.medical-clinics.processSteps.0.title",
      text: "solutions.medical-clinics.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.medical-clinics.processSteps.1.title",
      text: "solutions.medical-clinics.processSteps.1.text",
      processType: "prototyping",
    },
    {
      title: "solutions.medical-clinics.processSteps.2.title",
      text: "solutions.medical-clinics.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "solutions.medical-clinics.processSteps.3.title",
      text: "solutions.medical-clinics.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.medical-clinics.fitItems.0.title",
      text: "solutions.medical-clinics.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.medical-clinics.fitItems.1.title",
      text: "solutions.medical-clinics.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.medical-clinics.fitItems.2.title",
      text: "solutions.medical-clinics.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.medical-clinics.fitItems.3.title",
      text: "solutions.medical-clinics.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.medical-clinics.proofItems.0.title",
      text: "solutions.medical-clinics.proofItems.0.text",
      metricValue: "solutions.medical-clinics.proofItems.0.metricValue",
      metricLabel: "solutions.medical-clinics.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.medical-clinics.faqItems.0.question",
      answer: "solutions.medical-clinics.faqItems.0.answer",
    },
    {
      question: "solutions.medical-clinics.faqItems.1.question",
      answer: "solutions.medical-clinics.faqItems.1.answer",
    },
    {
      question: "solutions.medical-clinics.faqItems.2.question",
      answer: "solutions.medical-clinics.faqItems.2.answer",
    },
    {
      question: "solutions.medical-clinics.faqItems.3.question",
      answer: "solutions.medical-clinics.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.medical-clinics.sections.0.title",
      items: [
        "solutions.medical-clinics.sections.0.items.0",
        "solutions.medical-clinics.sections.0.items.1",
        "solutions.medical-clinics.sections.0.items.2",
        "solutions.medical-clinics.sections.0.items.3",
        "solutions.medical-clinics.sections.0.items.4",
        "solutions.medical-clinics.sections.0.items.5",
      ],
    },
    {
      title: "solutions.medical-clinics.sections.1.title",
      items: [
        "solutions.medical-clinics.sections.1.items.0",
        "solutions.medical-clinics.sections.1.items.1",
        "solutions.medical-clinics.sections.1.items.2",
        "solutions.medical-clinics.sections.1.items.3",
        "solutions.medical-clinics.sections.1.items.4",
        "solutions.medical-clinics.sections.1.items.5",
      ],
    },
    {
      title: "solutions.medical-clinics.sections.2.title",
      items: [
        "solutions.medical-clinics.sections.2.items.0",
        "solutions.medical-clinics.sections.2.items.1",
        "solutions.medical-clinics.sections.2.items.2",
        "solutions.medical-clinics.sections.2.items.3",
        "solutions.medical-clinics.sections.2.items.4",
        "solutions.medical-clinics.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "computer-vision",
      noteKey: "relevants.medical-clinics.computer-vision",
    },
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.medical-clinics.customer-experience",
    },
    {
      type: "case",
      slug: "clinic-ai-assistant",
      noteKey: "relevants.medical-clinics.clinic-ai-assistant",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.medical-clinics.software-development",
    },
  ],
};
