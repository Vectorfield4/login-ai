import type { Service } from "./services";

/**
 * Single source of truth for services. Content is read synchronously
 * (SSG, no backend): pages and widgets resolve it through `getServices()` /
 * `getServiceBySlug()` from `./getters`.
 */
export const services: Service[] = [
  {
    slug: "software-development",
    navTitle: "services.software-development.navTitle",
    title: "services.software-development.title",
    tagline: "services.software-development.tagline",
    description: "services.software-development.description",
    ctaBanner: {
      title: "services.software-development.ctaBanner.title",
      text: "services.software-development.ctaBanner.text",
      buttonLabel: "services.software-development.ctaBanner.buttonLabel",
    },
    icon: "code",
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
      },
      {
        title: "services.software-development.processSteps.1.title",
        text: "services.software-development.processSteps.1.text",
      },
      {
        title: "services.software-development.processSteps.2.title",
        text: "services.software-development.processSteps.2.text",
      },
      {
        title: "services.software-development.processSteps.3.title",
        text: "services.software-development.processSteps.3.text",
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
    proofItems: [
      {
        title: "services.software-development.proofItems.0.title",
        text: "services.software-development.proofItems.0.text",
        metricValue: "services.software-development.proofItems.0.metricValue",
        metricLabel: "services.software-development.proofItems.0.metricLabel",
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
    sections: [
      {
        title: "services.software-development.sections.0.title",
        items: [
          "services.software-development.sections.0.items.0",
          "services.software-development.sections.0.items.1",
          "services.software-development.sections.0.items.2",
          "services.software-development.sections.0.items.3",
          "services.software-development.sections.0.items.4",
          "services.software-development.sections.0.items.5",
        ],
      },
      {
        title: "services.software-development.sections.1.title",
        items: [
          "services.software-development.sections.1.items.0",
          "services.software-development.sections.1.items.1",
          "services.software-development.sections.1.items.2",
          "services.software-development.sections.1.items.3",
          "services.software-development.sections.1.items.4",
          "services.software-development.sections.1.items.5",
        ],
      },
      {
        title: "services.software-development.sections.2.title",
        items: [
          "services.software-development.sections.2.items.0",
          "services.software-development.sections.2.items.1",
          "services.software-development.sections.2.items.2",
          "services.software-development.sections.2.items.3",
          "services.software-development.sections.2.items.4",
          "services.software-development.sections.2.items.5",
        ],
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
  },
  {
    slug: "highload-backend",
    navTitle: "services.highload-backend.navTitle",
    title: "services.highload-backend.title",
    tagline: "services.highload-backend.tagline",
    description: "services.highload-backend.description",
    ctaBanner: {
      title: "services.highload-backend.ctaBanner.title",
      text: "services.highload-backend.ctaBanner.text",
      buttonLabel: "services.highload-backend.ctaBanner.buttonLabel",
    },
    icon: "cpu",
    features: [
      {
        title: "services.highload-backend.features.0.title",
        text: "services.highload-backend.features.0.text",
      },
      {
        title: "services.highload-backend.features.1.title",
        text: "services.highload-backend.features.1.text",
      },
      {
        title: "services.highload-backend.features.2.title",
        text: "services.highload-backend.features.2.text",
      },
      {
        title: "services.highload-backend.features.3.title",
        text: "services.highload-backend.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.highload-backend.processSteps.0.title",
        text: "services.highload-backend.processSteps.0.text",
      },
      {
        title: "services.highload-backend.processSteps.1.title",
        text: "services.highload-backend.processSteps.1.text",
      },
      {
        title: "services.highload-backend.processSteps.2.title",
        text: "services.highload-backend.processSteps.2.text",
      },
      {
        title: "services.highload-backend.processSteps.3.title",
        text: "services.highload-backend.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.highload-backend.fitItems.0.title",
        text: "services.highload-backend.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.highload-backend.fitItems.1.title",
        text: "services.highload-backend.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.highload-backend.fitItems.2.title",
        text: "services.highload-backend.fitItems.2.text",
        positive: true,
      },
      {
        title: "services.highload-backend.fitItems.3.title",
        text: "services.highload-backend.fitItems.3.text",
        positive: true,
      },
      {
        title: "services.highload-backend.fitItems.4.title",
        text: "services.highload-backend.fitItems.4.text",
        positive: false,
      },
      {
        title: "services.highload-backend.fitItems.5.title",
        text: "services.highload-backend.fitItems.5.text",
        positive: false,
      },
      {
        title: "services.highload-backend.fitItems.6.title",
        text: "services.highload-backend.fitItems.6.text",
        positive: false,
      },
      {
        title: "services.highload-backend.fitItems.7.title",
        text: "services.highload-backend.fitItems.7.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.highload-backend.proofItems.0.title",
        text: "services.highload-backend.proofItems.0.text",
        metricValue: "services.highload-backend.proofItems.0.metricValue",
        metricLabel: "services.highload-backend.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.highload-backend.faqItems.0.question",
        answer: "services.highload-backend.faqItems.0.answer",
      },
      {
        question: "services.highload-backend.faqItems.1.question",
        answer: "services.highload-backend.faqItems.1.answer",
      },
      {
        question: "services.highload-backend.faqItems.2.question",
        answer: "services.highload-backend.faqItems.2.answer",
      },
    ],
    sections: [
      {
        title: "services.highload-backend.sections.0.title",
        items: [
          "services.highload-backend.sections.0.items.0",
          "services.highload-backend.sections.0.items.1",
          "services.highload-backend.sections.0.items.2",
          "services.highload-backend.sections.0.items.3",
          "services.highload-backend.sections.0.items.4",
          "services.highload-backend.sections.0.items.5",
        ],
      },
      {
        title: "services.highload-backend.sections.1.title",
        items: [
          "services.highload-backend.sections.1.items.0",
          "services.highload-backend.sections.1.items.1",
          "services.highload-backend.sections.1.items.2",
          "services.highload-backend.sections.1.items.3",
          "services.highload-backend.sections.1.items.4",
          "services.highload-backend.sections.1.items.5",
        ],
      },
    ],
    techStack: [
      {
        subtitle: "services.highload-backend.techStack.0.subtitle",
        description: "services.highload-backend.techStack.0.description",
        technologies: [
          {
            id: "rust",
            name: "Rust",
            glossary: "services.highload-backend.techStack.0.technologies.0.glossary",
          },
          {
            id: "tokio",
            name: "Tokio",
            glossary: "services.highload-backend.techStack.0.technologies.1.glossary",
          },
          {
            id: "axum",
            name: "Axum",
            glossary: "services.highload-backend.techStack.0.technologies.2.glossary",
          },
        ],
      },
      {
        subtitle: "services.highload-backend.techStack.1.subtitle",
        description: "services.highload-backend.techStack.1.description",
        technologies: [
          {
            id: "postgresql",
            name: "PostgreSQL",
            glossary: "services.highload-backend.techStack.1.technologies.0.glossary",
          },
          {
            id: "redis",
            name: "Redis",
            glossary: "services.highload-backend.techStack.1.technologies.1.glossary",
          },
          {
            id: "clickhouse",
            name: "ClickHouse",
            glossary: "services.highload-backend.techStack.1.technologies.2.glossary",
          },
          {
            id: "elasticsearch",
            name: "Elasticsearch",
            glossary: "services.highload-backend.techStack.1.technologies.3.glossary",
          },
        ],
      },
    ],
    relevants: [
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.highload-backend.software-development",
      },
      {
        type: "solution",
        slug: "medical-clinics",
        noteKey: "relevants.highload-backend.medical-clinics",
      },
      {
        type: "solution",
        slug: "manufacturers",
        noteKey: "relevants.highload-backend.manufacturers",
      },
      {
        type: "case",
        slug: "reputation-monitoring-platform",
        noteKey: "relevants.highload-backend.reputation-monitoring-platform",
      },
    ],
  },
  {
    slug: "corporate-websites",
    navTitle: "services.corporate-websites.navTitle",
    title: "services.corporate-websites.title",
    tagline: "services.corporate-websites.tagline",
    description: "services.corporate-websites.description",
    ctaBanner: {
      title: "services.corporate-websites.ctaBanner.title",
      text: "services.corporate-websites.ctaBanner.text",
      buttonLabel: "services.corporate-websites.ctaBanner.buttonLabel",
    },
    icon: "domain",
    features: [
      {
        title: "services.corporate-websites.features.0.title",
        text: "services.corporate-websites.features.0.text",
      },
      {
        title: "services.corporate-websites.features.1.title",
        text: "services.corporate-websites.features.1.text",
      },
      {
        title: "services.corporate-websites.features.2.title",
        text: "services.corporate-websites.features.2.text",
      },
      {
        title: "services.corporate-websites.features.3.title",
        text: "services.corporate-websites.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.corporate-websites.processSteps.0.title",
        text: "services.corporate-websites.processSteps.0.text",
      },
      {
        title: "services.corporate-websites.processSteps.1.title",
        text: "services.corporate-websites.processSteps.1.text",
      },
      {
        title: "services.corporate-websites.processSteps.2.title",
        text: "services.corporate-websites.processSteps.2.text",
      },
      {
        title: "services.corporate-websites.processSteps.3.title",
        text: "services.corporate-websites.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.corporate-websites.fitItems.0.title",
        text: "services.corporate-websites.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.corporate-websites.fitItems.1.title",
        text: "services.corporate-websites.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.corporate-websites.fitItems.2.title",
        text: "services.corporate-websites.fitItems.2.text",
        positive: false,
      },
      {
        title: "services.corporate-websites.fitItems.3.title",
        text: "services.corporate-websites.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.corporate-websites.proofItems.0.title",
        text: "services.corporate-websites.proofItems.0.text",
        metricValue: "services.corporate-websites.proofItems.0.metricValue",
        metricLabel: "services.corporate-websites.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.corporate-websites.faqItems.0.question",
        answer: "services.corporate-websites.faqItems.0.answer",
      },
      {
        question: "services.corporate-websites.faqItems.1.question",
        answer: "services.corporate-websites.faqItems.1.answer",
      },
      {
        question: "services.corporate-websites.faqItems.2.question",
        answer: "services.corporate-websites.faqItems.2.answer",
      },
      {
        question: "services.corporate-websites.faqItems.3.question",
        answer: "services.corporate-websites.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "services.corporate-websites.sections.0.title",
        items: [
          "services.corporate-websites.sections.0.items.0",
          "services.corporate-websites.sections.0.items.1",
          "services.corporate-websites.sections.0.items.2",
          "services.corporate-websites.sections.0.items.3",
          "services.corporate-websites.sections.0.items.4",
          "services.corporate-websites.sections.0.items.5",
        ],
      },
      {
        title: "services.corporate-websites.sections.1.title",
        items: [
          "services.corporate-websites.sections.1.items.0",
          "services.corporate-websites.sections.1.items.1",
          "services.corporate-websites.sections.1.items.2",
          "services.corporate-websites.sections.1.items.3",
          "services.corporate-websites.sections.1.items.4",
          "services.corporate-websites.sections.1.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.corporate-websites.software-development",
      },
      {
        type: "service",
        slug: "landing-pages",
        noteKey: "relevants.corporate-websites.landing-pages",
      },
    ],
  },
  {
    slug: "landing-pages",
    navTitle: "services.landing-pages.navTitle",
    title: "services.landing-pages.title",
    tagline: "services.landing-pages.tagline",
    description: "services.landing-pages.description",
    ctaBanner: {
      title: "services.landing-pages.ctaBanner.title",
      text: "services.landing-pages.ctaBanner.text",
      buttonLabel: "services.landing-pages.ctaBanner.buttonLabel",
    },
    icon: "rocket-launch",
    features: [
      {
        title: "services.landing-pages.features.0.title",
        text: "services.landing-pages.features.0.text",
      },
      {
        title: "services.landing-pages.features.1.title",
        text: "services.landing-pages.features.1.text",
      },
      {
        title: "services.landing-pages.features.2.title",
        text: "services.landing-pages.features.2.text",
      },
      {
        title: "services.landing-pages.features.3.title",
        text: "services.landing-pages.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.landing-pages.processSteps.0.title",
        text: "services.landing-pages.processSteps.0.text",
      },
      {
        title: "services.landing-pages.processSteps.1.title",
        text: "services.landing-pages.processSteps.1.text",
      },
      {
        title: "services.landing-pages.processSteps.2.title",
        text: "services.landing-pages.processSteps.2.text",
      },
      {
        title: "services.landing-pages.processSteps.3.title",
        text: "services.landing-pages.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.landing-pages.fitItems.0.title",
        text: "services.landing-pages.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.landing-pages.fitItems.1.title",
        text: "services.landing-pages.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.landing-pages.fitItems.2.title",
        text: "services.landing-pages.fitItems.2.text",
        positive: false,
      },
      {
        title: "services.landing-pages.fitItems.3.title",
        text: "services.landing-pages.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.landing-pages.proofItems.0.title",
        text: "services.landing-pages.proofItems.0.text",
        metricValue: "services.landing-pages.proofItems.0.metricValue",
        metricLabel: "services.landing-pages.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.landing-pages.faqItems.0.question",
        answer: "services.landing-pages.faqItems.0.answer",
      },
      {
        question: "services.landing-pages.faqItems.1.question",
        answer: "services.landing-pages.faqItems.1.answer",
      },
      {
        question: "services.landing-pages.faqItems.2.question",
        answer: "services.landing-pages.faqItems.2.answer",
      },
      {
        question: "services.landing-pages.faqItems.3.question",
        answer: "services.landing-pages.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "services.landing-pages.sections.0.title",
        items: [
          "services.landing-pages.sections.0.items.0",
          "services.landing-pages.sections.0.items.1",
          "services.landing-pages.sections.0.items.2",
          "services.landing-pages.sections.0.items.3",
          "services.landing-pages.sections.0.items.4",
          "services.landing-pages.sections.0.items.5",
        ],
      },
      {
        title: "services.landing-pages.sections.1.title",
        items: [
          "services.landing-pages.sections.1.items.0",
          "services.landing-pages.sections.1.items.1",
          "services.landing-pages.sections.1.items.2",
          "services.landing-pages.sections.1.items.3",
          "services.landing-pages.sections.1.items.4",
          "services.landing-pages.sections.1.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.landing-pages.software-development",
      },
      {
        type: "service",
        slug: "corporate-websites",
        noteKey: "relevants.landing-pages.corporate-websites",
      },
      {
        type: "service",
        slug: "seo-aeo",
        noteKey: "relevants.landing-pages.seo-aeo",
      },
    ],
  },
  {
    slug: "seo-aeo",
    navTitle: "services.seo-aeo.navTitle",
    title: "services.seo-aeo.title",
    tagline: "services.seo-aeo.tagline",
    description: "services.seo-aeo.description",
    ctaBanner: {
      title: "services.seo-aeo.ctaBanner.title",
      text: "services.seo-aeo.ctaBanner.text",
      buttonLabel: "services.seo-aeo.ctaBanner.buttonLabel",
    },
    icon: "insights",
    features: [
      {
        title: "services.seo-aeo.features.0.title",
        text: "services.seo-aeo.features.0.text",
      },
      {
        title: "services.seo-aeo.features.1.title",
        text: "services.seo-aeo.features.1.text",
      },
      {
        title: "services.seo-aeo.features.2.title",
        text: "services.seo-aeo.features.2.text",
      },
      {
        title: "services.seo-aeo.features.3.title",
        text: "services.seo-aeo.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.seo-aeo.processSteps.0.title",
        text: "services.seo-aeo.processSteps.0.text",
      },
      {
        title: "services.seo-aeo.processSteps.1.title",
        text: "services.seo-aeo.processSteps.1.text",
      },
      {
        title: "services.seo-aeo.processSteps.2.title",
        text: "services.seo-aeo.processSteps.2.text",
      },
      {
        title: "services.seo-aeo.processSteps.3.title",
        text: "services.seo-aeo.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.seo-aeo.fitItems.0.title",
        text: "services.seo-aeo.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.seo-aeo.fitItems.1.title",
        text: "services.seo-aeo.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.seo-aeo.fitItems.2.title",
        text: "services.seo-aeo.fitItems.2.text",
        positive: false,
      },
      {
        title: "services.seo-aeo.fitItems.3.title",
        text: "services.seo-aeo.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.seo-aeo.proofItems.0.title",
        text: "services.seo-aeo.proofItems.0.text",
        metricValue: "services.seo-aeo.proofItems.0.metricValue",
        metricLabel: "services.seo-aeo.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.seo-aeo.faqItems.0.question",
        answer: "services.seo-aeo.faqItems.0.answer",
      },
      {
        question: "services.seo-aeo.faqItems.1.question",
        answer: "services.seo-aeo.faqItems.1.answer",
      },
      {
        question: "services.seo-aeo.faqItems.2.question",
        answer: "services.seo-aeo.faqItems.2.answer",
      },
      {
        question: "services.seo-aeo.faqItems.3.question",
        answer: "services.seo-aeo.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "services.seo-aeo.sections.0.title",
        items: [
          "services.seo-aeo.sections.0.items.0",
          "services.seo-aeo.sections.0.items.1",
          "services.seo-aeo.sections.0.items.2",
          "services.seo-aeo.sections.0.items.3",
          "services.seo-aeo.sections.0.items.4",
          "services.seo-aeo.sections.0.items.5",
        ],
      },
      {
        title: "services.seo-aeo.sections.1.title",
        items: [
          "services.seo-aeo.sections.1.items.0",
          "services.seo-aeo.sections.1.items.1",
          "services.seo-aeo.sections.1.items.2",
          "services.seo-aeo.sections.1.items.3",
          "services.seo-aeo.sections.1.items.4",
          "services.seo-aeo.sections.1.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "service",
        slug: "landing-pages",
        noteKey: "relevants.seo-aeo.landing-pages",
      },
    ],
  },
  {
    slug: "information-monitoring",
    navTitle: "services.information-monitoring.navTitle",
    title: "services.information-monitoring.title",
    tagline: "services.information-monitoring.tagline",
    description: "services.information-monitoring.description",
    ctaBanner: {
      title: "services.information-monitoring.ctaBanner.title",
      text: "services.information-monitoring.ctaBanner.text",
      buttonLabel: "services.information-monitoring.ctaBanner.buttonLabel",
    },
    icon: "travel-explore",
    features: [
      {
        title: "services.information-monitoring.features.0.title",
        text: "services.information-monitoring.features.0.text",
      },
      {
        title: "services.information-monitoring.features.1.title",
        text: "services.information-monitoring.features.1.text",
      },
      {
        title: "services.information-monitoring.features.2.title",
        text: "services.information-monitoring.features.2.text",
      },
      {
        title: "services.information-monitoring.features.3.title",
        text: "services.information-monitoring.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.information-monitoring.processSteps.0.title",
        text: "services.information-monitoring.processSteps.0.text",
      },
      {
        title: "services.information-monitoring.processSteps.1.title",
        text: "services.information-monitoring.processSteps.1.text",
      },
      {
        title: "services.information-monitoring.processSteps.2.title",
        text: "services.information-monitoring.processSteps.2.text",
      },
      {
        title: "services.information-monitoring.processSteps.3.title",
        text: "services.information-monitoring.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.information-monitoring.fitItems.0.title",
        text: "services.information-monitoring.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.information-monitoring.fitItems.1.title",
        text: "services.information-monitoring.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.information-monitoring.fitItems.2.title",
        text: "services.information-monitoring.fitItems.2.text",
        positive: false,
      },
      {
        title: "services.information-monitoring.fitItems.3.title",
        text: "services.information-monitoring.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.information-monitoring.proofItems.0.title",
        text: "services.information-monitoring.proofItems.0.text",
        metricValue: "services.information-monitoring.proofItems.0.metricValue",
        metricLabel: "services.information-monitoring.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.information-monitoring.faqItems.0.question",
        answer: "services.information-monitoring.faqItems.0.answer",
      },
      {
        question: "services.information-monitoring.faqItems.1.question",
        answer: "services.information-monitoring.faqItems.1.answer",
      },
      {
        question: "services.information-monitoring.faqItems.2.question",
        answer: "services.information-monitoring.faqItems.2.answer",
      },
      {
        question: "services.information-monitoring.faqItems.3.question",
        answer: "services.information-monitoring.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "services.information-monitoring.sections.0.title",
        items: [
          "services.information-monitoring.sections.0.items.0",
          "services.information-monitoring.sections.0.items.1",
          "services.information-monitoring.sections.0.items.2",
          "services.information-monitoring.sections.0.items.3",
          "services.information-monitoring.sections.0.items.4",
          "services.information-monitoring.sections.0.items.5",
        ],
      },
      {
        title: "services.information-monitoring.sections.1.title",
        items: [
          "services.information-monitoring.sections.1.items.0",
          "services.information-monitoring.sections.1.items.1",
          "services.information-monitoring.sections.1.items.2",
          "services.information-monitoring.sections.1.items.3",
          "services.information-monitoring.sections.1.items.4",
          "services.information-monitoring.sections.1.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "case",
        slug: "reputation-monitoring-platform",
        noteKey: "relevants.information-monitoring.reputation-monitoring-platform",
      },
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.information-monitoring.reputation-management",
      },
      {
        type: "case",
        slug: "marketplace-reputation",
        noteKey: "relevants.information-monitoring.marketplace-reputation",
      },
    ],
  },
  {
    slug: "corporate-ai-training",
    navTitle: "services.corporate-ai-training.navTitle",
    title: "services.corporate-ai-training.title",
    tagline: "services.corporate-ai-training.tagline",
    description: "services.corporate-ai-training.description",
    ctaBanner: {
      title: "services.corporate-ai-training.ctaBanner.title",
      text: "services.corporate-ai-training.ctaBanner.text",
      buttonLabel: "services.corporate-ai-training.ctaBanner.buttonLabel",
    },
    icon: "school",
    features: [
      {
        title: "services.corporate-ai-training.features.0.title",
        text: "services.corporate-ai-training.features.0.text",
      },
      {
        title: "services.corporate-ai-training.features.1.title",
        text: "services.corporate-ai-training.features.1.text",
      },
      {
        title: "services.corporate-ai-training.features.2.title",
        text: "services.corporate-ai-training.features.2.text",
      },
      {
        title: "services.corporate-ai-training.features.3.title",
        text: "services.corporate-ai-training.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "services.corporate-ai-training.processSteps.0.title",
        text: "services.corporate-ai-training.processSteps.0.text",
      },
      {
        title: "services.corporate-ai-training.processSteps.1.title",
        text: "services.corporate-ai-training.processSteps.1.text",
      },
      {
        title: "services.corporate-ai-training.processSteps.2.title",
        text: "services.corporate-ai-training.processSteps.2.text",
      },
      {
        title: "services.corporate-ai-training.processSteps.3.title",
        text: "services.corporate-ai-training.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "services.corporate-ai-training.fitItems.0.title",
        text: "services.corporate-ai-training.fitItems.0.text",
        positive: true,
      },
      {
        title: "services.corporate-ai-training.fitItems.1.title",
        text: "services.corporate-ai-training.fitItems.1.text",
        positive: true,
      },
      {
        title: "services.corporate-ai-training.fitItems.2.title",
        text: "services.corporate-ai-training.fitItems.2.text",
        positive: false,
      },
      {
        title: "services.corporate-ai-training.fitItems.3.title",
        text: "services.corporate-ai-training.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "services.corporate-ai-training.proofItems.0.title",
        text: "services.corporate-ai-training.proofItems.0.text",
        metricValue: "services.corporate-ai-training.proofItems.0.metricValue",
        metricLabel: "services.corporate-ai-training.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "services.corporate-ai-training.faqItems.0.question",
        answer: "services.corporate-ai-training.faqItems.0.answer",
      },
      {
        question: "services.corporate-ai-training.faqItems.1.question",
        answer: "services.corporate-ai-training.faqItems.1.answer",
      },
      {
        question: "services.corporate-ai-training.faqItems.2.question",
        answer: "services.corporate-ai-training.faqItems.2.answer",
      },
      {
        question: "services.corporate-ai-training.faqItems.3.question",
        answer: "services.corporate-ai-training.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "services.corporate-ai-training.sections.0.title",
        items: [
          "services.corporate-ai-training.sections.0.items.0",
          "services.corporate-ai-training.sections.0.items.1",
          "services.corporate-ai-training.sections.0.items.2",
          "services.corporate-ai-training.sections.0.items.3",
          "services.corporate-ai-training.sections.0.items.4",
          "services.corporate-ai-training.sections.0.items.5",
        ],
      },
      {
        title: "services.corporate-ai-training.sections.1.title",
        items: [
          "services.corporate-ai-training.sections.1.items.0",
          "services.corporate-ai-training.sections.1.items.1",
          "services.corporate-ai-training.sections.1.items.2",
          "services.corporate-ai-training.sections.1.items.3",
          "services.corporate-ai-training.sections.1.items.4",
          "services.corporate-ai-training.sections.1.items.5",
        ],
      },
    ],
  },
];
