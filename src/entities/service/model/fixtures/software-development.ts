import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Service } from "../services";

/**
 * Per-project estimator: `months` of the team drives the recurring period
 * (price per team-month), `complexity` scales it, and integrations plus
 * post-launch support are one-off add-ons. The project floor stays as `setup`.
 */
const calculator: CalculatorSpec = {
  unit: "project",
  horizon: 1,
  fields: [
    {
      kind: "slider",
      id: "months",
      label: "calculator.fields.software-development.months",
      min: 3,
      max: 18,
      step: 1,
      default: 6,
    },
    {
      kind: "segmented",
      id: "complexity",
      label: "calculator.fields.software-development.complexity",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "complex", label: "calculator.options.complex" },
      ],
      default: "standard",
    },
    {
      kind: "segmented",
      id: "integration",
      label: "calculator.fields.integration",
      options: [
        { value: "none", label: "calculator.options.none" },
        { value: "standard", label: "calculator.options.standard" },
        { value: "crm", label: "calculator.options.crm" },
      ],
      default: "standard",
    },
  ],
  terms: [
    { kind: "setup", amount: 3000000, weeks: 8 },
    { kind: "perUnit", field: "months", rate: 600000, weeksPerUnit: 4.33 },
    { kind: "multiplier", field: "complexity", factors: { standard: 1, complex: 1.7 } },
    { kind: "perOption", field: "integration", rates: { none: 0, standard: 900000, crm: 1800000 } },
  ],
};

export const softwareDevelopment: Service = {
  slug: "software-development",
  navTitle: "services.software-development.navTitle",
  title: "services.software-development.title",
  tagline: "services.software-development.tagline",
  description: "services.software-development.description",
  price: { amount: 3000000, unit: "project" },
  calculator,
  ctaBanner: {
    title: "services.software-development.ctaBanner.title",
    text: "services.software-development.ctaBanner.text",
    buttonLabel: "services.software-development.ctaBanner.buttonLabel",
  },
  icon: "code",
  group: "engineering",
  features: [
    {
      title: "services.software-development.features.0.title",
      text: "services.software-development.features.0.text",
    },
    {
      title: "services.software-development.features.1.title",
      text: "services.software-development.features.1.text",
    },
    {
      title: "services.software-development.features.2.title",
      text: "services.software-development.features.2.text",
    },
    {
      title: "services.software-development.features.3.title",
      text: "services.software-development.features.3.text",
    },
  ],
  processSteps: [
    {
      title: "services.software-development.processSteps.0.title",
      text: "services.software-development.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "services.software-development.processSteps.1.title",
      text: "services.software-development.processSteps.1.text",
      processType: "architecture",
    },
    {
      title: "services.software-development.processSteps.2.title",
      text: "services.software-development.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "services.software-development.processSteps.3.title",
      text: "services.software-development.processSteps.3.text",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "services.software-development.fitItems.0.title",
      text: "services.software-development.fitItems.0.text",
      positive: true,
    },
    {
      title: "services.software-development.fitItems.1.title",
      text: "services.software-development.fitItems.1.text",
      positive: true,
    },
    {
      title: "services.software-development.fitItems.2.title",
      text: "services.software-development.fitItems.2.text",
      positive: false,
    },
    {
      title: "services.software-development.fitItems.3.title",
      text: "services.software-development.fitItems.3.text",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "services.software-development.precedents.0.title",
      text: "services.software-development.precedents.0.text",
      metricValue: "services.software-development.precedents.0.metricValue",
      metricLabel: "services.software-development.precedents.0.metricLabel",
    },
    {
      title: "services.software-development.precedents.1.title",
      text: "services.software-development.precedents.1.text",
      metricValue: "services.software-development.precedents.1.metricValue",
      metricLabel: "services.software-development.precedents.1.metricLabel",
    },
    {
      title: "services.software-development.precedents.2.title",
      text: "services.software-development.precedents.2.text",
      metricValue: "services.software-development.precedents.2.metricValue",
      metricLabel: "services.software-development.precedents.2.metricLabel",
    },
    {
      title: "services.software-development.precedents.3.title",
      text: "services.software-development.precedents.3.text",
      metricValue: "services.software-development.precedents.3.metricValue",
      metricLabel: "services.software-development.precedents.3.metricLabel",
    },
    {
      title: "services.software-development.precedents.4.title",
      text: "services.software-development.precedents.4.text",
      metricValue: "services.software-development.precedents.4.metricValue",
      metricLabel: "services.software-development.precedents.4.metricLabel",
    },
    {
      title: "services.software-development.precedents.5.title",
      text: "services.software-development.precedents.5.text",
      metricValue: "services.software-development.precedents.5.metricValue",
      metricLabel: "services.software-development.precedents.5.metricLabel",
    },
    {
      title: "services.software-development.precedents.6.title",
      text: "services.software-development.precedents.6.text",
      metricValue: "services.software-development.precedents.6.metricValue",
      metricLabel: "services.software-development.precedents.6.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "services.software-development.faqItems.0.question",
      answer: "services.software-development.faqItems.0.answer",
    },
    {
      question: "services.software-development.faqItems.1.question",
      answer: "services.software-development.faqItems.1.answer",
    },
    {
      question: "services.software-development.faqItems.2.question",
      answer: "services.software-development.faqItems.2.answer",
    },
    {
      question: "services.software-development.faqItems.3.question",
      answer: "services.software-development.faqItems.3.answer",
    },
  ],
  scope: [
    {
      title: "services.software-development.scope.0.title",
      text: "services.software-development.scope.0.text",
    },
    {
      title: "services.software-development.scope.1.title",
      text: "services.software-development.scope.1.text",
    },
    {
      title: "services.software-development.scope.2.title",
      text: "services.software-development.scope.2.text",
    },
    {
      title: "services.software-development.scope.3.title",
      text: "services.software-development.scope.3.text",
    },
    {
      title: "services.software-development.scope.4.title",
      text: "services.software-development.scope.4.text",
    },
    {
      title: "services.software-development.scope.5.title",
      text: "services.software-development.scope.5.text",
    },
  ],
  mechanism: [
    {
      title: "services.software-development.mechanism.0.title",
      text: "services.software-development.mechanism.0.text",
      diagram: "sprint-loop",
    },
    {
      title: "services.software-development.mechanism.1.title",
      text: "services.software-development.mechanism.1.text",
      diagram: "sprint-plan",
    },
    {
      title: "services.software-development.mechanism.2.title",
      text: "services.software-development.mechanism.2.text",
      diagram: "own-task",
    },
    {
      title: "services.software-development.mechanism.3.title",
      text: "services.software-development.mechanism.3.text",
      diagram: "code-review",
    },
    {
      title: "services.software-development.mechanism.4.title",
      text: "services.software-development.mechanism.4.text",
      diagram: "deploy-pipeline",
    },
    {
      title: "services.software-development.mechanism.5.title",
      text: "services.software-development.mechanism.5.text",
      diagram: "feedback-loop",
    },
  ],
  techStack: [
    {
      subtitle: "services.software-development.techStack.0.subtitle",
      description: "services.software-development.techStack.0.description",
      technologies: [
        {
          id: "typescript",
          name: "TypeScript",
          glossary: "services.software-development.techStack.0.technologies.0.glossary",
        },
        {
          id: "react",
          name: "React",
          glossary: "services.software-development.techStack.0.technologies.1.glossary",
        },
        {
          id: "nextjs",
          name: "Next.js",
          glossary: "services.software-development.techStack.0.technologies.2.glossary",
        },
        {
          id: "nodejs",
          name: "Node.js",
          glossary: "services.software-development.techStack.0.technologies.3.glossary",
        },
        {
          id: "go",
          name: "Go",
          glossary: "services.software-development.techStack.0.technologies.4.glossary",
        },
        {
          id: "python",
          name: "Python",
          glossary: "services.software-development.techStack.0.technologies.5.glossary",
        },
      ],
    },
    {
      subtitle: "services.software-development.techStack.1.subtitle",
      description: "services.software-development.techStack.1.description",
      technologies: [
        {
          id: "swift",
          name: "Swift",
          glossary: "services.software-development.techStack.1.technologies.0.glossary",
        },
        {
          id: "kotlin",
          name: "Kotlin",
          glossary: "services.software-development.techStack.1.technologies.1.glossary",
        },
        {
          id: "flutter",
          name: "Flutter",
          glossary: "services.software-development.techStack.1.technologies.2.glossary",
        },
        {
          id: "react-native",
          name: "React Native",
          glossary: "services.software-development.techStack.1.technologies.3.glossary",
        },
      ],
    },
  ],
  relevants: [
    {
      type: "solution",
      slug: "agentic-systems",
      noteKey: "relevants.software-development.agentic-systems",
    },
    {
      type: "solution",
      slug: "computer-vision",
      noteKey: "relevants.software-development.computer-vision",
    },
    {
      type: "solution",
      slug: "medical-clinics",
      noteKey: "relevants.software-development.medical-clinics",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.software-development.reputation-management",
    },
    {
      type: "solution",
      slug: "manufacturers",
      noteKey: "relevants.software-development.manufacturers",
    },
    {
      type: "service",
      slug: "corporate-websites",
      noteKey: "relevants.software-development.corporate-websites",
    },
    {
      type: "service",
      slug: "landing-pages",
      noteKey: "relevants.software-development.landing-pages",
    },
    {
      type: "service",
      slug: "highload-backend",
      noteKey: "relevants.software-development.highload-backend",
    },
    {
      type: "service",
      slug: "ui-ux-design",
      noteKey: "relevants.software-development.ui-ux-design",
    },
    {
      type: "case",
      slug: "retail-support-bot",
      noteKey: "relevants.software-development.retail-support-bot",
    },
    {
      type: "case",
      slug: "reputation-monitoring-platform",
      noteKey: "relevants.software-development.reputation-monitoring-platform",
    },
  ],
};
