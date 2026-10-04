export const source_collectorEn = {
  navTitle: "Source collector",
  title: "Source collector",
  tagline: "Pulls data from external systems into one event stream.",
  description:
    "The module connects to APIs, feeds and exports, normalizes records to a shared schema and writes them to an event stream. It runs on PostgreSQL by default and switches to SQLite in config, with no code changes.",
  features: [
    {
      title: "Source connectors",
      text: "API, feed, file or database export. A new source is a new connector; the collector core stays untouched.",
    },
    {
      title: "One event schema",
      text: "Every record maps to a shared contract: id, time, source, body. Source differences are absorbed on the way in.",
    },
    {
      title: "Idempotent intake",
      text: "A record that arrives twice does not create a duplicate. The dedup key and schema version live next to the data.",
    },
    {
      title: "Switchable data provider",
      text: "The same collector runs on PostgreSQL and on SQLite. The provider is chosen in config; code and schema stay the same.",
    },
  ],
  providers: {
    postgres: {
      note: "A full store provider for the collector. The config default, switchable to SQLite.",
    },
    sqlite: {
      note: "A full provider with no server: the collector's same schema and queries, switched in config.",
    },
  },
};
