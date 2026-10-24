import * as stylex from "@stylexjs/stylex";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { computeFlyoutFit, VIEWPORT_MARGIN } from "@/shared/hooks/useViewportFit";
import { AppBar } from "@/widgets/app-bar";
import {
  activeNavLink,
  activeNavLinkTint,
  activeNavLinkUnderline,
} from "@/widgets/app-bar/ui/atoms/NavLink";

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

const ACTIVE_CLASSES = (stylex.props(activeNavLink).className ?? "").split(" ");
const TINT_CLASSES = (stylex.props(activeNavLinkTint).className ?? "").split(" ");
const UNDERLINE_CLASSES = (stylex.props(activeNavLinkUnderline).className ?? "").split(" ");

function expectActive(element: Element) {
  expect(element.className.split(" ").filter((name) => ACTIVE_CLASSES.includes(name))).not.toEqual(
    [],
  );
}

function expectNotActive(element: Element) {
  expect(element.className.split(" ").filter((name) => ACTIVE_CLASSES.includes(name))).toEqual([]);
}

function hasAnyClass(element: Element, classes: string[]) {
  return element.className.split(" ").some((name) => classes.includes(name));
}

afterEach(() => {
  window.matchMedia = nativeMatchMedia;
  vi.restoreAllMocks();
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

  it("подсвечивает текущее решение в выпадающем списке", () => {
    renderAppBar("/ru/solutions/customer-experience");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Решения" }).parentElement as Element);

    const current = screen.getByRole("menuitem", { name: "Клиентский опыт" });
    expect(current).toHaveAttribute("aria-current", "page");
    expectActive(current);
    expectNotActive(screen.getByRole("menuitem", { name: "Компьютерное зрение" }));
  });

  it("подсвечивает ссылку на все решения на индексе раздела", () => {
    renderAppBar("/ru/solutions");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Решения" }).parentElement as Element);

    const all = screen.getByRole("menuitem", { name: "Все решения" });
    expect(all).toHaveAttribute("aria-current", "page");
    expectActive(all);
  });

  it("держит раздел услуг активным на странице услуги", () => {
    renderAppBar("/ru/services/information-monitoring");

    expect(screen.getByRole("link", { name: "Услуги" })).toHaveAttribute("aria-current", "true");
  });

  it("подкрашивает группу и направление текущей услуги, но без подчёркивания", () => {
    renderAppBar("/ru/services/information-monitoring");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);

    const group = screen.getByRole("menuitem", { name: "Веб и рост" });
    expect(hasAnyClass(group, TINT_CLASSES)).toBe(true);
    expect(hasAnyClass(group, UNDERLINE_CLASSES)).toBe(false);

    const direction = screen.getByRole("menuitem", { name: "Контент и рост" });
    expect(hasAnyClass(direction, TINT_CLASSES)).toBe(true);
    expect(hasAnyClass(direction, UNDERLINE_CLASSES)).toBe(false);
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

  it("закрывает прошлый раздел сразу при переключении на другой", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Решения" }).parentElement as Element);
    expect(screen.getByRole("menuitem", { name: "Все решения" })).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);

    expect(screen.queryByRole("menuitem", { name: "Все решения" })).not.toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Все услуги" })).toBeInTheDocument();
  });

  it("раскрывает группы направления при наведении", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);
    expect(screen.queryByRole("menuitem", { name: "ИИ-интеграции" })).not.toBeInTheDocument();

    const direction = screen.getByRole("menuitem", { name: "Инженерия и интеграции" });
    fireEvent.mouseEnter(direction.parentElement as Element);

    expect(screen.getByRole("menuitem", { name: "ИИ-интеграции" })).toBeInTheDocument();
  });

  it("раскрывает услуги группы на десктопе", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);
    fireEvent.mouseEnter(
      screen.getByRole("menuitem", { name: "Инженерия и интеграции" }).parentElement as Element,
    );
    fireEvent.mouseEnter(
      screen.getByRole("menuitem", { name: "ИИ-интеграции" }).parentElement as Element,
    );

    expect(screen.getByRole("menuitem", { name: "Интеграция ИИ с CRM" })).toHaveAttribute(
      "href",
      "/ru/services/ai-crm-integration",
    );
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

  it("подсвечивает текущую страницу в раскрытом разделе мобильного меню", () => {
    openMobileDrawer("/ru/solutions/customer-experience");

    fireEvent.click(screen.getByRole("button", { name: "Решения" }));

    const current = within(
      screen.getByRole("button", { name: "Решения" }).parentElement as HTMLElement,
    ).getByRole("link", { name: "Клиентский опыт" });
    expect(current).toHaveAttribute("aria-current", "page");
    expectActive(current);
  });

  it("оставляет мобильное меню на двух уровнях", () => {
    openMobileDrawer("/ru/cases");

    fireEvent.click(screen.getByRole("button", { name: "Услуги" }));
    fireEvent.click(screen.getByRole("button", { name: "Инженерия и интеграции" }));

    expect(screen.getByRole("link", { name: "ИИ-интеграции" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Интеграция ИИ с CRM" })).not.toBeInTheDocument();
  });

  it("закрывает мобильное меню после перехода по ссылке", () => {
    openMobileDrawer("/ru/cases");

    fireEvent.click(screen.getByRole("button", { name: "Компания" }));
    fireEvent.click(screen.getByRole("link", { name: "Кейсы" }));

    expect(screen.queryByRole("link", { name: "Кейсы" })).not.toBeInTheDocument();
  });
});

describe("Посадка вложенного меню во вьюпорт", () => {
  const viewport = { width: 1280, height: 800 };
  const anchorAt = (top: number, left = 100, width = 232) => ({ top, left, width });
  const panelOf = (height: number, width = 200) => ({ width, height });

  it("оставляет панель на месте, когда она помещается под строкой", () => {
    expect(computeFlyoutFit(anchorAt(100), panelOf(200), viewport)).toEqual({
      offsetTop: 0,
      offsetLeft: 0,
    });
  });

  it("поднимает панель, чтобы её низ остался над краем экрана", () => {
    const fit = computeFlyoutFit(anchorAt(600), panelOf(300), viewport);

    expect(fit.maxHeight).toBeUndefined();
    expect(600 + fit.offsetTop + 300).toBe(800 - VIEWPORT_MARGIN);
  });

  it("ограничивает высоту панели, которая выше экрана", () => {
    const fit = computeFlyoutFit(anchorAt(100), panelOf(1000), viewport);

    expect(fit.maxHeight).toBe(800 - VIEWPORT_MARGIN * 2);
    expect(100 + fit.offsetTop).toBe(VIEWPORT_MARGIN);
  });

  it("оставляет место для шапки над поднятой панелью", () => {
    const fit = computeFlyoutFit(anchorAt(300), panelOf(600), viewport);

    expect(300 + fit.offsetTop).toBeLessThan(300);
    expect(300 + fit.offsetTop).toBeGreaterThanOrEqual(VIEWPORT_MARGIN);
    expect(300 + fit.offsetTop + 600).toBe(800 - VIEWPORT_MARGIN);
  });

  it("разворачивает панель влево, когда справа нет места", () => {
    const fit = computeFlyoutFit(anchorAt(100, 1000), panelOf(200, 240), viewport);

    expect(fit.offsetLeft).toBe(-240);
  });

  it("держит панель справа, пока она помещается", () => {
    expect(computeFlyoutFit(anchorAt(100, 900), panelOf(200, 40), viewport).offsetLeft).toBe(0);
  });

  it("поднимает третье вложенное меню над нижним краем экрана", () => {
    renderAppBar("/ru/cases");

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Услуги" }).parentElement as Element);
    fireEvent.mouseEnter(
      screen.getByRole("menuitem", { name: "Инженерия и интеграции" }).parentElement as Element,
    );
    fireEvent.mouseEnter(
      screen.getByRole("menuitem", { name: "ИИ-интеграции" }).parentElement as Element,
    );

    const link = screen.getByRole("menuitem", { name: "Интеграция ИИ с CRM" });
    const flyout = link.parentElement as HTMLElement;

    vi.spyOn(window, "innerHeight", "get").mockReturnValue(800);
    vi.spyOn(flyout.parentElement as HTMLElement, "getBoundingClientRect").mockReturnValue({
      top: 600,
      bottom: 1000,
      left: 0,
      right: 200,
      width: 200,
      height: 400,
      x: 0,
      y: 600,
      toJSON: () => ({}),
    } as DOMRect);
    Object.defineProperty(flyout, "scrollHeight", { value: 400, configurable: true });

    fireEvent(window, new Event("resize"));

    expect(flyout.style.top).toBe(`${800 - VIEWPORT_MARGIN - 600 - 400}px`);
  });
});
