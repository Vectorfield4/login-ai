import type { Technology } from "../technology";

/** Broad RAG capability plus its retrieval features. */
export const ragTechnologies: Technology[] = [
  {
    slug: "rag",
    category: "ai",
    nameKey: "technologies.rag",
    pricing: { setupFactor: 0.2, recurringFactor: 0.1 },
  },
  { slug: "retrieval", category: "ai", nameKey: "technologies.retrieval", family: "rag" },
  { slug: "reranking", category: "ai", nameKey: "technologies.reranking", family: "rag" },
  {
    slug: "knowledge-graph",
    category: "ai",
    nameKey: "technologies.knowledgeGraph",
    family: "rag",
  },
];
