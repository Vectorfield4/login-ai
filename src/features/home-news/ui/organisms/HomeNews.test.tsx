import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { HomeNewsItem } from "@/features/home-news/model/homeNews";
import { HomeNews } from "./HomeNews";

function newsItem(overrides: Partial<HomeNewsItem> & { slug: string }): HomeNewsItem {
  return {
    title: `Title ${overrides.slug}`,
    excerpt: `Excerpt ${overrides.slug}`,
    href: `/ru/news/${overrides.slug}`,
    publishedLabel: "1 января 2026",
    publishedIso: "2026-01-01T00:00:00.000Z",
    tags: ["tag1", "tag2"],
    ...overrides,
  };
}

const items: HomeNewsItem[] = [
  newsItem({ slug: "one" }),
  newsItem({ slug: "two" }),
  newsItem({ slug: "three" }),
];

describe("HomeNews", () => {
  it("рендерит три новости", () => {
    render(<HomeNews items={items} lang="ru" />);
    expect(screen.getByText("Title one")).toBeInTheDocument();
    expect(screen.getByText("Title two")).toBeInTheDocument();
    expect(screen.getByText("Title three")).toBeInTheDocument();
  });

  it("показывает теги", () => {
    render(<HomeNews items={items} lang="ru" />);
    expect(screen.getAllByText("tag1")).toHaveLength(3);
    expect(screen.getAllByText("tag2")).toHaveLength(3);
  });

  it("пустой список не рендерит сетку", () => {
    const { container } = render(<HomeNews items={[]} lang="ru" />);
    expect(container).toBeEmptyDOMElement();
  });
});
