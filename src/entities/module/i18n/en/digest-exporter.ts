export const digest_exporterEn = {
  navTitle: "Digest exporter",
  title: "Digest exporter",
  tagline: "Assembles analysis into a digest and serves it over a read-only API.",
  description:
    "The module packs the period's analysis into one envelope with a schema version and serves it read-only. Access key and TLS at the door. Data is read from PostgreSQL or from SQLite; the contract does not change.",
  features: [
    {
      title: "Digest assembly",
      text: "The period's events pack into one envelope: schema version, period, source, items. Ready to hand to a partner.",
    },
    {
      title: "Read-only",
      text: "The exporter never writes to your systems. Access key, TLS and a field allowlist: only derived analytics leave.",
    },
    {
      title: "Pagination and cursor",
      text: "A large period is served in pages. The continuation cursor and the item count travel in the envelope.",
    },
    {
      title: "Switchable data provider",
      text: "The module reads from PostgreSQL or from SQLite. Switching is config only; the response format stays the same.",
    },
  ],
  providers: {
    postgres: {
      note: "A full store provider for the digest. The config default, switchable to SQLite.",
    },
    sqlite: {
      note: "A full provider with no server: the same envelope and cursors, switched in config.",
    },
  },
};
