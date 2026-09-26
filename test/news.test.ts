import { describe, expect, it } from "vitest";
import {
  estimateReadingTime,
  filterNewsForLang,
  isNewsLang,
  type NewsData,
  type NewsItem,
  newsArticlePath,
  newsSectionPath,
  parseNewsId,
  sortNewsByDateDesc,
  toNewsEntityRefs,
  toNewsItem,
} from "@/entities/news/model/news";

const data = (overrides: Partial<NewsData> = {}): NewsData => ({
  title: "Заголовок статьи достаточной длины",
  description: "Описание статьи достаточной длины для проверки схемы коллекции.",
  publishedAt: new Date("2026-03-04T09:00:00.000Z"),
  ...overrides,
});

const item = (id: string, overrides: Partial<NewsData> = {}): NewsItem => {
  const built = toNewsItem(id, data(overrides));
  if (!built) throw new Error(`не удалось собрать NewsItem из ${id}`);
  return built;
};

describe("parseNewsId", () => {
  it("отрезает язык по последней точке", () => {
    expect(parseNewsId("ai-agents.ru")).toEqual({ slug: "ai-agents", lang: "ru" });
    expect(parseNewsId("ai-agents.en")).toEqual({ slug: "ai-agents", lang: "en" });
  });

  it("слаг с точками не разваливается", () => {
    expect(parseNewsId("gpt-4.1-vs-claude.ru")).toEqual({
      slug: "gpt-4.1-vs-claude",
      lang: "ru",
    });
  });

  it("неизвестный язык, пустой слаг и голое имя дают null", () => {
    expect(parseNewsId("ai-agents.de")).toBeNull();
    expect(parseNewsId(".ru")).toBeNull();
    expect(parseNewsId("ai-agents")).toBeNull();
  });
});

describe("isNewsLang", () => {
  it("принимает только языки коллекции", () => {
    expect(isNewsLang("ru")).toBe(true);
    expect(isNewsLang("en")).toBe(true);
    expect(isNewsLang("de")).toBe(false);
    expect(isNewsLang(undefined)).toBe(false);
  });
});

describe("toNewsItem", () => {
  it("собирает локализованную ссылку и чистый путь", () => {
    const ru1 = item("post.ru");
    expect(ru1.href).toBe("/ru/news/post");
    expect(ru1.path).toBe("/news/post");

    const en1 = item("post.en");
    expect(en1.href).toBe("/en/news/post");
    expect(en1.path).toBe("/news/post");
  });

  it("возвращает null для записи с неизвестным языком", () => {
    expect(toNewsItem("post.de", data())).toBeNull();
  });

  it("считает время чтения из тела, если его нет во frontmatter", () => {
    const body = Array.from({ length: 360 }, () => "слово").join(" ");
    expect(item("post.ru", { readingTimeMin: undefined, publishedAt: new Date() })).toBeTruthy();
    const built = toNewsItem("post.ru", data(), body);
    expect(built?.readingTimeMin).toBe(2);
  });

  it("явное время чтения из frontmatter приоритетнее", () => {
    const body = Array.from({ length: 360 }, () => "слово").join(" ");
    const built = toNewsItem("post.ru", data({ readingTimeMin: 12 }), body);
    expect(built?.readingTimeMin).toBe(12);
  });

  it("метка даты форматируется в локали статьи", () => {
    expect(item("post.ru").publishedLabel).toMatch(/2026/);
    expect(item("post.ru").publishedLabel).not.toBe(item("post.en").publishedLabel);
  });
});

describe("toNewsEntityRefs", () => {
  it("превращает слаги в обычные relevants-ссылки коммерческих типов", () => {
    expect(
      toNewsEntityRefs(
        data({
          relatedServices: ["customer-experience"],
          relatedSolutions: ["agentic-systems"],
          relatedCases: ["retail-support-bot"],
        }),
      ),
    ).toEqual([
      { type: "service", slug: "customer-experience" },
      { type: "solution", slug: "agentic-systems" },
      { type: "case", slug: "retail-support-bot" },
    ]);
  });

  it("без ссылок даёт пустой массив, а не undefined", () => {
    expect(toNewsEntityRefs(data())).toEqual([]);
  });
});

describe("sortNewsByDateDesc", () => {
  it("свежие сверху, при равных датах порядок стабилен по слагу", () => {
    const items = [
      item("b.ru", { publishedAt: new Date("2026-01-01") }),
      item("a.ru", { publishedAt: new Date("2026-01-01") }),
      item("c.ru", { publishedAt: new Date("2026-05-01") }),
    ];
    expect(sortNewsByDateDesc(items).map((entry) => entry.slug)).toEqual(["c", "a", "b"]);
  });

  it("не мутирует исходный массив", () => {
    const items = [item("b.ru", { publishedAt: new Date("2026-01-01") }), item("a.ru")];
    const before = [...items];
    sortNewsByDateDesc(items);
    expect(items).toEqual(before);
  });
});

describe("filterNewsForLang", () => {
  const collection = [
    item("post-a.ru", { publishedAt: new Date("2026-01-01") }),
    item("post-a.en", { publishedAt: new Date("2026-01-01") }),
    item("post-b.ru", { publishedAt: new Date("2026-02-01") }),
    item("post-draft.ru", { draft: true, publishedAt: new Date("2026-03-01") }),
  ];

  it("асимметрия перевода: RU отдаёт два поста, EN — только один", () => {
    expect(filterNewsForLang(collection, "ru").map((entry) => entry.slug)).toEqual([
      "post-b",
      "post-a",
    ]);
    expect(filterNewsForLang(collection, "en").map((entry) => entry.slug)).toEqual(["post-a"]);
  });

  it("черновики не попадают ни в одну локаль", () => {
    for (const lang of ["ru", "en"] as const) {
      expect(filterNewsForLang(collection, lang).map((entry) => entry.slug)).not.toContain(
        "post-draft",
      );
    }
  });

  it("все ссылки результата ведут на существующую локаль", () => {
    for (const lang of ["ru", "en"] as const) {
      for (const entry of filterNewsForLang(collection, lang)) {
        expect(entry.href).toBe(`${lang === "ru" ? "/ru" : "/en"}${newsArticlePath(entry.slug)}`);
      }
    }
  });
});

describe("estimateReadingTime", () => {
  it("пустой текст даёт одну минуту, а не ноль", () => {
    expect(estimateReadingTime("")).toBe(1);
    expect(estimateReadingTime(undefined)).toBe(1);
  });

  it("считает по 180 слов в минуту с округлением до ближайшего", () => {
    const words = (count: number) => Array.from({ length: count }, () => "x").join(" ");
    expect(estimateReadingTime(words(180))).toBe(1);
    expect(estimateReadingTime(words(181))).toBe(1);
    expect(estimateReadingTime(words(359))).toBe(2);
    expect(estimateReadingTime(words(540))).toBe(3);
  });
});

describe("newsSectionPath", () => {
  it("раздел новостей — чистый путь без локали", () => {
    expect(newsSectionPath()).toBe("/news");
  });
});
