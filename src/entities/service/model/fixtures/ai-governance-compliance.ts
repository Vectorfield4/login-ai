import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; every AI
 * system and jurisdiction adds register and policy work, and the documentation
 * package covers model cards and audit evidence.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "systems",
      label: "calculator.fields.ai-governance-compliance.systems",
      min: 1,
      max: 30,
      default: 6,
    },
    {
      kind: "stepper",
      id: "jurisdictions",
      label: "calculator.fields.ai-governance-compliance.jurisdictions",
      min: 1,
      max: 5,
      default: 1,
    },
    {
      kind: "toggle",
      id: "documentation",
      label: "calculator.fields.ai-governance-compliance.documentation",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 500000, weeks: 3 },
    { kind: "perUnit", field: "systems", rate: 60000, weeksPerUnit: 0.2 },
    { kind: "perUnit", field: "jurisdictions", rate: 100000, weeksPerUnit: 0.4 },
    { kind: "perOption", field: "documentation", rates: { false: 0, true: 150000 } },
  ],
};

export const aiGovernanceCompliance: Service = {
  slug: "ai-governance-compliance",
  navTitle: "services.ai-governance-compliance.navTitle",
  title: "services.ai-governance-compliance.title",
  tagline: "services.ai-governance-compliance.tagline",
  description: "services.ai-governance-compliance.description",
  price: { amount: 500000, unit: "project" },
  calculator,
  icon: "domain",
  group: "governance",
  features: [
    {
      title: "services.ai-governance-compliance.features.0.title",
      text: "services.ai-governance-compliance.features.0.text",
    },
    {
      title: "services.ai-governance-compliance.features.1.title",
      text: "services.ai-governance-compliance.features.1.text",
    },
    {
      title: "services.ai-governance-compliance.features.2.title",
      text: "services.ai-governance-compliance.features.2.text",
    },
    {
      title: "services.ai-governance-compliance.features.3.title",
      text: "services.ai-governance-compliance.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-governance-compliance.ctaBanner.title",
    text: "services.ai-governance-compliance.ctaBanner.text",
    buttonLabel: "services.ai-governance-compliance.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-governance-compliance.techStack.0.subtitle",
      description: "services.ai-governance-compliance.techStack.0.description",
      technologies: [
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary: "services.ai-governance-compliance.techStack.0.technologies.0.glossary",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.ai-governance-compliance.techStack.0.technologies.1.glossary",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary: "services.ai-governance-compliance.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-governance-compliance.techStack.0.technologies.3.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-governance-compliance.processSteps.0.title",
      text: "services.ai-governance-compliance.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-governance-compliance.processSteps.1.title",
      text: "services.ai-governance-compliance.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-governance-compliance.processSteps.2.title",
      text: "services.ai-governance-compliance.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-governance-compliance.processSteps.3.title",
      text: "services.ai-governance-compliance.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-governance-compliance.fitItems.0.title",
      text: "services.ai-governance-compliance.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-governance-compliance.fitItems.1.title",
      text: "services.ai-governance-compliance.fitItems.1.text",
      positive: false,
    },
    {
      title: "services.ai-governance-compliance.fitItems.2.title",
      text: "services.ai-governance-compliance.fitItems.2.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-governance-compliance.faqItems.0.question",
      answer: "services.ai-governance-compliance.faqItems.0.answer",
    },
    {
      question: "services.ai-governance-compliance.faqItems.1.question",
      answer: "services.ai-governance-compliance.faqItems.1.answer",
    },
    {
      question: "services.ai-governance-compliance.faqItems.2.question",
      answer: "services.ai-governance-compliance.faqItems.2.answer",
    },
    {
      question: "services.ai-governance-compliance.faqItems.3.question",
      answer: "services.ai-governance-compliance.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-governance-compliance.tradeoffs.0.title",
      text: "services.ai-governance-compliance.tradeoffs.0.text",
    },
    {
      title: "services.ai-governance-compliance.tradeoffs.1.title",
      text: "services.ai-governance-compliance.tradeoffs.1.text",
    },
    {
      title: "services.ai-governance-compliance.tradeoffs.2.title",
      text: "services.ai-governance-compliance.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-governance-compliance.deliverables.0.title",
      text: "services.ai-governance-compliance.deliverables.0.text",
    },
    {
      title: "services.ai-governance-compliance.deliverables.1.title",
      text: "services.ai-governance-compliance.deliverables.1.text",
    },
    {
      title: "services.ai-governance-compliance.deliverables.2.title",
      text: "services.ai-governance-compliance.deliverables.2.text",
    },
    {
      title: "services.ai-governance-compliance.deliverables.3.title",
      text: "services.ai-governance-compliance.deliverables.3.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-governance-compliance.mechanism.0.title",
      text: "services.ai-governance-compliance.mechanism.0.text",
    },
    {
      title: "services.ai-governance-compliance.mechanism.1.title",
      text: "services.ai-governance-compliance.mechanism.1.text",
    },
    {
      title: "services.ai-governance-compliance.mechanism.2.title",
      text: "services.ai-governance-compliance.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-governance-compliance.outcomes.0.title",
      value: "services.ai-governance-compliance.outcomes.0.value",
      text: "services.ai-governance-compliance.outcomes.0.text",
      icon: "fact-check",
    },
    {
      title: "services.ai-governance-compliance.outcomes.1.title",
      value: "services.ai-governance-compliance.outcomes.1.value",
      text: "services.ai-governance-compliance.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.ai-governance-compliance.outcomes.2.title",
      value: "services.ai-governance-compliance.outcomes.2.value",
      text: "services.ai-governance-compliance.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-security-audit" },
    { type: "service", slug: "ai-infrastructure" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
