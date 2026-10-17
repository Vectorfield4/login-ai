import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: trained `agents` drive the recurring period (price per
 * agent), the `complexity` scales it, and a custom simulator plus support are
 * one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "agents",
      label: "calculator.fields.reinforcement-learning-systems.agents",
      min: 1,
      max: 12,
      default: 2,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.reinforcement-learning-systems.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "toggle",
      id: "simulator",
      label: "calculator.fields.reinforcement-learning-systems.simulator",
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
    { kind: "setup", amount: 2500000, weeks: 5 },
    { kind: "perUnit", field: "agents", rate: 250000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.6 } },
    { kind: "perOption", field: "simulator", rates: { false: 0, true: 600000 } },
    {
      kind: "perOption",
      field: "support",
      rates: { standard: 0, priority: 500000, dedicated: 1000000 },
    },
  ],
};

export const reinforcementLearningSystems: Service = {
  slug: "reinforcement-learning-systems",
  navTitle: "services.reinforcement-learning-systems.navTitle",
  title: "services.reinforcement-learning-systems.title",
  tagline: "services.reinforcement-learning-systems.tagline",
  description: "services.reinforcement-learning-systems.description",
  price: { amount: 2500000, unit: "project" },
  calculator,
  icon: "travel-explore",
  group: "ml",
  features: [
    {
      title: "services.reinforcement-learning-systems.features.0.title",
      text: "services.reinforcement-learning-systems.features.0.text",
    },
    {
      title: "services.reinforcement-learning-systems.features.1.title",
      text: "services.reinforcement-learning-systems.features.1.text",
    },
    {
      title: "services.reinforcement-learning-systems.features.2.title",
      text: "services.reinforcement-learning-systems.features.2.text",
    },
    {
      title: "services.reinforcement-learning-systems.features.3.title",
      text: "services.reinforcement-learning-systems.features.3.text",
    },
  ],
  sections: [
    {
      title: "services.reinforcement-learning-systems.sections.0.title",
      items: [
        "services.reinforcement-learning-systems.sections.0.items.0",
        "services.reinforcement-learning-systems.sections.0.items.1",
        "services.reinforcement-learning-systems.sections.0.items.2",
      ],
    },
    {
      title: "services.reinforcement-learning-systems.sections.1.title",
      items: [
        "services.reinforcement-learning-systems.sections.1.items.0",
        "services.reinforcement-learning-systems.sections.1.items.1",
        "services.reinforcement-learning-systems.sections.1.items.2",
      ],
    },
  ],
  ctaBanner: {
    title: "services.reinforcement-learning-systems.ctaBanner.title",
    text: "services.reinforcement-learning-systems.ctaBanner.text",
    buttonLabel: "services.reinforcement-learning-systems.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.reinforcement-learning-systems.techStack.0.subtitle",
      description: "services.reinforcement-learning-systems.techStack.0.description",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary: "services.reinforcement-learning-systems.techStack.0.technologies.0.glossary",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "services.reinforcement-learning-systems.techStack.0.technologies.1.glossary",
        },
        {
          id: "mlflow",
          name: "MLflow",
          glossary: "services.reinforcement-learning-systems.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.reinforcement-learning-systems.techStack.0.technologies.3.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.reinforcement-learning-systems.processSteps.0.title",
      text: "services.reinforcement-learning-systems.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.reinforcement-learning-systems.processSteps.1.title",
      text: "services.reinforcement-learning-systems.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.reinforcement-learning-systems.processSteps.2.title",
      text: "services.reinforcement-learning-systems.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.reinforcement-learning-systems.processSteps.3.title",
      text: "services.reinforcement-learning-systems.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.reinforcement-learning-systems.fitItems.0.title",
      text: "services.reinforcement-learning-systems.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.reinforcement-learning-systems.fitItems.1.title",
      text: "services.reinforcement-learning-systems.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.reinforcement-learning-systems.fitItems.2.title",
      text: "services.reinforcement-learning-systems.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.reinforcement-learning-systems.fitItems.3.title",
      text: "services.reinforcement-learning-systems.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "services.reinforcement-learning-systems.proofItems.0.title",
      text: "services.reinforcement-learning-systems.proofItems.0.text",
      metricValue: "services.reinforcement-learning-systems.proofItems.0.metricValue",
      metricLabel: "services.reinforcement-learning-systems.proofItems.0.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.reinforcement-learning-systems.faqItems.0.question",
      answer: "services.reinforcement-learning-systems.faqItems.0.answer",
    },
    {
      question: "services.reinforcement-learning-systems.faqItems.1.question",
      answer: "services.reinforcement-learning-systems.faqItems.1.answer",
    },
    {
      question: "services.reinforcement-learning-systems.faqItems.2.question",
      answer: "services.reinforcement-learning-systems.faqItems.2.answer",
    },
    {
      question: "services.reinforcement-learning-systems.faqItems.3.question",
      answer: "services.reinforcement-learning-systems.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.reinforcement-learning-systems.tradeoffs.0.title",
      text: "services.reinforcement-learning-systems.tradeoffs.0.text",
    },
    {
      title: "services.reinforcement-learning-systems.tradeoffs.1.title",
      text: "services.reinforcement-learning-systems.tradeoffs.1.text",
    },
    {
      title: "services.reinforcement-learning-systems.tradeoffs.2.title",
      text: "services.reinforcement-learning-systems.tradeoffs.2.text",
    },
    {
      title: "services.reinforcement-learning-systems.tradeoffs.3.title",
      text: "services.reinforcement-learning-systems.tradeoffs.3.text",
    },
  ],
  outcomes: [
    {
      title: "services.reinforcement-learning-systems.outcomes.0.title",
      value: "services.reinforcement-learning-systems.outcomes.0.value",
      text: "services.reinforcement-learning-systems.outcomes.0.text",
      icon: "insights",
    },
    {
      title: "services.reinforcement-learning-systems.outcomes.1.title",
      value: "services.reinforcement-learning-systems.outcomes.1.value",
      text: "services.reinforcement-learning-systems.outcomes.1.text",
      icon: "code",
    },
    {
      title: "services.reinforcement-learning-systems.outcomes.2.title",
      value: "services.reinforcement-learning-systems.outcomes.2.value",
      text: "services.reinforcement-learning-systems.outcomes.2.text",
      icon: "rocket-launch",
    },
  ],
  mechanism: [
    {
      title: "services.reinforcement-learning-systems.mechanism.0.title",
      text: "services.reinforcement-learning-systems.mechanism.0.text",
      diagram: "agent-loop",
    },
    {
      title: "services.reinforcement-learning-systems.mechanism.1.title",
      text: "services.reinforcement-learning-systems.mechanism.1.text",
    },
    {
      title: "services.reinforcement-learning-systems.mechanism.2.title",
      text: "services.reinforcement-learning-systems.mechanism.2.text",
    },
    {
      title: "services.reinforcement-learning-systems.mechanism.3.title",
      text: "services.reinforcement-learning-systems.mechanism.3.text",
    },
  ],
  relevants: [
    { type: "service", slug: "software-development" },
    { type: "service", slug: "highload-backend" },
    { type: "solution", slug: "manufacturers" },
  ],
};
