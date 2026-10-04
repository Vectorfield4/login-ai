import type { Module } from "../modules";

export const sourceCollector: Module = {
  slug: "source-collector",
  icon: "radar",
  navTitle: "modules.source-collector.navTitle",
  title: "modules.source-collector.title",
  tagline: "modules.source-collector.tagline",
  description: "modules.source-collector.description",
  features: [
    {
      title: "modules.source-collector.features.0.title",
      text: "modules.source-collector.features.0.text",
    },
    {
      title: "modules.source-collector.features.1.title",
      text: "modules.source-collector.features.1.text",
    },
    {
      title: "modules.source-collector.features.2.title",
      text: "modules.source-collector.features.2.text",
    },
    {
      title: "modules.source-collector.features.3.title",
      text: "modules.source-collector.features.3.text",
    },
  ],
  providers: [
    {
      id: "postgres",
      name: "PostgreSQL",
      note: "modules.source-collector.providers.postgres.note",
      supported: true,
      isDefault: true,
    },
    {
      id: "sqlite",
      name: "SQLite",
      note: "modules.source-collector.providers.sqlite.note",
      supported: true,
    },
  ],
};
