import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { cases } from "./data/cases";
import { getSolution, solutions } from "./data/solutions";
import { theme } from "./theme";

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

describe("App", () => {
  it("renders the heading", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: /login ai/i })).toBeInTheDocument();
  });

  it("renders the contacts page with a mailto link", () => {
    renderApp(["/contacts"]);
    expect(screen.getByRole("heading", { name: /контакты/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sales@loginai\.ru/i })).toHaveAttribute(
      "href",
      "mailto:sales@loginai.ru",
    );
  });

  it("renders a solution page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/solutions/computer-vision"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /внедрение компьютерного зрения/i }),
    ).toBeInTheDocument();
  });

  it("renders the services page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/services"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByRole("heading", { name: /услуги/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /разработка по/i })).toBeInTheDocument();
  });

  it("renders the cases page with a demo notice and solution links per case", () => {
    renderApp(["/cases"]);
    expect(screen.getByRole("heading", { name: /кейсы/i })).toBeInTheDocument();
    expect(screen.getByText(/примеры ниже — демонстрационные/i)).toBeInTheDocument();

    // Метрики извлекаются по ключам cases.<slug>.metrics.N.* (вложенные массивы словаря).
    expect(screen.getByText("Время обработки обращения")).toBeInTheDocument();
    expect(screen.getByText("−70 %")).toBeInTheDocument();

    // Каждая карточка-кейс ссылается на своё решение («Подробнее о решении»).
    const solutionLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/solutions/"));
    expect(solutionLinks).toHaveLength(cases.length);
    for (const link of solutionLinks) {
      const slug = link.getAttribute("href")?.replace("/solutions/", "");
      expect(
        getSolution(slug),
        `ссылка на несуществующее решение /solutions/${slug}`,
      ).toBeDefined();
    }
  });

  it("renders a service page with software categories", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/services/software-development"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /разработка программного обеспечения/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /виды программного обеспечения и технологии/i }),
    ).toBeInTheDocument();
  });
});

it("renders the video generation solution page with showcase", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/solutions/video-generation"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
  expect(screen.getByRole("heading", { name: /генерация видеороликов/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /под задачи бизнеса/i })).toBeInTheDocument();
  expect(screen.getByText("Text to Video")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /реклама и маркетинг/i })).toBeInTheDocument();
});

it("фильтрует решения по «для кого» на главной", async () => {
  const user = userEvent.setup();
  renderApp(["/"]);
  const combos = screen.getAllByRole("combobox");
  await user.click(combos[0]);
  await user.click(await screen.findByRole("option", { name: "Производители" }));

  expect(screen.getByText("Компьютерное зрение")).toBeInTheDocument();
  expect(screen.getByText("Агентные системы")).toBeInTheDocument();
  expect(screen.getByText("Управление репутацией")).toBeInTheDocument();
  expect(screen.queryByText("Медицинские клиники")).not.toBeInTheDocument();
});

it("показывает все решения сразу в одной сетке без листания страниц", () => {
  renderApp(["/"]);

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
    .filter((link) => link.getAttribute("href")?.startsWith("/solutions/"));
  expect(solutionLinks).toHaveLength(solutions.length);
});

it("показывает кроссейлы на странице решения для производителей", () => {
  renderApp(["/solutions/manufacturers"]);
  expect(
    screen.getByRole("heading", { name: /ии-решения для производителей/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /как мы можем вам помочь/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /управление репутацией/i })).toBeInTheDocument();
});
