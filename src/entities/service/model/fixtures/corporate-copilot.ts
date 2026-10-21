import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while users
 * and knowledge sources scale the build and access control plus the on-prem
 * contour are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "users",
      label: "calculator.fields.corporate-copilot.users",
      min: 10,
      max: 1000,
      default: 100,
    },
    {
      kind: "stepper",
      id: "sources",
      label: "calculator.fields.corporate-copilot.sources",
      min: 1,
      max: 20,
      default: 3,
    },
    {
      kind: "toggle",
      id: "access",
      label: "calculator.fields.corporate-copilot.access",
      default: false,
    },
    {
      kind: "toggle",
      id: "onPrem",
      label: "calculator.fields.corporate-copilot.onPrem",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 1200000, weeks: 6 },
    { kind: "perUnit", field: "users", rate: 2000, weeksPerUnit: 0.01 },
    { kind: "perUnit", field: "sources", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perOption", field: "access", rates: { false: 0, true: 150000 } },
    { kind: "perOption", field: "onPrem", rates: { false: 0, true: 400000 } },
  ],
};

export const corporateCopilot: Service = {
  slug: "corporate-copilot",
  navTitle: "services.corporate-copilot.navTitle",
  title: "services.corporate-copilot.title",
  tagline: "services.corporate-copilot.tagline",
  description: "services.corporate-copilot.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  icon: "travel-explore",
  group: "conversational",
  features: [
    {
      title: "services.corporate-copilot.features.0.title",
      text: "services.corporate-copilot.features.0.text",
    },
    {
      title: "services.corporate-copilot.features.1.title",
      text: "services.corporate-copilot.features.1.text",
    },
    {
      title: "services.corporate-copilot.features.2.title",
      text: "services.corporate-copilot.features.2.text",
    },
    {
      title: "services.corporate-copilot.features.3.title",
      text: "services.corporate-copilot.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.corporate-copilot.ctaBanner.title",
    text: "services.corporate-copilot.ctaBanner.text",
    buttonLabel: "services.corporate-copilot.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.corporate-copilot.techStack.0.subtitle",
      description: "services.corporate-copilot.techStack.0.description",
      technologies: [
        {
          id: "opensearch",
          name: "OpenSearch",
          glossary: "services.corporate-copilot.techStack.0.technologies.0.glossary",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary: "services.corporate-copilot.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.corporate-copilot.techStack.0.technologies.2.glossary",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.corporate-copilot.techStack.0.technologies.3.glossary",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary: "services.corporate-copilot.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.corporate-copilot.processSteps.0.title",
      text: "services.corporate-copilot.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.corporate-copilot.processSteps.1.title",
      text: "services.corporate-copilot.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.corporate-copilot.processSteps.2.title",
      text: "services.corporate-copilot.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.corporate-copilot.processSteps.3.title",
      text: "services.corporate-copilot.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.corporate-copilot.fitItems.0.title",
      text: "services.corporate-copilot.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.corporate-copilot.fitItems.1.title",
      text: "services.corporate-copilot.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.corporate-copilot.fitItems.2.title",
      text: "services.corporate-copilot.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.corporate-copilot.fitItems.3.title",
      text: "services.corporate-copilot.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.corporate-copilot.faqItems.0.question",
      answer: "services.corporate-copilot.faqItems.0.answer",
    },
    {
      question: "services.corporate-copilot.faqItems.1.question",
      answer: "services.corporate-copilot.faqItems.1.answer",
    },
    {
      question: "services.corporate-copilot.faqItems.2.question",
      answer: "services.corporate-copilot.faqItems.2.answer",
    },
    {
      question: "services.corporate-copilot.faqItems.3.question",
      answer: "services.corporate-copilot.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.corporate-copilot.tradeoffs.0.title",
      text: "services.corporate-copilot.tradeoffs.0.text",
    },
    {
      title: "services.corporate-copilot.tradeoffs.1.title",
      text: "services.corporate-copilot.tradeoffs.1.text",
    },
    {
      title: "services.corporate-copilot.tradeoffs.2.title",
      text: "services.corporate-copilot.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.corporate-copilot.deliverables.0.title",
      text: "services.corporate-copilot.deliverables.0.text",
    },
    {
      title: "services.corporate-copilot.deliverables.1.title",
      text: "services.corporate-copilot.deliverables.1.text",
    },
    {
      title: "services.corporate-copilot.deliverables.2.title",
      text: "services.corporate-copilot.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.corporate-copilot.mechanism.0.title",
      text: "services.corporate-copilot.mechanism.0.text",
    },
    {
      title: "services.corporate-copilot.mechanism.1.title",
      text: "services.corporate-copilot.mechanism.1.text",
    },
    {
      title: "services.corporate-copilot.mechanism.2.title",
      text: "services.corporate-copilot.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.corporate-copilot.outcomes.0.title",
      value: "services.corporate-copilot.outcomes.0.value",
      text: "services.corporate-copilot.outcomes.0.text",
      icon: "travel-explore",
    },
    {
      title: "services.corporate-copilot.outcomes.1.title",
      value: "services.corporate-copilot.outcomes.1.value",
      text: "services.corporate-copilot.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.corporate-copilot.outcomes.2.title",
      value: "services.corporate-copilot.outcomes.2.value",
      text: "services.corporate-copilot.outcomes.2.text",
      icon: "rocket-launch",
    },
  ],
  relevants: [
    { type: "solution", slug: "agentic-systems" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
    { type: "service", slug: "deterministic-rag-systems" },
  ],
};
