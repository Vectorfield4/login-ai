import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("text-pipeline-editorial-loop", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("article", "text-pipeline-editorial-loop");
  });
});
