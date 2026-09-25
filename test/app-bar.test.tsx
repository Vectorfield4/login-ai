import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppBar } from "@/widgets/app-bar";

function renderAppBar(path: string) {
  window.history.replaceState({}, "", path);
  return render(<AppBar lang="ru" />);
}

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
});
