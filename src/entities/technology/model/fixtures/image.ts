import type { Technology } from "../technology";

/** Image modalities; `image` is a family key, not a record. */
export const imageTechnologies: Technology[] = [
  {
    slug: "text-to-image",
    category: "ai",
    nameKey: "technologies.textToImage",
    family: "image",
    pricing: { setupFactor: 0.12, recurringFactor: 0.05 },
  },
  {
    slug: "image-to-image",
    category: "ai",
    nameKey: "technologies.imageToImage",
    family: "image",
    pricing: { setupFactor: 0.12, recurringFactor: 0.05 },
  },
  {
    slug: "inpainting",
    category: "ai",
    nameKey: "technologies.inpainting",
    family: "image",
    pricing: { setupFactor: 0.08, recurringFactor: 0.03 },
  },
  {
    slug: "image-upscaling",
    category: "ai",
    nameKey: "technologies.imageUpscaling",
    family: "image",
    pricing: { setupFactor: 0.08, recurringFactor: 0.03 },
  },
];
