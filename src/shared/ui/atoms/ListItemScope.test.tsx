import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { ListItemScope } from "./ListItemScope";

describe("ListItemScope", () => {
  it("кладёт position в meta и оборачивает сущность в item", () => {
    const { container } = render(
      <div itemScope itemProp="itemListElement" itemType={schemaIri(SCHEMA_TYPE.listItem)}>
        <ListItemScope position={3} type={SCHEMA_TYPE.product}>
          <span itemProp="name">Решение</span>
        </ListItemScope>
      </div>,
    );

    const position = container.querySelector('meta[itemprop="position"]');
    expect(position).toHaveAttribute("content", "3");

    const item = container.querySelector('[itemprop="item"]');
    expect(item).toHaveAttribute("itemtype", schemaIri(SCHEMA_TYPE.product));
    expect(item?.querySelector('[itemprop="name"]')).toHaveTextContent("Решение");
  });
});
