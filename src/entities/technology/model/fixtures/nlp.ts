import type { Technology } from "../technology";

/** Broad NLP capability plus its text-analysis features. */
export const nlpTechnologies: Technology[] = [
  {
    slug: "nlp",
    category: "ai",
    nameKey: "technologies.nlp",
    pricing: { setupFactor: 0.15, recurringFactor: 0.1 },
  },
  {
    slug: "named-entity-recognition",
    category: "ai",
    nameKey: "technologies.namedEntityRecognition",
    family: "nlp",
  },
  {
    slug: "sentiment-analysis",
    category: "ai",
    nameKey: "technologies.sentimentAnalysis",
    family: "nlp",
  },
  {
    slug: "topic-modeling",
    category: "ai",
    nameKey: "technologies.topicModeling",
    family: "nlp",
  },
];
