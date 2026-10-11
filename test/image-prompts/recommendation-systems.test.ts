import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("recommendation-systems", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("service", "recommendation-systems");
  });
});
