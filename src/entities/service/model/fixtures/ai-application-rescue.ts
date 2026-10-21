import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; systems
 * and models scale the audit, while data readiness and the restart window
 * change the recovery plan and the support period.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "systems",
      label: "calculator.fields.ai-application-rescue.systems",
      min: 1,
      max: 8,
      default: 2,
    },
    {
      kind: "stepper",
      id: "models",
      label: "calculator.fields.ai-application-rescue.models",
      min: 1,
      max: 6,
      default: 1,
    },
    {
      kind: "segmented",
      id: "data",
      label: "calculator.fields.ai-application-rescue.data",
      options: [
        { value: "small", label: "calculator.options.small" },
        { value: "medium", label: "calculator.options.medium" },
        { value: "large", label: "calculator.options.large" },
      ],
      default: "small",
    },
    {
      kind: "segmented",
      id: "timeline",
      label: "calculator.fields.ai-application-rescue.timeline",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "express", label: "calculator.options.express" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 400000, weeks: 2 },
    { kind: "perUnit", field: "systems", rate: 80000, weeksPerUnit: 0.25 },
    { kind: "perUnit", field: "models", rate: 50000, weeksPerUnit: 0.2 },
    { kind: "multiplier", field: "data", factors: { small: 1, medium: 1.2, large: 1.5 } },
    { kind: "multiplier", field: "timeline", factors: { standard: 1, express: 1.3 } },
  ],
};

export const aiApplicationRescue: Service = {
  slug: "ai-application-rescue",
  navTitle: "services.ai-application-rescue.navTitle",
  title: "services.ai-application-rescue.title",
  tagline: "services.ai-application-rescue.tagline",
  description: "services.ai-application-rescue.description",
  price: { amount: 400000, unit: "project" },
  calculator,
  icon: "rocket-launch",
  group: "engineering",
  features: [
    {
      title: "services.ai-application-rescue.features.0.title",
      text: "services.ai-application-rescue.features.0.text",
    },
    {
      title: "services.ai-application-rescue.features.1.title",
      text: "services.ai-application-rescue.features.1.text",
    },
    {
      title: "services.ai-application-rescue.features.2.title",
      text: "services.ai-application-rescue.features.2.text",
    },
    {
      title: "services.ai-application-rescue.features.3.title",
      text: "services.ai-application-rescue.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-application-rescue.ctaBanner.title",
    text: "services.ai-application-rescue.ctaBanner.text",
    buttonLabel: "services.ai-application-rescue.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-application-rescue.techStack.0.subtitle",
      description: "services.ai-application-rescue.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-application-rescue.techStack.0.technologies.0.glossary",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary: "services.ai-application-rescue.techStack.0.technologies.1.glossary",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.ai-application-rescue.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-application-rescue.techStack.0.technologies.3.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-application-rescue.processSteps.0.title",
      text: "services.ai-application-rescue.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-application-rescue.processSteps.1.title",
      text: "services.ai-application-rescue.processSteps.1.text",
      processType: "analysis",
    },
    {
      title: "services.ai-application-rescue.processSteps.2.title",
      text: "services.ai-application-rescue.processSteps.2.text",
      processType: "system-design",
    },
    {
      title: "services.ai-application-rescue.processSteps.3.title",
      text: "services.ai-application-rescue.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-application-rescue.fitItems.0.title",
      text: "services.ai-application-rescue.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-application-rescue.fitItems.1.title",
      text: "services.ai-application-rescue.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-application-rescue.fitItems.2.title",
      text: "services.ai-application-rescue.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-application-rescue.fitItems.3.title",
      text: "services.ai-application-rescue.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-application-rescue.faqItems.0.question",
      answer: "services.ai-application-rescue.faqItems.0.answer",
    },
    {
      question: "services.ai-application-rescue.faqItems.1.question",
      answer: "services.ai-application-rescue.faqItems.1.answer",
    },
    {
      question: "services.ai-application-rescue.faqItems.2.question",
      answer: "services.ai-application-rescue.faqItems.2.answer",
    },
    {
      question: "services.ai-application-rescue.faqItems.3.question",
      answer: "services.ai-application-rescue.faqItems.3.answer",
    },
  ],
  scope: [
    {
      title: "services.ai-application-rescue.scope.0.title",
      text: "services.ai-application-rescue.scope.0.text",
    },
    {
      title: "services.ai-application-rescue.scope.1.title",
      text: "services.ai-application-rescue.scope.1.text",
    },
    {
      title: "services.ai-application-rescue.scope.2.title",
      text: "services.ai-application-rescue.scope.2.text",
    },
    {
      title: "services.ai-application-rescue.scope.3.title",
      text: "services.ai-application-rescue.scope.3.text",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-application-rescue.tradeoffs.0.title",
      text: "services.ai-application-rescue.tradeoffs.0.text",
    },
    {
      title: "services.ai-application-rescue.tradeoffs.1.title",
      text: "services.ai-application-rescue.tradeoffs.1.text",
    },
    {
      title: "services.ai-application-rescue.tradeoffs.2.title",
      text: "services.ai-application-rescue.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-application-rescue.deliverables.0.title",
      text: "services.ai-application-rescue.deliverables.0.text",
    },
    {
      title: "services.ai-application-rescue.deliverables.1.title",
      text: "services.ai-application-rescue.deliverables.1.text",
    },
    {
      title: "services.ai-application-rescue.deliverables.2.title",
      text: "services.ai-application-rescue.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-application-rescue.mechanism.0.title",
      text: "services.ai-application-rescue.mechanism.0.text",
    },
    {
      title: "services.ai-application-rescue.mechanism.1.title",
      text: "services.ai-application-rescue.mechanism.1.text",
    },
    {
      title: "services.ai-application-rescue.mechanism.2.title",
      text: "services.ai-application-rescue.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-application-rescue.outcomes.0.title",
      value: "services.ai-application-rescue.outcomes.0.value",
      text: "services.ai-application-rescue.outcomes.0.text",
      icon: "fact-check",
    },
    {
      title: "services.ai-application-rescue.outcomes.1.title",
      value: "services.ai-application-rescue.outcomes.1.value",
      text: "services.ai-application-rescue.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.ai-application-rescue.outcomes.2.title",
      value: "services.ai-application-rescue.outcomes.2.value",
      text: "services.ai-application-rescue.outcomes.2.text",
      icon: "rocket-launch",
    },
  ],
  relevants: [
    { type: "service", slug: "llm-evaluation" },
    { type: "service", slug: "ai-agents" },
    { type: "solution", slug: "agentic-systems" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
