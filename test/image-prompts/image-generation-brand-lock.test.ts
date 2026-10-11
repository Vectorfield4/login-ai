import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("image-generation-brand-lock", () => {
  it("совпадает с instructional-old или scene-defined-new стандартом", () => {
    expectPromptStandard("article", "image-generation-brand-lock");
  });
});
