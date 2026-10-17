import type { Technology } from "../technology";

/** Speech recognition: an audio-family capability, not audio generation. */
export const speechTechnologies: Technology[] = [
  {
    slug: "speech-recognition",
    category: "ai",
    nameKey: "technologies.speechRecognition",
    family: "audio",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
];
