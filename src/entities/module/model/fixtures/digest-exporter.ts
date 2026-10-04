import type { Module } from "../modules";

export const digestExporter: Module = {
  slug: "digest-exporter",
  icon: "server",
  navTitle: "modules.digest-exporter.navTitle",
  title: "modules.digest-exporter.title",
  tagline: "modules.digest-exporter.tagline",
  description: "modules.digest-exporter.description",
  features: [
    {
      title: "modules.digest-exporter.features.0.title",
      text: "modules.digest-exporter.features.0.text",
    },
    {
      title: "modules.digest-exporter.features.1.title",
      text: "modules.digest-exporter.features.1.text",
    },
    {
      title: "modules.digest-exporter.features.2.title",
      text: "modules.digest-exporter.features.2.text",
    },
    {
      title: "modules.digest-exporter.features.3.title",
      text: "modules.digest-exporter.features.3.text",
    },
  ],
  providers: [
    {
      id: "postgres",
      name: "PostgreSQL",
      note: "modules.digest-exporter.providers.postgres.note",
      supported: true,
      isDefault: true,
    },
    {
      id: "sqlite",
      name: "SQLite",
      note: "modules.digest-exporter.providers.sqlite.note",
      supported: true,
    },
  ],
};
