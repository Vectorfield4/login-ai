import type { Case } from "../cases";

export const commentSentimentScoring: Case = {
  slug: "comment-sentiment-scoring",
  title: "cases.comment-sentiment-scoring.title",
  tagline: "cases.comment-sentiment-scoring.tagline",
  description: "cases.comment-sentiment-scoring.description",
  icon: "rate-review",
  industryKey: "audiences.businessOwners",
  metrics: [
    {
      label: "cases.comment-sentiment-scoring.metrics.0.label",
      value: "cases.comment-sentiment-scoring.metrics.0.value",
    },
    {
      label: "cases.comment-sentiment-scoring.metrics.1.label",
      value: "cases.comment-sentiment-scoring.metrics.1.value",
    },
    {
      label: "cases.comment-sentiment-scoring.metrics.2.label",
      value: "cases.comment-sentiment-scoring.metrics.2.value",
    },
  ],
  relevants: [
    {
      type: "service",
      slug: "nlp-systems",
      noteKey: "relevants.comment-sentiment-scoring.nlp-systems",
    },
    {
      type: "service",
      slug: "information-monitoring",
      noteKey: "relevants.comment-sentiment-scoring.information-monitoring",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.comment-sentiment-scoring.reputation-management",
    },
  ],
};
