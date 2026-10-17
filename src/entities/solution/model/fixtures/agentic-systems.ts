import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Solution estimator. `agents` drive the recurring period (price per agent), the
 * `autonomy` level scales it, and RAG is always included: only its knowledge
 * base tier adds cost. Integrations with business systems and security are
 * add-on coefficients of the base, so the shared stack is not charged twice.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "agents",
      label: "calculator.fields.agentic-systems.agents",
      min: 1,
      max: 8,
      default: 2,
    },
    {
      kind: "segmented",
      id: "autonomy",
      label: "calculator.fields.agentic-systems.autonomy",
      options: [
        { value: "assistive", label: "calculator.options.assistive" },
        { value: "autonomous", label: "calculator.options.autonomous" },
      ],
      default: "assistive",
    },
    {
      kind: "segmented",
      id: "rag",
      label: "calculator.fields.agentic-systems.ragTier",
      options: [
        { value: "small", label: "calculator.options.ragSmall" },
        { value: "medium", label: "calculator.options.ragMedium" },
        { value: "large", label: "calculator.options.ragLarge" },
      ],
      default: "small",
      showOnResults: true,
    },
    {
      kind: "software-types",
      id: "integrations",
      label: "calculator.fields.agentic-systems.integrations",
      infoKey: "calculator.fields.agentic-systems.integrationHint",
      default: [],
    },
    {
      kind: "toggle",
      id: "security",
      label: "calculator.fields.agentic-systems.security",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 1500000, weeks: 8 },
    { kind: "perUnit", field: "agents", rate: 250000, weeksPerUnit: 0.75 },
    { kind: "multiplier", field: "autonomy", factors: { assistive: 1, autonomous: 1.5 } },
    { kind: "perOption", field: "rag", rates: { small: 0, medium: 300000, large: 600000 } },
    { kind: "addon", field: "integrations", equals: "erp", ref: "erp" },
    { kind: "addon", field: "integrations", equals: "crm", ref: "crm" },
    { kind: "addon", field: "integrations", equals: "cms", ref: "cms" },
    { kind: "addon", field: "integrations", equals: "mes", ref: "mes" },
    { kind: "addon", field: "integrations", equals: "wms", ref: "wms" },
    { kind: "addon", field: "integrations", equals: "task-tracker", ref: "task-tracker" },
    { kind: "addon", field: "security", ref: "ai-security" },
  ],
  included: [
    { kind: "technology", slug: "agentic" },
    { kind: "technology", slug: "llm" },
    { kind: "technology", slug: "rag", noteKey: "calculator.included.ragTier" },
  ],
};

export const agenticSystems: Solution = {
  slug: "agentic-systems",
  navTitle: "solutions.agentic-systems.navTitle",
  title: "solutions.agentic-systems.title",
  tagline: "solutions.agentic-systems.tagline",
  description: "solutions.agentic-systems.description",
  price: { amount: 1500000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 500000 },
    { name: "pricing.packages.implementation", amount: 1500000, from: true },
    { name: "pricing.packages.platform", amount: 4000000, from: true },
  ],
  ctaBanner: {
    title: "solutions.agentic-systems.ctaBanner.title",
    text: "solutions.agentic-systems.ctaBanner.text",
    buttonLabel: "solutions.agentic-systems.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.manufacturers", "audiences.businessOwners"],
  tags: ["technologies.agentic"],
  features: [
    {
      title: "solutions.agentic-systems.features.0.title",
      text: "solutions.agentic-systems.features.0.text",
    },
    {
      title: "solutions.agentic-systems.features.1.title",
      text: "solutions.agentic-systems.features.1.text",
    },
    {
      title: "solutions.agentic-systems.features.2.title",
      text: "solutions.agentic-systems.features.2.text",
    },
    {
      title: "solutions.agentic-systems.features.3.title",
      text: "solutions.agentic-systems.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.agentic-systems.processSteps.0.title",
      text: "solutions.agentic-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "solutions.agentic-systems.processSteps.1.title",
      text: "solutions.agentic-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "solutions.agentic-systems.processSteps.2.title",
      text: "solutions.agentic-systems.processSteps.2.text",
      processType: "prototyping",
    },
    {
      title: "solutions.agentic-systems.processSteps.3.title",
      text: "solutions.agentic-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.agentic-systems.fitItems.0.title",
      text: "solutions.agentic-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.agentic-systems.fitItems.1.title",
      text: "solutions.agentic-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.agentic-systems.fitItems.2.title",
      text: "solutions.agentic-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.agentic-systems.fitItems.3.title",
      text: "solutions.agentic-systems.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.agentic-systems.proofItems.0.title",
      text: "solutions.agentic-systems.proofItems.0.text",
      metricValue: "solutions.agentic-systems.proofItems.0.metricValue",
      metricLabel: "solutions.agentic-systems.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.agentic-systems.faqItems.0.question",
      answer: "solutions.agentic-systems.faqItems.0.answer",
    },
    {
      question: "solutions.agentic-systems.faqItems.1.question",
      answer: "solutions.agentic-systems.faqItems.1.answer",
    },
    {
      question: "solutions.agentic-systems.faqItems.2.question",
      answer: "solutions.agentic-systems.faqItems.2.answer",
    },
    {
      question: "solutions.agentic-systems.faqItems.3.question",
      answer: "solutions.agentic-systems.faqItems.3.answer",
    },
  ],
  sections: [
    {
      title: "solutions.agentic-systems.sections.0.title",
      items: [
        "solutions.agentic-systems.sections.0.items.0",
        "solutions.agentic-systems.sections.0.items.1",
        "solutions.agentic-systems.sections.0.items.2",
        "solutions.agentic-systems.sections.0.items.3",
        "solutions.agentic-systems.sections.0.items.4",
        "solutions.agentic-systems.sections.0.items.5",
      ],
    },
    {
      title: "solutions.agentic-systems.sections.1.title",
      items: [
        "solutions.agentic-systems.sections.1.items.0",
        "solutions.agentic-systems.sections.1.items.1",
        "solutions.agentic-systems.sections.1.items.2",
        "solutions.agentic-systems.sections.1.items.3",
        "solutions.agentic-systems.sections.1.items.4",
        "solutions.agentic-systems.sections.1.items.5",
      ],
    },
    {
      title: "solutions.agentic-systems.sections.2.title",
      items: [
        "solutions.agentic-systems.sections.2.items.0",
        "solutions.agentic-systems.sections.2.items.1",
        "solutions.agentic-systems.sections.2.items.2",
        "solutions.agentic-systems.sections.2.items.3",
        "solutions.agentic-systems.sections.2.items.4",
        "solutions.agentic-systems.sections.2.items.5",
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "customer-experience",
      noteKey: "relevants.agentic-systems.customer-experience",
    },
    {
      type: "solution",
      slug: "app-development-systems",
      noteKey: "relevants.agentic-systems.app-development-systems",
    },
    {
      type: "case",
      slug: "retail-support-bot",
      noteKey: "relevants.agentic-systems.retail-support-bot",
    },
    {
      type: "service",
      slug: "software-development",
      noteKey: "relevants.agentic-systems.software-development",
    },
  ],
};
