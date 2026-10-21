import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while every
 * agent and integration adds build and test time and the knowledge-base tier
 * scales the recurring period.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "agents",
      label: "calculator.fields.ai-agents.agents",
      min: 1,
      max: 5,
      default: 1,
    },
    {
      kind: "stepper",
      id: "integrations",
      label: "calculator.fields.ai-agents.integrations",
      min: 0,
      max: 6,
      default: 2,
    },
    {
      kind: "segmented",
      id: "knowledge",
      label: "calculator.fields.ai-agents.knowledge",
      options: [
        { value: "small", label: "calculator.options.ragSmall" },
        { value: "medium", label: "calculator.options.ragMedium" },
        { value: "large", label: "calculator.options.ragLarge" },
      ],
      default: "small",
      showOnResults: true,
    },
  ],
  terms: [
    { kind: "setup", amount: 1200000, weeks: 4 },
    { kind: "perUnit", field: "agents", rate: 250000, weeksPerUnit: 1 },
    { kind: "perUnit", field: "integrations", rate: 125000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "knowledge", factors: { small: 1, medium: 1.2, large: 1.5 } },
  ],
};

export const aiAgents: Service = {
  slug: "ai-agents",
  navTitle: "services.ai-agents.navTitle",
  title: "services.ai-agents.title",
  tagline: "services.ai-agents.tagline",
  description: "services.ai-agents.description",
  price: { amount: 1200000, unit: "project" },
  calculator,
  icon: "auto-awesome",
  group: "agentic",
  features: [
    {
      title: "services.ai-agents.features.0.title",
      text: "services.ai-agents.features.0.text",
    },
    {
      title: "services.ai-agents.features.1.title",
      text: "services.ai-agents.features.1.text",
    },
    {
      title: "services.ai-agents.features.2.title",
      text: "services.ai-agents.features.2.text",
    },
    {
      title: "services.ai-agents.features.3.title",
      text: "services.ai-agents.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-agents.ctaBanner.title",
    text: "services.ai-agents.ctaBanner.text",
    buttonLabel: "services.ai-agents.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-agents.techStack.0.subtitle",
      description: "services.ai-agents.techStack.0.description",
      technologies: [
        {
          id: "langgraph",
          name: "LangGraph",
          glossary: "services.ai-agents.techStack.0.technologies.0.glossary",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary: "services.ai-agents.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-agents.techStack.0.technologies.2.glossary",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary: "services.ai-agents.techStack.0.technologies.3.glossary",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.ai-agents.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-agents.processSteps.0.title",
      text: "services.ai-agents.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-agents.processSteps.1.title",
      text: "services.ai-agents.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-agents.processSteps.2.title",
      text: "services.ai-agents.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.ai-agents.processSteps.3.title",
      text: "services.ai-agents.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-agents.fitItems.0.title",
      text: "services.ai-agents.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-agents.fitItems.1.title",
      text: "services.ai-agents.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-agents.fitItems.2.title",
      text: "services.ai-agents.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-agents.fitItems.3.title",
      text: "services.ai-agents.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-agents.faqItems.0.question",
      answer: "services.ai-agents.faqItems.0.answer",
    },
    {
      question: "services.ai-agents.faqItems.1.question",
      answer: "services.ai-agents.faqItems.1.answer",
    },
    {
      question: "services.ai-agents.faqItems.2.question",
      answer: "services.ai-agents.faqItems.2.answer",
    },
    {
      question: "services.ai-agents.faqItems.3.question",
      answer: "services.ai-agents.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-agents.tradeoffs.0.title",
      text: "services.ai-agents.tradeoffs.0.text",
    },
    {
      title: "services.ai-agents.tradeoffs.1.title",
      text: "services.ai-agents.tradeoffs.1.text",
    },
    {
      title: "services.ai-agents.tradeoffs.2.title",
      text: "services.ai-agents.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-agents.deliverables.0.title",
      text: "services.ai-agents.deliverables.0.text",
    },
    {
      title: "services.ai-agents.deliverables.1.title",
      text: "services.ai-agents.deliverables.1.text",
    },
    {
      title: "services.ai-agents.deliverables.2.title",
      text: "services.ai-agents.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-agents.mechanism.0.title",
      text: "services.ai-agents.mechanism.0.text",
    },
    {
      title: "services.ai-agents.mechanism.1.title",
      text: "services.ai-agents.mechanism.1.text",
    },
    {
      title: "services.ai-agents.mechanism.2.title",
      text: "services.ai-agents.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-agents.outcomes.0.title",
      value: "services.ai-agents.outcomes.0.value",
      text: "services.ai-agents.outcomes.0.text",
      icon: "rocket-launch",
    },
    {
      title: "services.ai-agents.outcomes.1.title",
      value: "services.ai-agents.outcomes.1.value",
      text: "services.ai-agents.outcomes.1.text",
      icon: "insights",
    },
    {
      title: "services.ai-agents.outcomes.2.title",
      value: "services.ai-agents.outcomes.2.value",
      text: "services.ai-agents.outcomes.2.text",
      icon: "rate-review",
    },
  ],
  relevants: [
    { type: "solution", slug: "agentic-systems" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
    { type: "service", slug: "software-development" },
  ],
};
