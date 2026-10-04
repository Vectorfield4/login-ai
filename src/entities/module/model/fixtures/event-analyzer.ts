import type { Module } from "../modules";

export const eventAnalyzer: Module = {
  slug: "event-analyzer",
  icon: "cpu",
  navTitle: "modules.event-analyzer.navTitle",
  title: "modules.event-analyzer.title",
  tagline: "modules.event-analyzer.tagline",
  description: "modules.event-analyzer.description",
  features: [
    {
      title: "modules.event-analyzer.features.0.title",
      text: "modules.event-analyzer.features.0.text",
    },
    {
      title: "modules.event-analyzer.features.1.title",
      text: "modules.event-analyzer.features.1.text",
    },
    {
      title: "modules.event-analyzer.features.2.title",
      text: "modules.event-analyzer.features.2.text",
    },
    {
      title: "modules.event-analyzer.features.3.title",
      text: "modules.event-analyzer.features.3.text",
    },
  ],
  providers: [
    {
      id: "postgres",
      name: "PostgreSQL",
      note: "modules.event-analyzer.providers.postgres.note",
      supported: true,
      isDefault: true,
    },
    {
      id: "sqlite",
      name: "SQLite",
      note: "modules.event-analyzer.providers.sqlite.note",
      supported: true,
    },
  ],
};
