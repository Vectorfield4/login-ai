import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { theme } from "../theme";

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

/** jsdom не реализует matchMedia — подменяем, чтобы эмулировать viewport. */
function stubMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-mui-color-scheme");
});

afterEach(() => {
  // в jsdom matchMedia отсутствует изначально — снимаем подмену между тестами
  Reflect.deleteProperty(window, "matchMedia");
});

describe("MainLayout — пункты меню", () => {
  it("в desktop-навигации «Контакты» — последний пункт", () => {
    renderApp();
    const nav = screen.getByRole("navigation");
    const labels = Array.from(nav.querySelectorAll("a, button")).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(["Главная", "Решения", "Услуги", "Контакты"]);
  });

  it("в mobile-Drawer «Контакты» — последний пункт после всех разделов", async () => {
    stubMatchMedia(true);
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    const links = screen.getAllByRole("link");
    expect(links[links.length - 1]).toHaveTextContent("Контакты");
    expect(links[links.length - 1]).toHaveAttribute("href", "/contacts");
  });
});

describe("MainLayout — переключатель темы", () => {
  it("переключает MUI theme mode и сохраняет выбор в localStorage", async () => {
    const user = userEvent.setup();
    renderApp();
    const toggle = screen.getByRole("button", { name: "Включить тёмную тему" });
    await user.click(toggle);

    expect(localStorage.getItem("mui-mode")).toBe("dark");
    expect(document.documentElement.getAttribute("data-mui-color-scheme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Включить светлую тему" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Включить светлую тему" }));
    expect(localStorage.getItem("mui-mode")).toBe("light");
    expect(document.documentElement.getAttribute("data-mui-color-scheme")).toBe("light");
    expect(screen.getByRole("button", { name: "Включить тёмную тему" })).toBeInTheDocument();
  });

  it("применяет сохранённую тему при загрузке", () => {
    localStorage.setItem("mui-mode", "dark");
    renderApp();
    expect(document.documentElement.getAttribute("data-mui-color-scheme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Включить светлую тему" })).toBeInTheDocument();
  });
});

describe("MainLayout — переключатель языка", () => {
  it("переключает сайт на английский и обратно, сохраняя выбор в localStorage", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByRole("navigation")).toHaveTextContent("Главная");

    await user.click(screen.getByRole("button", { name: "Переключить язык" }));
    await user.click(screen.getByRole("menuitem", { name: /english/i }));

    expect(localStorage.getItem("lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("navigation")).toHaveTextContent("Home");

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    await user.click(screen.getByRole("menuitem", { name: /русский/i }));
    expect(localStorage.getItem("lang")).toBe("ru");
    expect(screen.getByRole("navigation")).toHaveTextContent("Главная");
  });
});

describe("MainLayout — выпадающие меню без сырых i18n-ключей", () => {
  it("пункты меню «Решения» и «Услуги» показывают переведённый текст, а не ключи", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Решения" }));
    const solutionsMenu = await screen.findByRole("menu");
    expect(solutionsMenu.textContent).toContain("Агентные системы");
    expect(solutionsMenu.textContent).not.toContain("solutions.");
    await user.keyboard("{Escape}");

    await user.click(screen.getByRole("button", { name: "Услуги" }));
    const servicesMenu = await screen.findByRole("menu");
    expect(servicesMenu.textContent).toContain("Разработка ПО");
    expect(servicesMenu.textContent).not.toContain("services.");
  });
});
