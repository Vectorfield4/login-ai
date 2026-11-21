export const event_sales_analyticsEn = {
  title: "Deal and conversation analysis for sales scripts",
  tagline: "We grouped inquiries by segment and wrote 22 sales scripts",
  description:
    "For a company organizing private and corporate events in Saint Petersburg, we analyzed amoCRM and conversation exports, prepared classifiers, and delivered recommendations to test new scripts with the sales team.",
  metrics: [
    { label: "Dialogues in the analytics dataset", value: "≈ 3.7k" },
    { label: "Dialogues with a quality assessment", value: "≈ 1.3k" },
    { label: "Sales scripts written for segments", value: "22" },
  ],
  problem: {
    title: "The team needed to understand how inquiries relate to sales",
    0: {
      title: "Inquiry types and reply quality had not been analyzed",
      text: "Deals and conversations were exported separately. We combined and labeled the data to study inquiry patterns and manager reply quality.",
    },
    1: {
      title: "We identified four contact types",
      text: "The analysis separated inbound inquiries, outbound sales, partner contacts, and reactivation of past clients. We prepared separate recommendations for these groups.",
    },
  },
  solution: {
    title: "What we did",
    0: {
      title: "Prepared data for classification",
      text: "We combined and normalized amoCRM and conversation data, labeled a sample, and prepared ML classifiers for dialogue types and manager message quality.",
    },
    1: {
      title: "Built conversation analytics",
      text: "In Jupyter notebooks, we analyzed topics and objections by segment, assessed message quality, and identified successful phrases used by managers. The quality review covered client and event context, offer value, execution details, and the next step.",
    },
    2: {
      title: "Wrote scripts for different segments",
      text: "Based on the analysis, we wrote 22 sales scripts and prepared recommendations. We delivered them to the client, and the team is testing the scripts in its sales process.",
    },
  },
};
