import { describe, it } from "vitest";
import { expectPromptStandard } from "./helpers";

describe("image-generation-brand-lock", () => {
  it("совпадает с unified image prompt стандартом", () => {
    expectPromptStandard("article", "image-generation-brand-lock");
  });
});
