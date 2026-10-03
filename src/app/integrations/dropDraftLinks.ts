import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { shouldDropLink } from "../markdown/dropDraftLinks";

/**
 * Post-build pass: unwrap `<a>` to a not-yet-published entity into plain text
 * (see plan, section 7). Block relations are dropped earlier by the entity
 * getters; article markdown is already HTML here, so this is the one place the
 * inline link can be gated regardless of the Markdown processor.
 */

/** `<a href="...">inner</a>`; markdown links are never nested. */
const ANCHOR = /<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g;

function walkHtml(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, acc);
    else if (entry.name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

export function dropDraftLinks(): AstroIntegration {
  return {
    name: "drop-draft-links",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const root = fileURLToPath(dir);
        for (const file of walkHtml(root)) {
          const html = readFileSync(file, "utf8");
          const next = html.replace(ANCHOR, (match, href: string, inner: string) =>
            shouldDropLink(href) ? inner : match,
          );
          if (next !== html) writeFileSync(file, next, "utf8");
        }
      },
    },
  };
}
