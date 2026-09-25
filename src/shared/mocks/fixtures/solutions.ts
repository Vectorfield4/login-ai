import type { Solution } from "@/entities/solution/model/solutions";

/**
 * Дефолтные данные решений («ответ бэкенда», которого пока нет).
 * Store инициализируется ими синхронно; получатель пробрасывает их as-is.
 */
export const solutionFixtures: Solution[] = [
  {
    slug: "agentic-systems",
    navTitle: "solutions.agentic-systems.navTitle",
    title: "solutions.agentic-systems.title",
    tagline: "solutions.agentic-systems.tagline",
    description: "solutions.agentic-systems.description",
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
      },
      {
        title: "solutions.agentic-systems.processSteps.1.title",
        text: "solutions.agentic-systems.processSteps.1.text",
      },
      {
        title: "solutions.agentic-systems.processSteps.2.title",
        text: "solutions.agentic-systems.processSteps.2.text",
      },
      {
        title: "solutions.agentic-systems.processSteps.3.title",
        text: "solutions.agentic-systems.processSteps.3.text",
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
  },
  {
    slug: "computer-vision",
    navTitle: "solutions.computer-vision.navTitle",
    title: "solutions.computer-vision.title",
    tagline: "solutions.computer-vision.tagline",
    description: "solutions.computer-vision.description",
    ctaBanner: {
      title: "solutions.computer-vision.ctaBanner.title",
      text: "solutions.computer-vision.ctaBanner.text",
      buttonLabel: "solutions.computer-vision.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.computerVision"],
    features: [
      {
        title: "solutions.computer-vision.features.0.title",
        text: "solutions.computer-vision.features.0.text",
      },
      {
        title: "solutions.computer-vision.features.1.title",
        text: "solutions.computer-vision.features.1.text",
      },
      {
        title: "solutions.computer-vision.features.2.title",
        text: "solutions.computer-vision.features.2.text",
      },
      {
        title: "solutions.computer-vision.features.3.title",
        text: "solutions.computer-vision.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.computer-vision.processSteps.0.title",
        text: "solutions.computer-vision.processSteps.0.text",
      },
      {
        title: "solutions.computer-vision.processSteps.1.title",
        text: "solutions.computer-vision.processSteps.1.text",
      },
      {
        title: "solutions.computer-vision.processSteps.2.title",
        text: "solutions.computer-vision.processSteps.2.text",
      },
      {
        title: "solutions.computer-vision.processSteps.3.title",
        text: "solutions.computer-vision.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.computer-vision.fitItems.0.title",
        text: "solutions.computer-vision.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.computer-vision.fitItems.1.title",
        text: "solutions.computer-vision.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.computer-vision.fitItems.2.title",
        text: "solutions.computer-vision.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.computer-vision.fitItems.3.title",
        text: "solutions.computer-vision.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.computer-vision.proofItems.0.title",
        text: "solutions.computer-vision.proofItems.0.text",
        metricValue: "solutions.computer-vision.proofItems.0.metricValue",
        metricLabel: "solutions.computer-vision.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.computer-vision.faqItems.0.question",
        answer: "solutions.computer-vision.faqItems.0.answer",
      },
      {
        question: "solutions.computer-vision.faqItems.1.question",
        answer: "solutions.computer-vision.faqItems.1.answer",
      },
      {
        question: "solutions.computer-vision.faqItems.2.question",
        answer: "solutions.computer-vision.faqItems.2.answer",
      },
      {
        question: "solutions.computer-vision.faqItems.3.question",
        answer: "solutions.computer-vision.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.computer-vision.sections.0.title",
        items: [
          "solutions.computer-vision.sections.0.items.0",
          "solutions.computer-vision.sections.0.items.1",
          "solutions.computer-vision.sections.0.items.2",
          "solutions.computer-vision.sections.0.items.3",
          "solutions.computer-vision.sections.0.items.4",
          "solutions.computer-vision.sections.0.items.5",
        ],
      },
      {
        title: "solutions.computer-vision.sections.1.title",
        items: [
          "solutions.computer-vision.sections.1.items.0",
          "solutions.computer-vision.sections.1.items.1",
          "solutions.computer-vision.sections.1.items.2",
          "solutions.computer-vision.sections.1.items.3",
          "solutions.computer-vision.sections.1.items.4",
          "solutions.computer-vision.sections.1.items.5",
        ],
      },
      {
        title: "solutions.computer-vision.sections.2.title",
        items: [
          "solutions.computer-vision.sections.2.items.0",
          "solutions.computer-vision.sections.2.items.1",
          "solutions.computer-vision.sections.2.items.2",
          "solutions.computer-vision.sections.2.items.3",
          "solutions.computer-vision.sections.2.items.4",
          "solutions.computer-vision.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "manufacturers",
        noteKey: "relevants.computer-vision.manufacturers",
      },
      {
        type: "solution",
        slug: "medical-clinics",
        noteKey: "relevants.computer-vision.medical-clinics",
      },
      {
        type: "case",
        slug: "quality-vision-line",
        noteKey: "relevants.computer-vision.quality-vision-line",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.computer-vision.software-development",
      },
    ],
  },
  {
    slug: "customer-experience",
    navTitle: "solutions.customer-experience.navTitle",
    title: "solutions.customer-experience.title",
    tagline: "solutions.customer-experience.tagline",
    description: "solutions.customer-experience.description",
    ctaBanner: {
      title: "solutions.customer-experience.ctaBanner.title",
      text: "solutions.customer-experience.ctaBanner.text",
      buttonLabel: "solutions.customer-experience.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.clinics", "audiences.businessOwners"],
    tags: ["technologies.llm"],
    features: [
      {
        title: "solutions.customer-experience.features.0.title",
        text: "solutions.customer-experience.features.0.text",
      },
      {
        title: "solutions.customer-experience.features.1.title",
        text: "solutions.customer-experience.features.1.text",
      },
      {
        title: "solutions.customer-experience.features.2.title",
        text: "solutions.customer-experience.features.2.text",
      },
      {
        title: "solutions.customer-experience.features.3.title",
        text: "solutions.customer-experience.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.customer-experience.processSteps.0.title",
        text: "solutions.customer-experience.processSteps.0.text",
      },
      {
        title: "solutions.customer-experience.processSteps.1.title",
        text: "solutions.customer-experience.processSteps.1.text",
      },
      {
        title: "solutions.customer-experience.processSteps.2.title",
        text: "solutions.customer-experience.processSteps.2.text",
      },
      {
        title: "solutions.customer-experience.processSteps.3.title",
        text: "solutions.customer-experience.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.customer-experience.fitItems.0.title",
        text: "solutions.customer-experience.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.customer-experience.fitItems.1.title",
        text: "solutions.customer-experience.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.customer-experience.fitItems.2.title",
        text: "solutions.customer-experience.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.customer-experience.fitItems.3.title",
        text: "solutions.customer-experience.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.customer-experience.proofItems.0.title",
        text: "solutions.customer-experience.proofItems.0.text",
        metricValue: "solutions.customer-experience.proofItems.0.metricValue",
        metricLabel: "solutions.customer-experience.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.customer-experience.faqItems.0.question",
        answer: "solutions.customer-experience.faqItems.0.answer",
      },
      {
        question: "solutions.customer-experience.faqItems.1.question",
        answer: "solutions.customer-experience.faqItems.1.answer",
      },
      {
        question: "solutions.customer-experience.faqItems.2.question",
        answer: "solutions.customer-experience.faqItems.2.answer",
      },
      {
        question: "solutions.customer-experience.faqItems.3.question",
        answer: "solutions.customer-experience.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.customer-experience.sections.0.title",
        items: [
          "solutions.customer-experience.sections.0.items.0",
          "solutions.customer-experience.sections.0.items.1",
          "solutions.customer-experience.sections.0.items.2",
          "solutions.customer-experience.sections.0.items.3",
          "solutions.customer-experience.sections.0.items.4",
          "solutions.customer-experience.sections.0.items.5",
        ],
      },
      {
        title: "solutions.customer-experience.sections.1.title",
        items: [
          "solutions.customer-experience.sections.1.items.0",
          "solutions.customer-experience.sections.1.items.1",
          "solutions.customer-experience.sections.1.items.2",
          "solutions.customer-experience.sections.1.items.3",
          "solutions.customer-experience.sections.1.items.4",
          "solutions.customer-experience.sections.1.items.5",
        ],
      },
      {
        title: "solutions.customer-experience.sections.2.title",
        items: [
          "solutions.customer-experience.sections.2.items.0",
          "solutions.customer-experience.sections.2.items.1",
          "solutions.customer-experience.sections.2.items.2",
          "solutions.customer-experience.sections.2.items.3",
          "solutions.customer-experience.sections.2.items.4",
          "solutions.customer-experience.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "agentic-systems",
        noteKey: "relevants.customer-experience.agentic-systems",
      },
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.customer-experience.reputation-management",
      },
      {
        type: "case",
        slug: "retail-support-bot",
        noteKey: "relevants.customer-experience.retail-support-bot",
      },
    ],
  },
  {
    slug: "content-generation",
    navTitle: "solutions.content-generation.navTitle",
    title: "solutions.content-generation.title",
    tagline: "solutions.content-generation.tagline",
    description: "solutions.content-generation.description",
    ctaBanner: {
      title: "solutions.content-generation.ctaBanner.title",
      text: "solutions.content-generation.ctaBanner.text",
      buttonLabel: "solutions.content-generation.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.clinics", "audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.content"],
    features: [
      {
        title: "solutions.content-generation.features.0.title",
        text: "solutions.content-generation.features.0.text",
      },
      {
        title: "solutions.content-generation.features.1.title",
        text: "solutions.content-generation.features.1.text",
      },
      {
        title: "solutions.content-generation.features.2.title",
        text: "solutions.content-generation.features.2.text",
      },
      {
        title: "solutions.content-generation.features.3.title",
        text: "solutions.content-generation.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.content-generation.processSteps.0.title",
        text: "solutions.content-generation.processSteps.0.text",
      },
      {
        title: "solutions.content-generation.processSteps.1.title",
        text: "solutions.content-generation.processSteps.1.text",
      },
      {
        title: "solutions.content-generation.processSteps.2.title",
        text: "solutions.content-generation.processSteps.2.text",
      },
      {
        title: "solutions.content-generation.processSteps.3.title",
        text: "solutions.content-generation.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.content-generation.fitItems.0.title",
        text: "solutions.content-generation.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.content-generation.fitItems.1.title",
        text: "solutions.content-generation.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.content-generation.fitItems.2.title",
        text: "solutions.content-generation.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.content-generation.fitItems.3.title",
        text: "solutions.content-generation.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.content-generation.proofItems.0.title",
        text: "solutions.content-generation.proofItems.0.text",
        metricValue: "solutions.content-generation.proofItems.0.metricValue",
        metricLabel: "solutions.content-generation.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.content-generation.faqItems.0.question",
        answer: "solutions.content-generation.faqItems.0.answer",
      },
      {
        question: "solutions.content-generation.faqItems.1.question",
        answer: "solutions.content-generation.faqItems.1.answer",
      },
      {
        question: "solutions.content-generation.faqItems.2.question",
        answer: "solutions.content-generation.faqItems.2.answer",
      },
      {
        question: "solutions.content-generation.faqItems.3.question",
        answer: "solutions.content-generation.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.content-generation.sections.0.title",
        items: [
          "solutions.content-generation.sections.0.items.0",
          "solutions.content-generation.sections.0.items.1",
          "solutions.content-generation.sections.0.items.2",
          "solutions.content-generation.sections.0.items.3",
          "solutions.content-generation.sections.0.items.4",
          "solutions.content-generation.sections.0.items.5",
        ],
      },
      {
        title: "solutions.content-generation.sections.1.title",
        items: [
          "solutions.content-generation.sections.1.items.0",
          "solutions.content-generation.sections.1.items.1",
          "solutions.content-generation.sections.1.items.2",
          "solutions.content-generation.sections.1.items.3",
          "solutions.content-generation.sections.1.items.4",
          "solutions.content-generation.sections.1.items.5",
        ],
      },
      {
        title: "solutions.content-generation.sections.2.title",
        items: [
          "solutions.content-generation.sections.2.items.0",
          "solutions.content-generation.sections.2.items.1",
          "solutions.content-generation.sections.2.items.2",
          "solutions.content-generation.sections.2.items.3",
          "solutions.content-generation.sections.2.items.4",
          "solutions.content-generation.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "video-generation",
        noteKey: "relevants.content-generation.video-generation",
      },
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.content-generation.reputation-management",
      },
      {
        type: "case",
        slug: "agency-content-pipeline",
        noteKey: "relevants.content-generation.agency-content-pipeline",
      },
    ],
  },
  {
    slug: "app-development-systems",
    navTitle: "solutions.app-development-systems.navTitle",
    title: "solutions.app-development-systems.title",
    tagline: "solutions.app-development-systems.tagline",
    description: "solutions.app-development-systems.description",
    ctaBanner: {
      title: "solutions.app-development-systems.ctaBanner.title",
      text: "solutions.app-development-systems.ctaBanner.text",
      buttonLabel: "solutions.app-development-systems.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.businessOwners"],
    tags: ["technologies.agentic"],
    features: [
      {
        title: "solutions.app-development-systems.features.0.title",
        text: "solutions.app-development-systems.features.0.text",
      },
      {
        title: "solutions.app-development-systems.features.1.title",
        text: "solutions.app-development-systems.features.1.text",
      },
      {
        title: "solutions.app-development-systems.features.2.title",
        text: "solutions.app-development-systems.features.2.text",
      },
      {
        title: "solutions.app-development-systems.features.3.title",
        text: "solutions.app-development-systems.features.3.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.app-development-systems.processSteps.0.title",
        text: "solutions.app-development-systems.processSteps.0.text",
      },
      {
        title: "solutions.app-development-systems.processSteps.1.title",
        text: "solutions.app-development-systems.processSteps.1.text",
      },
      {
        title: "solutions.app-development-systems.processSteps.2.title",
        text: "solutions.app-development-systems.processSteps.2.text",
      },
      {
        title: "solutions.app-development-systems.processSteps.3.title",
        text: "solutions.app-development-systems.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.app-development-systems.fitItems.0.title",
        text: "solutions.app-development-systems.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.app-development-systems.fitItems.1.title",
        text: "solutions.app-development-systems.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.app-development-systems.fitItems.2.title",
        text: "solutions.app-development-systems.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.app-development-systems.fitItems.3.title",
        text: "solutions.app-development-systems.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.app-development-systems.proofItems.0.title",
        text: "solutions.app-development-systems.proofItems.0.text",
        metricValue: "solutions.app-development-systems.proofItems.0.metricValue",
        metricLabel: "solutions.app-development-systems.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.app-development-systems.faqItems.0.question",
        answer: "solutions.app-development-systems.faqItems.0.answer",
      },
      {
        question: "solutions.app-development-systems.faqItems.1.question",
        answer: "solutions.app-development-systems.faqItems.1.answer",
      },
      {
        question: "solutions.app-development-systems.faqItems.2.question",
        answer: "solutions.app-development-systems.faqItems.2.answer",
      },
      {
        question: "solutions.app-development-systems.faqItems.3.question",
        answer: "solutions.app-development-systems.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.app-development-systems.sections.0.title",
        items: [
          "solutions.app-development-systems.sections.0.items.0",
          "solutions.app-development-systems.sections.0.items.1",
          "solutions.app-development-systems.sections.0.items.2",
          "solutions.app-development-systems.sections.0.items.3",
          "solutions.app-development-systems.sections.0.items.4",
          "solutions.app-development-systems.sections.0.items.5",
        ],
      },
      {
        title: "solutions.app-development-systems.sections.1.title",
        items: [
          "solutions.app-development-systems.sections.1.items.0",
          "solutions.app-development-systems.sections.1.items.1",
          "solutions.app-development-systems.sections.1.items.2",
          "solutions.app-development-systems.sections.1.items.3",
          "solutions.app-development-systems.sections.1.items.4",
          "solutions.app-development-systems.sections.1.items.5",
        ],
      },
      {
        title: "solutions.app-development-systems.sections.2.title",
        items: [
          "solutions.app-development-systems.sections.2.items.0",
          "solutions.app-development-systems.sections.2.items.1",
          "solutions.app-development-systems.sections.2.items.2",
          "solutions.app-development-systems.sections.2.items.3",
          "solutions.app-development-systems.sections.2.items.4",
          "solutions.app-development-systems.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "agentic-systems",
        noteKey: "relevants.app-development-systems.agentic-systems",
      },
    ],
  },
  {
    slug: "medical-clinics",
    navTitle: "solutions.medical-clinics.navTitle",
    title: "solutions.medical-clinics.title",
    tagline: "solutions.medical-clinics.tagline",
    description: "solutions.medical-clinics.description",
    ctaBanner: {
      title: "solutions.medical-clinics.ctaBanner.title",
      text: "solutions.medical-clinics.ctaBanner.text",
      buttonLabel: "solutions.medical-clinics.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.clinics"],
    tags: ["technologies.llm", "technologies.computerVision"],
    features: [
      {
        title: "solutions.medical-clinics.features.0.title",
        text: "solutions.medical-clinics.features.0.text",
      },
      {
        title: "solutions.medical-clinics.features.1.title",
        text: "solutions.medical-clinics.features.1.text",
      },
      {
        title: "solutions.medical-clinics.features.2.title",
        text: "solutions.medical-clinics.features.2.text",
      },
      {
        title: "solutions.medical-clinics.features.3.title",
        text: "solutions.medical-clinics.features.3.text",
      },
      {
        title: "solutions.medical-clinics.features.4.title",
        text: "solutions.medical-clinics.features.4.text",
      },
      {
        title: "solutions.medical-clinics.features.5.title",
        text: "solutions.medical-clinics.features.5.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.medical-clinics.processSteps.0.title",
        text: "solutions.medical-clinics.processSteps.0.text",
      },
      {
        title: "solutions.medical-clinics.processSteps.1.title",
        text: "solutions.medical-clinics.processSteps.1.text",
      },
      {
        title: "solutions.medical-clinics.processSteps.2.title",
        text: "solutions.medical-clinics.processSteps.2.text",
      },
      {
        title: "solutions.medical-clinics.processSteps.3.title",
        text: "solutions.medical-clinics.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.medical-clinics.fitItems.0.title",
        text: "solutions.medical-clinics.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.medical-clinics.fitItems.1.title",
        text: "solutions.medical-clinics.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.medical-clinics.fitItems.2.title",
        text: "solutions.medical-clinics.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.medical-clinics.fitItems.3.title",
        text: "solutions.medical-clinics.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.medical-clinics.proofItems.0.title",
        text: "solutions.medical-clinics.proofItems.0.text",
        metricValue: "solutions.medical-clinics.proofItems.0.metricValue",
        metricLabel: "solutions.medical-clinics.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.medical-clinics.faqItems.0.question",
        answer: "solutions.medical-clinics.faqItems.0.answer",
      },
      {
        question: "solutions.medical-clinics.faqItems.1.question",
        answer: "solutions.medical-clinics.faqItems.1.answer",
      },
      {
        question: "solutions.medical-clinics.faqItems.2.question",
        answer: "solutions.medical-clinics.faqItems.2.answer",
      },
      {
        question: "solutions.medical-clinics.faqItems.3.question",
        answer: "solutions.medical-clinics.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.medical-clinics.sections.0.title",
        items: [
          "solutions.medical-clinics.sections.0.items.0",
          "solutions.medical-clinics.sections.0.items.1",
          "solutions.medical-clinics.sections.0.items.2",
          "solutions.medical-clinics.sections.0.items.3",
          "solutions.medical-clinics.sections.0.items.4",
          "solutions.medical-clinics.sections.0.items.5",
        ],
      },
      {
        title: "solutions.medical-clinics.sections.1.title",
        items: [
          "solutions.medical-clinics.sections.1.items.0",
          "solutions.medical-clinics.sections.1.items.1",
          "solutions.medical-clinics.sections.1.items.2",
          "solutions.medical-clinics.sections.1.items.3",
          "solutions.medical-clinics.sections.1.items.4",
          "solutions.medical-clinics.sections.1.items.5",
        ],
      },
      {
        title: "solutions.medical-clinics.sections.2.title",
        items: [
          "solutions.medical-clinics.sections.2.items.0",
          "solutions.medical-clinics.sections.2.items.1",
          "solutions.medical-clinics.sections.2.items.2",
          "solutions.medical-clinics.sections.2.items.3",
          "solutions.medical-clinics.sections.2.items.4",
          "solutions.medical-clinics.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "computer-vision",
        noteKey: "relevants.medical-clinics.computer-vision",
      },
      {
        type: "solution",
        slug: "customer-experience",
        noteKey: "relevants.medical-clinics.customer-experience",
      },
      {
        type: "case",
        slug: "clinic-ai-assistant",
        noteKey: "relevants.medical-clinics.clinic-ai-assistant",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.medical-clinics.software-development",
      },
    ],
  },
  {
    slug: "video-generation",
    navTitle: "solutions.video-generation.navTitle",
    title: "solutions.video-generation.title",
    tagline: "solutions.video-generation.tagline",
    description: "solutions.video-generation.description",
    ctaBanner: {
      title: "solutions.video-generation.ctaBanner.title",
      text: "solutions.video-generation.ctaBanner.text",
      buttonLabel: "solutions.video-generation.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.video"],
    sections: [
      {
        title: "solutions.video-generation.sections.0.title",
        items: [
          "solutions.video-generation.sections.0.items.0",
          "solutions.video-generation.sections.0.items.1",
          "solutions.video-generation.sections.0.items.2",
          "solutions.video-generation.sections.0.items.3",
          "solutions.video-generation.sections.0.items.4",
          "solutions.video-generation.sections.0.items.5",
        ],
      },
      {
        title: "solutions.video-generation.sections.1.title",
        items: [
          "solutions.video-generation.sections.1.items.0",
          "solutions.video-generation.sections.1.items.1",
          "solutions.video-generation.sections.1.items.2",
          "solutions.video-generation.sections.1.items.3",
        ],
      },
      {
        title: "solutions.video-generation.sections.2.title",
        items: [
          "solutions.video-generation.sections.2.items.0",
          "solutions.video-generation.sections.2.items.1",
          "solutions.video-generation.sections.2.items.2",
          "solutions.video-generation.sections.2.items.3",
          "solutions.video-generation.sections.2.items.4",
        ],
      },
      {
        title: "solutions.video-generation.sections.3.title",
        items: [
          "solutions.video-generation.sections.3.items.0",
          "solutions.video-generation.sections.3.items.1",
          "solutions.video-generation.sections.3.items.2",
          "solutions.video-generation.sections.3.items.3",
        ],
      },
      {
        title: "solutions.video-generation.sections.4.title",
        items: [
          "solutions.video-generation.sections.4.items.0",
          "solutions.video-generation.sections.4.items.1",
          "solutions.video-generation.sections.4.items.2",
          "solutions.video-generation.sections.4.items.3",
          "solutions.video-generation.sections.4.items.4",
          "solutions.video-generation.sections.4.items.5",
          "solutions.video-generation.sections.4.items.6",
          "solutions.video-generation.sections.4.items.7",
        ],
      },
    ],
    technologies: [
      {
        title: "solutions.video-generation.technologies.0.title",
        text: "solutions.video-generation.technologies.0.text",
      },
      {
        title: "solutions.video-generation.technologies.1.title",
        text: "solutions.video-generation.technologies.1.text",
      },
      {
        title: "solutions.video-generation.technologies.2.title",
        text: "solutions.video-generation.technologies.2.text",
      },
    ],
    referencesNote: "solutions.video-generation.referencesNote",
    businessCategories: [
      {
        title: "solutions.video-generation.businessCategories.0.title",
        text: "solutions.video-generation.businessCategories.0.text",
      },
      {
        title: "solutions.video-generation.businessCategories.1.title",
        text: "solutions.video-generation.businessCategories.1.text",
      },
      {
        title: "solutions.video-generation.businessCategories.2.title",
        text: "solutions.video-generation.businessCategories.2.text",
      },
      {
        title: "solutions.video-generation.businessCategories.3.title",
        text: "solutions.video-generation.businessCategories.3.text",
      },
      {
        title: "solutions.video-generation.businessCategories.4.title",
        text: "solutions.video-generation.businessCategories.4.text",
      },
      {
        title: "solutions.video-generation.businessCategories.5.title",
        text: "solutions.video-generation.businessCategories.5.text",
      },
    ],
    showcase: {
      title: "solutions.video-generation.showcase.title",
      note: "solutions.video-generation.showcase.note",
      items: [
        { title: "solutions.video-generation.showcase.items.0.title" },
        { title: "solutions.video-generation.showcase.items.1.title" },
        { title: "solutions.video-generation.showcase.items.2.title" },
        { title: "solutions.video-generation.showcase.items.3.title" },
        { title: "solutions.video-generation.showcase.items.4.title" },
        { title: "solutions.video-generation.showcase.items.5.title" },
      ],
    },
    processSteps: [
      {
        title: "solutions.video-generation.processSteps.0.title",
        text: "solutions.video-generation.processSteps.0.text",
      },
      {
        title: "solutions.video-generation.processSteps.1.title",
        text: "solutions.video-generation.processSteps.1.text",
      },
      {
        title: "solutions.video-generation.processSteps.2.title",
        text: "solutions.video-generation.processSteps.2.text",
      },
      {
        title: "solutions.video-generation.processSteps.3.title",
        text: "solutions.video-generation.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.video-generation.fitItems.0.title",
        text: "solutions.video-generation.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.video-generation.fitItems.1.title",
        text: "solutions.video-generation.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.video-generation.fitItems.2.title",
        text: "solutions.video-generation.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.video-generation.fitItems.3.title",
        text: "solutions.video-generation.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.video-generation.proofItems.0.title",
        text: "solutions.video-generation.proofItems.0.text",
        metricValue: "solutions.video-generation.proofItems.0.metricValue",
        metricLabel: "solutions.video-generation.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.video-generation.faqItems.0.question",
        answer: "solutions.video-generation.faqItems.0.answer",
      },
      {
        question: "solutions.video-generation.faqItems.1.question",
        answer: "solutions.video-generation.faqItems.1.answer",
      },
      {
        question: "solutions.video-generation.faqItems.2.question",
        answer: "solutions.video-generation.faqItems.2.answer",
      },
      {
        question: "solutions.video-generation.faqItems.3.question",
        answer: "solutions.video-generation.faqItems.3.answer",
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "content-generation",
        noteKey: "relevants.video-generation.content-generation",
      },
      {
        type: "case",
        slug: "product-launch-video",
        noteKey: "relevants.video-generation.product-launch-video",
      },
    ],
  },
  {
    slug: "manufacturers",
    navTitle: "solutions.manufacturers.navTitle",
    title: "solutions.manufacturers.title",
    tagline: "solutions.manufacturers.tagline",
    description: "solutions.manufacturers.description",
    ctaBanner: {
      title: "solutions.manufacturers.ctaBanner.title",
      text: "solutions.manufacturers.ctaBanner.text",
      buttonLabel: "solutions.manufacturers.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.manufacturers"],
    tags: ["technologies.computerVision", "technologies.agentic"],
    features: [
      {
        title: "solutions.manufacturers.features.0.title",
        text: "solutions.manufacturers.features.0.text",
      },
      {
        title: "solutions.manufacturers.features.1.title",
        text: "solutions.manufacturers.features.1.text",
      },
      {
        title: "solutions.manufacturers.features.2.title",
        text: "solutions.manufacturers.features.2.text",
      },
      {
        title: "solutions.manufacturers.features.3.title",
        text: "solutions.manufacturers.features.3.text",
      },
      {
        title: "solutions.manufacturers.features.4.title",
        text: "solutions.manufacturers.features.4.text",
      },
      {
        title: "solutions.manufacturers.features.5.title",
        text: "solutions.manufacturers.features.5.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.manufacturers.processSteps.0.title",
        text: "solutions.manufacturers.processSteps.0.text",
      },
      {
        title: "solutions.manufacturers.processSteps.1.title",
        text: "solutions.manufacturers.processSteps.1.text",
      },
      {
        title: "solutions.manufacturers.processSteps.2.title",
        text: "solutions.manufacturers.processSteps.2.text",
      },
      {
        title: "solutions.manufacturers.processSteps.3.title",
        text: "solutions.manufacturers.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.manufacturers.fitItems.0.title",
        text: "solutions.manufacturers.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.manufacturers.fitItems.1.title",
        text: "solutions.manufacturers.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.manufacturers.fitItems.2.title",
        text: "solutions.manufacturers.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.manufacturers.fitItems.3.title",
        text: "solutions.manufacturers.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.manufacturers.proofItems.0.title",
        text: "solutions.manufacturers.proofItems.0.text",
        metricValue: "solutions.manufacturers.proofItems.0.metricValue",
        metricLabel: "solutions.manufacturers.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.manufacturers.faqItems.0.question",
        answer: "solutions.manufacturers.faqItems.0.answer",
      },
      {
        question: "solutions.manufacturers.faqItems.1.question",
        answer: "solutions.manufacturers.faqItems.1.answer",
      },
      {
        question: "solutions.manufacturers.faqItems.2.question",
        answer: "solutions.manufacturers.faqItems.2.answer",
      },
      {
        question: "solutions.manufacturers.faqItems.3.question",
        answer: "solutions.manufacturers.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.manufacturers.sections.0.title",
        items: [
          "solutions.manufacturers.sections.0.items.0",
          "solutions.manufacturers.sections.0.items.1",
          "solutions.manufacturers.sections.0.items.2",
          "solutions.manufacturers.sections.0.items.3",
          "solutions.manufacturers.sections.0.items.4",
          "solutions.manufacturers.sections.0.items.5",
        ],
      },
      {
        title: "solutions.manufacturers.sections.1.title",
        items: [
          "solutions.manufacturers.sections.1.items.0",
          "solutions.manufacturers.sections.1.items.1",
          "solutions.manufacturers.sections.1.items.2",
          "solutions.manufacturers.sections.1.items.3",
          "solutions.manufacturers.sections.1.items.4",
          "solutions.manufacturers.sections.1.items.5",
        ],
      },
      {
        title: "solutions.manufacturers.sections.2.title",
        items: [
          "solutions.manufacturers.sections.2.items.0",
          "solutions.manufacturers.sections.2.items.1",
          "solutions.manufacturers.sections.2.items.2",
          "solutions.manufacturers.sections.2.items.3",
          "solutions.manufacturers.sections.2.items.4",
          "solutions.manufacturers.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "solution",
        slug: "computer-vision",
        noteKey: "relevants.manufacturers.computer-vision",
      },
      {
        type: "solution",
        slug: "agentic-systems",
        noteKey: "relevants.manufacturers.agentic-systems",
      },
      {
        type: "solution",
        slug: "reputation-management",
        noteKey: "relevants.manufacturers.reputation-management",
      },
      {
        type: "case",
        slug: "quality-vision-line",
        noteKey: "relevants.manufacturers.quality-vision-line",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.manufacturers.software-development",
      },
    ],
  },
  {
    slug: "reputation-management",
    navTitle: "solutions.reputation-management.navTitle",
    title: "solutions.reputation-management.title",
    tagline: "solutions.reputation-management.tagline",
    description: "solutions.reputation-management.description",
    ctaBanner: {
      title: "solutions.reputation-management.ctaBanner.title",
      text: "solutions.reputation-management.ctaBanner.text",
      buttonLabel: "solutions.reputation-management.ctaBanner.buttonLabel",
    },
    audiences: ["audiences.manufacturers", "audiences.adAgencies", "audiences.businessOwners"],
    tags: ["technologies.reputation"],
    features: [
      {
        title: "solutions.reputation-management.features.0.title",
        text: "solutions.reputation-management.features.0.text",
      },
      {
        title: "solutions.reputation-management.features.1.title",
        text: "solutions.reputation-management.features.1.text",
      },
      {
        title: "solutions.reputation-management.features.2.title",
        text: "solutions.reputation-management.features.2.text",
      },
      {
        title: "solutions.reputation-management.features.3.title",
        text: "solutions.reputation-management.features.3.text",
      },
      {
        title: "solutions.reputation-management.features.4.title",
        text: "solutions.reputation-management.features.4.text",
      },
    ],
    processSteps: [
      {
        title: "solutions.reputation-management.processSteps.0.title",
        text: "solutions.reputation-management.processSteps.0.text",
      },
      {
        title: "solutions.reputation-management.processSteps.1.title",
        text: "solutions.reputation-management.processSteps.1.text",
      },
      {
        title: "solutions.reputation-management.processSteps.2.title",
        text: "solutions.reputation-management.processSteps.2.text",
      },
      {
        title: "solutions.reputation-management.processSteps.3.title",
        text: "solutions.reputation-management.processSteps.3.text",
      },
    ],
    fitItems: [
      {
        title: "solutions.reputation-management.fitItems.0.title",
        text: "solutions.reputation-management.fitItems.0.text",
        positive: true,
      },
      {
        title: "solutions.reputation-management.fitItems.1.title",
        text: "solutions.reputation-management.fitItems.1.text",
        positive: true,
      },
      {
        title: "solutions.reputation-management.fitItems.2.title",
        text: "solutions.reputation-management.fitItems.2.text",
        positive: false,
      },
      {
        title: "solutions.reputation-management.fitItems.3.title",
        text: "solutions.reputation-management.fitItems.3.text",
        positive: false,
      },
    ],
    proofItems: [
      {
        title: "solutions.reputation-management.proofItems.0.title",
        text: "solutions.reputation-management.proofItems.0.text",
        metricValue: "solutions.reputation-management.proofItems.0.metricValue",
        metricLabel: "solutions.reputation-management.proofItems.0.metricLabel",
      },
    ],
    faqItems: [
      {
        question: "solutions.reputation-management.faqItems.0.question",
        answer: "solutions.reputation-management.faqItems.0.answer",
      },
      {
        question: "solutions.reputation-management.faqItems.1.question",
        answer: "solutions.reputation-management.faqItems.1.answer",
      },
      {
        question: "solutions.reputation-management.faqItems.2.question",
        answer: "solutions.reputation-management.faqItems.2.answer",
      },
      {
        question: "solutions.reputation-management.faqItems.3.question",
        answer: "solutions.reputation-management.faqItems.3.answer",
      },
    ],
    sections: [
      {
        title: "solutions.reputation-management.sections.0.title",
        items: [
          "solutions.reputation-management.sections.0.items.0",
          "solutions.reputation-management.sections.0.items.1",
          "solutions.reputation-management.sections.0.items.2",
          "solutions.reputation-management.sections.0.items.3",
          "solutions.reputation-management.sections.0.items.4",
          "solutions.reputation-management.sections.0.items.5",
        ],
      },
      {
        title: "solutions.reputation-management.sections.1.title",
        items: [
          "solutions.reputation-management.sections.1.items.0",
          "solutions.reputation-management.sections.1.items.1",
          "solutions.reputation-management.sections.1.items.2",
          "solutions.reputation-management.sections.1.items.3",
          "solutions.reputation-management.sections.1.items.4",
          "solutions.reputation-management.sections.1.items.5",
        ],
      },
      {
        title: "solutions.reputation-management.sections.2.title",
        items: [
          "solutions.reputation-management.sections.2.items.0",
          "solutions.reputation-management.sections.2.items.1",
          "solutions.reputation-management.sections.2.items.2",
          "solutions.reputation-management.sections.2.items.3",
          "solutions.reputation-management.sections.2.items.4",
          "solutions.reputation-management.sections.2.items.5",
        ],
      },
    ],
    relevants: [
      {
        type: "case",
        slug: "reputation-monitoring-platform",
        noteKey: "relevants.reputation-management.reputation-monitoring-platform",
      },
      {
        type: "solution",
        slug: "content-generation",
        noteKey: "relevants.reputation-management.content-generation",
      },
      {
        type: "solution",
        slug: "customer-experience",
        noteKey: "relevants.reputation-management.customer-experience",
      },
      {
        type: "case",
        slug: "marketplace-reputation",
        noteKey: "relevants.reputation-management.marketplace-reputation",
      },
      {
        type: "service",
        slug: "information-monitoring",
        noteKey: "relevants.reputation-management.information-monitoring",
      },
      {
        type: "service",
        slug: "software-development",
        noteKey: "relevants.reputation-management.software-development",
      },
    ],
  },
];
