import { getCaseBySlug } from "@/entities/case/model/getters";
import { getServiceBySlug } from "@/entities/service/model/getters";
import { getSolutionBySlug } from "@/entities/solution/model/getters";

/**
 * Publication gate for inline links, section 7 of
 * `docs/plans/content-expansion-plan.md`.
 *
 * A block relation to a draft entity is dropped by the entity getters; an inline
 * link in an article body is plain HTML with no component to drop it, so it
 * would ship as a 404. The build integration unwraps such a link to plain text
 * (the sentence stays readable) and keeps it when the target is published. It
 * covers both `/ru/...` and `https://loginai.ru/...` forms: `verify:dist` only
 * checks the relative one.
 */

const SITE_ORIGIN = "https://loginai.ru";

/** Clean locale-free path of an internal link; `undefined` — not an internal one. */
export function internalPath(href: string): string | undefined {
  let path = href.split("#")[0].split("?")[0];
  if (path.startsWith(SITE_ORIGIN)) path = path.slice(SITE_ORIGIN.length);
  if (!path.startsWith("/")) return undefined;
  const match = /^\/(?:ru|en)(\/.*)?$/.exec(path);
  if (!match) return undefined;
  const rest = match[1] ?? "/";
  return rest.length > 1 ? rest.replace(/\/+$/, "") : rest;
}

/** A `/services|solutions|cases/<slug>` target is available when it resolves. */
export function isEntityAvailable(cleanPath: string): boolean {
  const match = /^\/(services|solutions|cases)\/([^/]+)$/.exec(cleanPath);
  if (!match) return true;
  const [, kind, slug] = match;
  if (kind === "services") return getServiceBySlug(slug) !== undefined;
  if (kind === "solutions") return getSolutionBySlug(slug) !== undefined;
  return getCaseBySlug(slug) !== undefined;
}

/** True when an inline link must be unwrapped to plain text. */
export function shouldDropLink(
  href: string,
  isAvailable: (path: string) => boolean = isEntityAvailable,
): boolean {
  const clean = internalPath(href);
  return clean !== undefined && !isAvailable(clean);
}
