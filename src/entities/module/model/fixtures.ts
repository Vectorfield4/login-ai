import { digestExporter } from "./fixtures/digest-exporter";
import { eventAnalyzer } from "./fixtures/event-analyzer";
import { sourceCollector } from "./fixtures/source-collector";
import type { Module } from "./modules";

/**
 * Single source of truth for software modules, assembled from per-module files
 * in `./fixtures/`. Content is read synchronously (SSG, no backend). Every
 * module declares the data providers it runs on; SQLite is supported by all.
 */
export const modules: Module[] = [sourceCollector, eventAnalyzer, digestExporter];
