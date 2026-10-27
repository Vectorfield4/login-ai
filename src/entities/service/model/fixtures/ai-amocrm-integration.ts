import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: the setup term equals the advertised floor, while pipelines, users and scenarios add build and test time.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "stepper",
      id: "pipelines",
      label: "calculator.fields.ai-amocrm-integration.pipelines",
      min: 1,
      max: 10,
      default: 2,
    },
    {
      kind: "stepper",
      id: "users",
      label: "calculator.fields.ai-amocrm-integration.users",
      min: 10,
      max: 500,
      default: 50,
    },
    {
      kind: "stepper",
      id: "scenarios",
      label: "calculator.fields.ai-amocrm-integration.scenarios",
      min: 1,
      max: 15,
      default: 3,
    },
  ],
  terms: [
    { kind: "setup", amount: 600000, weeks: 3 },
    { kind: "perUnit", field: "pipelines", rate: 100000, weeksPerUnit: 0.5 },
    { kind: "perUnit", field: "users", rate: 800, weeksPerUnit: 0.002 },
    { kind: "perUnit", field: "scenarios", rate: 50000, weeksPerUnit: 0.25 },
  ],
};

export const aiAmocrmIntegration: Service = {
  slug: "ai-amocrm-integration",
  navTitle: "services.ai-amocrm-integration.navTitle",
  title: "services.ai-amocrm-integration.title",
  tagline: "services.ai-amocrm-integration.tagline",
  description: "services.ai-amocrm-integration.description",
  price: { amount: 600000, unit: "project" },
  calculator,
  icon: "insights",
  group: "ai-integrations",
  features: [
    {
      title: "services.ai-amocrm-integration.features.0.title",
      text: "services.ai-amocrm-integration.features.0.text",
    },
    {
      title: "services.ai-amocrm-integration.features.1.title",
      text: "services.ai-amocrm-integration.features.1.text",
    },
    {
      title: "services.ai-amocrm-integration.features.2.title",
      text: "services.ai-amocrm-integration.features.2.text",
    },
    {
      title: "services.ai-amocrm-integration.features.3.title",
      text: "services.ai-amocrm-integration.features.3.text",
    },
  ],
  ctaBanner: {
    title: "services.ai-amocrm-integration.ctaBanner.title",
    text: "services.ai-amocrm-integration.ctaBanner.text",
    buttonLabel: "services.ai-amocrm-integration.ctaBanner.buttonLabel",
  },
  techStack: [
    {
      subtitle: "services.ai-amocrm-integration.techStack.0.subtitle",
      description: "services.ai-amocrm-integration.techStack.0.description",
      technologies: [
        {
          id: "amocrm",
          name: "amoCRM",
          glossary: "services.ai-amocrm-integration.techStack.0.technologies.0.glossary",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary: "services.ai-amocrm-integration.techStack.0.technologies.1.glossary",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "services.ai-amocrm-integration.techStack.0.technologies.2.glossary",
        },
        {
          id: "redis",
          name: "Redis",
          glossary: "services.ai-amocrm-integration.techStack.0.technologies.3.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.ai-amocrm-integration.techStack.0.technologies.4.glossary",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "services.ai-amocrm-integration.processSteps.0.title",
      text: "services.ai-amocrm-integration.processSteps.0.text",
      processType: "discovery",
    },
    {
      title: "services.ai-amocrm-integration.processSteps.1.title",
      text: "services.ai-amocrm-integration.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "services.ai-amocrm-integration.processSteps.2.title",
      text: "services.ai-amocrm-integration.processSteps.2.text",
      processType: "integration",
    },
    {
      title: "services.ai-amocrm-integration.processSteps.3.title",
      text: "services.ai-amocrm-integration.processSteps.3.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "services.ai-amocrm-integration.fitItems.0.title",
      text: "services.ai-amocrm-integration.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.ai-amocrm-integration.fitItems.1.title",
      text: "services.ai-amocrm-integration.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.ai-amocrm-integration.fitItems.2.title",
      text: "services.ai-amocrm-integration.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.ai-amocrm-integration.fitItems.3.title",
      text: "services.ai-amocrm-integration.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.ai-amocrm-integration.precedents.0.title",
      text: "services.ai-amocrm-integration.precedents.0.text",
      metricValue: "services.ai-amocrm-integration.precedents.0.metricValue",
      metricLabel: "services.ai-amocrm-integration.precedents.0.metricLabel",
    },
    {
      title: "services.ai-amocrm-integration.precedents.1.title",
      text: "services.ai-amocrm-integration.precedents.1.text",
      metricValue: "services.ai-amocrm-integration.precedents.1.metricValue",
      metricLabel: "services.ai-amocrm-integration.precedents.1.metricLabel",
    },
    {
      title: "services.ai-amocrm-integration.precedents.2.title",
      text: "services.ai-amocrm-integration.precedents.2.text",
      metricValue: "services.ai-amocrm-integration.precedents.2.metricValue",
      metricLabel: "services.ai-amocrm-integration.precedents.2.metricLabel",
    },
    {
      title: "services.ai-amocrm-integration.precedents.3.title",
      text: "services.ai-amocrm-integration.precedents.3.text",
      metricValue: "services.ai-amocrm-integration.precedents.3.metricValue",
      metricLabel: "services.ai-amocrm-integration.precedents.3.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.ai-amocrm-integration.faqItems.0.question",
      answer: "services.ai-amocrm-integration.faqItems.0.answer",
    },
    {
      question: "services.ai-amocrm-integration.faqItems.1.question",
      answer: "services.ai-amocrm-integration.faqItems.1.answer",
    },
    {
      question: "services.ai-amocrm-integration.faqItems.2.question",
      answer: "services.ai-amocrm-integration.faqItems.2.answer",
    },
    {
      question: "services.ai-amocrm-integration.faqItems.3.question",
      answer: "services.ai-amocrm-integration.faqItems.3.answer",
    },
  ],
  tradeoffs: [
    {
      title: "services.ai-amocrm-integration.tradeoffs.0.title",
      text: "services.ai-amocrm-integration.tradeoffs.0.text",
    },
    {
      title: "services.ai-amocrm-integration.tradeoffs.1.title",
      text: "services.ai-amocrm-integration.tradeoffs.1.text",
    },
    {
      title: "services.ai-amocrm-integration.tradeoffs.2.title",
      text: "services.ai-amocrm-integration.tradeoffs.2.text",
    },
  ],
  deliverables: [
    {
      title: "services.ai-amocrm-integration.deliverables.0.title",
      text: "services.ai-amocrm-integration.deliverables.0.text",
    },
    {
      title: "services.ai-amocrm-integration.deliverables.1.title",
      text: "services.ai-amocrm-integration.deliverables.1.text",
    },
    {
      title: "services.ai-amocrm-integration.deliverables.2.title",
      text: "services.ai-amocrm-integration.deliverables.2.text",
    },
  ],
  mechanism: [
    {
      title: "services.ai-amocrm-integration.mechanism.0.title",
      text: "services.ai-amocrm-integration.mechanism.0.text",
    },
    {
      title: "services.ai-amocrm-integration.mechanism.1.title",
      text: "services.ai-amocrm-integration.mechanism.1.text",
    },
    {
      title: "services.ai-amocrm-integration.mechanism.2.title",
      text: "services.ai-amocrm-integration.mechanism.2.text",
    },
  ],
  relevants: [
    { type: "service", slug: "ai-crm-integration" },
    { type: "solution", slug: "customer-experience" },
    { type: "case", slug: "retail-support-bot" },
  ],
};
