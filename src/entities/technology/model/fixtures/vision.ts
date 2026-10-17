import type { Technology } from "../technology";

/** Broad computer-vision capability plus its granular tasks. */
export const visionTechnologies: Technology[] = [
  {
    slug: "computer-vision",
    category: "ai",
    nameKey: "technologies.computerVision",
    pricing: { setupFactor: 0.25, recurringFactor: 0.1 },
  },
  {
    slug: "image-classification",
    category: "ai",
    nameKey: "technologies.imageClassification",
    family: "computer-vision",
  },
  {
    slug: "object-detection",
    category: "ai",
    nameKey: "technologies.objectDetection",
    family: "computer-vision",
  },
  {
    slug: "segmentation",
    category: "ai",
    nameKey: "technologies.segmentation",
    family: "computer-vision",
  },
  { slug: "ocr", category: "ai", nameKey: "technologies.ocr", family: "computer-vision" },
  {
    slug: "pose-estimation",
    category: "ai",
    nameKey: "technologies.poseEstimation",
    family: "computer-vision",
  },
  {
    slug: "anomaly-detection",
    category: "ai",
    nameKey: "technologies.anomalyDetection",
    family: "computer-vision",
  },
];
