import type { Technology } from "./technology";

/**
 * Single source of truth for capabilities. A capability is what the company can
 * do (`LLM`, `RAG`, `компьютерное зрение`), not the library or model used to do
 * it: implementations live in `entities/stack`.
 *
 * The `technologies.*` keys are the same ones solution filters already use, so
 * moving ownership here does not change copy.
 */
export const technologies: Technology[] = [
  { slug: "llm", category: "ai", nameKey: "technologies.llm" },
  { slug: "computer-vision", category: "ai", nameKey: "technologies.computerVision" },
  { slug: "agentic", category: "ai", nameKey: "technologies.agentic" },
  { slug: "content", category: "ai", nameKey: "technologies.content" },
  { slug: "video", category: "ai", nameKey: "technologies.video" },
  { slug: "image", category: "ai", nameKey: "technologies.image" },
  { slug: "audio", category: "ai", nameKey: "technologies.audio" },
  { slug: "reputation", category: "ai", nameKey: "technologies.reputation" },
  { slug: "nlp", category: "ai", nameKey: "technologies.nlp" },
  { slug: "rag", category: "ai", nameKey: "technologies.rag" },
  { slug: "mlops", category: "ml", nameKey: "technologies.mlops" },
  { slug: "ai-security", category: "security", nameKey: "technologies.aiSecurity" },
  { slug: "seo", category: "ai", nameKey: "technologies.seo" },
  { slug: "presentations", category: "ai", nameKey: "technologies.presentations" },
  { slug: "localization", category: "ai", nameKey: "technologies.localization" },
  { slug: "monitoring", category: "ai", nameKey: "technologies.monitoring" },
  { slug: "recommendations", category: "ai", nameKey: "technologies.recommendations" },
  { slug: "sovereign-models", category: "ai", nameKey: "technologies.sovereignModels" },
  { slug: "speech-recognition", category: "ai", nameKey: "technologies.speechRecognition" },
];
