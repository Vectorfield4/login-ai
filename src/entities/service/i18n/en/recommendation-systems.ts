export const recommendation_systemsEn = {
  ctaBanner: {
    title: "Let's demo recommendations on your catalog",
    text: "Send an events export for a period. We'll assess cold start and show offline metrics before the pilot.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "Recommendation systems",
  title: "Building recommendation systems",
  tagline: "Recommendations are assembled for the user from their own behavior.",
  description:
    "We build recommender systems: collaborative filtering, content features, and ranking. We compute offline metrics and run A/B tests instead of trusting one number.",
  features: [
    {
      title: "Behavior signals",
      text: "We collect views, purchases, and search, not just ratings.",
    },
    {
      title: "Cold start",
      text: "New users and items get content-based recommendations until history builds up.",
    },
    {
      title: "Ranking",
      text: "Candidates are retrieved fast and a separate ranking model refines the order.",
    },
    {
      title: "A/B over belief",
      text: "An offline metric is only a filter: the effect is confirmed by an online experiment.",
    },
  ],
  techStack: [
    {
      subtitle: "Events and models",
      description:
        "Events run through [Kafka], features are computed in [ClickHouse], models train on [PyTorch], [Redis] serves inference, and [Grafana] shows the metrics.",
      technologies: [
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "Collects behavior events: views and purchases reach training without losing order.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "Computes features from history: frequencies, item pairs, and a per-window user profile.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "Trains retrieval and ranking models, including heavy sequence models.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Serves ready recommendations in milliseconds: it keeps the block's latency under load.",
        },
        {
          id: "grafana",
          name: "Grafana",
          glossary:
            "Shows block and A/B metrics: the online effect is visible, not an offline number.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Data and goal audit",
      text: "We review the event stream and choose the metric goal: click, cart, or purchase.",
      processType: "discovery",
    },
    {
      title: "Feature schema",
      text: "We fix user and item features and agree on the cold-start strategy.",
      processType: "system-design",
    },
    {
      title: "Model and ranking",
      text: "We train retrieval and ranking, using offline metrics as a filter.",
      processType: "implementation",
    },
    {
      title: "A/B and launch",
      text: "We run the online experiment, confirm the effect, and roll out to all traffic.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "An event stream exists",
      text: "Views, clicks, and purchases are recorded: there is data to train on.",
      positive: true,
    },
    {
      title: "A catalog with more than one item",
      text: "The wider the choice, the more ranking helps.",
      positive: true,
    },
    {
      title: "Little traffic",
      text: "Without events, recommendations collapse into popular items and a complex model does not pay off.",
      positive: false,
    },
    {
      title: "No metric goal",
      text: "Click or purchase? Without a chosen metric the model optimizes the wrong thing.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "An e-commerce catalog",
      text: "Ranking lifted the share of targeted clicks, and content features covered the cold start.",
      metricValue: "+18%",
      metricLabel: "clicks from the recommendation block",
    },
  ],
  faqItems: [
    {
      question: "What do we show new users?",
      answer:
        "Content features and the session profile: similar items give a sensible start until history builds.",
    },
    {
      question: "Is an offline metric enough?",
      answer:
        "No. An offline metric only filters models; the effect is confirmed by an online experiment.",
    },
    {
      question: "How do we avoid monotony?",
      answer:
        "We build a diversity constraint into ranking, or the block shows the same items over and over.",
    },
    {
      question: "How long does the pilot take?",
      answer:
        "A pilot with A/B starts at six weeks: event collection, the model, and an online experiment on part of the traffic.",
    },
  ],
  tradeoffs: [
    {
      title: "The popularity loop",
      text: "The model suggests hits, hits collect clicks, and the catalog narrows. The popularity loop shrinks the feed, so we hold diversity with a constraint.",
    },
    {
      title: "An offline metric deceives",
      text: "Better ranking quality is only a guide, and purchases are checked online. An offline metric deceives: the effect shows only on live traffic.",
    },
    {
      title: "Biased click labels",
      text: "The user sees what the system showed and learns from its own impressions. Biased click labels distort training, so we add random impressions.",
    },
    {
      title: "Diversity and limits",
      text: "Without diversity, recommendations speed up user burnout and falling trust. Diversity and limits keep interest in the catalog alive.",
    },
  ],
  mechanism: [
    {
      title: "Candidates are gathered by cheap methods",
      text: "Candidates are gathered by cheap methods across the full history, and an expensive model refines the order: the system serves a feed in milliseconds and keeps latency under load.",
    },
    {
      title: "Cold start is covered by content",
      text: "Cold start is covered by content: similar items, categories, and the session profile give a new user a sensible feed while their behavior history builds step by step.",
    },
    {
      title: "Feedback closes the loop",
      text: "Feedback closes the loop into a cycle: fresh clicks and purchases return to training, so the model accounts for new behavior and refreshes the feed every day.",
    },
    {
      title: "Diversity is controlled",
      text: "Diversity is controlled by a constraint in ranking: the system alternates categories and keeps interest in the catalog, so the feed stays broad for every user through a session.",
    },
  ],
};
