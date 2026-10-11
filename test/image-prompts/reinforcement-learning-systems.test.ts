import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("reinforcement-learning-systems", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("service", "reinforcement-learning-systems");
  });
});
