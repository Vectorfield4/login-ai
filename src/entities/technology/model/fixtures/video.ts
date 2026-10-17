import type { Technology } from "../technology";

/**
 * Video modalities. There is no `video` record: `video` is a family key and the
 * calculator's video add-on selects one or more of these features.
 */
export const videoTechnologies: Technology[] = [
  {
    slug: "text-to-video",
    category: "ai",
    nameKey: "technologies.textToVideo",
    family: "video",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
  {
    slug: "image-to-video",
    category: "ai",
    nameKey: "technologies.imageToVideo",
    family: "video",
    pricing: { setupFactor: 0.25, recurringFactor: 0.12 },
  },
  {
    slug: "video-to-video",
    category: "ai",
    nameKey: "technologies.videoToVideo",
    family: "video",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
  {
    slug: "video-editing",
    category: "ai",
    nameKey: "technologies.videoEditing",
    family: "video",
    pricing: { setupFactor: 0.1, recurringFactor: 0.05 },
  },
  {
    slug: "video-upscaling",
    category: "ai",
    nameKey: "technologies.videoUpscaling",
    family: "video",
    pricing: { setupFactor: 0.08, recurringFactor: 0.03 },
  },
];
