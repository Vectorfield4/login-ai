import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CalculatorField } from "./CalculatorField";

const noop = () => {};

describe("CalculatorField", () => {
  it("рендерит контрол под каждый kind", () => {
    const { rerender } = render(
      <CalculatorField
        field={{
          kind: "segmented",
          id: "review",
          label: "calculator.fields.review",
          options: [{ value: "standard", label: "calculator.options.standard" }],
          default: "standard",
        }}
        value="standard"
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("button", { name: "Стандарт" })).toBeInTheDocument();

    rerender(
      <CalculatorField
        field={{ kind: "toggle", id: "video", label: "calculator.fields.video", default: false }}
        value={false}
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("switch")).toBeInTheDocument();

    rerender(
      <CalculatorField
        field={{
          kind: "slider",
          id: "volume",
          label: "calculator.fields.volume",
          min: 4,
          max: 60,
          step: 4,
          default: 12,
        }}
        value={12}
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();

    rerender(
      <CalculatorField
        field={{
          kind: "stepper",
          id: "languages",
          label: "calculator.fields.languages",
          min: 1,
          max: 5,
          default: 1,
        }}
        value={1}
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("button", { name: "Языки: +" })).toBeInTheDocument();

    rerender(
      <CalculatorField
        field={{
          kind: "multiselect",
          id: "channels",
          label: "calculator.fields.channels",
          options: [{ value: "blog", label: "calculator.options.blog" }],
          default: ["blog"],
        }}
        value={["blog"]}
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("button", { name: "Блог" })).toBeInTheDocument();
  });

  it("падает на дефолт при мусорном значении", () => {
    render(
      <CalculatorField
        field={{
          kind: "segmented",
          id: "review",
          label: "calculator.fields.review",
          options: [{ value: "standard", label: "calculator.options.standard" }],
          default: "standard",
        }}
        value={42}
        onChange={noop}
        lang="ru"
      />,
    );
    expect(screen.getByRole("button", { name: "Стандарт" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
