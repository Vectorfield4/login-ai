import { describe, expect, it } from "vitest";
import { unwrapDraftLinks } from "@/app/integrations/dropDraftLinks";

/**
 * Post-build pass that unwraps an inline link to a draft entity into plain
 * text. Only the pure `shouldDropLink` was covered; the HTML rewrite that
 * actually removes the 404 was not.
 */
describe("unwrapDraftLinks", () => {
  const html =
    '<p>See <a href="/ru/services/draft-x">Draft X</a> and <a href="/en/services/software-development">SD</a>.</p>';

  it("разворачивает ссылку на драфт в текст, оставляя опубликованную", () => {
    const out = unwrapDraftLinks(html, (path) => path !== "/services/draft-x");
    expect(out).toContain("Draft X");
    expect(out).not.toContain('href="/ru/services/draft-x"');
    expect(out).toContain('href="/en/services/software-development"');
  });

  it("внешние и якорные ссылки не трогает", () => {
    const external = '<a href="https://example.com/x">x</a> <a href="/contacts">c</a>';
    expect(unwrapDraftLinks(external, () => false)).toBe(external);
  });

  it("считает абсолютный origin внутренней ссылкой", () => {
    const absolute = '<a href="https://loginai.ru/ru/solutions/draft-y">Y</a>';
    const out = unwrapDraftLinks(absolute, () => false);
    expect(out).toBe("Y");
  });
});
