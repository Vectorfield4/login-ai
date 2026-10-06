import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { type SchemaType, schemaIri } from "@/shared/data/schema";

const styles = stylex.create({
  // The entity scope is a microdata carrier, not a layout box: `display:
  // contents` lets its children stay direct grid/flex items, so cards and rows
  // keep the layout they had before the extra scope.
  scope: { display: "contents" },
});

/**
 * `position` of a microdata `ListItem`. A `meta` with `itemprop` is valid flow
 * content, so the ordinal stays invisible and adds no box.
 */
export function ListItemPosition({ value }: { value: number }) {
  return <meta itemProp="position" content={String(value)} />;
}

/**
 * Content of a microdata `ListItem`: the ordinal plus the entity the JSON-LD
 * names in `itemListElement`, scoped through `item`. Reads `position` from the
 * parent list index; the entity type keeps the card's schema identity.
 */
export function ListItemScope({
  position,
  type,
  children,
}: {
  position: number;
  type: SchemaType;
  children: ReactNode;
}) {
  return (
    <>
      <ListItemPosition value={position} />
      <div itemProp="item" itemScope itemType={schemaIri(type)} {...stylex.props(styles.scope)}>
        {children}
      </div>
    </>
  );
}
