export const comment_sentiment_scoringEn = {
  title: "Comment sentiment scoring",
  tagline: "The classifier separates real negativity from neutral questions",
  description:
    "We collected comments from social media and marketplaces, calibrated sentiment with a threshold, and added manual sampling. The dashboard showed the honest negativity share.",
  metrics: [
    { label: "Accuracy on a held-out sample", value: "82%" },
    { label: "False positives", value: "−68%" },
    { label: "Manual review", value: "20 min/week" },
  ],
};
