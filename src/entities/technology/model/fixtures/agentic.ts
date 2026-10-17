import type { Technology } from "../technology";

/** Broad agentic capability plus its granular behaviours. */
export const agenticTechnologies: Technology[] = [
  { slug: "agentic", category: "ai", nameKey: "technologies.agentic" },
  { slug: "tool-use", category: "ai", nameKey: "technologies.toolUse", family: "agentic" },
  { slug: "planning", category: "ai", nameKey: "technologies.planning", family: "agentic" },
  { slug: "multi-agent", category: "ai", nameKey: "technologies.multiAgent", family: "agentic" },
];
