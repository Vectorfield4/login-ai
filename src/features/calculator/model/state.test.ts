import { describe, expect, it } from "vitest";
import type { CalculatorSpec } from "@/shared/types/calculator";
import { encodeConfig, initialState, toggleSelection } from "./state";

const spec: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    { kind: "toggle", id: "video", label: "fields.video", default: false },
    { kind: "stepper", id: "languages", label: "fields.languages", min: 1, max: 5, default: 1 },
    {
      kind: "multiselect",
      id: "channels",
      label: "fields.channels",
      options: [
        { value: "blog", label: "options.blog" },
        { value: "social", label: "options.social" },
      ],
      default: ["blog"],
    },
  ],
  terms: [],
};

describe("initialState", () => {
  it("берёт дефолт каждого поля", () => {
    expect(initialState(spec)).toEqual({ video: false, languages: 1, channels: ["blog"] });
  });
});

describe("encodeConfig", () => {
  it("сортирует ключи, массивы склеивает через +", () => {
    expect(encodeConfig({ video: true, languages: 2, channels: ["social", "blog"] })).toBe(
      "channels=blog+social,languages=2,video=true",
    );
  });
});

describe("toggleSelection", () => {
  it("добавляет и убирает id, терпит не-массив", () => {
    expect(toggleSelection(["blog"], "social")).toEqual(["blog", "social"]);
    expect(toggleSelection(["blog", "social"], "blog")).toEqual(["social"]);
    expect(toggleSelection(false, "email")).toEqual(["email"]);
  });
});
