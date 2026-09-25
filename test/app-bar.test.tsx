import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { AppBar } from "@/widgets/app-bar";

function renderAppBar(path: string) {
  window.history.replaceState({}, "", path);
  return render(<AppBar lang="ru" />);
}

const nativeMatchMedia = window.matchMedia;

function mockMobileViewport() {
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

function openMobileDrawer(path: string) {
  mockMobileViewport();
  renderAppBar(path);
  fireEvent.click(screen.getByRole("button", { name: "Открыть меню" }));
}

afterEach(() => {
  window.matchMedia = nativeMatchMedia;
});

describe("AppBar", () => {
  it("логотип отдаётся строкой-путем, а не объектом ассета", () => {
    const { container } = renderAppBar("/ru/cases");

    const logo = container.querySelector("img[width='32']");
    expect(logo).not.toBeNull();
    expect(logo?.getAttribute("src")).toBe("/loginai-mark.png");
  });

  it("ведёт пункт «Решения» на индекс раздела", () => {
    renderAppBar("/ru/cases");

    expect(screen.getByRole("link", { name: "Решения" })).toHaveAttribute("href", "/ru/solutions");
  });

  it("отмечает индекс раздела текущей страницей", () => {
    renderAppBar("/ru/solutions");

    expect(screen.getByRole("link", { name: "Решения" })).toHaveAttribute("aria-current", "page");
  });

  it("оставляет раздел открытым, но не текущим на детальной странице", () => {
    renderAppBar("/ru/solutions/customer-experience");

    const trigger = screen.getByRole("link", { name: "Решения" });
    expect(trigger).toHaveAttribute("aria-current", "true");
  });

  it("добавляет ссылку на все решения в выпадающий список", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Решения" }).parentElement as Element);

    expect(screen.getByRole("menuitem", { name: "Все решения" })).toHaveAttribute(
      "href",
      "/ru/solutions",
    );
  });

  it("добавляет ссылку на все услуги в выпадающий список", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);

    expect(screen.getByRole("menuitem", { name: "Все услуги" })).toHaveAttribute(
      "href",
      "/ru/services",
    );
  });

  it("ставит ссылку на все решения первым в выпадающем списке", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Решения" }).parentElement as Element);

    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveTextContent("Все решения");
  });

  it("раскрывает раздел решений в мобильном меню", () => {
    openMobileDrawer("/ru/solutions");

    const toggle = screen.getByRole("button", { name: "Решения" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const sectionLinks = within(toggle.parentElement as HTMLElement).getAllByRole("link");
    expect(sectionLinks[0]).toHaveTextContent("Все решения");
    expect(sectionLinks[0]).toHaveAttribute("href", "/ru/solutions");
  });

  it("закрывает мобильное меню после перехода по ссылке", () => {
    openMobileDrawer("/ru/cases");

    fireEvent.click(screen.getByRole("link", { name: "Кейсы" }));

    expect(screen.queryByRole("link", { name: "Кейсы" })).not.toBeInTheDocument();
  });
});
