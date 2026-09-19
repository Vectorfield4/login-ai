import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { routes } from "@/app/routes";
import { casePages } from "@/pages/cases/details/model/registry";
import { DEMO_APP_URL } from "@/shared/config/constants";
import { theme } from "@/shared/config/theme";
import { ru } from "@/shared/i18n/ru";
import { caseFixtures as cases } from "@/shared/mocks/fixtures/cases";
import { serviceFixtures } from "@/shared/mocks/fixtures/services";
import { solutionFixtures as solutions } from "@/shared/mocks/fixtures/solutions";

function renderApp(initialEntries: string[] = ["/ru"]) {
  const queryClient = new QueryClient();
  const router = createMemoryRouter(routes, { initialEntries });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

function renderRouter(initialEntries: string[] = ["/ru"]) {
  const router = createMemoryRouter(routes, { initialEntries });
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe("App", () => {
  it("renders the heading", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: /login ai/i })).toBeInTheDocument();
  });

  it("renders the contacts page with a mailto link", () => {
    renderApp(["/ru/contacts"]);
    expect(screen.getByRole("heading", { name: /контакты/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sales@loginai\.ru/i })).toHaveAttribute(
      "href",
      "mailto:sales@loginai.ru",
    );
  });

  it("renders a solution page", () => {
    renderRouter(["/ru/solutions/computer-vision"]);
    expect(
      screen.getByRole("heading", { name: /внедрение компьютерного зрения/i }),
    ).toBeInTheDocument();
  });

  it("renders the services page", () => {
    renderRouter(["/ru/services"]);
    expect(screen.getByRole("heading", { name: /услуги/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /разработка по/i })).toBeInTheDocument();
  });

  it("renders the cases page with a demo notice and all cases in the grid", () => {
    renderApp(["/ru/cases"]);
    expect(screen.getByRole("heading", { name: /кейсы/i })).toBeInTheDocument();
    expect(screen.getByText(/все кейсы — реальные проекты/i)).toBeInTheDocument();

    // Метрики извлекаются по ключам cases.<slug>.metrics.N.* (вложенные массивы словаря).
    expect(screen.getByText("Время обработки обращения")).toBeInTheDocument();
    expect(screen.getByText("−70 %")).toBeInTheDocument();

    // Карточки кейсов с собственной страницей ведут на неё, остальные — на своё решение.
    const ownPageSlugs = new Set(Object.keys(casePages));
    const solutionCases = cases.filter((caseData) => !ownPageSlugs.has(caseData.slug));
    const detailCases = cases.filter((caseData) => ownPageSlugs.has(caseData.slug));
    expect(solutionCases).toHaveLength(5);
    expect(detailCases.map((caseData) => caseData.slug)).toEqual([
      "retail-support-bot",
      "reputation-monitoring-platform",
    ]);

    const solutionLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/ru/solutions/"));
    expect(solutionLinks).toHaveLength(solutionCases.length);
    for (const link of solutionLinks) {
      const slug = link.getAttribute("href")?.split("/solutions/")[1];
      expect(
        solutions.some((solution) => solution.slug === slug),
        `ссылка на несуществующее решение /solutions/${slug}`,
      ).toBe(true);
    }

    // Карточки кейсов с собственной страницей ведут на неё.
    for (const caseData of detailCases) {
      expect(
        screen
          .getAllByRole("link")
          .some((link) => link.getAttribute("href") === `/ru/cases/${caseData.slug}`),
      ).toBe(true);
    }
  });

  it("renders the reputation-monitoring-platform case detail page with demo button and story slider", () => {
    renderApp(["/ru/cases/reputation-monitoring-platform"]);
    expect(screen.getByRole("heading", { name: /часовой/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /открыть демо/i })).toHaveAttribute(
      "href",
      DEMO_APP_URL,
    );
    // Общий блок «Результат» + разделы из контентных блоков + слайдер «Сюжеты ИИ».
    expect(screen.getByRole("heading", { name: /ключевые показатели/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /почему это критично/i })).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders the default case template for a case without its own page", () => {
    renderApp(["/ru/cases/quality-vision-line"]);
    expect(
      screen.getByRole("heading", {
        name: "Контроль качества на производственной линии",
        level: 1,
      }),
    ).toBeInTheDocument();
    const ctaLinks = screen.getAllByRole("link", { name: /обсудить задачу/i });
    expect(ctaLinks).toHaveLength(2); // hero + нижний CTA-блок
    for (const link of ctaLinks) {
      expect(link).toHaveAttribute("href", "/ru/contacts");
    }
  });

  it("renders the retail-support-bot case page with its own details sections", () => {
    renderApp(["/ru/cases/retail-support-bot"]);
    expect(
      screen.getByRole("heading", { name: "Агентная поддержка интернет-магазина", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /почему это критично/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /показатели внедрения/i })).toBeInTheDocument();
    expect(screen.getByText("Обращений в месяц")).toBeInTheDocument();
  });

  it("redirects an unknown case slug back to the cases list", () => {
    renderApp(["/ru/cases/unknown-slug"]);
    expect(screen.getByRole("heading", { name: /кейсы/i })).toBeInTheDocument();
  });

  it("renders the investors page with market and terms sections", () => {
    renderApp(["/ru/investors"]);
    expect(screen.getByRole("heading", { name: /мир ии развивается/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /конкуренты/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /условия участия/i })).toBeInTheDocument();
  });

  it("renders a service page with software categories", () => {
    renderRouter(["/ru/services/software-development"]);
    expect(
      screen.getByRole("heading", { name: /разработка программного обеспечения/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /виды программного обеспечения и технологии/i }),
    ).toBeInTheDocument();
  });
});

it("renders the video generation solution page with showcase", () => {
  renderRouter(["/ru/solutions/video-generation"]);
  expect(screen.getByRole("heading", { name: /генерация видеороликов/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /под задачи бизнеса/i })).toBeInTheDocument();
  expect(screen.getByText("Text to Video")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /реклама и маркетинг/i })).toBeInTheDocument();
});

it("фильтрует решения по «для кого» на главной", async () => {
  const user = userEvent.setup();
  renderApp(["/ru"]);
  const combos = screen.getAllByRole("combobox");
  await user.click(combos[0]);
  await user.click(await screen.findByRole("option", { name: "Производители" }));

  expect(screen.getByText("Компьютерное зрение")).toBeInTheDocument();
  expect(screen.getByText("Агентные системы")).toBeInTheDocument();
  expect(screen.getByText("Управление репутацией")).toBeInTheDocument();
  expect(screen.queryByText("Медицинские клиники")).not.toBeInTheDocument();
});

it("показывает все решения сразу в одной сетке без листания страниц", () => {
  renderApp(["/ru"]);

  // Карусели больше нет: стрелки листания страниц не рендерятся.
  expect(
    screen.queryByRole("button", { name: /предыдущая страница решений/i }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /следующая страница решений/i }),
  ).not.toBeInTheDocument();

  // Все решения отрисованы одновременно — карточка-ссылка на /solutions/* для каждого.
  const solutionLinks = screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("/ru/solutions/"));
  expect(solutionLinks).toHaveLength(solutions.length);
});

it("показывает кроссейлы на странице решения для производителей", () => {
  renderApp(["/ru/solutions/manufacturers"]);
  expect(
    screen.getByRole("heading", { name: /ии-решения для производителей/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /похожие решения/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /управление репутацией/i })).toBeInTheDocument();
});

describe("AC-6: детальные страницы содержат Process/Fit/Proof/FAQ и минимум два CTA", () => {
  const ctaLinksInMain = () =>
    within(screen.getByRole("main"))
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/ru/contacts");

  it.each(serviceFixtures.map((service) => service.slug))("услуга %s", (slug) => {
    renderRouter([`/ru/services/${slug}`]);
    const main = within(screen.getByRole("main"));

    expect(main.getByRole("heading", { name: ru.servicePage.processTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.servicePage.fitTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.servicePage.proofTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.servicePage.faqTitle })).toBeInTheDocument();
    expect(ctaLinksInMain().length).toBeGreaterThanOrEqual(2);
  });

  it.each(solutions.map((solution) => solution.slug))("решение %s", (slug) => {
    renderRouter([`/ru/solutions/${slug}`]);
    const main = within(screen.getByRole("main"));

    expect(main.getByRole("heading", { name: ru.solutionPage.processTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.solutionPage.fitTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.solutionPage.proofTitle })).toBeInTheDocument();
    expect(main.getByRole("heading", { name: ru.solutionPage.faqTitle })).toBeInTheDocument();
    expect(ctaLinksInMain().length).toBeGreaterThanOrEqual(2);
  });
});
