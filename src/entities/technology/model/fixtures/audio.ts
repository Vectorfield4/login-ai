import type { Technology } from "../technology";

/** Audio modalities; `audio` is a family key, not a record. */
export const audioTechnologies: Technology[] = [
  {
    slug: "text-to-speech",
    category: "ai",
    nameKey: "technologies.textToSpeech",
    family: "audio",
    pricing: { setupFactor: 0.15, recurringFactor: 0.08 },
  },
  {
    slug: "voice-cloning",
    category: "ai",
    nameKey: "technologies.voiceCloning",
    family: "audio",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
  {
    slug: "music-generation",
    category: "ai",
    nameKey: "technologies.musicGeneration",
    family: "audio",
    pricing: { setupFactor: 0.15, recurringFactor: 0.08 },
  },
  {
    slug: "audio-editing",
    category: "ai",
    nameKey: "technologies.audioEditing",
    family: "audio",
    pricing: { setupFactor: 0.08, recurringFactor: 0.03 },
  },
];
