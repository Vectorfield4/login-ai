import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

// Тесты всегда стартуют с русской локали; localStorage очищается между тестами
beforeEach(() => {
  window.localStorage.clear();
});

// jsdom не реализует scroll — подставляем noop, чтобы клиентские острова
// не падали при программном скролле к якорям
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});
