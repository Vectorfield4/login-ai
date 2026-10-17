import { agenticTechnologies } from "./fixtures/agentic";
import { audioTechnologies } from "./fixtures/audio";
import { imageTechnologies } from "./fixtures/image";
import { llmTechnologies } from "./fixtures/llm";
import { nlpTechnologies } from "./fixtures/nlp";
import { ragTechnologies } from "./fixtures/rag";
import { speechTechnologies } from "./fixtures/speech";
import { videoTechnologies } from "./fixtures/video";
import { visionTechnologies } from "./fixtures/vision";
import type { Technology } from "./technology";

/**
 * Single source of truth for technologies, composed from one file per category
 * under `./fixtures/`.
 *
 * Broad records (`llm`, `computer-vision`, `agentic`, `rag`, `nlp`) are families
 * used by filters, included blocks and add-ons. Granular AI features
 * (`text-to-video`, `image-to-video`, `inpainting`, …) point at their family with
 * `family`. There is deliberately no `video`/`image`/`audio` record: those are
 * family keys, not technologies. Business capabilities live in
 * `entities/capability`.
 */
export const technologies: Technology[] = [
  ...llmTechnologies,
  ...visionTechnologies,
  ...agenticTechnologies,
  ...videoTechnologies,
  ...imageTechnologies,
  ...audioTechnologies,
  ...speechTechnologies,
  ...ragTechnologies,
  ...nlpTechnologies,
];
