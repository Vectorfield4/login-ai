/**
 * Schema.org vocabulary constants and helpers.
 *
 * `@type` in JSON-LD accepts a short name, while the `itemtype` microdata
 * attribute needs the full IRI. Both spellings come from here, so the head
 * JSON-LD and the body microdata never drift apart. See
 * `docs/frontend/seo.md` for where each type is used.
 */

export const SCHEMA_CONTEXT = "https://schema.org";

/** Known Schema.org types used across the site, keyed by a stable alias. */
export const SCHEMA_TYPE = {
  organization: "Organization",
  webSite: "WebSite",
  webPage: "WebPage",
  collectionPage: "CollectionPage",
  aboutPage: "AboutPage",
  contactPage: "ContactPage",
  service: "Service",
  product: "Product",
  creativeWork: "CreativeWork",
  blogPosting: "BlogPosting",
  breadcrumbList: "BreadcrumbList",
  itemList: "ItemList",
  listItem: "ListItem",
  faqPage: "FAQPage",
  question: "Question",
  answer: "Answer",
  person: "Person",
  offer: "Offer",
  contactPoint: "ContactPoint",
  imageObject: "ImageObject",
  videoObject: "VideoObject",
  howTo: "HowTo",
  howToStep: "HowToStep",
  propertyValue: "PropertyValue",
  quotation: "Quotation",
  siteNavigationElement: "SiteNavigationElement",
  audience: "Audience",
  brand: "Brand",
  thing: "Thing",
} as const;

export type SchemaType = (typeof SCHEMA_TYPE)[keyof typeof SCHEMA_TYPE];

/** Full IRI for an `itemtype` microdata attribute. */
export function schemaIri(type: SchemaType): string {
  return `${SCHEMA_CONTEXT}/${type}`;
}

/**
 * Microdata attributes attachable to a DOM element. React owns the casing:
 * `itemScope` renders `itemscope`, `itemType` renders `itemtype`, and so on.
 * Atoms broaden their props with this so a caller can mark up the real element
 * instead of wrapping it in an extra `<span>`.
 */
export interface MicrodataAttributes {
  itemProp?: string;
  itemScope?: boolean;
  itemType?: string;
  itemID?: string;
  itemRef?: string;
}

/** A JSON-LD node: `@context` plus `@type` plus arbitrary properties. */
export interface JsonLdNode {
  "@context": typeof SCHEMA_CONTEXT;
  "@type": SchemaType;
  [key: string]: unknown;
}

/** Builds a JSON-LD node with the shared context and type. */
export function jsonLd(type: SchemaType, props: Record<string, unknown>): JsonLdNode {
  return { "@context": SCHEMA_CONTEXT, "@type": type, ...props };
}

/** Builds a nested JSON-LD node (context is omitted below the top level). */
export function jsonLdNode(
  type: SchemaType,
  props: Record<string, unknown>,
): Record<string, unknown> {
  return { "@type": type, ...props };
}
