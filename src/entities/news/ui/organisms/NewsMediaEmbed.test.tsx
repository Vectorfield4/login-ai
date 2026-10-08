import { describe, expect, it } from "vitest";
import { toEmbedUrl } from "./NewsMediaEmbed";

describe("toEmbedUrl", () => {
  it("переводит ссылку YouTube в embed-форму", () => {
    expect(toEmbedUrl("https://www.youtube.com/watch?v=abc123XYZ")).toBe(
      "https://www.youtube.com/embed/abc123XYZ",
    );
    expect(toEmbedUrl("https://youtu.be/abc123XYZ")).toBe(
      "https://www.youtube.com/embed/abc123XYZ",
    );
  });

  it("оставляет прочую ссылку как есть", () => {
    expect(toEmbedUrl("https://vk.com/video-1_2")).toBe("https://vk.com/video-1_2");
    expect(toEmbedUrl("https://rutube.ru/video/abc/")).toBe("https://rutube.ru/video/abc/");
  });
});
