import type { Technology } from "../technology";

/** Broad LLM capability plus its granular text features. */
export const llmTechnologies: Technology[] = [
  { slug: "llm", category: "ai", nameKey: "technologies.llm" },
  {
    slug: "text-generation",
    category: "ai",
    nameKey: "technologies.textGeneration",
    family: "llm",
  },
  {
    slug: "summarization",
    category: "ai",
    nameKey: "technologies.summarization",
    family: "llm",
  },
  {
    slug: "translation",
    category: "ai",
    nameKey: "technologies.translation",
    family: "llm",
  },
  {
    slug: "classification",
    category: "ai",
    nameKey: "technologies.classification",
    family: "llm",
  },
  {
    slug: "embeddings",
    category: "ai",
    nameKey: "technologies.embeddings",
    family: "llm",
  },
];
