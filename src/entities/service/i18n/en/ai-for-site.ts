export const aiForSiteEn = {
  ctaBanner: {
    title: "Add AI to your website",
    text: "In 6-10 weeks we turn a static site into a product with search, personalization and content generation. We estimate scope and cost in one conversation.",
    buttonLabel: "Discuss the project",
  },
  navTitle: "AI for website",
  title: "AI for website: search, personalization and content generation",
  tagline: "We turn a showcase site into a tool that answers, recommends and writes on its own.",
  description:
    "We connect AI to an existing website: smart search across catalog and documents, personalized feeds and recommendations, generation of descriptions and SEO copy. We work on top of your stack without rewriting the frontend. Timeline 6-10 weeks, cost from 500 000 RUB per project. Integration via APIs and widgets, your data stays with you, support and monitoring included for 3 months.",
  features: [
    {
      title: "Smart search",
      text: "Search understands typos, synonyms and intent. Answers in 0.3 s on a catalog of 10 000 products. Supports filters, sorting and suggestions.",
    },
    {
      title: "Personalization",
      text: "Feeds and recommendations adapt to user behavior. Conversion to purchase grows by 8-15%. Accounts for history, segment and time of day.",
    },
    {
      title: "Content generation",
      text: "Product descriptions, SEO copy and article drafts are created automatically. Saves 40 hours per month. Tone is tuned to your brand.",
    },
    {
      title: "Intent analytics",
      text: "We see what people search for and where they drop off. A report on 30 key scenarios every week. It shows zero-result queries and the step where users drop off.",
    },
  ],
  techStack: [
    {
      subtitle: "Integration stack",
      description: "Frontend on [React], data in [PostgreSQL], search in [OpenSearch].",
      technologies: [
        {
          id: "react",
          name: "React",
          glossary:
            "React 19 with server components and streaming render. Components are reused across pages. State and cache tuned to your project.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "PostgreSQL 16 stores catalog, profiles and events. Replication and backups fit your infrastructure. pgvector extensions for embeddings.",
        },
        {
          id: "opensearch",
          name: "OpenSearch",
          glossary:
            "OpenSearch 2.x indexes catalog and documents. Hybrid search by keywords and vectors. A cluster of 3 nodes and 5 shards handles 2 000 queries per second.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Site and data audit",
      text: "We review structure, catalog, search logs and metrics. We fix 10 scenarios for the first iteration. We assess data quality.",
    },
    {
      title: "Design",
      text: "We choose models, index schemas and integration points. We agree success metrics with the team. We prepare a launch plan.",
    },
    {
      title: "Integration",
      text: "We connect search, personalization and generation. We test on 5% of traffic before full rollout. We collect feedback.",
    },
    {
      title: "Launch and training",
      text: "We roll out to 100% of traffic, set up monitoring and train the support team. We record baseline metrics.",
    },
  ],
  fitItems: [
    {
      title: "Site with a catalog of 1000+ items",
      text: "The catalog is large, default search is weak, clients leave without buying. AI helps retain them.",
      positive: true,
    },
    {
      title: "Content team is overloaded",
      text: "Descriptions and copy are written by hand, deadlines slip, quality varies. Generation removes routine.",
      positive: true,
    },
    {
      title: "Site on a builder without code access",
      text: "At least one integration endpoint is required. Without it work cannot start. We check availability in advance.",
      positive: false,
    },
    {
      title: "Expecting instant traffic growth",
      text: "AI lifts conversion and retention but does not replace ads and SEO promotion. Your promotion plan stays yours.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does a project cost?",
      answer:
        "A base project starts at 500 000 RUB. The exact figure comes after a catalog and data audit. Includes 3 months of support.",
    },
    {
      question: "How long does it take?",
      answer: "6-10 weeks from contract to launch on 100% of traffic. First prototype in 3 weeks.",
    },
    {
      question: "Do we need to change the site?",
      answer:
        "No, we work through APIs and widgets. Your frontend stays as is. Integration takes a couple of days.",
    },
    {
      question: "What data is needed?",
      answer:
        "Catalog, search logs and metrics for 3 months. We collect the rest ourselves. We help export the data.",
    },
    {
      question: "How do we measure results?",
      answer:
        "Search conversion, recommendation clicks and time on site. A report every week. Real-time dashboard.",
    },
  ],
  outcomes: [
    {
      title: "Search conversion",
      value: "+25%",
      text: "The share of search sessions ending in a purchase or request goes from 4% to 5% in the first quarter. That is the +25%. Empty-result queries go into the weekly report.",
    },
    {
      title: "Time on site",
      value: "+40%",
      text: "The average session on site grows from 2 minutes 30 seconds to 3 minutes 30 seconds in a quarter, +40% over the baseline. Recommendations lead readers to the second and third page.",
    },
    {
      title: "Response speed",
      value: "0.28 s",
      text: "At 2 000 queries per second the 95th percentile response time stays at 0.28 s. A cluster of 3 nodes survives one node failure and keeps serving.",
    },
  ],
  mechanism: [
    {
      title: "Semantic search",
      text: "The model turns the query and the catalog into vectors, and search ranks results by meaning. Typos and synonyms are handled automatically without a manual dictionary. The seller sees in the report which phrasings lead to a purchase and adds them to product cards.",
    },
    {
      title: "Feed personalization",
      text: "The system collects behavior signals: views, clicks, purchases and returns. From them it builds an interest profile, and the feed rebuilds after every action. A new visitor gets popular items; after 10 actions the personal profile takes over.",
    },
    {
      title: "Description generation",
      text: "The language model takes product attributes and writes a description in your tone. An editor reviews and publishes, saving team time. Supports multiple languages.",
    },
  ],
  deliverables: [
    {
      title: "Search widget",
      text: "A ready search widget with an API and documentation for your team. Filter and style settings.",
    },
    {
      title: "Personalization module",
      text: "A personalization module with rule settings and performance reports. Scenarios: a bought-together block, a home feed and a digest email.",
    },
    {
      title: "Analytics panel",
      text: "Search, recommendation and content-generation metrics sit on one screen in the panel. Reports export to CSV for your team.",
    },
  ],
  tradeoffs: [
    {
      title: "Search quality depends on data",
      text: "Without a clean catalog and logs search works worse. Before launch we audit and clean the data. Quality improves gradually.",
    },
    {
      title: "Generation needs editing",
      text: "The model writes drafts, an editor does the final check. This lowers the risk of errors in copy.",
    },
    {
      title: "Personalization builds up gradually",
      text: "For two weeks rules and popularity run the feed, then the model takes over. Accuracy grows gradually as each purchase sharpens the profile.",
    },
  ],
};
