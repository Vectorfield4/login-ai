import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { services } from "./data/services";
import { solutions } from "./data/solutions";
import i18n from "./i18n";
import { formatDocTitle, getRouteMeta } from "./seo";
import { theme } from "./theme";

/** Реальные маршруты приложения: фикстура строится из данных, а не хардкодится. */
const ROUTE_FIXTURE: string[] = [
  "/",
  "/services",
  "/contacts",
  "/cases",
  ...services.map((service) => `/services/${service.slug}`),
  ...solutions.map((solution) => `/solutions/${solution.slug}`),
];

/** Ожидаемые RU-заголовки (документная часть до « | Login AI») для spot-check. */
const ROUTE_RU_TITLE: Record<string, string> = {
  "/": "ИИ-решения для бизнеса",
  "/services": "Услуги",
  "/contacts": "Контакты",
  "/cases": "Кейсы",
  "/solutions/computer-vision": "Внедрение компьютерного зрения",
  "/services/software-development": "Разработка программного обеспечения",
};

function renderApp(initialEntries: string[] = ["/"]) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={initialEntries}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

function descriptionMeta(): HTMLMetaElement | null {
  return document.head.querySelector('meta[name="description"]');
}

beforeEach(() => {
  // Защитный сброс: React 19 hoisting убирает свои теги при cleanup RTL,
  // но между тестами чистим head, чтобы исключить утечки/дубли.
  document.head.querySelectorAll("title").forEach((el) => {
    el.remove();
  });
  document.head.querySelectorAll('meta[name="description"]').forEach((el) => {
    el.remove();
  });
});

describe("SEO мета-теги по маршрутам", () => {
  it("каждый маршрут даёт уникальный document.title вида «… | Login AI» и один description", () => {
    const titles: string[] = [];

    for (const route of ROUTE_FIXTURE) {
      const view = renderApp([route]);
      const meta = getRouteMeta(route);

      // Ровно одна пара тегов в head (MainLayout рендерит RouteMeta один раз).
      expect(document.head.querySelectorAll("title"), `title для ${route}`).toHaveLength(1);
      expect(
        document.head.querySelectorAll('meta[name="description"]'),
        `description для ${route}`,
      ).toHaveLength(1);

      // title: непустой, уникальный формат, перевод, а не сырой i18n-ключ.
      expect(document.title, `document.title для ${route}`).not.toBe("");
      expect(document.title).toMatch(/ \| Login AI$/);
      expect(document.title, `статичный фолбэк не должен остаться для ${route}`).not.toBe(
        "Login AI",
      );
      const rawKeyLeak = formatDocTitle(meta.titleKey);
      expect(document.title, `сырой ключ не должен утекать для ${route}`).not.toBe(rawKeyLeak);
      expect(document.title).toBe(formatDocTitle(i18n.t(meta.titleKey)));

      // description: один тег с непустым переведённым content.
      const description = descriptionMeta();
      expect(description).not.toBeNull();
      expect(description?.getAttribute("content"), `content для ${route}`).not.toBe("");
      expect(description?.getAttribute("content")).toBe(i18n.t(meta.descriptionKey));

      titles.push(document.title);
      view.unmount();
    }

    // Уникальность document.title на всём множестве маршрутов.
    expect(new Set(titles).size).toBe(titles.length);
    expect(titles.length).toBe(ROUTE_FIXTURE.length);
  });

  it("рендерит ожидаемые RU-литералы для ключевых маршрутов", () => {
    for (const [route, pageTitle] of Object.entries(ROUTE_RU_TITLE)) {
      const view = renderApp([route]);
      expect(document.title, route).toBe(formatDocTitle(pageTitle));
      view.unmount();
    }
  });
});

describe("SEO мета-теги — переключение языка", () => {
  it("смена RU→EN обновляет title и description без перезагрузки", async () => {
    // Стартуем с гарантированной русской локалью.
    await act(async () => {
      await i18n.changeLanguage("ru");
    });

    const view = renderApp(["/"]);
    expect(document.title).toBe("ИИ-решения для бизнеса | Login AI");
    expect(descriptionMeta()?.getAttribute("content")).toBe(
      "Разработка и внедрение ИИ под ключ: агентные системы, компьютерное зрение, генерация контента и видео. Автоматизируем процессы и ускоряем рост бизнеса.",
    );

    await act(async () => {
      await i18n.changeLanguage("en");
    });

    expect(document.title).toBe("AI Solutions for Business | Login AI");
    expect(descriptionMeta()?.getAttribute("content")).toBe(
      "Custom AI solutions: agentic systems, computer vision, content and video generation. We automate processes and accelerate business growth.",
    );

    view.unmount();

    // Восстанавливаем локаль по умолчанию для остальных тестов.
    await act(async () => {
      await i18n.changeLanguage("ru");
    });
  });
});
