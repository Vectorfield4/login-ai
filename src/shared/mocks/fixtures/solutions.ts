import type { Solution } from "@/entities/solution/model/solutions";
import agenticSystemsImage from "@/shared/assets/images/agentic-systems.svg";
import appDevelopmentSystemsImage from "@/shared/assets/images/app-development-systems.svg";
import computerVisionImage from "@/shared/assets/images/computer-vision.svg";
import contentGenerationImage from "@/shared/assets/images/content-generation.svg";
import customerExperienceImage from "@/shared/assets/images/customer-experience.svg";
import manufacturersImage from "@/shared/assets/images/manufacturers.svg";
import medicalClinicsImage from "@/shared/assets/images/medical-clinics.svg";
import reputationManagementImage from "@/shared/assets/images/reputation-management.svg";
import videoGenerationImage from "@/shared/assets/images/video-generation.svg";

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
    image: agenticSystemsImage,
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
    image: computerVisionImage,
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
    image: customerExperienceImage,
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
    image: contentGenerationImage,
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
    image: appDevelopmentSystemsImage,
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
    image: medicalClinicsImage,
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
    image: videoGenerationImage,
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
    image: manufacturersImage,
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
    image: reputationManagementImage,
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
