export const event_analyzerEn = {
  navTitle: "Event analyzer",
  title: "Event analyzer",
  tagline: "Runs an event through the analysis pipeline and stores the result.",
  description:
    "The module takes an event from the stream and runs it through analysis steps: classification, entity extraction, impact scoring, sentiment. The result is tied to a model version. It runs on PostgreSQL and on SQLite behind one contract.",
  features: [
    {
      title: "Step pipeline",
      text: "Classification, entities, impact and sentiment are separate steps. Each step is replaceable and versioned.",
    },
    {
      title: "Reproducibility",
      text: "The journal stores each step's input and output. You can replay the chain step by step and compare the result.",
    },
    {
      title: "Model and schema version",
      text: "The result is tied to a model version and a schema version. A model update does not rewrite older runs.",
    },
    {
      title: "Switchable data provider",
      text: "Tasks and results live on PostgreSQL and on SQLite. Switching is config only; the analysis logic does not change.",
    },
  ],
  providers: {
    postgres: {
      note: "A full provider for analysis tasks and results. The config default, switchable to SQLite.",
    },
    sqlite: {
      note: "A full provider with no server: the same tables and queries, switched in config.",
    },
  },
};
