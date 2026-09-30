import { gsap } from "gsap";
import { afterEach, describe, expect, it } from "vitest";
import { revealHeadings } from "./revealHeadings";

const realMatchMedia = window.matchMedia;

/**
 * jsdom не умеет медиазапросы: `matchMedia` всегда отвечает `matches: false`.
 * Поэтому «меньше движения» и его отсутствие задаём сами — так видно обе
 * ветки, а не только «анимации не будет».
 */
function matchOnly(queries: string[]) {
  window.matchMedia = ((query: string) => ({
    matches: queries.includes(query),
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

function renderPage() {
  document.body.innerHTML = `
    <h1 data-reveal>Login AI</h1>
    <div class="prose"><h2>Что внутри кейса</h2></div>
  `;
  return {
    hero: document.querySelector("h1") as HTMLElement,
    article: document.querySelector(".prose h2") as HTMLElement,
  };
}

afterEach(() => {
  window.matchMedia = realMatchMedia;
  document.body.innerHTML = "";
});

describe("revealHeadings", () => {
  it("режет заголовок на слова и отдаёт скринридеру полный текст", () => {
    matchOnly(["(prefers-reduced-motion: no-preference)"]);
    const { hero } = renderPage();

    revealHeadings(document.body);

    const words = hero.querySelectorAll<HTMLElement>("span");
    expect(words).toHaveLength(2);
    expect(words[0].textContent).toBe("Login");
    expect(words[0].getAttribute("aria-hidden")).toBe("true");
    // На span браузер не рисует трансформации, поэтому display ставим сами.
    expect(words[0].style.display).toBe("inline-block");
    // Полный текст для скринридера живёт в aria-label: после разбиения сам
    // заголовок содержит только слова-обёртки. Пробелы между ними SplitText
    // оставляет текстовыми узлами — в jsdom они встают не между словами, так
    // что порядок узлов здесь не проверяем, реальную раскладку видно в браузере.
    expect(hero.getAttribute("aria-label")).toBe("Login AI");
  });

  it("ловит сырые заголовки статьи по .prose", () => {
    matchOnly(["(prefers-reduced-motion: no-preference)"]);
    const { article } = renderPage();

    revealHeadings(document.body);

    expect(article.querySelectorAll("span")).toHaveLength(3);
  });

  it("возвращает исходную разметку, когда каскад доигран", () => {
    matchOnly(["(prefers-reduced-motion: no-preference)"]);
    const { hero } = renderPage();

    revealHeadings(document.body);
    for (const tween of gsap.getTweensOf(hero.querySelectorAll("span"))) tween.progress(1);

    expect(hero.innerHTML).toBe("Login AI");
    expect(hero.getAttribute("aria-label")).toBeNull();
    expect(hero).toHaveAttribute("data-reveal");
  });

  it("не трогает заголовки при включённом «меньше движения»", () => {
    matchOnly([]);
    const { hero } = renderPage();

    revealHeadings(document.body);

    expect(hero.innerHTML).toBe("Login AI");
    expect(hero.querySelector("span")).toBeNull();
    expect(hero.getAttribute("aria-label")).toBeNull();
  });
});
