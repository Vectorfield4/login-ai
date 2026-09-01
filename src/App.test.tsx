import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
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

it("показывает кроссейлы на странице решения для производителей", () => {
  renderApp(["/solutions/manufacturers"]);
  expect(
    screen.getByRole("heading", { name: /ии-решения для производителей/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /как мы можем вам помочь/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /управление репутацией/i })).toBeInTheDocument();
});
