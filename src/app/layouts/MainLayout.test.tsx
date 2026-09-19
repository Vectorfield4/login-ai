import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { routes } from "@/app/routes";
import { theme } from "@/shared/config/theme";

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
  it("в desktop-навигации «Контакты» — последний пункт, «Кейсы» — между «Услуги» и «Контакты»", () => {
    renderApp();
    const nav = screen.getByRole("navigation");
    const labels = Array.from(nav.querySelectorAll("a, button")).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(["Главная", "Решения", "Услуги", "Кейсы", "Инвесторам", "Контакты"]);
    expect(screen.getByRole("link", { name: "Кейсы" })).toHaveAttribute("href", "/ru/cases");
    expect(screen.getByRole("link", { name: "Инвесторам" })).toHaveAttribute(
      "href",
      "/ru/investors",
    );
  });

  it("в mobile-Drawer «Контакты» — последний пункт после всех разделов", async () => {
    stubMatchMedia(true);
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    const links = screen.getAllByRole("link");
    expect(screen.getByRole("link", { name: "Кейсы" })).toHaveAttribute("href", "/ru/cases");
    expect(links[links.length - 1]).toHaveTextContent("Контакты");
    expect(links[links.length - 1]).toHaveAttribute("href", "/ru/contacts");
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
  it("переключает сайт на английский и обратно через навигацию по /en и /ru", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByRole("navigation")).toHaveTextContent("Главная");
    expect(screen.getByRole("navigation")).toHaveTextContent("Кейсы");

    await user.click(screen.getByRole("button", { name: "Переключить язык" }));
    await user.click(screen.getByRole("menuitem", { name: /english/i }));

    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("navigation")).toHaveTextContent("Home");
    expect(screen.getByRole("navigation")).toHaveTextContent("Cases");

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    await user.click(screen.getByRole("menuitem", { name: /русский/i }));
    expect(document.documentElement.lang).toBe("ru");
    expect(screen.getByRole("navigation")).toHaveTextContent("Главная");
  });
});

describe("MainLayout — выпадающие меню без сырых i18n-ключей", () => {
  it("пункты меню «Решения» и «Услуги» показывают переведённый текст, а не ключи", async () => {
    const user = userEvent.setup();
    renderApp();

    const nav = screen.getByRole("navigation");
    await user.click(within(nav).getByRole("button", { name: "Решения" }));
    const solutionsMenu = await screen.findByRole("menu");
    expect(solutionsMenu.textContent).toContain("Агентные системы");
    expect(solutionsMenu.textContent).not.toContain("solutions.");
    await user.keyboard("{Escape}");

    await user.click(within(nav).getByRole("button", { name: "Услуги" }));
    const servicesMenu = await screen.findByRole("menu");
    expect(servicesMenu.textContent).toContain("Разработка ПО");
    expect(servicesMenu.textContent).not.toContain("services.");
  });
});
