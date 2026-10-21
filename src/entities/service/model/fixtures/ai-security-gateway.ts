import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor; every
 * connected app and the request rate scale the gateway, while DLP and the audit
 * dashboard are one-off add-ons.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "apps",
      label: "calculator.fields.ai-security-gateway.apps",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "segmented",
      id: "traffic",
      label: "calculator.fields.ai-security-gateway.traffic",
      options: [
        { value: "small", label: "calculator.options.small" },
        { value: "medium", label: "calculator.options.medium" },
        { value: "large", label: "calculator.options.large" },
      ],
      default: "small",
    },
    {
      kind: "toggle",
      id: "dlp",
      label: "calculator.fields.ai-security-gateway.dlp",
      default: false,
    },
    {
      kind: "toggle",
      id: "audit",
      label: "calculator.fields.ai-security-gateway.audit",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 3 },
    { kind: "perUnit", field: "apps", rate: 120000, weeksPerUnit: 0.5 },
    { kind: "multiplier", field: "traffic", factors: { small: 1, medium: 1.3, large: 1.7 } },
    { kind: "perOption", field: "dlp", rates: { false: 0, true: 250000 } },
    { kind: "perOption", field: "audit", rates: { false: 0, true: 100000 } },
  ],
};

export const aiSecurityGateway: Service = {
  slug: "ai-security-gateway",
  navTitle: "services.ai-security-gateway.navTitle",
  title: "services.ai-security-gateway.title",
  tagline: "services.ai-security-gateway.tagline",
  description: "services.ai-security-gateway.description",
  price: { amount: 600000, unit: "project" },
  calculator,
  icon: "server",
  group: "security",
  features: [
    {
      title: "services.ai-security-gateway.features.0.title",
      text: "services.ai-security-gateway.features.0.text",
    },
    {
      title: "services.ai-security-gateway.features.1.title",
      text: "services.ai-security-gateway.features.1.text",
    },
    {
      title: "services.ai-security-gateway.features.2.title",
      text: "services.ai-security-gateway.features.2.text",
    },
    {
      title: "services.ai-security-gateway.features.3.title",
      text: "services.ai-security-gateway.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-security-gateway.ctaBanner.title",
    text: "services.ai-security-gateway.ctaBanner.text",
    buttonLabel: "services.ai-security-gateway.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-security-gateway.techStack.0.subtitle",
      description: "services.ai-security-gateway.techStack.0.description",
      technologies: [
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "services.ai-security-gateway.techStack.0.technologies.0.glossary",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary: "services.ai-security-gateway.techStack.0.technologies.1.glossary",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary: "services.ai-security-gateway.techStack.0.technologies.2.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-security-gateway.techStack.0.technologies.3.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-security-gateway.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-security-gateway.processSteps.0.title",
      text: "services.ai-security-gateway.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-security-gateway.processSteps.1.title",
      text: "services.ai-security-gateway.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-security-gateway.processSteps.2.title",
      text: "services.ai-security-gateway.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-security-gateway.processSteps.3.title",
      text: "services.ai-security-gateway.processSteps.3.text",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "services.ai-security-gateway.fitItems.0.title",
      text: "services.ai-security-gateway.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-security-gateway.fitItems.1.title",
      text: "services.ai-security-gateway.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-security-gateway.fitItems.2.title",
      text: "services.ai-security-gateway.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-security-gateway.fitItems.3.title",
      text: "services.ai-security-gateway.fitItems.3.text",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "services.ai-security-gateway.faqItems.0.question",
      answer: "services.ai-security-gateway.faqItems.0.answer",
    },
    {
      question: "services.ai-security-gateway.faqItems.1.question",
      answer: "services.ai-security-gateway.faqItems.1.answer",
    },
    {
      question: "services.ai-security-gateway.faqItems.2.question",
      answer: "services.ai-security-gateway.faqItems.2.answer",
    },
    {
      question: "services.ai-security-gateway.faqItems.3.question",
      answer: "services.ai-security-gateway.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-security-gateway.tradeoffs.0.title",
      text: "services.ai-security-gateway.tradeoffs.0.text",
    },
    {
      title: "services.ai-security-gateway.tradeoffs.1.title",
      text: "services.ai-security-gateway.tradeoffs.1.text",
    },
    {
      title: "services.ai-security-gateway.tradeoffs.2.title",
      text: "services.ai-security-gateway.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-security-gateway.deliverables.0.title",
      text: "services.ai-security-gateway.deliverables.0.text",
    },
    {
      title: "services.ai-security-gateway.deliverables.1.title",
      text: "services.ai-security-gateway.deliverables.1.text",
    },
    {
      title: "services.ai-security-gateway.deliverables.2.title",
      text: "services.ai-security-gateway.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-security-gateway.mechanism.0.title",
      text: "services.ai-security-gateway.mechanism.0.text",
    },
    {
      title: "services.ai-security-gateway.mechanism.1.title",
      text: "services.ai-security-gateway.mechanism.1.text",
    },
    {
      title: "services.ai-security-gateway.mechanism.2.title",
      text: "services.ai-security-gateway.mechanism.2.text",
    },
  ],
  outcomes: [
    {
      title: "services.ai-security-gateway.outcomes.0.title",
      value: "services.ai-security-gateway.outcomes.0.value",
      text: "services.ai-security-gateway.outcomes.0.text",
      icon: "server",
    },
    {
      title: "services.ai-security-gateway.outcomes.1.title",
      value: "services.ai-security-gateway.outcomes.1.value",
      text: "services.ai-security-gateway.outcomes.1.text",
      icon: "rate-review",
    },
    {
      title: "services.ai-security-gateway.outcomes.2.title",
      value: "services.ai-security-gateway.outcomes.2.value",
      text: "services.ai-security-gateway.outcomes.2.text",
      icon: "insights",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-security-audit" },
    { type: "service", slug: "ai-infrastructure" },
    { type: "service", slug: "deterministic-rag-systems" },
    { type: "solution", slug: "agentic-systems" },
  ],
};
