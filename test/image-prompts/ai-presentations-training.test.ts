import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("ai-presentations-training", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("service", "ai-presentations-training");
  });
});
