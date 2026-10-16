import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldRow } from "./FieldRow";

describe("FieldRow", () => {
  it("рендерит подпись над контролом", () => {
    render(
      <FieldRow label="Объём">
        <input aria-label="Объём" />
      </FieldRow>,
    );
    expect(screen.getByText("Объём")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Объём" })).toBeInTheDocument();
  });
});
